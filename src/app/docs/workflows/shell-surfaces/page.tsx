import type { Metadata } from "next";
import Image from "next/image";

import { Callout } from "@/components/docs/callout";
import { PageFooter } from "@/components/docs/page-footer";

export const metadata: Metadata = {
  title: "Shell surfaces",
  description:
    "Understand the Nyvorel bar, sidebars, desktop surfaces, overlays, and runtime modules.",
  alternates: { canonical: "/docs/workflows/shell-surfaces" },
};

const surfaces = [
  ["Bar", "Persistent workspace, application, media, and system-state surface."],
  ["Left sidebar", "Hosts Nyvorel's operational view and runtime-oriented workflows."],
  ["Right sidebar", "Quick controls, connectivity, notifications, and audio/brightness controls."],
  ["Dock", "Optional launcher/task surface when enabled."],
  ["Overview", "Workspace/window overview surface."],
  ["Media controls", "Dedicated media surface alongside bar-level media context."],
  ["Notifications", "Popup notifications and notification-center integration."],
  ["OSD", "On-screen display feedback for transient system changes."],
  ["Session surfaces", "Lock, session, policy, keyboard, selection, and related system UI."],
  ["Workflow surfaces", "Project Launcher, Arch Remote, Backup & Recovery, and other Nyvorel tools."],
] as const;

export default function ShellSurfacesPage() {
  return (
    <article className="docArticle">
      <header className="docArticleHeader">
        <p className="docEyebrow">Using Nyvorel · 03</p>
        <h1>Shell surfaces</h1>
        <p>
          Nyvorel&apos;s desktop experience is assembled from focused
          Quickshell surfaces. The panel family owns which surfaces exist; each
          module owns its own interaction and presentation.
        </p>
      </header>

      <figure className="docVisual">
        <Image
          src="/showcase/hero-desktop.webp"
          alt="Nyvorel desktop shell"
          width={1600}
          height={899}
          sizes="(max-width: 920px) 96vw, 820px"
        />
        <figcaption>
          The desktop is composed from multiple runtime surfaces rather than one
          monolithic window.
        </figcaption>
      </figure>

      <section className="docSection">
        <h2>Surface map</h2>

        <div className="docSurfaceGrid">
          {surfaces.map(([title, description], index) => (
            <div className="docSurfaceCard" key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="docSection">
        <h2>The bar has three stable zones</h2>
        <p>
          The Nyvorel bar source explicitly separates its layout into three
          responsibilities:
        </p>
        <ol>
          <li>
            <strong>Left</strong> — current application and context.
          </li>
          <li>
            <strong>Center</strong> — media and physically anchored workspaces.
          </li>
          <li>
            <strong>Right</strong> — system state.
          </li>
        </ol>
        <p>
          Visibility changes are designed so the center anchor does not drift
          simply because content appears or disappears in another zone.
        </p>
      </section>

      <section className="docSection">
        <h2>Right sidebar</h2>
        <p>
          The right sidebar combines quick-panel controls with deeper dialogs
          for Wi-Fi, Bluetooth, audio input/output, and night light. Its module
          tree also includes notifications, calendar, pomodoro/timer tools,
          todo, volume mixing, quick toggles, and network surfaces.
        </p>

        <Callout title="Configuration remains the source of truth">
          The shell surfaces consume Nyvorel configuration rather than
          maintaining separate configuration copies inside each visual module.
        </Callout>
      </section>

      <section className="docSection">
        <h2>Panel family ownership</h2>
        <p>
          <code>NyvorelFamily.qml</code> wires the runtime together and loads
          surfaces such as Background, Bar or VerticalBar, Dock, Lock, Media
          Controls, Notification Popup, OSD, Overview, Project Launcher, Arch
          Remote, Backup &amp; Recovery, both sidebars, and other system UI.
        </p>

        <div className="docPath">
          quickshell/panelFamilies/NyvorelFamily.qml
        </div>
      </section>

      <PageFooter
        previous={{
          href: "/docs/workflows/appearance-studio",
          title: "Appearance Studio",
        }}
        next={{
          href: "/docs/workflows/operations-center",
          title: "Operations Center",
        }}
      />
    </article>
  );
}
