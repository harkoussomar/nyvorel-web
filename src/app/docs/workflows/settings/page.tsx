import type { Metadata } from "next";
import Image from "next/image";

import { Callout } from "@/components/docs/callout";
import { PageFooter } from "@/components/docs/page-footer";

export const metadata: Metadata = {
  title: "Settings",
  description:
    "Navigate Nyvorel Settings and understand its Quick, General, Bar, Background, Interface, Services, Advanced, and About sections.",
};

const sections = [
  ["Quick", "Fast access to frequently adjusted Nyvorel options."],
  ["General", "General shell behavior and broad environment preferences."],
  ["Bar", "Bar presentation, visibility, utility actions, and related behavior."],
  ["Background", "Wallpaper and desktop-background configuration."],
  ["Interface", "Interface presentation and shell visual behavior."],
  ["Services", "Settings related to services and integrations."],
  ["Advanced", "Lower-level options intended for deliberate configuration."],
  ["About", "Project and environment information."],
] as const;

export default function SettingsPage() {
  return (
    <article className="docArticle">
      <header className="docArticleHeader">
        <p className="docEyebrow">Using Nyvorel · 01</p>
        <h1>Settings</h1>
        <p>
          Nyvorel Settings is a dedicated application window for configuring
          the shell. Its navigation is intentionally divided by responsibility
          instead of exposing one long configuration surface.
        </p>
      </header>

      <figure className="docVisual">
        <Image
          src="/showcase/settings-overview.webp"
          alt="Nyvorel Settings window"
          width={1600}
          height={899}
          sizes="(max-width: 920px) 96vw, 820px"
        />
        <figcaption>
          The Settings window uses a responsive navigation rail and loads each
          settings area as a focused page.
        </figcaption>
      </figure>

      <section className="docSection">
        <h2>Settings areas</h2>

        <div className="docSurfaceGrid">
          {sections.map(([title, description], index) => (
            <div className="docSurfaceCard" key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
          ))}
        </div>

        <Callout title="The source of truth is split by page">
          The window maps these sections to dedicated QML files under{" "}
          <code>quickshell/modules/settings/</code>, keeping each settings area
          separately owned.
        </Callout>
      </section>

      <section className="docSection">
        <h2>Responsive navigation</h2>
        <p>
          The settings navigation can expand on wider windows and collapses to
          a compact rail when space is limited. The window also preserves page
          scroll positions while moving between sections.
        </p>
      </section>

      <section className="docSection">
        <h2>Search navigation</h2>
        <p>
          Nyvorel Settings includes control-rail search behavior that can move
          to the relevant page, reveal matching content, and briefly highlight
          the discovered setting.
        </p>

        <div className="docPath">quickshell/settings.qml</div>
      </section>

      <section className="docSection">
        <h2>Settings vs Appearance Studio</h2>
        <p>
          Use Settings for the broader configuration surface. Use Appearance
          Studio when the task is specifically about composing and previewing
          the desktop&apos;s visual identity.
        </p>
      </section>

      <PageFooter
        previous={{ href: "/docs/getting-started/recovery", title: "Recovery" }}
        next={{
          href: "/docs/workflows/appearance-studio",
          title: "Appearance Studio",
        }}
      />
    </article>
  );
}
