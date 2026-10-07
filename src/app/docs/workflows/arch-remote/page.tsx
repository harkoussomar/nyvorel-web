import type { Metadata } from "next";

import { Callout } from "@/components/docs/callout";
import { PageFooter } from "@/components/docs/page-footer";

export const metadata: Metadata = {
  title: "Arch Remote",
  description:
    "Manage Nyvorel remote-access services, evidence, security, network exposure, phone access, logs, and power workflows.",
};

const pages = [
  ["Overview", "Summarizes remote-access health and readiness."],
  ["Services", "Inspects and controls the remote-access service set."],
  ["Security", "Surfaces verification results and security-policy evidence."],
  ["Network", "Shows listeners, exposure, Tailscale state, and private serving state."],
  ["Phone", "Provides phone-oriented connection guidance and private-share pairing state."],
  ["Logs", "Inspects recent service logs and supports export-oriented workflows."],
  ["Power", "Surfaces wake/power-related readiness and machine power behavior."],
] as const;

export default function ArchRemotePage() {
  return (
    <article className="docArticle">
      <header className="docArticleHeader">
        <p className="docEyebrow">Using Nyvorel · 06</p>
        <h1>Arch Remote</h1>
        <p>
          Arch Remote is Nyvorel&apos;s remote-access control surface. It
          brings service readiness, network exposure, security verification,
          phone access and remote-desktop state into one evidence-driven view.
        </p>
      </header>

      <section className="docSection">
        <h2>Seven remote-access views</h2>

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
        <h2>Service model</h2>
        <p>
          The current state model tracks SSH, Tailscale, LAN Share and WayVNC
          as explicit services. For each service, Arch Remote distinguishes
          loaded/running state from actual readiness and health.
        </p>

        <dl className="docDefinitionGrid">
          <dt>SSH</dt>
          <dd>
            Service/listener state plus configured and effective SSH security
            policy, including key-only and root-login evidence.
          </dd>
          <dt>Tailscale</dt>
          <dd>
            Tailnet connectivity and private network identity used by other
            remote workflows.
          </dd>
          <dt>LAN Share</dt>
          <dd>
            Private share readiness, HTTPS serving state and pairing capability.
          </dd>
          <dt>WayVNC</dt>
          <dd>
            Remote-desktop service, transport readiness, authentication
            readiness and graphical-session evidence.
          </dd>
        </dl>
      </section>

      <section className="docSection">
        <h2>Evidence before “ready”</h2>
        <p>
          Arch Remote does not equate “process is running” with “remote access
          is ready.” The state model separately tracks listeners, reachability,
          configured/effective policy, service readiness, authentication,
          graphical-session state and private exposure evidence.
        </p>

        <Callout title="SSH verification uses effective configuration" tone="safe">
          The backend can verify effective SSH policy with <code>sshd -T</code>
          and caches that proof against configuration/executable/service
          generation rather than relying only on parsing a config file.
        </Callout>
      </section>

      <section className="docSection">
        <h2>Private Share pairing</h2>
        <p>
          Pairing is handled as temporary credential-equivalent data. The UI
          keeps the QR state in memory only, tracks expiry and single-use state,
          and clears it when the Arch Remote panel closes.
        </p>
        <p>
          The backend validates that pairing uses HTTPS, the expected private
          Tailscale host and the expected pairing path/credential shape. It
          also redacts pairing credentials from UI/log/export-oriented text.
        </p>
      </section>

      <section className="docSection">
        <h2>Phone, logs and power</h2>
        <p>
          The Phone view collects readiness for Tailscale, SSH, SFTP,
          remote-desktop access and private sharing. Logs can be inspected per
          remote service. The Power view carries wake-related state such as
          interface capability and test status.
        </p>

        <div className="docPath">
          quickshell/modules/nyvorel/archRemote/ArchRemoteContent.qml
          <br />
          quickshell/scripts/arch-remote/control_center.py
        </div>
      </section>

      <PageFooter
        previous={{
          href: "/docs/workflows/backup-recovery",
          title: "Backup & Recovery",
        }}
        next={{
          href: "/docs/workflows/project-launcher",
          title: "Project Launcher",
        }}
      />
    </article>
  );
}
