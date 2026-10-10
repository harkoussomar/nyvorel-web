"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

type Heading = { id: string; text: string };

function uniqueHeadingId(text: string, index: number, used: Set<string>) {
  const base = text.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || `section-${index}`;
  let id = base;
  let suffix = 2;
  while (used.has(id)) id = `${base}-${suffix++}`;
  used.add(id);
  return id;
}

export function DocsOnThisPage() {
  const pathname = usePathname();
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    let watcher: IntersectionObserver | null = null;

    // Read the committed article DOM after React has finished this paint.
    // Scheduling the update also avoids synchronous setState inside an effect.
    const frame = window.requestAnimationFrame(() => {
      const article = document.querySelector<HTMLElement>(".docsContent article");
      if (!article) {
        setHeadings([]);
        setActive("");
        return;
      }

      const nodes = Array.from(article.querySelectorAll<HTMLHeadingElement>(".docSection h2"));
      const used = new Set(Array.from(article.querySelectorAll<HTMLElement>("[id]")).map((node) => node.id));
      const items = nodes.map((node, index) => {
        if (!node.id) node.id = uniqueHeadingId(node.textContent?.trim() || "", index, used);
        return { id: node.id, text: node.textContent?.trim() || "Section" };
      });

      setHeadings(items);
      setActive(items[0]?.id || "");

      if (!items.length || typeof IntersectionObserver === "undefined") return;
      watcher = new IntersectionObserver((entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        const first = visible[0];
        if (first) setActive((first.target as HTMLElement).id);
      }, { rootMargin: "-96px 0px -65% 0px", threshold: 0 });
      nodes.forEach((node) => watcher?.observe(node));
    });

    return () => {
      window.cancelAnimationFrame(frame);
      watcher?.disconnect();
    };
  }, [pathname]);

  return (
    <aside className="docsOnThisPage" aria-label="On this page">
      <div className="docsOnThisPageSticky">
        <div className="docsOnThisPageTop">READING GUIDE <span aria-hidden="true">↘</span></div>
        {headings.length ? (
          <nav aria-label="Page sections">
            {headings.map((heading) => (
              <a key={heading.id} href={`#${heading.id}`} aria-current={active === heading.id ? "location" : undefined}>{heading.text}</a>
            ))}
          </nav>
        ) : <p>Choose a chapter from the reading map.</p>}
        <div className="docsOnThisPageFoot">A thoughtful desktop.<br/>A considered manual.</div>
      </div>
    </aside>
  );
}
