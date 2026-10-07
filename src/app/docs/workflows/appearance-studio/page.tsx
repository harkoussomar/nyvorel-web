import type { Metadata } from "next";
import Image from "next/image";

import { Callout } from "@/components/docs/callout";
import { PageFooter } from "@/components/docs/page-footer";

export const metadata: Metadata = {
  title: "Appearance Studio",
  description:
    "Use Nyvorel Appearance Studio to compose themes, wallpapers, interface settings, targets, and saved appearance states.",
  alternates: { canonical: "/docs/workflows/appearance-studio" },
};

const pages = [
  ["Theme", "Choose the appearance source, mode, scheme, preset, and palette direction."],
  ["Wallpaper", "Work with the wallpaper side of the appearance composition."],
  ["Interface", "Tune surfaces, transparency, geometry, motion, and bar/interface behavior."],
  ["Targets", "Control where appearance synchronization is intended to propagate."],
  ["Saved", "Work with saved appearance states and reusable choices."],
] as const;

export default function AppearanceStudioPage() {
  return (
    <article className="docArticle">
      <header className="docArticleHeader">
        <p className="docEyebrow">Using Nyvorel · 02</p>
        <h1>Appearance Studio</h1>
        <p>
          Appearance Studio is Nyvorel&apos;s focused workspace for composing a
          desktop appearance before committing it. Theme, wallpaper, interface
          treatment, synchronization targets, and saved states live in one
          workflow.
        </p>
      </header>

      <figure className="docVisual">
        <Image
          src="/showcase/appearance-studio.webp"
          alt="Nyvorel Appearance Studio"
          width={1600}
          height={898}
          sizes="(max-width: 920px) 96vw, 820px"
        />
        <figcaption>
          Appearance Studio is a dedicated Quickshell surface backed by the
          Nyvorel appearance controller.
        </figcaption>
      </figure>

      <section className="docSection">
        <h2>Five workflow pages</h2>

        <div className="docSurfaceGrid">
          {pages.map(([title, description], index) => (
            <div className="docSurfaceCard" key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="docSection">
        <h2>Theme composition</h2>
        <p>
          The Theme workflow maintains a selected source, mode, scheme and
          preset. It also supports custom palette input, including a primary
          seed and an advanced palette with secondary, tertiary and neutral
          directions.
        </p>
      </section>

      <section className="docSection">
        <h2>Interface tuning</h2>
        <p>
          Interface choices are staged alongside theme and wallpaper choices.
          The source includes controls for interface style, transparency,
          screen rounding, bar geometry, parallax behavior, semantic corner
          radii, and motion preferences.
        </p>

        <Callout title="Motion is part of appearance" tone="safe">
          Reduced motion, motion scale, and expressive-motion preferences are
          represented in the same staged appearance workflow rather than being
          disconnected from the interface profile.
        </Callout>
      </section>

      <section className="docSection">
        <h2>Preview before keeping</h2>
        <p>
          Appearance Studio is built around a draft/preview lifecycle. Visual
          choices are staged locally and participate in the same preview,
          keep/apply, and revert-oriented transaction model.
        </p>

        <div className="docPath">
          quickshell/modules/appearanceStudio/AppearanceStudio.qml
        </div>
      </section>

      <PageFooter
        previous={{ href: "/docs/workflows/settings", title: "Settings" }}
        next={{
          href: "/docs/workflows/shell-surfaces",
          title: "Shell surfaces",
        }}
      />
    </article>
  );
}
