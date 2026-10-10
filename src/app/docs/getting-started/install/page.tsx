import type { Metadata } from "next";
import Link from "next/link";

import { Callout } from "@/components/docs/callout";
import { CodeBlock } from "@/components/docs/code-block";
import { PageFooter } from "@/components/docs/page-footer";

export const metadata: Metadata = {
  title: "Install Nyvorel v0.1.0",
  description: "Clone the tagged release, preview file changes, install intentionally, and verify the result.",
  alternates: { canonical: "/docs/getting-started/install" },
};

export default function InstallPage() {
  return (
    <article className="docArticle">
      <header className="docArticleHeader">
        <p className="docEyebrow">Getting started · 02 · Stable v0.1.0</p>
        <h1>Install Nyvorel safely</h1>
        <p>
          Follow this guide to install the published <strong>v0.1.0</strong>
          desktop shell onto an already working Arch Linux + Hyprland +
          Quickshell environment. Preview the plan, install the managed files,
          and activate services only when you are ready.
        </p>
      </header>

      <Callout title="Check your prerequisites" tone="important">
        Start with <Link href="/docs/getting-started/requirements">Requirements</Link>.
        The tagged v0.1.0 installer does <strong>not</strong> install desktop
        dependencies or run the development-only <code>setup.sh</code> workflow.
      </Callout>

      <section className="docSection">
        <h2>1. Get the exact release</h2>
        <p>
          Clone Nyvorel and check out the immutable release tag. Pinning the tag
          avoids following newer or unreleased setup instructions from
          <code>main</code>.
        </p>
        <CodeBlock label="Terminal">{`git clone --branch v0.1.0 --depth 1 https://github.com/harkoussomar/nyvorel.git
cd nyvorel
cat VERSION
test -f install.sh && test -f uninstall.sh`}</CodeBlock>
        <p>
          <strong>Expected:</strong> <code>cat VERSION</code> prints
          <code>0.1.0</code>, and the last command exits successfully without
          output. If you already have a directory named <code>nyvorel</code>,
          choose another directory rather than overwriting it.
        </p>
      </section>

      <section className="docSection">
        <h2>2. Preview the managed-file changes</h2>
        <CodeBlock label="Terminal · read-only">{`./install.sh --dry-run`}</CodeBlock>
        <p>
          Review the listed destinations, existing files to be replaced, and
          the target home. This is a dry run; it does not change the installed
          files or activate services.
        </p>
        <Callout title="Stop if the plan surprises you" tone="important">
          Installing a desktop shell may replace managed Hyprland and other
          integration files. Do not proceed until you understand the impact on
          your own configuration and have a separate backup of important work.
        </Callout>
      </section>

      <section className="docSection">
        <h2>3. Choose how to install</h2>
        <h3>Install files without starting services</h3>
        <CodeBlock label="Terminal · changes files">{`./install.sh --yes`}</CodeBlock>
        <p>
          This creates backups of replaced managed files and writes a
          timestamped manifest, but does not activate the Nyvorel user services.
        </p>
        <h3>Or install and activate in your live Hyprland session</h3>
        <CodeBlock label="Terminal · changes files and services">{`./install.sh --yes --activate`}</CodeBlock>
        <p>
          Choose this <em>instead of</em> the preceding installation command
          when you want immediate activation and are already in the target
          Wayland/Hyprland session. Activation reloads the user service manager,
          enables integration units, and restarts the Nyvorel Quickshell service.
          Do not run both installation variants in sequence as a routine step.
        </p>
      </section>

      <section className="docSection">
        <h2>4. Verify what was installed</h2>
        <p>Check the state pointer and installation manifest:</p>
        <CodeBlock label="Terminal · read-only">{`test -f "$HOME/.local/state/nyvorel/current-install" && echo "Installation pointer present"
ls -ld "$HOME/.local/state/nyvorel/installations"`}</CodeBlock>
        <p>
          <strong>Expected:</strong> a current-install pointer and at least one
          retained installation-state directory containing <code>manifest.json</code>.
          The manifest records managed destinations and backups.
        </p>
        <p>If you chose activation, inspect the service:</p>
        <CodeBlock label="Hyprland session · read-only">{`systemctl --user --no-pager status nyvorel-quickshell.service`}</CodeBlock>
        <p>
          <strong>Expected:</strong> the service is running in a compatible
          session. If it fails or is inactive, don&apos;t repeat the installation
          blindly. Open the <Link href="/docs/troubleshooting">troubleshooting guide</Link>
          and inspect its journal first.
        </p>
      </section>

      <section className="docSection">
        <h2>5. Discover the desktop</h2>
        <p>
          When the shell is active, continue to the
          <Link href="/docs/getting-started/first-launch"> first-launch guide</Link>
          to identify the primary surfaces and check common tasks. If you
          need to undo installation, read
          <Link href="/docs/getting-started/recovery"> Recovery</Link> before
          changing anything else.
        </p>
      </section>

      <PageFooter
        previous={{ href: "/docs/getting-started/requirements", title: "Requirements" }}
        next={{ href: "/docs/getting-started/first-launch", title: "First launch" }}
      />
    </article>
  );
}
