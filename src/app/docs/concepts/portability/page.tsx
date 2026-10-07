import type { Metadata } from "next";

import { Callout } from "@/components/docs/callout";
import { CodeBlock } from "@/components/docs/code-block";
import { PageFooter } from "@/components/docs/page-footer";

export const metadata: Metadata = {
  title: "Portability",
  description:
    "How Nyvorel keeps public source independent from maintainer-local paths and runtime state.",
  alternates: { canonical: "/docs/concepts/portability" },
};

export default function PortabilityPage() {
  return (
    <article className="docArticle">
      <header className="docArticleHeader">
        <p className="docEyebrow">Core concepts · 02</p>
        <h1>Portable public source</h1>
        <p>
          The public repository is designed to represent reusable Nyvorel
          source, not a snapshot of the maintainer&apos;s live home directory.
        </p>
      </header>

      <section className="docSection">
        <h2>What stays out of the release tree</h2>
        <ul>
          <li>live <code>~/.config/nyvorel</code> runtime/user state;</li>
          <li>maintainer backup and history trees;</li>
          <li>generated package/file inventory;</li>
          <li>legacy nested Quickshell configuration copies;</li>
          <li>systemd enablement symlinks;</li>
          <li>machine-local secrets, credentials, and user data.</li>
        </ul>

        <Callout title="Source boundary" tone="safe">
          The release tree contains Nyvorel source, portable templates, helpers,
          integrations, documentation, and redistributable project/third-party
          assets.
        </Callout>
      </section>

      <section className="docSection">
        <h2>The `@HOME@` token</h2>
        <p>
          Source files that require an absolute target-user home path use a
          literal portable token:
        </p>
        <CodeBlock label="source token">{`@HOME@`}</CodeBlock>
        <p>
          During installation, Nyvorel replaces the token in installed copies
          with the selected target home while leaving the public source files
          unchanged.
        </p>

        <p>
          For v0.1.0, the published portability contract records 29 occurrences
          across 10 source template files. Release verification confirms those
          source tokens remain present while installed sandbox copies contain
          zero unresolved tokens.
        </p>
      </section>

      <section className="docSection">
        <h2>Portable systemd templates</h2>
        <p>
          User units are published as templates under <code>systemd/</code>.
          Installation materializes the runtime filenames:
        </p>
        <dl className="docDefinitionGrid">
          <dt><code>.service.in</code></dt>
          <dd>becomes <code>.service</code></dd>
          <dt><code>.path.in</code></dt>
          <dd>becomes <code>.path</code></dd>
          <dt><code>.conf.in</code></dt>
          <dd>becomes <code>.conf</code></dd>
        </dl>
        <p>
          The target-user home token is rendered before those units are
          installed beneath <code>~/.config/systemd/user/</code>.
        </p>
      </section>

      <section className="docSection">
        <h2>Environment-specific configuration</h2>
        <p>
          Portability does not mean every machine uses identical monitor,
          workspace, hardware, or optional-application settings. Those settings
          should be reviewed for the target machine after installation.
        </p>
      </section>

      <PageFooter
        previous={{ href: "/docs/concepts/architecture", title: "Architecture" }}
        next={{ href: "/docs/reference/lifecycle", title: "Runtime lifecycle" }}
      />
    </article>
  );
}
