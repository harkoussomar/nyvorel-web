import type { Metadata } from "next";

import { Callout } from "@/components/docs/callout";
import { CodeBlock } from "@/components/docs/code-block";
import { PageFooter } from "@/components/docs/page-footer";

export const metadata: Metadata = {
  title: "Install",
  description: "Plan and install Nyvorel on a minimal Arch system.",
  alternates: { canonical: "/docs/getting-started/install" },
};

export default function InstallPage() {
  return (
    <article className="docArticle">
      <header className="docArticleHeader">
        <p className="docEyebrow">Getting started · 02</p>
        <h1>Install Nyvorel</h1>
        <p>
          Start from a bootable minimal Arch installation and use the
          development-branch checkout. Setup plans official packages, reviews
          the pacman transaction, backs up user-file replacements, and prepares
          the first desktop login.
        </p>
      </header>

      <section className="docSection">
        <h2>1. Clone and inspect</h2>
        <CodeBlock>{`git clone https://github.com/harkoussomar/nyvorel.git
cd nyvorel
./setup.sh --plan`}</CodeBlock>
        <p>
          The plan changes no packages, services, or user files. Confirm that
          <code>setup.sh</code> is present: the immutable v0.1.0 release uses
          an earlier installation workflow.
        </p>
      </section>

      <section className="docSection">
        <h2>2. Select optional groups</h2>
        <p>
          Add <code>--with-recommended</code> for Zed, Kate, Ark, btop, and
          desktop utilities; <code>--with-ocr-english</code> for English text
          recognition; or <code>--with-recording</code> for GPU screen recording.
          Run the plan with the same flags you intend to install.
        </p>
        <CodeBlock>{`./setup.sh --plan --with-recommended --with-ocr-english`}</CodeBlock>
        <p>
          Optional flags include <code>--enable-networkmanager</code>, which
          enables and starts it, and <code>--vulkan-driver PACKAGE</code> for a
          supported Vulkan provider when selecting the recommended group.
          NVIDIA users must choose a compatible driver explicitly. See
          <code>./setup.sh --help</code> for all options.
        </p>
      </section>

      <section className="docSection">
        <h2>3. Install from an interactive terminal</h2>
        <CodeBlock>{`./setup.sh --install --yes`}</CodeBlock>
        <p>
          Setup uses a full <code>pacman -Syu</code> transaction from official
          repositories. Review pacman&apos;s package list, download size, and
          confirmation prompt in the terminal. <code>--yes</code> authorizes
          Nyvorel setup; it does not bypass pacman&apos;s transaction review.
          From SSH, allocate a PTY with <code>ssh -t</code>.
        </p>
        <Callout title="Existing personal configuration" tone="important">
          Setup stops when managed destinations already exist. Review the
          file-install preview, then rerun with <code>--replace-existing</code>
          only when you want backed-up replacement. Use <code>--resume</code>
          after an interrupted user-file setup.
        </Callout>
      </section>

      <section className="docSection">
        <h2>4. Start your first session</h2>
        <p>
          When setup finishes, return to a text console and start Hyprland
          through Nyvorel. The session path activates the user services after
          Wayland is available.
        </p>
        <CodeBlock>{`~/.local/bin/nyvorel session`}</CodeBlock>
        <p>
          A minimal Arch login shell may not include <code>~/.local/bin</code>
          in its PATH, so use the full path on first login. Check readiness
          outside the graphical session with
          <code>~/.local/bin/nyvorel session --check</code> and
          <code>~/.local/bin/nyvorel doctor --no-session</code>. You can add
          <code>~/.local/bin</code> to your shell PATH for convenience later.
          From a running desktop, use
          <code>nyvorel doctor</code>. Setup does not enable a display manager,
          VPN, remote-access service, or AUR helper.
        </p>
      </section>

      <section className="docSection">
        <h2>Installation state</h2>
        <p>
          The file installer records a manifest and original-file backups in
          <code>~/.local/state/nyvorel/installations/</code>. First-run setup
          also creates a recovery snapshot for its generated wallpaper and
          palette. Keep these records until you have verified the desktop.
        </p>
      </section>

      <PageFooter
        previous={{ href: "/docs/getting-started/requirements", title: "Requirements" }}
        next={{ href: "/docs/getting-started/recovery", title: "Recovery" }}
      />
    </article>
  );
}
