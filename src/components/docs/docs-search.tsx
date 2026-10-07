"use client";

import { useRouter } from "next/navigation";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { docsNavigation } from "@/lib/docs-navigation";

const aliases: Readonly<Record<string, readonly string[]>> = {
  "/docs/getting-started/requirements": [
    "arch linux",
    "hyprland",
    "quickshell",
    "dependencies",
    "prerequisites",
  ],
  "/docs/getting-started/install": [
    "setup",
    "installer",
    "activate",
    "dry run",
    "manifest",
  ],
  "/docs/getting-started/recovery": [
    "uninstall",
    "restore",
    "rollback",
    "force changed",
    "backup",
  ],
  "/docs/workflows/settings": ["configuration", "quick", "general", "bar"],
  "/docs/workflows/appearance-studio": [
    "theme",
    "wallpaper",
    "palette",
    "motion",
    "interface",
  ],
  "/docs/workflows/shell-surfaces": [
    "bar",
    "sidebar",
    "dock",
    "osd",
    "notifications",
    "overview",
  ],
  "/docs/workflows/operations-center": [
    "runtime",
    "jobs",
    "process",
    "system",
    "ports",
    "monitor",
  ],
  "/docs/workflows/backup-recovery": [
    "restic",
    "timeshift",
    "smart",
    "disk",
    "restore",
  ],
  "/docs/workflows/arch-remote": [
    "ssh",
    "tailscale",
    "wayvnc",
    "phone",
    "remote desktop",
    "pairing",
  ],
  "/docs/workflows/project-launcher": [
    "projects",
    "code",
    "zed",
    "kitty",
    "git",
    "dev-mine",
  ],
  "/docs/concepts/architecture": [
    "hyprland",
    "systemd",
    "quickshell",
    "ownership",
  ],
  "/docs/concepts/portability": ["home token", "@home@", "templates", "portable"],
  "/docs/reference/lifecycle": [
    "startup",
    "restart",
    "shell.qml",
    "service",
    "globalstates",
  ],
  "/docs/reference/configuration": [
    "config.json",
    "config options",
    "directories",
    "jsonadapter",
    "fileview",
  ],
  "/docs/reference/module-map": [
    "qml",
    "services",
    "modules",
    "panel family",
    "source tree",
  ],
  "/docs/reference/systemd-integration": [
    "service",
    "path unit",
    "daemon reload",
    "operations monitor",
  ],
  "/docs/reference/theme-synchronization": [
    "kitty",
    "fish",
    "zed",
    "btop",
    "fuzzel",
    "dolphin",
    "kde",
    "zen",
    "vscode",
  ],
  "/docs/reference/repository-map": [
    "folders",
    "source",
    "install mapping",
    "bin",
    "hypr",
  ],
  "/docs/project/contributing": [
    "pull request",
    "branch",
    "testing",
    "validation",
    "third party",
  ],
  "/docs/project/licensing-provenance": [
    "gpl",
    "license",
    "attribution",
    "upstream",
    "trademark",
    "assets",
  ],
  "/docs/troubleshooting": [
    "error",
    "failed",
    "systemctl",
    "journalctl",
    "uninstall",
    "activate",
  ],
};

const entries = docsNavigation.flatMap((section) =>
  section.items.map((item) => ({
    ...item,
    section: section.title,
    aliases: aliases[item.href] ?? [],
  })),
);

function searchableText(entry: (typeof entries)[number]) {
  return [
    entry.title,
    entry.description,
    entry.section,
    ...entry.aliases,
  ]
    .join(" ")
    .toLowerCase();
}

export function DocsSearch() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    if (!normalized) {
      return entries.slice(0, 8);
    }

    const tokens = normalized.split(/\s+/).filter(Boolean);

    return entries
      .filter((entry) => {
        const haystack = searchableText(entry);
        return tokens.every((token) => haystack.includes(token));
      })
      .slice(0, 10);
  }, [query]);

  const closeSearch = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActiveIndex(0);

    window.setTimeout(() => {
      previousFocusRef.current?.focus();
    }, 0);
  }, []);

  const openSearch = useCallback(() => {
    previousFocusRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    setOpen(true);
  }, []);

  const go = useCallback(
    (href: string) => {
      setOpen(false);
      setQuery("");
      setActiveIndex(0);
      router.push(href);
    },
    [router],
  );

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      const typing =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.tagName === "SELECT" ||
        target?.isContentEditable;

      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        openSearch();
        return;
      }

      if (event.key === "/" && !typing && !open) {
        event.preventDefault();
        openSearch();
        return;
      }

      if (event.key === "Escape" && open) {
        event.preventDefault();
        closeSearch();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [closeSearch, open, openSearch]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const id = window.requestAnimationFrame(() => {
      inputRef.current?.focus();
    });

    return () => {
      window.cancelAnimationFrame(id);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  function onInputKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) =>
        results.length === 0 ? 0 : (index + 1) % results.length,
      );
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) =>
        results.length === 0
          ? 0
          : (index - 1 + results.length) % results.length,
      );
      return;
    }

    if (event.key === "Enter" && results[activeIndex]) {
      event.preventDefault();
      go(results[activeIndex].href);
    }
  }

  return (
    <>
      <button
        className="docsSearchTrigger"
        type="button"
        onClick={openSearch}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <span>Search docs</span>
        <kbd>/</kbd>
      </button>

      {open ? (
        <div
          className="docsSearchBackdrop"
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) {
              closeSearch();
            }
          }}
        >
          <section
            className="docsSearchDialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="docs-search-title"
          >
            <h2 className="docsSrOnly" id="docs-search-title">
              Search Nyvorel documentation
            </h2>

            <div className="docsSearchInputRow">
              <span aria-hidden="true">⌕</span>
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setActiveIndex(0);
                }}
                onKeyDown={onInputKeyDown}
                placeholder="Search Nyvorel documentation…"
                aria-label="Search documentation"
                aria-controls="docs-search-results"
                aria-activedescendant={
                  results[activeIndex]
                    ? `docs-search-result-${activeIndex}`
                    : undefined
                }
              />
              <button
                type="button"
                className="docsSearchClose"
                onClick={closeSearch}
                aria-label="Close documentation search"
              >
                Esc
              </button>
            </div>

            <div
              className="docsSearchResults"
              id="docs-search-results"
              aria-live="polite"
            >
              {results.length > 0 ? (
                results.map((result, index) => (
                  <button
                    type="button"
                    id={`docs-search-result-${index}`}
                    className={
                      index === activeIndex
                        ? "docsSearchResult docsSearchResultActive"
                        : "docsSearchResult"
                    }
                    key={result.href}
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => go(result.href)}
                  >
                    <span className="docsSearchResultSection">
                      {result.section}
                    </span>
                    <strong>{result.title}</strong>
                    <small>{result.description}</small>
                  </button>
                ))
              ) : (
                <div className="docsSearchEmpty">
                  No documentation matched “{query}”.
                </div>
              )}
            </div>

            <footer className="docsSearchFooter" aria-hidden="true">
              <span>↑ ↓ navigate</span>
              <span>Enter open</span>
              <span>Esc close</span>
              <span>Ctrl/⌘ K search</span>
            </footer>
          </section>
        </div>
      ) : null}
    </>
  );
}
