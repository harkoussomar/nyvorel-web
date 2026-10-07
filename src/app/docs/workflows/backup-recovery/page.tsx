import type { Metadata } from "next";
import Image from "next/image";

import { Callout } from "@/components/docs/callout";
import { PageFooter } from "@/components/docs/page-footer";

export const metadata: Metadata = {
  title: "Backup & Recovery",
  description:
    "Understand Nyvorel protection state, Restic backups, Timeshift restore points, disk health, and recovery readiness.",
  alternates: { canonical: "/docs/workflows/backup-recovery" },
};

const areas = [
  ["Overview", "The combined protection state and current operation."],
  ["Backups", "Restic backup inventory, freshness, checks, and backup actions."],
  ["Restore", "Restore-oriented evidence and verification state."],
  ["History", "Backup/configuration history and recorded evidence."],
  ["Disk Health", "Backup-disk identity, availability, capacity, and SMART evidence."],
  ["Recovery", "Recovery manifests, readiness checks, documentation, and resilience evidence."],
] as const;

export default function BackupRecoveryPage() {
  return (
    <article className="docArticle">
      <header className="docArticleHeader">
        <p className="docEyebrow">Using Nyvorel · 05</p>
        <h1>Backup &amp; Recovery</h1>
        <p>
          Backup &amp; Recovery is Nyvorel&apos;s protection dashboard. It
          combines backup inventory, restore evidence, disk health, and recovery
          readiness instead of reducing protection to a single “backup passed”
          indicator.
        </p>
      </header>

      <figure className="docVisual">
        <Image
          src="/showcase/backup-recovery.webp"
          alt="Nyvorel Backup and Recovery"
          width={1600}
          height={897}
          sizes="(max-width: 920px) 96vw, 820px"
        />
        <figcaption>
          The surface distinguishes current protection state from individual
          backup, disk, verification, and recovery signals.
        </figcaption>
      </figure>

      <section className="docSection">
        <h2>Six protection views</h2>

        <div className="docSurfaceGrid">
          {areas.map(([title, description], index) => (
            <div className="docSurfaceCard" key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="docSection">
        <h2>Evidence Nyvorel tracks</h2>
        <dl className="docDefinitionGrid">
          <dt>Backup disk</dt>
          <dd>
            Connection, mount state, filesystem accessibility, identity
            verification, free space, model and transport.
          </dd>
          <dt>Restic</dt>
          <dd>
            Configuration/availability, snapshot inventory, freshness,
            repository checks, restore-test evidence, and timer state.
          </dd>
          <dt>Timeshift</dt>
          <dd>
            Snapshot inventory, latest restore point, mode, freshness and
            configured schedule.
          </dd>
          <dt>SMART</dt>
          <dd>
            Device health, condition, temperature, selected attributes and test
            evidence when available.
          </dd>
          <dt>Recovery</dt>
          <dd>
            Core readiness checks, manifests, restore documentation and
            resilience evidence.
          </dd>
        </dl>
      </section>

      <section className="docSection">
        <h2>Actions are serialized</h2>
        <p>
          The UI treats protection actions as a global operation. While one
          operation is running, the surface tracks its phase, elapsed time,
          progress and message instead of launching overlapping maintenance.
        </p>
        <p>
          Supported action labels in the current surface include Backup,
          Restore point, Repository check, Restore verification, SMART short
          test, SMART extended test, Mount, Safe unmount, Recovery refresh and
          Repository maintenance.
        </p>

        <Callout title="Mount identity matters" tone="important">
          A mounted disk is not treated as trusted merely because a path is
          mounted. The state model separately records whether the mounted
          filesystem identity has been verified and whether the filesystem is
          accessible.
        </Callout>
      </section>

      <section className="docSection">
        <h2>Fast state vs full refresh</h2>
        <p>
          The surface supports instant, normal, and explicit full-refresh
          snapshots. This lets the UI show last-known/current state quickly
          while reserving heavier verification work for the appropriate
          refresh path.
        </p>

        <div className="docPath">
          quickshell/modules/nyvorel/backupRecovery/BackupRecoveryContent.qml
          <br />
          quickshell/scripts/backup-recovery/control_center.py
        </div>
      </section>

      <PageFooter
        previous={{
          href: "/docs/workflows/operations-center",
          title: "Operations Center",
        }}
        next={{
          href: "/docs/workflows/arch-remote",
          title: "Arch Remote",
        }}
      />
    </article>
  );
}
