import type { Metadata } from "next";

import { Callout } from "@/components/docs/callout";
import { PageFooter } from "@/components/docs/page-footer";

export const metadata: Metadata = {
  title: "Architecture",
  description:
    "How Hyprland, systemd user services, Quickshell, and Nyvorel modules divide ownership.",
  alternates: { canonical: "/docs/concepts/architecture" },
};

const flow = [
  {
    number: "01",
    title: "Hyprland session",
    description: "Provides the Wayland compositor/session boundary.",
  },
  {
    number: "02",
    title: "systemd --user",
    description: "Owns long-running Nyvorel service lifecycle.",
  },
  {
    number: "03",
    title: "nyvorel-quickshell.service",
    description: "Owns the primary Quickshell process.",
  },
  {
    number: "04",
    title: "Quickshell · nyvorel",
    description: "Hosts the desktop shell runtime.",
  },
  {
    number: "05",
    title: "Nyvorel modules",
    description:
      "Expose shell surfaces, workflows, operations, recovery, and launchers.",
  },
] as const;

export default function ArchitecturePage() {
  return (
    <article className="docArticle">
      <header className="docArticleHeader">
        <p className="docEyebrow">Core concepts · 01</p>
        <h1>Architecture</h1>
        <p>
          Nyvorel separates session ownership, process lifecycle, shell runtime,
          and user-facing modules instead of treating the desktop as one giant
          startup script.
        </p>
      </header>

      <section className="docSection">
        <h2>Primary runtime path</h2>

        <div className="docFlow">
          {flow.map((item, index) => (
            <div key={item.number}>
              <div className="docFlowNode">
                <span>{item.number}</span>
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.description}</p>
                </div>
              </div>
              {index < flow.length - 1 ? (
                <div className="docFlowArrow" aria-hidden="true" />
              ) : null}
            </div>
          ))}
        </div>

        <Callout title="Ownership is intentional">
          Hyprland provides the session, systemd owns the long-running user
          process lifecycle, and Quickshell owns the primary desktop experience.
        </Callout>
      </section>

      <section className="docSection">
        <h2>Runtime surfaces</h2>
        <p>
          The Quickshell runtime connects the desktop shell to Nyvorel&apos;s
          higher-level surfaces and workflows, including shell surfaces,
          Operations Center, Backup &amp; Recovery, Arch Remote, and Project
          Launcher.
        </p>
      </section>

      <section className="docSection">
        <h2>Style synchronization</h2>
        <p>
          Nyvorel also uses systemd-managed style/theme synchronization paths.
          Those workflows connect the desktop appearance model to integrations
          such as Kitty, Fish, btop, Dolphin, Fuzzel, and Zed.
        </p>
      </section>

      <section className="docSection">
        <h2>Activation boundary</h2>
        <p>
          Installation and activation are separate operations. Activation
          reloads the systemd user manager, enables the published Nyvorel path
          units and monitor service, imports the active Wayland/Hyprland
          environment, and restarts the static Quickshell service.
        </p>
      </section>

      <PageFooter
        previous={{
          href: "/docs/workflows/project-launcher",
          title: "Project Launcher",
        }}
        next={{ href: "/docs/concepts/portability", title: "Portability" }}
      />
    </article>
  );
}
