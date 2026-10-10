import type { Metadata } from "next";
import { WorkflowGuide, type WorkflowGuideData } from "@/components/docs/workflow-guide";

export const metadata: Metadata = {
  title: "Arch Remote — Nyvorel v0.1.0",
  description: "Verify private access before enabling remote services.",
  alternates: { canonical: "/docs/workflows/arch-remote" },
};

const guide: WorkflowGuideData = {
  "order": "06",
  "title": "Arch Remote",
  "intro": "Arch Remote combines service state, private network evidence, authentication readiness and phone guidance. A service being started is never enough evidence that access is secure.",
  "outcome": "Audit remote-access readiness, identify exposure and decide whether a service should remain disabled.",
  "prerequisites": [
    "Use a trusted network and have local access to the machine before changing a remote service.",
    "If using Tailscale or another private path, establish that private identity separately.",
    "Do not share pairing QR codes, temporary credentials or private connection details publicly."
  ],
  "orient": [
    [
      "Overview / Services",
      "Status and state of SSH, Tailscale, LAN Share and WayVNC."
    ],
    [
      "Security",
      "Effective-policy and authentication checks."
    ],
    [
      "Network",
      "Listener, private exposure and tailnet evidence."
    ],
    [
      "Phone",
      "Supported pairing/connection guidance for another device."
    ],
    [
      "Logs / Power",
      "Service evidence and wake/power readiness."
    ]
  ],
  "steps": [
    [
      "Start with the overview",
      "Open Arch Remote and identify which services are running, configured and marked ready.",
      "You can distinguish Running, Ready, Unverified and Off instead of treating them as synonyms."
    ],
    [
      "Check the security evidence",
      "Inspect the Security view for effective SSH policy and the authentication state of any remote-desktop or file-sharing service.",
      "The policy is supported by verifiable evidence, or the UI flags unknown/missing proof."
    ],
    [
      "Review network exposure",
      "On Network, inspect the actual listeners and private-network identity before considering enablement.",
      "You understand which interface or address a service is using and whether access is intended to be private."
    ],
    [
      "Only enable a needed service",
      "Select a service only after its authentication, listener and private-exposure prerequisites are satisfied. Follow the UI’s confirmation and verify the resulting state.",
      "The service reports a usable ready state with corresponding security/network evidence; otherwise leave it off."
    ],
    [
      "Connect and then shut down safely",
      "If pairing from a phone, follow the Phone guidance, keep temporary credentials private, test access and disable unneeded services when finished.",
      "You can connect only through the intended authorized route, or you have a clear reason not to continue."
    ]
  ],
  "understand": [
    [
      "Started ≠ secure",
      "A running SSH or WayVNC process may still have unsuitable effective policy or authentication."
    ],
    [
      "Private proof matters",
      "Private-network intent needs corroboration from actual listeners and reachability, not just the presence of Tailscale."
    ],
    [
      "Pairing is sensitive",
      "Temporary QR codes and URLs may function as credentials. Do not copy them into screenshots, tickets or public logs."
    ]
  ],
  "issues": [
    [
      "The service is active but not ready",
      "Read Security and Network evidence; common blockers include listener binding, authentication or missing graphical session."
    ],
    [
      "The phone cannot connect",
      "Verify the intended private network and target address on both devices before changing security settings."
    ],
    [
      "Remote desktop lacks a session",
      "Confirm there is a valid graphical Wayland session and that the service is bound to it."
    ],
    [
      "You see public exposure you did not intend",
      "Disable the affected service and inspect its listeners/policy locally before re-enabling."
    ]
  ],
  "source": [
    "quickshell/modules/nyvorel/archRemote/ArchRemoteContent.qml",
    "quickshell/scripts/arch-remote/control_center.py"
  ],
  "image": {
    "src": "/showcase/docs/arch-remote-access-overview.png",
    "alt": "Arch Remote status, access and security overview",
    "width": 1168,
    "height": 748
  },
  "previous": {
    "title": "Backup & Recovery",
    "href": "/docs/workflows/backup-recovery"
  },
  "next": {
    "title": "Project Launcher",
    "href": "/docs/workflows/project-launcher"
  }
};

export default function Page() {
  return <WorkflowGuide guide={guide} />;
}
