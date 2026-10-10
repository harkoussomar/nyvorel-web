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
      "Hyprland is the Wayland compositor. The published v0.1.0 tree starts Nyvorel from its .conf session config; the current development tree uses hyprland.lua and the nyvorel session launcher."
    ],
    [
      "Configuration version boundary",
      "The development branch uses Hyprland's native Lua API and was verified on 0.56.2. The immutable v0.1.0 release still uses .conf, and Hyprland 0.57 is not yet claimed as supported. Keep commands and files within the matching source version."
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
      "For v0.1.0, the installed Hyprland exec-once imports the live display/session variables and starts the Quickshell user service. In the development tree, nyvorel session starts Hyprland with hyprland.lua when available, then its Lua entry activates Nyvorel's user services."
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
      "Hyprland v0.1.0",
      "Compositor/session and initial service start",
      "hypr/hyprland/execs.conf"
    ],
    [
      "Hyprland development",
      "Native Lua entry and explicit session launcher",
      "hypr/hyprland.lua; bin/nyvorel-session"
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
    "The v0.1.0 install does not bootstrap a complete Arch Linux desktop; use the Requirements and Install guides for the supported environment.",
    "The development setup.sh path targets minimal Arch, but it is not part of the immutable v0.1.0 release."
  ],
  "refs": [
    "hypr/hyprland/execs.conf",
    "hypr/hyprland.lua",
    "bin/nyvorel-session",
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
