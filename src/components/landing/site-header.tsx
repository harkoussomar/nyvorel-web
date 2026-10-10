"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const items = [
  { href: "#explore", label: "Explore" },
  { href: "#appearance", label: "Appearance" },
  { href: "#features", label: "Features" },
  { href: "/docs", label: "Documentation ↗" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        document.getElementById("nv-menu-toggle")?.focus();
      }
    }
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  return (
    <header className="site-header">
      <div className="container header-row">
        <a className="wordmark" href="#top" aria-label="Nyvorel homepage">
          Nyvorel<span className="logo-star" aria-hidden="true">✳</span>
        </a>
        <nav className="top-nav" aria-label="Primary navigation">
          {items.map(({ href, label }) =>
            href.startsWith("/") ? (
              <Link key={href} href={href}>{label}</Link>
            ) : (
              <a key={href} href={href}>{label}</a>
            ),
          )}
        </nav>
        <div className="header-actions">
          <a className="github-link" href="https://github.com/harkoussomar/nyvorel" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
          <a className="button button-dark" href="#get">Get Nyvorel <span className="arrow" aria-hidden="true">↗</span></a>
          <button
            className="menu-button"
            id="nv-menu-toggle"
            type="button"
            aria-controls="nv-mobile-nav"
            aria-expanded={open}
            aria-label={open ? "Close navigation" : "Open navigation"}
            onClick={() => setOpen(!open)}
          >
            <span aria-hidden="true">{open ? "×" : "☰"}</span>
          </button>
        </div>
      </div>
      <nav className={`mobile-nav${open ? " open" : ""}`} id="nv-mobile-nav" aria-label="Mobile navigation" aria-hidden={!open}>
        {items.map(({ href, label }) =>
          href.startsWith("/") ? (
            <Link key={href} href={href} onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>{label}</Link>
          ) : (
            <a key={href} href={href} onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>{label}</a>
          ),
        )}
        <a href="#get" onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>Get Nyvorel ↗</a>
      </nav>
    </header>
  );
}
