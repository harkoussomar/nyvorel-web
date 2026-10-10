import type { Metadata } from "next";
import Link from "next/link";

import { Callout } from "@/components/docs/callout";
import { CodeBlock } from "@/components/docs/code-block";
import { PageFooter } from "@/components/docs/page-footer";

export const metadata: Metadata = {
  title: "Requirements — v0.1.0",
  description: "Check the supported environment and prerequisites for installing Nyvorel v0.1.0 safely.",
  alternates: { canonical: "/docs/getting-started/requirements" },
};

export default function RequirementsPage() {
  return (
    <article className="docArticle">
      <header className="docArticleHeader">
        <p className="docEyebrow">Getting started · 01 · Stable v0.1.0</p>
        <h1>Before you install</h1>
        <p>
          Make sure your system is ready for Nyvorel. This guide applies to the
          published <strong>v0.1.0</strong> release, which installs a desktop shell
          onto an existing Arch Linux, Hyprland, and Quickshell environment.
        </p>
      </header>

      <Callout title="This is not an Arch Linux installer" tone="important">
        Nyvorel v0.1.0 does not install Arch Linux, Hyprland, Quickshell, or all
        optional application packages for you. Do not follow minimal-Arch
        development setup instructions for this tagged release.
      </Callout>

      <section className="docSection">
        <h2>Supported starting environment</h2>
        <dl className="docDefinitionGrid">
          <dt>Distribution</dt><dd>Arch Linux</dd>
          <dt>Compositor</dt><dd>Hyprland (existing, working session)</dd>
          <dt>Desktop shell runtime</dt><dd>Quickshell, available as <code>qs</code></dd>
          <dt>Service manager</dt><dd>Working systemd user manager</dd>
          <dt>Runtime tools</dt><dd>Python 3 and standard GNU/Linux userland tools</dd>
          <dt>Account</dt><dd>Your normal desktop user; do not install from a root shell</dd>
          <dt>Source</dt><dd>The immutable <code>v0.1.0</code> tag of the public Nyvorel repository</dd>
        </dl>
        <p>
          Extra integrations, including terminal, file manager, editor, media,
          or remote-access tooling, may have additional dependencies. Missing
          optional applications should not be confused with the core shell
          prerequisites. Consult the module guide for the feature you plan to use.
        </p>
      </section>

      <section className="docSection">
        <h2>Check your machine without changing it</h2>
        <p>Run these checks as your intended desktop user:</p>
        <CodeBlock label="Terminal · read-only">{`cat /etc/os-release
command -v Hyprland
command -v qs
command -v python3
command -v systemctl
systemctl --user --no-pager status`}</CodeBlock>
        <p>
          Expect an Arch Linux system and executable paths for the required
          commands. The final check should contact your user systemd manager;
          an inactive or failed service shown within that output is not by
          itself evidence that the manager is unavailable.
        </p>
        <p>
          In a running Hyprland desktop, <code>echo &quot;$XDG_SESSION_TYPE&quot;</code>
          should normally report <code>wayland</code>. From SSH or a text console,
          that variable may be unset even when Hyprland is installed; do not
          mistake that for a failed prerequisite.
        </p>
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
          The next guide starts with <code>./install.sh --dry-run</code>, which
          previews managed-file changes before installation.
        </Callout>
      </section>

      <section className="docSection">
        <h2>Which installation guide applies to you?</h2>
        <p>
          If you already have Arch Linux + Hyprland + Quickshell, continue to
          the <Link href="/docs/getting-started/install">v0.1.0 installation guide</Link>.
          If your computer has only a minimal Arch installation, this stable
          release is not a complete setup path. Follow a development build only
          when its specific source revision, dependencies, and commands have
          been independently verified.
        </p>
      </section>

      <PageFooter
        previous={{ href: "/docs", title: "Documentation" }}
        next={{ href: "/docs/getting-started/install", title: "Install v0.1.0" }}
      />
    </article>
  );
}
