import type { Metadata } from "next";
import { TechnicalReference, type TechnicalGuide } from "@/components/docs/technical-reference";

export const metadata: Metadata = {
  title: "Architecture",
  description: "How Nyvorel separates session ownership, service lifecycle, configuration and feature surfaces.",
  alternates: { canonical: "/docs/concepts/architecture" },
};

const guide: TechnicalGuide = {
  "title": "Architecture",
  "intro": "Follow the path from a graphical login to an interactive shell. The most useful mental model is to identify which layer owns a failure before changing anything.",
  "kind": "Core concepts",
  "number": "01",
  "concepts": [
    [
      "Session boundary",
      "Hyprland is the Wayland compositor and reaches Nyvorel startup through its session configuration. It does not own the long-running Quickshell process after it delegates startup."
    ],
    [
      "Process boundary",
      "The systemd user manager starts and supervises nyvorel-quickshell.service. That service executes /usr/bin/qs -c nyvorel and restarts after unexpected termination."
    ],
    [
      "Runtime boundary",
      "quickshell/shell.qml initializes shared services, waits for Config.ready, and loads the configured panel family. The panel family composes the features visible on the desktop."
    ],
    [
      "Feature boundary",
      "Settings, Appearance Studio, shell surfaces, Operations Center, Arch Remote, Backup & Recovery and Project Launcher own their specific interfaces and backend interactions."
    ]
  ],
  "steps": [
    [
      "Enter a Hyprland session",
      "The published Hyprland exec-once imports the live display/session variables and starts the Quickshell user service."
    ],
    [
      "Start the shell process",
      "systemd runs the Quickshell configuration named nyvorel. The service is intentionally not enabled at default.target."
    ],
    [
      "Load shared state",
      "The shell root initializes services and delays selected family construction until configuration is ready."
    ],
    [
      "Compose the active desktop",
      "NyvorelFamily.qml wires background, bar or vertical bar, sidebars, overlays, session UI and feature modules together."
    ]
  ],
  "contracts": [
    [
      "Hyprland",
      "Compositor/session and initial service start",
      "hypr/hyprland/execs.conf"
    ],
    [
      "systemd --user",
      "Process restart, status and logs",
      "systemd/nyvorel-quickshell.service.in"
    ],
    [
      "Quickshell root",
      "Configuration readiness and runtime initialization",
      "quickshell/shell.qml"
    ],
    [
      "Panel family",
      "Composition and selective enabling of visual surfaces",
      "quickshell/panelFamilies/NyvorelFamily.qml"
    ],
    [
      "Module/helper",
      "UI, specific workflows and backend-specific actions",
      "quickshell/modules/nyvorel/"
    ]
  ],
  "checks": [
    [
      "Inspect process health",
      "systemctl --user status nyvorel-quickshell.service --no-pager",
      "Read-only. Confirms service state but not that every UI module is usable."
    ],
    [
      "Inspect recent failures",
      "journalctl --user -u nyvorel-quickshell.service -n 60 --no-pager",
      "Read-only. Review logs locally before sharing; environment paths can appear."
    ]
  ],
  "cautions": [
    "Do not treat a healthy service as proof that every feature works. A service can be active while one optional integration is unavailable.",
    "The v0.1.0 install does not bootstrap a complete Arch Linux desktop; use the Requirements and Install guides for the supported environment."
  ],
  "refs": [
    "hypr/hyprland/execs.conf",
    "systemd/nyvorel-quickshell.service.in",
    "quickshell/shell.qml",
    "quickshell/panelFamilies/NyvorelFamily.qml"
  ],
  "previous": {
    "href": "/docs/workflows/project-launcher",
    "title": "Project Launcher"
  },
  "next": {
    "href": "/docs/concepts/portability",
    "title": "Portability"
  }
};

export default function ReferencePage() {
  return <TechnicalReference guide={guide} />;
}
