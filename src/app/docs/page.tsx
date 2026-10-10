import type { Metadata } from "next";
import Link from "next/link";

import { allDocs, docsNavigation } from "@/lib/docs-navigation";

export const metadata: Metadata = {
  title: "Documentation",
  description: "Install the current Nyvorel development desktop or stable v0.1.0, learn the shell, and recover safely.",
  alternates: { canonical: "/docs" },
};

const journeys = [
  {
    number: "01",
    title: "Install Nyvorel",
    description:
      "Choose the current minimal-Arch development setup or the stable v0.1.0 path, review its plan, and verify the result.",
    href: "/docs/getting-started/requirements",
    detail: "Development or v0.1.0 · Requirements → Install → First launch",
  },
  {
    number: "02",
    title: "Learn the desktop",
    description:
      "Understand Nyvorel's shell surfaces, open Settings and Appearance Studio, and explore the available workflows.",
    href: "/docs/getting-started/first-launch",
    detail: "First launch → Shell surfaces → Appearance",
  },
  {
    number: "03",
    title: "Understand the architecture",
    description:
      "Learn which layer owns the session, services, shell runtime, configuration, and application integrations.",
    href: "/docs/concepts/architecture",
    detail: "Concepts → Technical reference",
  },
  {
    number: "04",
    title: "Recover or troubleshoot",
    description:
      "Identify the failing boundary, inspect safe diagnostics, and restore managed files without silently discarding edits.",
    href: "/docs/troubleshooting",
    detail: "Troubleshooting → Recovery",
  },
] as const;

export default function DocumentationHome() {
  return (
    <article className="docHero docsOverview">
      <p className="docEyebrow">Nyvorel documentation · Development setup + stable v0.1.0</p>
      <h1>Find your next step.</h1>
      <p>
        Start with the source you intend to use. Set up the current development
        desktop from minimal Arch, install the stable release onto an existing
        desktop, or follow the technical references to understand the system.
      </p>

      <div className="docStatusRow">
        <span className="docStatus">Guides: <strong>{allDocs.length}</strong></span>
        <span className="docStatus">Installation: development + tagged v0.1.0</span>
        <span className="docStatus">Development: Hyprland Lua · 0.56.2</span>
        <span className="docStatus">Recovery-aware</span>
      </div>

      <section className="docSection">
        <h2>Which version are these instructions for?</h2>
        <p>
          Getting Started now presents two separate paths. The current
          development checkout can provision a desktop from an already
          installed minimal Arch system. The published, immutable
          <strong> v0.1.0</strong> release installs onto an existing working
          Arch Linux + Hyprland + Quickshell desktop.
        </p>
        <p>
          The current development setup is available from the public
          <code> main</code> branch and uses Hyprland&apos;s native Lua
          configuration on 0.56.2. Its
          <code>nyvorel session</code> launcher prefers
          <code>~/.config/hypr/hyprland.lua</code> when present and retains a
          <code>.conf</code> fallback. This Lua path has been verified on
          Hyprland 0.56.2; 0.57 is not yet claimed as supported.
        </p>
        <p>
          Those development changes are not part of v0.1.0. The stable release
          remains unchanged, so follow its installation and recovery guides
          only with the tagged
          <a href="https://github.com/harkoussomar/nyvorel/tree/v0.1.0" target="_blank" rel="noreferrer">v0.1.0 source</a>.
        </p>
      </section>

      <div className="docsSearchHint">
        <span>Find a guide</span>
        <strong>Press / or Ctrl/⌘ K</strong>
      </div>

      <section className="docSection docsJourneySection">
        <h2>Choose a journey</h2>
        <div className="docsJourneyGrid">
          {journeys.map((journey) => (
            <Link className="docsJourneyCard" href={journey.href} key={journey.title}>
              <span>{journey.number}</span>
              <h3>{journey.title}</h3>
              <p>{journey.description}</p>
              <small>{journey.detail}</small>
            </Link>
          ))}
        </div>
      </section>

      <section className="docSection">
        <h2>All documentation</h2>
        <p>
          Browse by topic. Getting Started labels the development and stable
          commands separately. Troubleshooting remains release-scoped where
          stated, and technical references identify the source they describe.
        </p>
        <p>
          Workflow guides follow the current Nyvorel interface shown in their
          screenshots. For a release-specific capability, the tagged
          <a href="https://github.com/harkoussomar/nyvorel/tree/v0.1.0" target="_blank" rel="noreferrer">v0.1.0 source</a>
          remains authoritative.
        </p>
        <div className="docsMap">
          {docsNavigation.map((section) => (
            <section className="docsMapSection" key={section.title}>
              <header><h3>{section.title}</h3><span>{section.items.length}</span></header>
              <div>
                {section.items.map((item) => (
                  <Link href={item.href} key={item.href}>
                    <strong>{item.title}</strong><small>{item.description}</small>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    </article>
  );
}
