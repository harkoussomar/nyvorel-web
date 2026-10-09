import type { Metadata } from "next";

import { Callout } from "@/components/docs/callout";
import { PageFooter } from "@/components/docs/page-footer";

export const metadata: Metadata = {
  title: "Requirements",
  description: "What a minimal Arch installation needs before Nyvorel setup.",
  alternates: { canonical: "/docs/getting-started/requirements" },
};

export default function RequirementsPage() {
  return (
    <article className="docArticle">
      <header className="docArticleHeader">
        <p className="docEyebrow">Getting started · 01</p>
        <h1>Requirements</h1>
        <p>
          The development-branch setup starts from an existing minimal Arch
          installation. It installs the desktop packages and Nyvorel user
          files; it does not partition disks or install Arch itself.
        </p>
      </header>

      <section className="docSection">
        <h2>Before setup</h2>
        <dl className="docDefinitionGrid">
          <dt>Distribution</dt><dd>A bootable Arch Linux installation with pacman</dd>
          <dt>Account</dt><dd>Your intended non-root desktop user, with sudo access</dd>
          <dt>Connection</dt><dd>Internet access to official Arch repositories and Python packages</dd>
          <dt>Terminal</dt><dd>An interactive local console or SSH session with a PTY for pacman review</dd>
          <dt>Source</dt><dd>A complete Nyvorel development-branch checkout</dd>
        </dl>
        <p>
          Hyprland, Quickshell, Kitty, Fish, Firefox, Dolphin, audio services,
          fonts, portals, and other core dependencies are selected by
          <code>setup.sh</code>. An existing Hyprland session is not required.
        </p>
      </section>

      <section className="docSection">
        <h2>Hardware and local choices</h2>
        <p>
          Review display, input, GPU, and network choices for your computer.
          The recommended Zed option selects a Vulkan provider for detected
          Intel or AMD graphics; NVIDIA requires an explicit supported choice
          and a suitable kernel driver. NetworkManager is installed but only
          enabled when you request it.
        </p>
        <Callout title="Keep your existing network connection" tone="important">
          Setup leaves network management as it is unless you pass
          <code>--enable-networkmanager</code>. This matters on a remote or
          already networked Arch installation.
        </Callout>
      </section>

      <section className="docSection">
        <h2>Tested compatibility limits</h2>
        <p>
          The clean-machine graphical check used Hyprland 0.56.2. Nyvorel
          currently starts that version with its <code>hyprland.conf</code>;
          Hyprland reports that <code>.conf</code> support will be removed in
          0.57. Verify a newer Hyprland release against the Nyvorel checkout
          before upgrading a working desktop.
        </p>
        <p>
          The QEMU check used software rendering, so its high compositor CPU
          use is not a hardware performance benchmark. Zed in the recommended
          group needs a working Vulkan provider and may not launch with the
          VM&apos;s llvmpipe renderer. GPU recording, display brightness, battery,
          Bluetooth, and audio-device controls also depend on the machine&apos;s
          hardware and installed services.
        </p>
      </section>

      <section className="docSection">
        <h2>Release boundary</h2>
        <p>
          The minimal-Arch setup belongs to the development branch. The
          immutable v0.1.0 release uses the earlier file-only installer for
          an existing Arch, Hyprland, and Quickshell desktop. Check that
          <code>setup.sh</code> exists in your checkout before following this guide.
        </p>
      </section>

      <PageFooter
        previous={{ href: "/docs", title: "Documentation" }}
        next={{ href: "/docs/getting-started/install", title: "Install" }}
      />
    </article>
  );
}
