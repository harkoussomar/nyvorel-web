import type { Metadata } from "next";
import Link from "next/link";

import { Callout } from "@/components/docs/callout";
import { CodeBlock } from "@/components/docs/code-block";
import { PageFooter } from "@/components/docs/page-footer";

export const metadata: Metadata = {
  title: "First launch — Nyvorel v0.1.0",
  description: "Confirm the shell is running and learn the primary Nyvorel surfaces after installation.",
  alternates: { canonical: "/docs/getting-started/first-launch" },
};

export default function FirstLaunchPage() {
  return (
    <article className="docArticle">
      <header className="docArticleHeader">
        <p className="docEyebrow">Getting started · 03 · Stable v0.1.0</p>
        <h1>Your first five minutes</h1>
        <p>
          After installing and activating Nyvorel, confirm its service is
          healthy, find the shell&apos;s key surfaces, and make one small change
          you can easily reverse.
        </p>
      </header>

      <section className="docSection">
        <h2>1. Check that the shell is active</h2>
        <p>From a terminal in the running Hyprland session:</p>
        <CodeBlock label="Terminal · read-only">{`systemctl --user is-active nyvorel-quickshell.service
systemctl --user --no-pager status nyvorel-quickshell.service`}</CodeBlock>
        <p>
          <strong>Expected:</strong> <code>is-active</code> returns
          <code>active</code>. If it does not, stop here and follow
          <Link href="/docs/troubleshooting"> Troubleshooting</Link> rather
          than reinstalling without evidence.
        </p>
      </section>

      <section className="docSection">
        <h2>2. Identify your shell surfaces</h2>
        <p>
          Find the workspace bar and the visible system-state controls. Nyvorel
          includes sidebars, notifications, quick controls, and other Quickshell
          surfaces. The actual launch gestures and available modules depend
          on your installed configuration and hardware.
        </p>
        <p>
          Follow the <Link href="/docs/workflows/shell-surfaces">Shell surfaces guide</Link>
          for the bar, overview, sidebars, and on-screen displays. Avoid
          assuming a keyboard shortcut from someone else&apos;s dotfiles setup.
        </p>
      </section>

      <section className="docSection">
        <h2>3. Explore appearance without losing your current setup</h2>
        <p>
          Open the installed Settings or Appearance Studio surface using its
          available launcher/navigation controls. Inspect the current wallpaper
          and theme before applying any change. When possible, record your
          original selection so you can restore it later.
        </p>
        <p>
          The <Link href="/docs/workflows/appearance-studio">Appearance Studio guide</Link>
          explains visual modes, wallpaper-derived palettes, and how appearance
          changes interact with the desktop.
        </p>
      </section>

      <section className="docSection">
        <h2>4. Locate help before you need it</h2>
        <p>
          Nyvorel stores installation-state evidence under
          <code> ~/.local/state/nyvorel/installations/</code>. Keep that history
          and your personal backup. Know how to read the
          <Link href="/docs/getting-started/recovery"> Recovery guide</Link>
          before changing or removing managed files.
        </p>
        <Callout title="These are user-facing checks, not a full system certification" tone="safe">
          Working shell controls do not prove optional remote-access, disk
          backup, audio, or graphics integrations are configured. Verify those
          workflows independently before depending on them.
        </Callout>
      </section>

      <PageFooter
        previous={{ href: "/docs/getting-started/install", title: "Install" }}
        next={{ href: "/docs/workflows/shell-surfaces", title: "Shell surfaces" }}
      />
    </article>
  );
}
