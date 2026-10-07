import type { Metadata } from "next";

import { Callout } from "@/components/docs/callout";
import { CodeBlock } from "@/components/docs/code-block";
import { PageFooter } from "@/components/docs/page-footer";

export const metadata: Metadata = {
  title: "Module map",
  description:
    "A source-level map of Nyvorel's Quickshell root, common layer, services, panel family, modules, settings, and helper backends.",
  alternates: { canonical: "/docs/reference/module-map" },
};

const layers = [
  ["Root", "shell.qml", "Creates the ShellRoot, initializes shared services, owns panel-family selection, and lazy-loads Appearance Studio."],
  ["Global state", "GlobalStates.qml", "Coordinates cross-surface state, exclusive surfaces, and capture-region ownership."],
  ["Common", "modules/common/", "Shared configuration, directories, appearance tokens, persistence, models, functions, panels, and reusable widgets."],
  ["Services", "services/", "State/integration singletons for audio, battery, brightness, network, notifications, wallpapers, updates, Hyprland data, and more."],
  ["Panel family", "panelFamilies/NyvorelFamily.qml", "Composes the Nyvorel shell surfaces into the active runtime family."],
  ["Nyvorel modules", "modules/nyvorel/", "Feature-owned visual surfaces such as bar, sidebars, dock, overview, remote, recovery, project launcher, OSD, and session UI."],
  ["Settings", "settings.qml + modules/settings/", "Standalone settings application and its page-level configuration modules."],
  ["Backends", "scripts/ + feature Python helpers", "Performs heavier system inspection, mutation, generation, and integration work outside declarative QML."],
] as const;

const moduleGroups = [
  ["Desktop structure", "background, bar, verticalBar, dock, sidebarLeft, sidebarRight, screenCorners"],
  ["Navigation & overview", "overview, projectLauncher, cheatsheet, settingsControlRail"],
  ["Operational tools", "archRemote, backupRecovery"],
  ["Transient feedback", "notificationPopup, onScreenDisplay, mediaControls"],
  ["Input & capture", "onScreenKeyboard, regionSelector"],
  ["Session & policy", "lock, sessionScreen, polkit"],
  ["Workspace overlays", "overlay"],
] as const;

export default function ModuleMapPage() {
  return (
    <article className="docArticle">
      <header className="docArticleHeader">
        <p className="docEyebrow">Technical reference · 03</p>
        <h1>Quickshell module map</h1>
        <p>
          Nyvorel&apos;s shell source is divided by ownership. The root wires
          runtime-wide services together, common modules provide shared
          primitives, the panel family chooses surfaces, and feature modules own
          their own UI and helper contracts.
        </p>
      </header>

      <section className="docSection">
        <h2>Source layers</h2>

        <div className="docSurfaceGrid">
          {layers.map(([title, path, description], index) => (
            <div className="docSurfaceCard" key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>
                <code>{path}</code>
                <br />
                {description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="docSection">
        <h2>Root import boundary</h2>
        <p>
          The root QML imports four project layers directly:
        </p>
        <CodeBlock label="shell.qml">{`modules/common
modules/appearanceStudio
services
panelFamilies`}</CodeBlock>
        <p>
          The selected panel-family loader then chooses the runtime family only
          after configuration is ready.
        </p>
      </section>

      <section className="docSection">
        <h2>Nyvorel family composition</h2>
        <p>
          <code>NyvorelFamily.qml</code> composes the main feature surfaces.
          The normal bar and vertical bar are mutually selected from the bar
          configuration, while the dock is conditional on its enable flag.
          Other major shell surfaces are registered through their own
          <code>PanelLoader</code> instances.
        </p>

        <dl className="docDefinitionGrid">
          {moduleGroups.map(([title, modules]) => (
            <div key={title} style={{ display: "contents" }}>
              <dt>{title}</dt>
              <dd><code>{modules}</code></dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="docSection">
        <h2>Common layer</h2>
        <p>
          <code>modules/common/</code> is where cross-feature contracts live:
          <code>Config</code>, <code>Directories</code>, <code>Appearance</code>,
          persistence helpers, shared models, utility functions, and reusable
          widgets such as navigation, material controls, motion primitives,
          dialogs, graphs, text inputs, and Prism surfaces.
        </p>

        <Callout title="Feature modules should consume shared semantics" tone="safe">
          Shared configuration, paths, appearance tokens and interaction
          primitives belong in the common layer instead of being reimplemented
          separately inside each surface.
        </Callout>
      </section>

      <section className="docSection">
        <h2>Service layer</h2>
        <p>
          <code>quickshell/services/</code> contains shared state and integration
          singletons. Examples include Audio, Battery, Bluetooth, Brightness,
          Cliphist, Hyprland data/keybinds, Network, Notifications, Resource
          Usage, System Info, Updates, Wallpapers and Weather.
        </p>
        <p>
          These services sit between declarative shell surfaces and external
          system state so a visual module does not need to rediscover the same
          system information independently.
        </p>
      </section>

      <section className="docSection">
        <h2>QML vs helper backend</h2>
        <p>
          UI ownership stays in QML, while heavier inspection and mutation can
          be delegated to scripts. Operations Center, Backup &amp; Recovery,
          Arch Remote, Appearance Studio and Project Launcher all have dedicated
          helper code for work that is better handled outside the declarative
          rendering layer.
        </p>

        <div className="docPath">
          quickshell/shell.qml
          <br />
          quickshell/GlobalStates.qml
          <br />
          quickshell/modules/common/
          <br />
          quickshell/services/
          <br />
          quickshell/panelFamilies/NyvorelFamily.qml
          <br />
          quickshell/modules/nyvorel/
        </div>
      </section>

      <PageFooter
        previous={{
          href: "/docs/reference/configuration",
          title: "Configuration model",
        }}
        next={{
          href: "/docs/reference/systemd-integration",
          title: "systemd integration",
        }}
      />
    </article>
  );
}
