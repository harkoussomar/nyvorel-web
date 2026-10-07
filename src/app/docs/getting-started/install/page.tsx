import type { Metadata } from "next";

import { Callout } from "@/components/docs/callout";
import { CodeBlock } from "@/components/docs/code-block";
import { PageFooter } from "@/components/docs/page-footer";

export const metadata: Metadata = {
  title: "Install",
  description: "Preview, install, and activate Nyvorel safely.",
  alternates: { canonical: "/docs/getting-started/install" },
};

export default function InstallPage() {
  return (
    <article className="docArticle">
      <header className="docArticleHeader">
        <p className="docEyebrow">Getting started · 02</p>
        <h1>Install Nyvorel</h1>
        <p>
          The installer is designed around preview, backup, manifest creation,
          and explicit activation. You can install the files without activating
          the runtime services.
        </p>
      </header>

      <section className="docSection">
        <h2>1. Clone the repository</h2>
        <CodeBlock>{`git clone https://github.com/harkoussomar/nyvorel.git
cd nyvorel`}</CodeBlock>
      </section>

      <section className="docSection">
        <h2>2. Preview first</h2>
        <p>The dry run changes no files.</p>
        <CodeBlock>{`./install.sh --dry-run`}</CodeBlock>

        <Callout title="Recommended first action" tone="safe">
          Use the dry run to inspect the plan before Nyvorel touches your live
          configuration.
        </Callout>
      </section>

      <section className="docSection">
        <h2>3. Install</h2>
        <CodeBlock>{`./install.sh --yes`}</CodeBlock>

        <p>The installer:</p>
        <ul>
          <li>
            installs Quickshell source to{" "}
            <code>~/.config/quickshell/nyvorel</code>;
          </li>
          <li>merges the published Hyprland tree into <code>~/.config/hypr</code>;</li>
          <li>installs <code>nyvorel-*</code> helpers into <code>~/.local/bin</code>;</li>
          <li>installs Fish and Kitty integration files;</li>
          <li>
            renders systemd templates into{" "}
            <code>~/.config/systemd/user</code>;
          </li>
          <li>installs the Nyvorel application icon;</li>
          <li>
            materializes every public-source <code>@HOME@</code> token for the
            target user;
          </li>
          <li>backs up each existing managed file before replacement;</li>
          <li>
            writes a machine-readable installation manifest beneath{" "}
            <code>~/.local/state/nyvorel/installations/</code>.
          </li>
        </ul>

        <Callout title="Installation does not imply activation">
          <code>./install.sh --yes</code> installs the managed files but does
          not activate Nyvorel services unless activation is explicitly
          requested.
        </Callout>
      </section>

      <section className="docSection">
        <h2>4. Install and activate</h2>
        <CodeBlock>{`./install.sh --yes --activate`}</CodeBlock>
        <p>
          Activation reloads the systemd user manager, enables Nyvorel&apos;s
          style-sync path units and Operations Center monitor, imports the
          current Wayland/Hyprland session environment, and restarts{" "}
          <code>nyvorel-quickshell.service</code>.
        </p>
      </section>

      <section className="docSection">
        <h2>Installation state</h2>
        <p>Each installation receives a timestamped state directory:</p>
        <CodeBlock label="path">{`~/.local/state/nyvorel/installations/YYYYMMDD-HHMMSS/`}</CodeBlock>
        <p>That state can contain:</p>
        <ul>
          <li>
            <code>manifest.json</code> — destinations, source mapping,
            installed checksums, pre-existing status, and lifecycle status;
          </li>
          <li><code>backup/</code> — original versions of replaced files;</li>
          <li>
            <code>uninstall-conflicts/</code> — changed files archived during
            forced recovery, when applicable.
          </li>
        </ul>
      </section>

      <PageFooter
        previous={{ href: "/docs/getting-started/requirements", title: "Requirements" }}
        next={{ href: "/docs/getting-started/recovery", title: "Recovery" }}
      />
    </article>
  );
}
