"use client";

import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import indexedEntries from "@/lib/docs-search-index.json";

type SearchEntry = (typeof indexedEntries)[number];

type RankedEntry = { entry: SearchEntry; score: number; excerpt: string };

const recommendations = [
  "/docs/getting-started/requirements",
  "/docs/getting-started/install",
  "/docs/getting-started/first-launch",
  "/docs/getting-started/recovery",
  "/docs/workflows/appearance-studio",
  "/docs/workflows/backup-recovery",
  "/docs/troubleshooting",
];

const related: Record<string, readonly string[]> = {
  install: ["installer", "activation", "setup"],
  uninstall: ["recovery", "restore", "force-changed"],
  theme: ["appearance", "palette", "colors"],
  remote: ["ssh", "wayvnc", "tailscale"],
  backup: ["restic", "timeshift", "recovery"],
  service: ["systemd", "journalctl", "systemctl"],
  config: ["configuration", "settings", "json"],
};

function fold(text: string): string {
  return text.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "");
}

function excerptFor(entry: SearchEntry, tokens: string[]): string {
  const source = entry.content || entry.description;
  const lower = fold(source);
  let at = -1;
  for (const token of tokens) {
    const index = lower.indexOf(token);
    if (index >= 0 && (at < 0 || index < at)) at = index;
  }
  if (at < 0) return entry.description;
  const from = Math.max(0, at - 58);
  const to = Math.min(source.length, from + 200);
  return `${from > 0 ? "…" : ""}${source.slice(from, to).trim()}${to < source.length ? "…" : ""}`;
}

function isNearMatch(text: string, token: string) {
  // Small typo tolerance in the title only; body matches stay exact.
  if (token.length < 5) return false;
  return text.split(/[^a-z0-9]+/).some((word) => {
    if (Math.abs(word.length - token.length) > 1 || word.length > 24) return false;
    let i = 0;
    let j = 0;
    let edits = 0;
    while (i < word.length && j < token.length) {
      if (word[i] === token[j]) { i++; j++; continue; }
      edits++;
      if (edits > 1) return false;
      if (word.length > token.length) i++;
      else if (token.length > word.length) j++;
      else { i++; j++; }
    }
    return edits + (word.length - i) + (token.length - j) <= 1;
  });
}

function rank(entry: SearchEntry, tokens: string[], phrase: string): number {
  const title = fold(entry.title);
  const page = fold(entry.pageTitle);
  const description = fold(entry.description);
  const body = fold(entry.content);
  let score = 0;
  for (const token of tokens) {
    const aliases = related[token] || [];
    const expanded = [token, ...aliases];
    let best = 0;
    for (const word of expanded) {
      const primary = word === token ? 1 : 0.42;
      if (title === word) best = Math.max(best, 135 * primary);
      else if (title.startsWith(word)) best = Math.max(best, 102 * primary);
      else if (title.includes(word)) best = Math.max(best, 86 * primary);
      if (page.includes(word)) best = Math.max(best, 70 * primary);
      if (description.includes(word)) best = Math.max(best, 34 * primary);
      if (body.includes(word)) best = Math.max(best, 13 * primary);
    }
    if (!best && isNearMatch(title + " " + page, token)) best = 11;
    if (!best) return 0; // AND semantics for multiple words.
    score += best;
  }
  if (title.includes(phrase)) score += 160;
  if (page.includes(phrase)) score += 90;
  if (description.includes(phrase)) score += 25;
  if (entry.href === entry.pageHref) score += 4;
  return score;
}

