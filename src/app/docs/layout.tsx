import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import {
  DocsMobileNavigation,
  DocsSidebarNavigation,
} from "@/components/docs/docs-navigation";
import { DocsSearch } from "@/components/docs/docs-search";

import "./docs.css";

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
            <Image
              src="/brand/nyvorel.svg"
              alt=""
              width={30}
              height={30}
              priority
            />
            <span>Nyvorel</span>
            <i />
            <strong>Docs</strong>
          </Link>

          <div className="docsHeaderCenter">
            <DocsSearch />
          </div>

          <div className="docsHeaderActions">
            <span className="docsVersion">v0.1.0</span>
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

        <main className="docsContent" id="docs-main" tabIndex={-1}>
          {children}
        </main>
      </div>
    </div>
  );
}
