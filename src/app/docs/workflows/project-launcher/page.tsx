import type { Metadata } from "next";

import { Callout } from "@/components/docs/callout";
import { PageFooter } from "@/components/docs/page-footer";

export const metadata: Metadata = {
  title: "Project Launcher",
  description:
    "Discover Nyvorel project categories, inspect project metadata, and launch editors or terminals.",
};

const previewData = [
  ["Description", "Derived from project metadata or README content when available."],
  ["Git", "Repository state gathered from the selected project."],
  ["Stack", "Detected frameworks, runtimes, package/build signals, and project technologies."],
  ["Tree", "A compact project tree that avoids heavy generated directories."],
  ["Markers", "Recognized project files such as package.json, pyproject.toml, Cargo.toml, go.mod, and related build markers."],
] as const;

export default function ProjectLauncherPage() {
  return (
    <article className="docArticle">
      <header className="docArticleHeader">
        <p className="docEyebrow">Using Nyvorel · 07</p>
        <h1>Project Launcher</h1>
        <p>
          Project Launcher is a keyboard-friendly command center for local
          development projects. It groups projects by category, filters them as
          you type, builds a focused preview, and launches the selected project
          in the available development tool.
        </p>
      </header>

      <section className="docSection">
        <h2>Project discovery boundary</h2>
        <p>
          The current helper discovers category directories immediately beneath{" "}
          <code>~/dev-mine/projects</code>, then discovers projects immediately
          beneath each category. Hidden categories are skipped.
        </p>
        <p>
          A directory counts as a project when it is non-empty; common project
          markers strengthen recognition. Generated/heavy directories such as{" "}
          <code>node_modules</code>, <code>.next</code>, <code>dist</code>,{" "}
          <code>build</code>, <code>coverage</code>, <code>target</code>, and
          virtual environments are excluded from compact inspection.
        </p>

        <Callout title="Preview paths are bounded" tone="safe">
          Preview requests are accepted only for projects that resolve inside
          one of the configured category roots. Arbitrary filesystem paths are
          rejected by the helper.
        </Callout>
      </section>

      <section className="docSection">
        <h2>What the preview collects</h2>

        <div className="docSurfaceGrid">
          {previewData.map(([title, description], index) => (
            <div className="docSurfaceCard" key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="docSection">
        <h2>Search and keyboard flow</h2>
        <dl className="docDefinitionGrid">
          <dt>Type</dt>
          <dd>Filters project name, category/group and displayed path.</dd>
          <dt>↑ / ↓</dt>
          <dd>Moves the current project selection.</dd>
          <dt>Enter</dt>
          <dd>Opens the selected project in VS Code when available.</dd>
          <dt>Ctrl + Enter</dt>
          <dd>Opens a Kitty terminal in the selected project.</dd>
          <dt>Alt + Enter</dt>
          <dd>Opens the selected project in Zed when available.</dd>
          <dt>Ctrl + R</dt>
          <dd>Refreshes project discovery and the current preview.</dd>
          <dt>Escape</dt>
          <dd>Closes Project Launcher.</dd>
        </dl>
      </section>

      <section className="docSection">
        <h2>Tool availability is detected</h2>
        <p>
          The helper reports whether <code>code</code>, <code>kitty</code> and{" "}
          <code>zed</code> are available. The launcher only exposes the
          corresponding launch path when the tool exists.
        </p>

        <div className="docPath">
          quickshell/modules/nyvorel/projectLauncher/ProjectLauncher.qml
          <br />
          quickshell/modules/nyvorel/projectLauncher/nyvorel-projects.py
        </div>
      </section>

      <PageFooter
        previous={{
          href: "/docs/workflows/arch-remote",
          title: "Arch Remote",
        }}
        next={{ href: "/docs/concepts/architecture", title: "Architecture" }}
      />
    </article>
  );
}
