import type { Metadata } from "next";

import { Callout } from "@/components/docs/callout";
import { PageFooter } from "@/components/docs/page-footer";

export const metadata: Metadata = {
  title: "Requirements",
  description: "What Nyvorel v0.1.0 expects before installation.",
  alternates: { canonical: "/docs/getting-started/requirements" },
};

export default function RequirementsPage() {
  return (
    <article className="docArticle">
      <header className="docArticleHeader">
        <p className="docEyebrow">Getting started · 01</p>
        <h1>Requirements</h1>
        <p>
          Nyvorel v0.1.0 is installed onto an existing Linux desktop. It is not
          an Arch Linux installer and it does not bootstrap every optional
          application used by individual modules.
        </p>
      </header>

      <section className="docSection">
        <h2>Target environment</h2>
        <dl className="docDefinitionGrid">
          <dt>Distribution</dt>
          <dd>Arch Linux</dd>
          <dt>Compositor</dt>
          <dd>Hyprland</dd>
          <dt>Desktop shell runtime</dt>
          <dd>Quickshell (`qs`)</dd>
          <dt>Service manager</dt>
          <dd>systemd user services</dd>
          <dt>Runtime tooling</dt>
          <dd>Python 3 and standard GNU/Linux userland tools</dd>
        </dl>
      </section>

      <section className="docSection">
        <h2>Optional integrations</h2>
        <p>
          Nyvorel contains integrations for applications and tools around the
          desktop environment. Those integrations do not mean every optional
          application must be installed just to inspect or use unrelated parts
          of Nyvorel.
        </p>

        <Callout title="Review your own machine" tone="important">
          Monitor/workspace configuration, hardware-related defaults, and
          application-specific integrations are environment-specific. Review
          them after installation for your system.
        </Callout>
      </section>

      <section className="docSection">
        <h2>Before you install</h2>
        <ol>
          <li>Have an existing Arch Linux + Hyprland session.</li>
          <li>Have Quickshell available as `qs`.</li>
          <li>Clone the public Nyvorel repository.</li>
          <li>Run the dry-run installation before changing configuration.</li>
        </ol>
      </section>

      <PageFooter
        previous={{ href: "/docs", title: "Documentation" }}
        next={{ href: "/docs/getting-started/install", title: "Install" }}
      />
    </article>
  );
}
