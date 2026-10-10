import type { Metadata, Viewport } from "next";
import Image from "next/image";
import Link from "next/link";

import { project } from "@/lib/project";
import { AppearanceShowcase } from "@/components/landing/appearance-showcase";
import { DesktopExplorer } from "@/components/landing/desktop-explorer";
import { SiteHeader } from "@/components/landing/site-header";
import "./landing.css";

export const viewport: Viewport = { themeColor: "#f2efe8", colorScheme: "light" };

export const metadata: Metadata = {
  title: "Nyvorel — The Living Desktop",
  description:
    "Discover Nyvorel: a considered, personal Hyprland desktop shell built with Quickshell for Arch Linux. Explore authentic shell interfaces, appearance, and desktop workflows.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Nyvorel — The Living Desktop",
    description: "Discover Nyvorel through authentic desktop views and a crafted, interactive product gallery.",
    images: [{ url: "/showcase/v2/appearance-studio-theme-desktop.png", width: 1918, height: 1078, alt: "Actual Nyvorel desktop showing Appearance Studio" }],
  },
};

export default function Home() {
  return (
    <div className="nv-root">
      <a className="nv-a11y-skip" href="#nv-main">Skip to content</a>
      <div className="grain" aria-hidden="true" />
      <SiteHeader />
      <main id="nv-main">
        <section className="hero container" id="top" aria-labelledby="nv-hero-title">
          <div className="hero-kicker thin"><span className="tiny-symbol" aria-hidden="true">✳</span> The living desktop <span className="muted">/ Nyvorel {project.version}</span></div>
          <div className="hero-grid">
            <div><h1 id="nv-hero-title">Make space<br />for <em>your</em><br />kind of work.</h1></div>
            <div className="hero-right">
              <p>Not another arrangement of windows. <strong>A desktop that feels considered</strong>—from the way it looks to the way everything comes together.</p>
              <div className="hero-actions">
                <a className="button button-dark" href="#explore">Explore the desktop <span className="arrow" aria-hidden="true">↗</span></a>
                <a className="button button-ghost" href="#appearance">Make it yours <span className="arrow" aria-hidden="true">↗</span></a>
              </div>
            </div>
          </div>
          <div className="hero-footnote">
            <div className="stack"><span>BUILT WITH INTENT</span><i /><span>ROOTED IN OPEN SOURCE</span><i /><span>MADE TO BE PERSONAL</span></div>
            <div className="sound">SCROLL TO ENTER THE EXPERIENCE ↓</div>
          </div>
        </section>

        <DesktopExplorer />

        <section className="section container" id="appearance" aria-labelledby="nv-appearance-title">
          <div className="section-heading">
            <div><div className="eyebrow"><span className="hairline" />02 / A little more you</div><h2 className="display-title" id="nv-appearance-title">The way it feels<br /><em>is yours to choose.</em></h2></div>
            <p>Nyvorel&apos;s Appearance Studio brings wallpaper-driven palettes and interface choices together. A desktop can have its own character without giving up control.</p>
          </div>
          <AppearanceShowcase />
        </section>

        <div className="container"><div className="manifesto"><div className="smallside">03 / IN PRACTICE</div><blockquote>Beautiful enough to make you look.<br /><em>Considered enough to make you stay.</em></blockquote></div></div>

        <section className="section container" id="features" aria-labelledby="nv-features-title">
          <div className="section-heading">
            <div><div className="eyebrow"><span className="hairline" />04 / Beyond a beautiful desktop</div><h2 className="display-title" id="nv-features-title">Made for the<br /><em>way you live in it.</em></h2></div>
            <p>Behind the surface: actual settings, appearance controls, and operational workflows that belong to the same environment. No invented interface imagery.</p>
          </div>
          <div className="feature-list">
            <article className="feature">
              <div className="feature-img"><Image className="nv-feature-closeup" src="/showcase/v2/settings-appearance-overview.png" alt="Actual Nyvorel Settings interface showing appearance controls" width={1100} height={750} sizes="(max-width: 700px) 94vw, 48vw" unoptimized /></div>
              <div className="feature-details"><div><h3>A place for the details.</h3><p>Refine how your environment looks and works without leaving the shell.</p><Link className="outline-link" href="/docs/workflows/settings">Explore the settings guide ↗</Link></div><span className="glyph" aria-hidden="true">↗</span></div>
            </article>
            <article className="feature">
              <div className="feature-img"><Image className="nv-feature-closeup" src="/showcase/v2/appearance-studio-theme-editor.png" alt="Actual Nyvorel Appearance Studio theme editing controls" width={1128} height={728} sizes="(max-width: 700px) 94vw, 48vw" unoptimized /></div>
              <div className="feature-details"><div><h3>Make the whole space yours.</h3><p>Choose an appearance source, adjust the tone, and shape your desktop character.</p><Link className="outline-link" href="/docs/workflows/appearance-studio">Explore Appearance Studio ↗</Link></div><span className="glyph" aria-hidden="true">↗</span></div>
            </article>
          </div>
        </section>

        <section className="install" id="get" aria-labelledby="nv-get-title">
          <div className="container">
            <div className="section-heading">
              <div><div className="eyebrow"><span className="hairline" />05 / Start with confidence</div><h2 className="display-title" id="nv-get-title">Your desktop.<br /><em>Your next chapter.</em></h2></div>
              <p>Nyvorel {project.version} targets an existing Arch Linux, Hyprland, and Quickshell environment. Installation starts with understanding the requirements—not skipping them.</p>
            </div>
            <div className="steps">
              <div className="step"><span className="step-num">01 / PREPARE</span><h3>Know your<br />starting point.</h3><p>Confirm the target environment and understand what is required before installation.</p></div>
              <div className="step"><span className="step-num">02 / PREVIEW</span><h3>See before<br />you change.</h3><p>Use the documented dry run to inspect the installation plan before changing any managed files.</p></div>
              <div className="step"><span className="step-num">03 / ACTIVATE</span><h3>Make it<br />your own.</h3><p>Follow the documented installation and explicit activation process, with recovery guidance close at hand.</p></div>
            </div>
            <div className="install-links">
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center" }}>
                <Link className="button" href="/docs/getting-started/requirements">Read the installation guide <span className="arrow" aria-hidden="true">↗</span></Link>
                <a className="other" href={project.release} target="_blank" rel="noopener noreferrer">View {project.version} on GitHub ↗</a>
              </div>
              <div className="install-note">Nyvorel currently installs on a pre-existing supported desktop; this site does not install or configure your machine.</div>
            </div>
          </div>
        </section>
      </main>
      <footer>
        <div className="container footer-row">
          <div><a className="wordmark" href="#top">Nyvorel<span className="logo-star" aria-hidden="true">✳</span></a><p>THE LIVING DESKTOP<br />DESIGNED TO BE YOURS</p></div>
          <div className="footer-links"><a href="#top">Back to top ↑</a><Link href="/docs">Documentation ↗</Link><a href={project.repository} target="_blank" rel="noopener noreferrer">Source ↗</a></div>
        </div>
      </footer>
    </div>
  );
}
