import type { Metadata } from "next";
import { WorkflowGuide, type WorkflowGuideData } from "@/components/docs/workflow-guide";

export const metadata: Metadata = {
  title: "Backup & Recovery — Nyvorel v0.1.0",
  description: "Read protection evidence before trusting a backup.",
  alternates: { canonical: "/docs/workflows/backup-recovery" },
};

const guide: WorkflowGuideData = {
  "order": "05",
  "title": "Backup & Recovery",
  "intro": "The protection dashboard distinguishes a snapshot existing from a restore actually being possible. Use this guide to review stale evidence, identify your backup disk, and decide what to verify next.",
  "outcome": "Understand protection status, find missing evidence, and take a safe next step without implying recovery is guaranteed.",
  "prerequisites": [
    "Restic, Timeshift and disk-health features depend on actual local configuration and installed tools.",
    "Know which drive and repository contain the intended backup before beginning an operation.",
    "Keep an independent recovery path; dashboard status is not a substitute for a tested restore."
  ],
  "orient": [
    [
      "Overview",
      "Protection state, attention and suggested next actions."
    ],
    [
      "Backups",
      "Restic snapshot inventory and repository checks."
    ],
    [
      "Restore",
      "Restore-oriented verification evidence."
    ],
    [
      "History",
      "Recorded work and recent outcomes."
    ],
    [
      "Disk Health",
      "Availability, identity, filesystem and health information."
    ],
    [
      "Recovery",
      "Recovery manifests and readiness checks."
    ]
  ],
  "steps": [
    [
      "Read protection freshness",
      "Open the Overview. Compare the most recent backup, restore point and recovery evidence to your intended schedule.",
      "You can tell which proof is fresh, overdue, unknown or unavailable."
    ],
    [
      "Verify the backup destination",
      "Inspect Disk Health and confirm the expected drive identity, mount status and accessibility; do not infer identity from a mount path alone.",
      "The drive is explicitly recognized as the intended backup destination, or a warning explains why it is not trusted."
    ],
    [
      "Review backup evidence",
      "On Backups, check whether Restic has recent snapshots and whether repository verification belongs to the current repository identity.",
      "Snapshot existence and repository proof are distinguishable facts."
    ],
    [
      "Review the restore path",
      "On Restore and Recovery, look for current restore-test evidence, recovery manifests and unresolved prerequisites.",
      "You can say what has been tested and what still needs evidence before a real emergency."
    ],
    [
      "Run maintenance only when appropriate",
      "If you decide to start an operation, confirm its target and risks in the UI; allow the operation to finish rather than issuing duplicate maintenance actions.",
      "The status returns to a resolved result or explains what failed. Do not infer success until the operation reports it."
    ]
  ],
  "understand": [
    [
      "Snapshot ≠ recovery",
      "A snapshot existing does not establish that it can be decrypted, read and restored to a working machine."
    ],
    [
      "Stale proof deserves attention",
      "Repository checks and restore tests become less informative as configurations and backup identities change."
    ],
    [
      "Different tools protect different things",
      "Restic archives, Timeshift restore points and disk health signals are separate layers of protection."
    ]
  ],
  "issues": [
    [
      "Backup drive is offline",
      "Reconnect the intended drive and recheck identity before attempting mounting or repository operations."
    ],
    [
      "Proof belongs to a different identity",
      "Stop and check the configured repository or drive; do not treat earlier proof as proof for the new target."
    ],
    [
      "Restore point is overdue",
      "Review the Timeshift schedule and available disk space before starting a new snapshot."
    ],
    [
      "An action appears stuck",
      "Wait for an explicit completion/failure state, then inspect History or diagnostic output; avoid repeated clicks."
    ]
  ],
  "source": [
    "quickshell/modules/nyvorel/backupRecovery/BackupRecoveryContent.qml",
    "quickshell/scripts/backup-recovery/control_center.py"
  ],
  "image": {
    "src": "/showcase/docs/backup-recovery-protection-overview.png",
    "alt": "Backup and Recovery protection status overview",
    "width": 1160,
    "height": 740
  },
  "previous": {
    "title": "Operations Center",
    "href": "/docs/workflows/operations-center"
  },
  "next": {
    "title": "Arch Remote",
    "href": "/docs/workflows/arch-remote"
  }
};

export default function Page() {
  return <WorkflowGuide guide={guide} />;
}
