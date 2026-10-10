import type { Metadata } from "next";
import { WorkflowGuide, type WorkflowGuideData } from "@/components/docs/workflow-guide";

export const metadata: Metadata = {
  title: "Operations Center — Nyvorel v0.1.0",
  description: "Understand what is running before deciding to stop it.",
  alternates: { canonical: "/docs/workflows/operations-center" },
};

const guide: WorkflowGuideData = {
  "order": "04",
  "title": "Operations Center",
  "intro": "Operations Center brings listening runtimes, grouped jobs, and system attention into one operational view. It is primarily an inspection tool; action availability depends on ownership and capability.",
  "outcome": "Identify a runtime or job, interpret its status, and choose a safe next action.",
  "prerequisites": [
    "The Operations Center surface is available in your current panel family.",
    "Runtime and job observations depend on the permissions and processes of your machine.",
    "Do not stop an unfamiliar process just because a Stop action exists."
  ],
  "orient": [
    [
      "Overview",
      "Current operational summary and attention items."
    ],
    [
      "Runtime",
      "Detected listening applications or services, with bind address and port."
    ],
    [
      "Jobs",
      "Grouped detected build, test, transfer and other active work."
    ],
    [
      "System",
      "Updates, units, memory, load and disk signals."
    ]
  ],
  "steps": [
    [
      "Read the overview",
      "Open Operations Center and scan the attention area before selecting a specific runtime or job.",
      "You can distinguish a detected issue from ordinary background activity."
    ],
    [
      "Inspect a runtime",
      "Open Runtime and select a recognized application or development server. Check its name, listening address, port, memory and scope.",
      "You can tell which process is listening and whether its address is local-only or potentially exposed."
    ],
    [
      "Inspect the job view",
      "Go to Jobs and identify active work by category, process count and resource use.",
      "Related processes may appear as one operation rather than separate jobs."
    ],
    [
      "Choose a non-destructive action first",
      "Use Details, Copy endpoint, Open or an equivalent inspection action when available. Only consider Stop after verifying ownership and the confirmation dialog.",
      "You can inspect the relevant work without unintentionally terminating unrelated processes."
    ],
    [
      "Review system signals",
      "Check the System view for host-level attention such as failed units, pending updates or disk pressure.",
      "A reported warning has enough context to investigate with the appropriate system tool."
    ]
  ],
  "understand": [
    [
      "Running does not mean healthy",
      "CPU and uptime describe activity, not application correctness."
    ],
    [
      "Local is not necessarily harmless",
      "An endpoint bound to 0.0.0.0 or another non-loopback address may be reachable beyond your own machine."
    ],
    [
      "Remote-owned services have boundaries",
      "Services managed by Arch Remote should be handled in that module rather than using generic process-stop actions."
    ]
  ],
  "issues": [
    [
      "A runtime does not appear",
      "It may not be listening, may have ended, or may fall outside the detector’s discovery scope."
    ],
    [
      "The endpoint will not open",
      "Check the reported address, whether the service is still active, and whether the app provides an HTTP endpoint."
    ],
    [
      "An action is disabled",
      "Verify the ownership, permissions and feature capability; do not bypass the UI boundary with arbitrary signals."
    ]
  ],
  "source": [
    "quickshell/modules/nyvorel/sidebarLeft/SidebarLeftContent.qml",
    "quickshell/scripts/operations-center/operations.py"
  ],
  "image": {
    "src": "/showcase/docs/operations-center-left-sidebar-desktop.png",
    "alt": "Nyvorel Operations Center left sidebar on desktop",
    "width": 1918,
    "height": 1078
  },
  "previous": {
    "title": "Shell surfaces",
    "href": "/docs/workflows/shell-surfaces"
  },
  "next": {
    "title": "Backup & Recovery",
    "href": "/docs/workflows/backup-recovery"
  }
};

export default function Page() {
  return <WorkflowGuide guide={guide} />;
}
