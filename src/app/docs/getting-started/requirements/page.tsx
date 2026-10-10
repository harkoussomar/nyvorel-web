import type { Metadata } from "next";
import Link from "next/link";

import { Callout } from "@/components/docs/callout";
import { CodeBlock } from "@/components/docs/code-block";
import { PageFooter } from "@/components/docs/page-footer";

export const metadata: Metadata = {
  title: "Requirements — Nyvorel",
  description: "Choose the current development setup or the stable v0.1.0 path and check its prerequisites.",
  alternates: { canonical: "/docs/getting-started/requirements" },
};

export default function RequirementsPage() {
  return (
    <article className="docArticle">
      <header className="docArticleHeader">
        <p className="docEyebrow">Getting started · 01 · Choose a source</p>
        <h1>Before you install</h1>
        <p>
          Nyvorel has two distinct installation paths. The current development
          setup can provision the desktop from a minimal Arch installation. The
          immutable <strong>v0.1.0</strong> release expects Hyprland and
          Quickshell to be working already.
        </p>
      </header>

      <section className="docSection" aria-labelledby="setup-paths">
        <h2 id="setup-paths">Choose your setup path</h2>
        <Callout title="Stable release · existing desktop required" tone="safe">
          The immutable <code>v0.1.0</code> release expects Arch Linux,
          Hyprland, and Quickshell to be installed and working already. Continue
          with the <Link href="/docs/getting-started/install">stable installation guide</Link>.
        </Callout>
        <Callout title="Current development · starts from minimal Arch" tone="important">
          The development checkout&apos;s <code>setup.sh</code> installs
          Hyprland, Quickshell, and Nyvorel&apos;s desktop packages. Start with
          Arch Linux already installed, a working internet connection, and
          configured <code>sudo</code>; run setup as your normal user, not root.
          It does not partition disks or install Arch Linux. Continue to the
          <Link href="/docs/getting-started/install"> development setup steps</Link>.
        </Callout>
      </section>

      <Callout title="Arch must already be installed" tone="important">
        Neither path partitions disks or installs Arch Linux. The development
        setup installs the supported desktop package set. The v0.1.0 installer
        installs only Nyvorel&apos;s managed user files and services.
      </Callout>

      <section className="docSection">
        <h2>Current development starting environment</h2>
        <dl className="docDefinitionGrid">
          <dt>Distribution</dt><dd>Arch Linux</dd>
          <dt>Starting point</dt><dd>A minimal installed system; Hyprland and Quickshell may be absent</dd>
          <dt>Network</dt><dd>Working internet for official Arch packages and the default color environment</dd>
          <dt>Account</dt><dd>A normal user with working <code>sudo</code>; do not run setup as root</dd>
          <dt>Terminal</dt><dd>An interactive local terminal or SSH session with a PTY</dd>
          <dt>Source</dt><dd>A complete current Nyvorel development checkout</dd>
        </dl>
        <p>
          The default setup installs the supported core from official Arch
          repositories, including Hyprland, Quickshell 0.3.2 or newer, portals,
          audio, fonts, Kitty, Fish, Firefox, Dolphin, and the shell&apos;s runtime
          tools. Editors, archive and monitoring tools, OCR, and screen
          recording are opt-in groups. Missing optional tools affects only
          their related features.
        </p>
        <Callout title="Existing network management is preserved" tone="safe">
          NetworkManager is installed as part of the core package set, but the
          setup does not enable or start it unless you explicitly select
          <code> --enable-networkmanager</code>.
        </Callout>
        <p>
          The native Lua session path has been verified with Hyprland 0.56.2.
          Hyprland 0.57 is not yet claimed as supported on a released build.
        </p>
      </section>

      <section className="docSection">
        <h2>Check a development starting system</h2>
        <p>Run these read-only checks as the user who will run Nyvorel:</p>
        <CodeBlock label="Terminal · read-only">{`cat /etc/os-release
id -u
command -v sudo
git --version`}</CodeBlock>
        <p>
          Confirm Arch Linux, a nonzero user ID, working <code>sudo</code>, and
          Git. Hyprland, Quickshell, Python, and the remaining desktop packages
          may be installed by <code>setup.sh</code>.
        </p>
      </section>

      <section className="docSection">
        <h2>Stable v0.1.0 starting environment</h2>
        <dl className="docDefinitionGrid">
          <dt>Distribution</dt><dd>Arch Linux</dd>
          <dt>Compositor</dt><dd>Hyprland (existing, working session)</dd>
          <dt>Desktop shell runtime</dt><dd>Quickshell, available as <code>qs</code></dd>
          <dt>Service manager</dt><dd>Working systemd user manager</dd>
          <dt>Runtime tools</dt><dd>Python 3 and standard GNU/Linux userland tools</dd>
          <dt>Account</dt><dd>Your normal desktop user; do not install from a root shell</dd>
          <dt>Source</dt><dd>The immutable <code>v0.1.0</code> tag</dd>
        </dl>
        <CodeBlock label="Stable prerequisites · read-only">{`command -v Hyprland
command -v qs
command -v python3
systemctl --user --no-pager status`}</CodeBlock>
      </section>

      <section className="docSection">
        <h2>Decide what you want to protect</h2>
        <p>
          Nyvorel&apos;s installer backs up managed files that it replaces and
          records an installation manifest. It does not replace a full-system
          backup. Before changing an existing desktop, save any important
          custom configuration and make sure you can log in through a text
          console if the graphical session fails.
        </p>
        <Callout title="Use the dry run first" tone="safe">
          Development starts with <code>./setup.sh --plan</code>. Stable v0.1.0
          starts with <code>./install.sh --dry-run</code>. Both show their file
          or package plan before installation.
        </Callout>
      </section>

      <section className="docSection">
        <h2>Which installation guide applies to you?</h2>
        <p>
          Continue to <Link href="/docs/getting-started/install">Install</Link>
          and use the section matching your source. Do not run development
          <code> setup.sh</code> commands from a v0.1.0 checkout.
        </p>
      </section>

      <PageFooter
        previous={{ href: "/docs", title: "Documentation" }}
        next={{ href: "/docs/getting-started/install", title: "Install" }}
      />
    </article>
  );
}
