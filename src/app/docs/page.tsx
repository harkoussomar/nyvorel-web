import type { Metadata } from "next";
import Link from "next/link";

import { allDocs, docsNavigation } from "@/lib/docs-navigation";

export const metadata: Metadata = {
  title: "Documentation",
  description:
    "Navigate Nyvorel installation, user workflows, concepts, technical reference, project guidance, and troubleshooting.",
  alternates: { canonical: "/docs" },
};

const journeys = [
  {
    number: "01",
    title: "Install Nyvorel",
    description:
      "Check minimal Arch requirements, review setup, start your first session, and understand recovery before changing your desktop.",
    href: "/docs/getting-started/requirements",
    detail: "Requirements → Install → Recovery",
  },
  {
    number: "02",
    title: "Use the shell",
    description:
      "Learn Settings, Appearance Studio, shell surfaces, operational tooling, remote access, recovery, and project workflows.",
    href: "/docs/workflows/settings",
    detail: "Seven user workflow guides",
  },
  {
    number: "03",
    title: "Understand the architecture",
    description:
      "Follow lifecycle ownership, configuration, module boundaries, systemd integration, application sync, and repository layout.",
    href: "/docs/concepts/architecture",
    detail: "Concepts → Technical reference",
  },
  {
    number: "04",
    title: "Contribute or recover",
    description:
      "Preserve source/provenance boundaries, validate changes, understand licensing, or diagnose an installation/runtime problem.",
    href: "/docs/project/contributing",
    detail: "Contributing → Licensing → Troubleshooting",
  },
] as const;

export default function DocumentationHome() {
  const pageCount = allDocs.length;

  return (
    <article className="docHero docsOverview">
      <p className="docEyebrow">Documentation · development branch</p>
      <h1>One map for the whole Nyvorel system.</h1>
      <p>
        Follow a user journey or go directly to the source-level reference.
        The documentation covers installation and recovery, every major Nyvorel
        workflow, runtime architecture, configuration, systemd integration,
        project boundaries, and troubleshooting.
      </p>

      <div className="docStatusRow">
        <span className="docStatus">
          Pages: <strong>{pageCount}</strong>
        </span>
        <span className="docStatus">Static / prerendered</span>
        <span className="docStatus">Source-grounded</span>
        <span className="docStatus">Setup: development branch</span>
      </div>

      <div className="docsSearchHint">
        <span>Search anywhere</span>
        <strong>Press / or Ctrl/⌘ K</strong>
      </div>

      <section className="docSection docsJourneySection">
        <h2>Choose a journey</h2>

        <div className="docsJourneyGrid">
          {journeys.map((journey) => (
            <Link
              className="docsJourneyCard"
              href={journey.href}
              key={journey.title}
            >
              <span>{journey.number}</span>
              <h3>{journey.title}</h3>
              <p>{journey.description}</p>
              <small>{journey.detail}</small>
            </Link>
          ))}
        </div>
      </section>

      <section className="docSection">
        <h2>Documentation map</h2>
        <p>
          Every published documentation route is represented below and in the
          persistent navigation.
        </p>

        <div className="docsMap">
          {docsNavigation.map((section) => (
            <section className="docsMapSection" key={section.title}>
              <header>
                <h3>{section.title}</h3>
                <span>{section.items.length}</span>
              </header>

              <div>
                {section.items.map((item) => (
                  <Link href={item.href} key={item.href}>
                    <strong>{item.title}</strong>
                    <small>{item.description}</small>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>

      <section className="docSection">
        <h2>Documentation principles</h2>
        <div className="docSurfaceGrid">
          <div className="docSurfaceCard">
            <span>01</span>
            <h3>Source-grounded</h3>
            <p>
              Technical claims follow the published Nyvorel source and release
              documentation rather than generic Hyprland assumptions.
            </p>
          </div>
          <div className="docSurfaceCard">
            <span>02</span>
            <h3>Recovery-aware</h3>
            <p>
              Installation instructions explain the path back before they ask
              the user to modify a live desktop.
            </p>
          </div>
          <div className="docSurfaceCard">
            <span>03</span>
            <h3>Ownership-oriented</h3>
            <p>
              Guides explain which layer owns configuration, lifecycle, UI,
              system state, or helper behavior.
            </p>
          </div>
          <div className="docSurfaceCard">
            <span>04</span>
            <h3>Keyboard-accessible</h3>
            <p>
              Documentation search, navigation, skip links, and focus states are
              available without requiring a pointer.
            </p>
          </div>
        </div>
      </section>
    </article>
  );
}
