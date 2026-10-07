import type { Metadata } from "next";

import { Callout } from "@/components/docs/callout";
import { CodeBlock } from "@/components/docs/code-block";
import { PageFooter } from "@/components/docs/page-footer";

export const metadata: Metadata = {
  title: "Runtime lifecycle",
  description:
    "How Hyprland starts Nyvorel, systemd owns the process, and Quickshell builds the runtime.",
};

const startup = [
  ["01", "Hyprland session", "The compositor reaches its exec-once startup path."],
  ["02", "Import session environment", "Wayland/Hyprland session variables are imported into the user systemd manager."],
  ["03", "Start user service", "Hyprland starts nyvorel-quickshell.service."],
  ["04", "Launch Quickshell", "systemd executes /usr/bin/qs -c nyvorel."],
  ["05", "Initialize shell root", "shell.qml initializes shared services and waits for configuration readiness."],
  ["06", "Load selected panel family", "The configured family is loaded and its surfaces become part of the shell runtime."],
] as const;

export default function LifecyclePage() {
  return (
    <article className="docArticle">
      <header className="docArticleHeader">
        <p className="docEyebrow">Technical reference · 01</p>
        <h1>Runtime lifecycle</h1>
        <p>
          Nyvorel deliberately separates session startup from long-running
          process ownership. Hyprland decides when the desktop session exists;
          systemd --user owns the Quickshell process after that point.
        </p>
      </header>

      <section className="docSection">
        <h2>Startup path</h2>

        <div className="docFlow">
          {startup.map(([number, title, description], index) => (
            <div key={number}>
              <div className="docFlowNode">
                <span>{number}</span>
                <div>
                  <strong>{title}</strong>
                  <p>{description}</p>
                </div>
              </div>
              {index < startup.length - 1 ? (
                <div className="docFlowArrow" aria-hidden="true" />
              ) : null}
            </div>
          ))}
        </div>

        <CodeBlock label="Hyprland exec-once">{`systemctl --user import-environment \\
  DISPLAY WAYLAND_DISPLAY HYPRLAND_INSTANCE_SIGNATURE \\
  XDG_CURRENT_DESKTOP XDG_SESSION_TYPE

systemctl --user start nyvorel-quickshell.service`}</CodeBlock>
      </section>

      <section className="docSection">
        <h2>systemd owns the long-running process</h2>
        <dl className="docDefinitionGrid">
          <dt>Type</dt>
          <dd><code>simple</code></dd>
          <dt>ExecStart</dt>
          <dd><code>/usr/bin/qs -c nyvorel</code></dd>
          <dt>Restart</dt>
          <dd><code>always</code>, with a one-second restart delay.</dd>
          <dt>Kill mode</dt>
          <dd><code>control-group</code>, so the service boundary owns its process group.</dd>
          <dt>Stop timeout</dt>
          <dd>Five seconds.</dd>
          <dt>Enablement</dt>
          <dd>
            The service is intentionally not enabled at <code>default.target</code>.
            Hyprland starts it after importing the live graphical-session environment.
          </dd>
        </dl>

        <Callout title="Why this boundary exists" tone="safe">
          The service should receive the active Wayland/Hyprland environment
          from the real session instead of being started independently before
          that environment exists.
        </Callout>
      </section>

      <section className="docSection">
        <h2>Quickshell root initialization</h2>
        <p>
          <code>shell.qml</code> is the root runtime. On completion it reapplies
          the material theme and initializes shared services such as Hyprsunset,
          First Run Experience, Conflict Killer, clipboard history, Wallpapers,
          and Updates.
        </p>
        <p>
          The selected panel family is not loaded until <code>Config.ready</code>.
          This prevents the main surface tree from resolving against an
          uninitialized configuration adapter.
        </p>
      </section>

      <section className="docSection">
        <h2>Lazy and dynamic surfaces</h2>
        <p>
          Not every feature must be permanently instantiated. Appearance Studio
          is loaded with a <code>LazyLoader</code> and retained briefly during
          its close animation. The Nyvorel panel family also creates the
          cheatsheet dynamically when its exclusive surface becomes active.
        </p>
      </section>

      <section className="docSection">
        <h2>Exclusive-surface ownership</h2>
        <p>
          <code>GlobalStates.qml</code> is the single ownership point for major
          mutually exclusive shell surfaces such as Appearance Studio, Arch
          Remote, Backup &amp; Recovery, Project Launcher, Cheatsheet, Overview,
          and Session.
        </p>

        <Callout title="Two intentional exceptions">
          Settings is a native <code>ApplicationWindow</code>, so it is not part
          of the exclusive-surface manager. Polkit is a system-blocking surface
          and is also excluded from that arbitration.
        </Callout>

        <p>
          The same manager tracks capture rectangles for shell-owned modal
          surfaces so Region Selector can treat them like window-shaped targets.
        </p>
      </section>

      <section className="docSection">
        <h2>Manual reload path</h2>
        <p>
          Nyvorel&apos;s Hyprland shortcut for a shell reload imports the live
          session environment again, reloads Hyprland, then restarts the
          Quickshell user service.
        </p>
        <CodeBlock>{`systemctl --user import-environment \\
  DISPLAY WAYLAND_DISPLAY HYPRLAND_INSTANCE_SIGNATURE \\
  XDG_CURRENT_DESKTOP XDG_SESSION_TYPE

hyprctl reload
systemctl --user restart nyvorel-quickshell.service`}</CodeBlock>

        <div className="docPath">
          hypr/hyprland/execs.conf
          <br />
          systemd/nyvorel-quickshell.service.in
          <br />
          quickshell/shell.qml
          <br />
          quickshell/GlobalStates.qml
        </div>
      </section>

      <PageFooter
        previous={{ href: "/docs/concepts/portability", title: "Portability" }}
        next={{
          href: "/docs/reference/configuration",
          title: "Configuration model",
        }}
      />
    </article>
  );
}
