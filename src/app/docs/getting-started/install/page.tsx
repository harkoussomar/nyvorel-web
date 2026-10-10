import type { Metadata } from "next";
import Link from "next/link";

import { Callout } from "@/components/docs/callout";
import { CodeBlock } from "@/components/docs/code-block";
import { PageFooter } from "@/components/docs/page-footer";

export const metadata: Metadata = {
  title: "Install Nyvorel",
  description: "Install the current development desktop from minimal Arch, or use the separate stable v0.1.0 path.",
  alternates: { canonical: "/docs/getting-started/install" },
};

export default function InstallPage() {
  return (
    <article className="docArticle">
      <header className="docArticleHeader">
        <p className="docEyebrow">Getting started · 02 · Development and stable</p>
        <h1>Install Nyvorel safely</h1>
        <p>
          Use the development setup to build a Nyvorel desktop from an already
          installed minimal Arch system. Use the separate v0.1.0 steps only
          when installing the immutable stable release onto an existing
          Hyprland + Quickshell desktop.
        </p>
      </header>

      <Callout title="Choose the path that matches your source" tone="important">
        Start with <Link href="/docs/getting-started/requirements">Requirements</Link>.
        The commands are not interchangeable: <code>setup.sh</code> belongs to
        the current development checkout and is absent from v0.1.0.
      </Callout>

      <section className="docSection">
        <h2>Current development setup from minimal Arch</h2>
        <p>
          Use the current development source checkout from a text console or
          interactive SSH session. The current development workflow is
          available from the public <code>main</code> branch. The immutable
          <code> v0.1.0</code> release remains a separate install path below.
        </p>
        <CodeBlock label="Current development checkout · read-only">{`git clone https://github.com/harkoussomar/nyvorel.git
cd nyvorel
./setup.sh --plan`}</CodeBlock>
        <p>
          The plan is read-only. Review the complete official-package set,
          target user, user-file steps, first-run initialization, and any
          optional groups before continuing.
        </p>

        <h3>Install the reviewed plan</h3>
        <CodeBlock label="Interactive terminal · upgrades packages and changes user files">{`./setup.sh --install --yes`}</CodeBlock>
        <p>
          When selected packages are missing or Quickshell is too old, setup
          runs a full <code>pacman -Syu</code> and shows pacman&apos;s transaction
          for review. It then installs backed-up user files, creates the isolated
          color environment, initializes the default wallpaper and palette, and
          checks the session. A terminal with a PTY is required for the package
          transaction.
        </p>
        <Callout title="Existing managed files require an explicit choice" tone="important">
          Setup previews the lower-level file install and stops if it would
          replace existing managed files. Review the conflict list, then rerun
          with <code>--replace-existing</code> only when you want those files
          backed up and replaced. If setup was interrupted after package
          installation, rerun it with <code>--resume</code>.
        </Callout>

        <h3>Select only the optional groups you need</h3>
        <CodeBlock label="Example · review and install the same selection">{`./setup.sh --plan --with-recommended --with-ocr-english --with-recording
./setup.sh --install --yes --with-recommended --with-ocr-english --with-recording`}</CodeBlock>
        <p>
          Recommended applications include Zed, Kate, Ark, btop, and appearance
          tools. OCR and recording are separate options. Review
          <code> ./setup.sh --help</code> before choosing a Vulkan provider for
          Zed. NetworkManager is not enabled unless
          <code> --enable-networkmanager</code> is selected.
        </p>

        <h3>Start the installed desktop</h3>
        <CodeBlock label="Next local text login">{`~/.local/bin/nyvorel first-run --check
~/.local/bin/nyvorel session --check
~/.local/bin/nyvorel session`}</CodeBlock>
        <p>
          The launcher starts Hyprland with Nyvorel&apos;s configuration; the
          session activates its user services and Quickshell. A configured
          display manager can use the installed Nyvorel session entry instead.
          Do not run the complete setup from inside an active Hyprland desktop.
        </p>
        <Callout title="Current compositor support" tone="safe">
          The native Lua session path has been verified with Hyprland 0.56.2.
          Hyprland 0.57 is not yet claimed as supported on a released build.
        </Callout>
      </section>

      <section className="docSection">
        <h2>Stable v0.1.0 · install on an existing desktop</h2>
        <h3>1. Get the exact release</h3>
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
        <h3>2. Preview the managed-file changes</h3>
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
        <h3>3. Choose how to install</h3>
        <h4>Install files without starting services</h4>
        <CodeBlock label="Terminal · changes files">{`./install.sh --yes`}</CodeBlock>
        <p>
          This creates backups of replaced managed files and writes a
          timestamped manifest, but does not activate the Nyvorel user services.
        </p>
        <h4>Or install and activate in your live Hyprland session</h4>
        <CodeBlock label="Terminal · changes files and services">{`./install.sh --yes --activate`}</CodeBlock>
        <p>
          Choose this <em>instead of</em> the preceding installation command
          when you want immediate activation and are already in the target
          Wayland/Hyprland session. Activation reloads the user service manager,
          enables integration units, and restarts the Nyvorel Quickshell service.
          Do not run both installation variants in sequence as a routine step.
        </p>
        <h3>4. Verify what was installed</h3>
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
        <h2>Continue after either installation</h2>
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
