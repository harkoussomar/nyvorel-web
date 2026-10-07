import type { Metadata } from "next";

import { Callout } from "@/components/docs/callout";
import { PageFooter } from "@/components/docs/page-footer";

export const metadata: Metadata = {
  title: "Operations Center",
  description:
    "Use Nyvorel Operations Center to inspect runtimes, jobs, attention items, and system health.",
  alternates: { canonical: "/docs/workflows/operations-center" },
};

const tabs = [
  ["Overview", "Summarizes active runtimes, operations, attention items, maintenance, and updates."],
  ["Runtime", "Lists listening application/service runtimes with scope, endpoint, resource use, and actions."],
  ["Jobs", "Tracks active operations and bounded recent history for detected work."],
  ["System", "Surfaces updates, failed units, disk, memory, load, and host information."],
] as const;

export default function OperationsCenterPage() {
  return (
    <article className="docArticle">
      <header className="docArticleHeader">
        <p className="docEyebrow">Using Nyvorel · 04</p>
        <h1>Operations Center</h1>
        <p>
          Operations Center turns the left-side operational surface into a
          compact view of what the machine is running, what work is active,
          what needs attention, and what the system is reporting.
        </p>
      </header>

      <section className="docSection">
        <h2>Four operational views</h2>

        <div className="docSurfaceGrid">
          {tabs.map(([title, description], index) => (
            <div className="docSurfaceCard" key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="docSection">
        <h2>Runtime view</h2>
        <p>
          Runtime cards expose a detected runtime&apos;s name, kind, scope,
          bind/port, CPU, memory and uptime. The view supports searching and
          filtering, including local, exposed, and pinned runtime states.
        </p>
        <p>
          Depending on ownership and capability, actions include opening the
          runtime, opening a terminal, pinning it, copying its URL or endpoint,
          opening its files, opening its editor, viewing details, and stopping
          it with confirmation.
        </p>

        <Callout title="Arch Remote owns its own managed services" tone="safe">
          Runtimes marked as managed by Arch Remote are routed back to Arch
          Remote instead of exposing Operations Center stop/file/editor actions.
        </Callout>
      </section>

      <section className="docSection">
        <h2>Jobs and operation history</h2>
        <p>
          The backend groups detected work into operational categories rather
          than treating every child process as an unrelated job. Its
          classification includes build, test, package, media, transfer and
          agent-oriented work when those commands are detected.
        </p>
        <p>
          Active job groups expose process count and resource use. Recent ended
          jobs are retained as bounded history, and active groups can expose a
          confirmation-based stop action when a valid operation root exists.
        </p>
      </section>

      <section className="docSection">
        <h2>System and attention</h2>
        <p>
          System refreshes collect update counts, failed service units, disk
          usage, memory usage, load and hostname. The overview also consumes
          attention items so operational problems can be surfaced without
          forcing the user to inspect each subsystem separately.
        </p>

        <div className="docPath">
          quickshell/modules/nyvorel/sidebarLeft/SidebarLeftContent.qml
          <br />
          quickshell/scripts/operations-center/operations.py
        </div>
      </section>

      <PageFooter
        previous={{
          href: "/docs/workflows/shell-surfaces",
          title: "Shell surfaces",
        }}
        next={{
          href: "/docs/workflows/backup-recovery",
          title: "Backup & Recovery",
        }}
      />
    </article>
  );
}
