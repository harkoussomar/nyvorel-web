import type { Metadata } from "next";
import { TechnicalReference, type TechnicalGuide } from "@/components/docs/technical-reference";

export const metadata: Metadata = {
  title: "Runtime lifecycle",
  description: "Exact session/startup boundaries and read-only diagnostics for the v0.1.0 Quickshell service.",
  alternates: { canonical: "/docs/reference/lifecycle" },
};

const guide: TechnicalGuide = {
  "title": "Runtime lifecycle",
  "intro": "Use this reference when the desktop does not start, disappears, or restarts. Separate the compositor, systemd unit, Quickshell configuration and individual module states.",
  "kind": "Technical reference",
  "number": "01",
  "concepts": [
    [
      "Hyprland starts, systemd owns",
      "hypr/hyprland/execs.conf imports DISPLAY, WAYLAND_DISPLAY, HYPRLAND_INSTANCE_SIGNATURE, XDG_CURRENT_DESKTOP and XDG_SESSION_TYPE before starting the service."
    ],
    [
      "The process contract",
      "The unit runs /usr/bin/qs -c nyvorel, with Restart=always and RestartSec=1. It is not enabled at default.target."
    ],
    [
      "Runtime activation",
      "shell.qml uses Config.ready before loading the selected panel family. Appearance Studio is lazy-loaded; the cheatsheet is dynamically created by the Nyvorel family."
    ]
  ],
  "steps": [
    [
      "01 · Session initialization",
      "Hyprland exec-once imports its graphical environment into the user manager."
    ],
    [
      "02 · Service start",
      "The session starts nyvorel-quickshell.service."
    ],
    [
      "03 · QML initialization",
      "shell.qml initializes the root and shared services."
    ],
    [
      "04 · Configuration gating",
      "Config.qml loads the persistent JSON adapter and exposes Config.ready."
    ],
    [
      "05 · Family construction",
      "The root loads the selected family (nyvorel or another supported family) and connects its surfaces."
    ]
  ],
  "contracts": [
    [
      "Unit",
      "nyvorel-quickshell.service",
      "User service started by Hyprland"
    ],
    [
      "ExecStart",
      "/usr/bin/qs -c nyvorel",
      "From systemd/nyvorel-quickshell.service.in"
    ],
    [
      "Restart",
      "always; delay 1 s",
      "Repeated failures should be investigated, not simply ignored"
    ],
    [
      "KillMode",
      "control-group",
      "Stop includes unit-owned child processes"
    ],
    [
      "TimeoutStopSec",
      "5",
      "Service stop timeout"
    ],
    [
      "Display environment",
      "Imported at graphical-session start",
      "A service started without Wayland/session variables may fail"
    ]
  ],
  "checks": [
    [
      "Check status",
      "systemctl --user status nyvorel-quickshell.service --no-pager",
      "Read-only; run inside the user account, not with sudo."
    ],
    [
      "Read logs",
      "journalctl --user -u nyvorel-quickshell.service -n 80 --no-pager",
      "Read-only; gives the process failure trail."
    ],
    [
      "Inspect unit",
      "systemctl --user cat nyvorel-quickshell.service",
      "Read-only; shows installed unit and any overrides."
    ],
    [
      "Check active session",
      "printf \"%s\\n\" \"$XDG_SESSION_TYPE\" \"$WAYLAND_DISPLAY\"",
      "Read-only; values depend on the running session."
    ]
  ],
  "cautions": [
    "Do not enable nyvorel-quickshell.service at default.target to fix a missing Hyprland startup; v0.1.0 intentionally starts it from the live session.",
    "If a unit is healthy but a panel fails, continue at Module Map and Configuration rather than restarting blindly."
  ],
  "refs": [
    "hypr/hyprland/execs.conf",
    "systemd/nyvorel-quickshell.service.in",
    "quickshell/shell.qml",
    "quickshell/modules/common/Config.qml"
  ],
  "previous": {
    "href": "/docs/concepts/portability",
    "title": "Portability"
  },
  "next": {
    "href": "/docs/reference/configuration",
    "title": "Configuration model"
  }
};

export default function ReferencePage() {
  return <TechnicalReference guide={guide} />;
}
