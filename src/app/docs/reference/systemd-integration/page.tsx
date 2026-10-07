import type { Metadata } from "next";

import { Callout } from "@/components/docs/callout";
import { CodeBlock } from "@/components/docs/code-block";
import { PageFooter } from "@/components/docs/page-footer";

export const metadata: Metadata = {
  title: "systemd integration",
  description:
    "How Nyvorel installs and activates user services, path units, runtime monitoring, and Quickshell lifecycle ownership.",
};

const pathUnits = [
  ["btop", "nyvorel-btop-style-sync.path"],
  ["Dolphin", "nyvorel-dolphin-theme-sync.path"],
  ["Fuzzel", "nyvorel-fuzzel-style-sync.path"],
  ["KDE apps", "nyvorel-kde-app-style-sync.path"],
  ["Terminal", "nyvorel-terminal-theme-sync.path"],
  ["Zed", "nyvorel-zed-theme-sync.path"],
  ["Zen + VS Code", "nyvorel-zen-code-style-sync.path"],
] as const;

export default function SystemdIntegrationPage() {
  return (
    <article className="docArticle">
      <header className="docArticleHeader">
        <p className="docEyebrow">Technical reference · 04</p>
        <h1>systemd integration</h1>
        <p>
          Nyvorel uses systemd --user for two different jobs: ownership of
          long-running shell/monitor processes, and event-driven synchronization
          work that should run only when relevant files change.
        </p>
      </header>

      <section className="docSection">
        <h2>Installed unit templates</h2>
        <p>
          Portable unit templates live under <code>systemd/</code>. During
          installation, <code>.service.in</code>, <code>.path.in</code>, and
          drop-in <code>.conf.in</code> files are materialized without the
          <code>.in</code> suffix and installed beneath:
        </p>

        <CodeBlock label="installed path">{`~/.config/systemd/user/`}</CodeBlock>

        <p>
          Any <code>@HOME@</code> tokens are rendered for the selected target
          home before the installed copy is written.
        </p>
      </section>

      <section className="docSection">
        <h2>Activation sequence</h2>
        <p>
          A normal install does not activate services. With{" "}
          <code>./install.sh --yes --activate</code>, the installer performs the
          user-service activation sequence after files have been installed.
        </p>

        <CodeBlock>{`systemctl --user daemon-reload

systemctl --user enable --now \
  <Nyvorel style/theme .path units> \
  nyvorel-operations-monitor.service

systemctl --user import-environment \
  DISPLAY WAYLAND_DISPLAY HYPRLAND_INSTANCE_SIGNATURE \
  XDG_CURRENT_DESKTOP XDG_SESSION_TYPE

systemctl --user restart nyvorel-quickshell.service`}</CodeBlock>

        <Callout title="Quickshell is intentionally different" tone="safe">
          <code>nyvorel-quickshell.service</code> is not enabled at{" "}
          <code>default.target</code>. Hyprland starts it after importing the
          live graphical-session environment.
        </Callout>
      </section>

      <section className="docSection">
        <h2>Activated path units</h2>

        <div className="docSurfaceGrid">
          {pathUnits.map(([title, unit], index) => (
            <div className="docSurfaceCard" key={unit}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p><code>{unit}</code></p>
            </div>
          ))}
        </div>

        <p>
          These path units are enabled at <code>default.target</code>. Their
          corresponding sync services are oneshot jobs, so systemd wakes the
          helper only when a watched input changes.
        </p>
      </section>

      <section className="docSection">
        <h2>Operations monitor</h2>
        <p>
          <code>nyvorel-operations-monitor.service</code> is a long-running user
          service that executes the Operations Center Python backend in monitor
          mode. It restarts on failure, runs with a lower scheduling priority,
          and enables <code>NoNewPrivileges</code>.
        </p>
        <p>
          The base service declares <code>PrivateTmp=true</code>, but the
          published runtime-discovery drop-in overrides that to{" "}
          <code>PrivateTmp=false</code>. The reason is explicit in source:
          Operations Center must correlate <code>/proc/net</code> socket inodes
          with the current user&apos;s <code>/proc/&lt;pid&gt;/fd</code> entries.
        </p>
      </section>

      <section className="docSection">
        <h2>Rate-limit exceptions for rapid theme transitions</h2>
        <p>
          Terminal, Dolphin, and Zed publish drop-ins that set{" "}
          <code>StartLimitIntervalSec=0</code>. Their source explains why:
          palette/interface-style transitions can legitimately change watched
          files several times, and those sync jobs are cheap and idempotent.
        </p>

        <div className="docPath">
          systemd/
          <br />
          install.sh
          <br />
          hypr/hyprland/execs.conf
        </div>
      </section>

      <PageFooter
        previous={{ href: "/docs/reference/module-map", title: "Module map" }}
        next={{
          href: "/docs/reference/theme-synchronization",
          title: "Theme synchronization",
        }}
      />
    </article>
  );
}
