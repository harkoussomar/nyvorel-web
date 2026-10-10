import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

import {
  DocsMobileNavigation,
  DocsSidebarNavigation,
} from "@/components/docs/docs-navigation";
import { DocsSearch } from "@/components/docs/docs-search";
import { DocsBreadcrumbs } from "@/components/docs/docs-breadcrumbs";
import { DocsOnThisPage } from "@/components/docs/docs-on-this-page";

import "./docs.css";
import "./atelier.css";

export const metadata: Metadata = {
  title: {
    default: "Documentation",
    template: "%s · Nyvorel Docs",
  },
  description:
    "Official Nyvorel documentation for installation, workflows, architecture, technical reference, recovery, and contribution.",
};

export default function DocsLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="docsApp">
      <a className="docsSkipLink" href="#docs-main">
        Skip to documentation content
      </a>

      <header className="docsHeader">
        <div className="docsHeaderInner">
          <Link className="docsBrand" href="/">
            <span>Nyvorel</span>
            <i aria-hidden="true" />
            <strong>Docs</strong>
          </Link>

          <div className="docsHeaderCenter">
            <DocsSearch />
          </div>

          <div className="docsHeaderActions">
            <span className="docsVersion" title="Stable installation instructions use Nyvorel v0.1.0">Install guide: v0.1.0</span>
            <a
              className="docsGithubLink"
              href="https://github.com/harkoussomar/nyvorel"
              target="_blank"
              rel="noreferrer"
            >
              GitHub ↗
            </a>
          </div>
        </div>
      </header>

      <DocsMobileNavigation />

      <div className="docsFrame">
        <aside className="docsSidebar">
          <div className="docsSidebarSticky">
            <p className="docsSidebarLabel">YOUR READING MAP <span>01 — 06</span></p>
            <DocsSidebarNavigation />

            <div className="docsSidebarFoot">
              <span>Source of truth</span>
              <a
                href="https://github.com/harkoussomar/nyvorel"
                target="_blank"
                rel="noreferrer"
              >
                harkoussomar/nyvorel ↗
              </a>
            </div>
          </div>
        </aside>

        <div className="docsReadingColumn">
          <DocsBreadcrumbs />
          <main className="docsContent" id="docs-main" tabIndex={-1}>
            {children}
            <footer className="docsReadingEnd">
              <span>NYVOREL / DOCUMENTATION</span>
              <span>Built for curious minds and careful hands.</span>
            </footer>
          </main>
        </div>
        <DocsOnThisPage />
      </div>
    </div>
  );
}
