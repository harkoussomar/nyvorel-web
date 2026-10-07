import type { Metadata } from "next";

import { Callout } from "@/components/docs/callout";
import { CodeBlock } from "@/components/docs/code-block";
import { PageFooter } from "@/components/docs/page-footer";

export const metadata: Metadata = {
  title: "Configuration model",
  description:
    "How Nyvorel stores persistent configuration, derives XDG paths, watches changes, and reloads external writes.",
  alternates: { canonical: "/docs/reference/configuration" },
};

const namespaces = [
  ["Appearance", "Interface style, motion, geometry, fonts, transparency, wallpaper theming, and palette behavior."],
  ["Desktop", "Background, bar, dock, sidebars, overlay, overview, lock, and window behavior."],
  ["Interaction", "Launcher, search, region selection, screen capture, OSD, OSK, and interaction preferences."],
  ["System", "Audio, battery, networking, resources, tray, updates, services, and work-safety behavior."],
  ["Content", "Notifications, media, calendar, time, wallpaper selector, cheatsheet, and recognition features."],
  ["Applications", "Commands and integration targets used when Nyvorel launches external applications."],
] as const;

export default function ConfigurationPage() {
  return (
    <article className="docArticle">
      <header className="docArticleHeader">
        <p className="docEyebrow">Technical reference · 02</p>
        <h1>Configuration model</h1>
        <p>
          Nyvorel keeps the persistent user configuration outside the public
          source tree. QML defines typed defaults and consumes a live JSON file
          from the user&apos;s XDG configuration directory.
        </p>
      </header>

      <section className="docSection">
        <h2>Primary configuration path</h2>
        <CodeBlock label="runtime path">{`~/.config/nyvorel/config.json`}</CodeBlock>
        <p>
          <code>Directories.qml</code> derives the configuration root from Qt
          <code>StandardPaths.ConfigLocation</code>, appends{" "}
          <code>nyvorel</code>, and exposes <code>config.json</code> as the
          shell configuration file.
        </p>

        <Callout title="Runtime configuration is not repository source" tone="safe">
          The public <code>runtime-config/README.md</code> explicitly marks{" "}
          <code>~/.config/nyvorel</code> as user/runtime configuration that
          should not be copied from a maintainer machine into the public source
          tree.
        </Callout>
      </section>

      <section className="docSection">
        <h2>Config singleton</h2>
        <p>
          <code>Config.qml</code> exposes the JSON adapter through{" "}
          <code>Config.options</code>. A <code>FileView</code> watches the live
          file, while a typed <code>JsonAdapter</code> supplies the schema and
          default values.
        </p>

        <dl className="docDefinitionGrid">
          <dt><code>Config.options</code></dt>
          <dd>The live typed configuration object consumed by shell modules.</dd>
          <dt><code>Config.ready</code></dt>
          <dd>Becomes true when the configuration file has loaded.</dd>
          <dt>Read/write delay</dt>
          <dd>50 ms debounce for file reloads and adapter writes.</dd>
          <dt>Missing file</dt>
          <dd>The adapter writes the default configuration.</dd>
          <dt>File changes</dt>
          <dd>Watched changes schedule a reload through the same debounce boundary.</dd>
        </dl>
      </section>

      <section className="docSection">
        <h2>Configuration namespaces</h2>

        <div className="docSurfaceGrid">
          {namespaces.map(([title, description], index) => (
            <div className="docSurfaceCard" key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
          ))}
        </div>

        <p>
          The actual adapter contains more granular top-level objects than
          these documentation groups; these categories describe how the schema
          is organized conceptually rather than replacing the source schema.
        </p>
      </section>

      <section className="docSection">
        <h2>Direct QML writes</h2>
        <p>
          Settings and other shell components can update nested values through
          the live adapter. <code>setNestedValue()</code> walks dotted keys and
          converts boolean or numeric string values when conversion is safe.
        </p>
      </section>

      <section className="docSection">
        <h2>External atomic writes</h2>
        <p>
          Appearance Studio commits configuration through a separate controller
          process. Because that controller can atomically replace the file,
          <code>Config.reload()</code> exists to force the QML adapter to consume
          the new file immediately rather than waiting only on ordinary
          in-process adapter updates.
        </p>

        <Callout title="Persistent config and runtime state are different">
          Nyvorel also uses XDG state/cache locations for generated theme data,
          notes, todo state, notifications, thumbnails, temporary media and
          other runtime artifacts. Those should not be confused with the
          persistent shell options in <code>config.json</code>.
        </Callout>
      </section>

      <section className="docSection">
        <h2>Config readiness affects runtime loading</h2>
        <p>
          The root shell waits for <code>Config.ready</code> before loading the
          selected panel family. This makes configuration initialization part
          of the runtime lifecycle rather than an unrelated background event.
        </p>

        <div className="docPath">
          quickshell/modules/common/Directories.qml
          <br />
          quickshell/modules/common/Config.qml
          <br />
          runtime-config/README.md
          <br />
          quickshell/shell.qml
        </div>
      </section>

      <PageFooter
        previous={{
          href: "/docs/reference/lifecycle",
          title: "Runtime lifecycle",
        }}
        next={{ href: "/docs/reference/module-map", title: "Module map" }}
      />
    </article>
  );
}
