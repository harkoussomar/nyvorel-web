import type { Metadata } from "next";
import Link from "next/link";

import { allDocs, docsNavigation } from "@/lib/docs-navigation";

export const metadata: Metadata = {
  title: "Documentation",
  description: "Install Nyvorel v0.1.0 safely, learn the desktop, find technical references, and recover from problems.",
  alternates: { canonical: "/docs" },
};

const journeys = [
  {
    number: "01",
    title: "Install the stable release",
    description:
      "Confirm the existing Arch, Hyprland, and Quickshell requirements; preview file changes; install deliberately; and verify the result.",
    href: "/docs/getting-started/requirements",
    detail: "v0.1.0 · Requirements → Install → First launch",
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
      <p className="docEyebrow">Nyvorel documentation · Verified installation path: v0.1.0</p>
      <h1>Find your next step.</h1>
      <p>
        Start with a goal, not a source directory. Install the stable release,
        learn the shell one task at a time, or follow the technical references
        when you want to understand the architecture.
      </p>

      <div className="docStatusRow">
        <span className="docStatus">Guides: <strong>{allDocs.length}</strong></span>
        <span className="docStatus">Installation: tagged v0.1.0</span>
        <span className="docStatus">Recovery-aware</span>
      </div>

      <section className="docSection">
        <h2>Which version are these instructions for?</h2>
        <p>
          The Getting Started and Troubleshooting instructions here use the
          published, immutable <strong>v0.1.0</strong> release. That version
          installs onto a working Arch Linux + Hyprland + Quickshell desktop;
          it is <em>not</em> a minimal-Arch bootstrapper. Development-branch
          setup commands should not be mixed into this release journey.
        </p>
        <p>
          Other workflow and reference articles may describe evolving source
          behavior and are undergoing version-level editorial verification.
          For release-specific operations, confirm the behavior against the
          tagged <a href="https://github.com/harkoussomar/nyvorel/tree/v0.1.0" target="_blank" rel="noreferrer">v0.1.0 source</a>.
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
          Browse by topic. The new first-launch guide is part of the stable
          onboarding journey. Additional workflow and reference material will
          receive the same source verification in subsequent phases.
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