function visibleResults(query: string): RankedEntry[] {
  const phrase = fold(query.trim()).replace(/\s+/g, " ");
  if (!phrase) {
    return recommendations.flatMap((href) => {
      const entry = indexedEntries.find((item) => item.pageHref === href && item.href === href);
      return entry ? [{ entry, score: 1, excerpt: entry.description }] : [];
    });
  }
  const tokens = phrase.split(/\s+/).filter(Boolean).slice(0, 8);
  const results = indexedEntries
    .map((entry) => ({ entry, score: rank(entry, tokens, phrase), excerpt: excerptFor(entry, tokens) }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.entry.href.localeCompare(b.entry.href));
  const pageCounts = new Map<string, number>();
  return results.filter((item) => {
    const count = pageCounts.get(item.entry.pageHref) || 0;
    if (count >= 2) return false;
    pageCounts.set(item.entry.pageHref, count + 1);
    return true;
  }).slice(0, 9);
}

function Highlight({ text, query }: { text: string; query: string }) {
  const terms = fold(query).split(/\s+/).filter(Boolean);
  if (!terms.length) return <>{text}</>;
  const exp = new RegExp(`(${terms.map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "gi");
  // React escapes text, and highlighting only changes its presentation.
  return <>{text.split(exp).map((part, index) => terms.includes(fold(part)) ? <mark key={index}>{part}</mark> : <span key={index}>{part}</span>)}</>;
}

export function DocsSearch() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const results = useMemo(() => visibleResults(query), [query]);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActiveIndex(0);
    window.requestAnimationFrame(() => {
      const previous = previousFocusRef.current;
      const isFocusable = Boolean(
        previous?.isConnected &&
        previous !== document.body &&
        previous !== document.documentElement &&
        previous.matches('a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'),
      );
      (isFocusable ? previous : triggerRef.current)?.focus({ preventScroll: true });
    });
  }, []);

  const openDialog = useCallback(() => {
    if (document.activeElement instanceof HTMLElement) previousFocusRef.current = document.activeElement;
    setOpen(true);
  }, []);

  const navigate = useCallback((href: string) => {
    setOpen(false);
    setQuery("");
    setActiveIndex(0);
    router.push(href);
  }, [router]);

  useEffect(() => {
    function keys(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      const typing = target?.tagName === "INPUT" || target?.tagName === "TEXTAREA" ||
        target?.tagName === "SELECT" || Boolean(target?.isContentEditable);
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (!open) openDialog();
      } else if (event.key === "/" && !typing && !open) {
        event.preventDefault(); openDialog();
      } else if (event.key === "Escape" && open) {
        event.preventDefault(); close();
      }
    }
    window.addEventListener("keydown", keys);
    return () => window.removeEventListener("keydown", keys);
  }, [close, open, openDialog]);

  useEffect(() => {
    if (!open) return;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const frame = requestAnimationFrame(() => inputRef.current?.focus());
    return () => { cancelAnimationFrame(frame); document.body.style.overflow = oldOverflow; };
  }, [open]);

  function onInputKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault(); setActiveIndex((i) => results.length ? (i + 1) % results.length : 0);
    } else if (event.key === "ArrowUp") {
      event.preventDefault(); setActiveIndex((i) => results.length ? (i - 1 + results.length) % results.length : 0);
    } else if (event.key === "Enter" && results[activeIndex]) {
      event.preventDefault(); navigate(results[activeIndex].entry.href);
    }
  }

  function trapTab(event: React.KeyboardEvent<HTMLElement>) {
    if (event.key !== "Tab" || !dialogRef.current) return;
    const items = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(
      'button:not([disabled]), input:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
    ));
    const first = items[0]; const last = items[items.length - 1];
    if (!first || !last) return;
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }

  return (
    <>
      <button ref={triggerRef} className="docsSearchTrigger" type="button" onClick={openDialog}
        aria-haspopup="dialog" aria-expanded={open}>
        <span>Search docs</span><kbd>/</kbd>
      </button>
      {open && typeof document !== "undefined" ? createPortal(
        <div className="docsApp docsSearchPortal">
          <div className="docsSearchBackdrop" onPointerDown={(event) => {
            if (event.currentTarget === event.target) close();
          }}>
            <section ref={dialogRef} className="docsSearchDialog" role="dialog" aria-modal="true"
              aria-labelledby="docs-search-title" onKeyDown={trapTab}>
              <h2 className="docsSrOnly" id="docs-search-title">Search Nyvorel documentation</h2>
              <div className="docsSearchMasthead">
                <div className="docsSearchIdentity" aria-hidden="true">
                  <span className="docsSearchIdentityMark" />
                  <span>NYVOREL</span>
                  <span className="docsSearchIdentityDivider">/</span>
                  <span className="docsSearchIdentitySection">DOCUMENTATION SEARCH</span>
                </div>
                <button className="docsSearchClose" type="button" onClick={close} aria-label="Close search" title="Close (Escape)">
                  <svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
                    <path d="M5 5l10 10M15 5 5 15" />
                  </svg>
                </button>
              </div>
              <div className="docsSearchInputRow">
                <svg className="docsSearchMagnifier" viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="10.8" cy="10.8" r="6.8" />
                  <path d="m16.2 16.2 4 4" />
                </svg>
                <input ref={inputRef} value={query}
                  onChange={(event) => { setQuery(event.target.value); setActiveIndex(0); }}
                  onKeyDown={onInputKeyDown}
                  placeholder="Search guides, commands, and concepts…"
                  role="combobox" aria-expanded="true" aria-autocomplete="list"
                  aria-label="Search documentation content"
                  aria-controls="docs-search-results"
                  aria-activedescendant={results[activeIndex] ? `docs-search-result-${activeIndex}` : undefined}
                />
                {query.length > 0 && (
                  <button type="button" className="docsSearchClear" onClick={() => {
                    setQuery(""); setActiveIndex(0); inputRef.current?.focus();
                  }} aria-label="Clear search query">Clear</button>
                )}
              </div>
              <div className="docsSearchSectionBar" aria-hidden="true">
                <span>{query.trim() ? "MATCHING ARTICLES" : "START EXPLORING"}</span>
                <span>{query.trim() ? `${results.length} ${results.length === 1 ? "match" : "matches"}` : "RECOMMENDED"}</span>
              </div>
              <div className="docsSearchResults" id="docs-search-results" role="listbox" aria-label="Documentation search results">
                {results.length ? results.map(({ entry, excerpt }, index) => (
                  <button key={entry.href} id={`docs-search-result-${index}`} type="button" role="option"
                    aria-selected={index === activeIndex}
                    className={index === activeIndex ? "docsSearchResult docsSearchResultActive" : "docsSearchResult"}
                    onPointerEnter={() => setActiveIndex(index)} onClick={() => navigate(entry.href)}>
                    <span className="docsSearchResultNumber" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                    <span className="docsSearchResultBody">
                      <span className="docsSearchResultPage">{entry.pageTitle}{entry.href !== entry.pageHref ? " / " + entry.section : ""}</span>
                      <strong><Highlight text={entry.title} query={query} /></strong>
                      <small><Highlight text={excerpt} query={query} /></small>
                    </span>
                    <svg className="docsSearchResultArrow" viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4.5 10h11m-4.5-4.5L15.5 10 11 14.5" /></svg>
                  </button>
                )) : <div className="docsSearchEmpty">No matching topic. Try a shorter phrase or a related command.</div>}
              </div>
              <footer className="docsSearchFooter">
                <div className="docsSearchKeyboardHints" aria-hidden="true">
                  <span><kbd>↑</kbd><kbd>↓</kbd> Move</span>
                  <span><kbd>↵</kbd> Open</span>
                  <span><kbd>esc</kbd> Close</span>
                </div>
                <span className="docsSearchFooterNote">Nyvorel / Docs</span>
              </footer>
            </section>
          </div>
        </div>, document.body,
      ) : null}
    </>
  );
}
