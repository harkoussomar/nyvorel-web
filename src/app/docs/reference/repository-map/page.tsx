import type { Metadata } from "next";

import { Callout } from "@/components/docs/callout";
import { PageFooter } from "@/components/docs/page-footer";

export const metadata: Metadata = {
  title: "Repository map",
  description:
    "Map Nyvorel's public source roots to their responsibilities and installed destinations.",
  alternates: { canonical: "/docs/reference/repository-map" },
};

const roots = [
  ["setup.sh", "Development-branch minimal-Arch package plan and user-file setup."],
  ["quickshell/", "Shell source: QML surfaces, services, assets, scripts, defaults, and panel families."],
  ["hypr/", "Hyprland configuration, rules, keybinds, scripts, monitors/workspaces, and session integration."],
  ["bin/", "Nyvorel command-line helpers and synchronization tools installed into the user PATH."],
  ["integrations/", "Application integration files shipped for Fish and Kitty."],
  ["systemd/", "Portable user-unit templates, path units, services, and drop-ins."],
  ["assets/", "Project-owned public assets such as the Nyvorel logo."],
  ["runtime-config/", "Documentation boundary for runtime/user config that is intentionally not vendored from the maintainer machine."],
  ["LICENSES/", "Copied third-party/component license texts required by bundled material."],
] as const;

const destinations = [
  ["quickshell/", "~/.config/quickshell/nyvorel/"],
  ["hypr/", "~/.config/hypr/"],
  ["bin/", "~/.local/bin/"],
  ["integrations/fish/", "~/.config/fish/"],
  ["integrations/kitty/", "~/.config/kitty/"],
  ["systemd/", "~/.config/systemd/user/"],
  ["assets/nyvorel.svg", "~/.local/share/icons/hicolor/scalable/apps/nyvorel.svg"],
] as const;

export default function RepositoryMapPage() {
  return (
    <article className="docArticle">
      <header className="docArticleHeader">
        <p className="docEyebrow">Technical reference · 06</p>
        <h1>Repository map</h1>
        <p>
          Nyvorel&apos;s repository separates portable source from live user
          state. The installer then maps selected source roots into the
          target-user environment while preserving that boundary.
        </p>
      </header>

      <section className="docSection">
        <h2>Top-level source roots</h2>

        <div className="docSurfaceGrid">
          {roots.map(([path, description], index) => (
            <div className="docSurfaceCard" key={path}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3><code>{path}</code></h3>
              <p>{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="docSection">
        <h2>Install mapping</h2>
        <dl className="docDefinitionGrid">
          {destinations.map(([source, destination]) => (
            <div key={source} style={{ display: "contents" }}>
              <dt><code>{source}</code></dt>
              <dd><code>{destination}</code></dd>
            </div>
          ))}
        </dl>

        <p>
          systemd source templates are materialized while copying: the
          <code>.in</code> suffix is removed and any required{" "}
          <code>@HOME@</code> values are rendered for the target user.
        </p>
      </section>

      <section className="docSection">
        <h2>Runtime state is separate</h2>
        <p>
          The installer creates <code>~/.config/nyvorel</code> as a distinct
          runtime/user configuration root. It is not populated by copying a
          maintainer&apos;s live config tree from the repository.
        </p>

        <Callout title="Public-source boundary" tone="safe">
          The repository intentionally excludes live runtime config, maintainer
          backup/history data, machine-local secrets, generated package/file
          inventories, legacy nested Quickshell config copies, and systemd
          enablement symlinks.
        </Callout>
      </section>

      <section className="docSection">
        <h2>Root documentation and governance files</h2>
        <p>
          The repository root also carries the project&apos;s release and
          governance contract: <code>README.md</code>, <code>INSTALL.md</code>,{" "}
          <code>PORTABILITY.md</code>, <code>CONTRIBUTING.md</code>,{" "}
          <code>PROVENANCE.md</code>, <code>INHERITED_ASSETS.md</code>,{" "}
          <code>THIRD_PARTY_NOTICES.md</code>, <code>NOTICE.md</code>,{" "}
          <code>TRADEMARKS.md</code>, <code>LICENSE</code>,{" "}
          <code>CHANGELOG.md</code>, and <code>VERSION</code>.
        </p>
      </section>

      <section className="docSection">
        <h2>Installer and uninstaller are part of the source contract</h2>
        <p>
          <code>setup.sh</code> selects official Arch packages and prepares
          first-run state. <code>install.sh</code> maps the portable repository into a target
          home with backups, manifests, token rendering and optional activation.
          <code>uninstall.sh</code> consumes that recorded installation state to
          restore replaced files, remove Nyvorel-created files, and protect
          post-install user changes.
        </p>

        <div className="docPath">
          setup.sh
          <br />
          install.sh
          <br />
          uninstall.sh
          <br />
          PORTABILITY.md
          <br />
          repository root directories
        </div>
      </section>

      <PageFooter
        previous={{
          href: "/docs/reference/theme-synchronization",
          title: "Theme synchronization",
        }}
        next={{
          href: "/docs/project/contributing",
          title: "Contributing",
        }}
      />
    </article>
  );
}
