import type { Metadata } from "next";
import { TechnicalReference, type TechnicalGuide } from "@/components/docs/technical-reference";

export const metadata: Metadata = {
  title: "systemd integration",
  description: "Installed Nyvorel user units, activation semantics and read-only service diagnostics.",
  alternates: { canonical: "/docs/reference/systemd-integration" },
};

const guide: TechnicalGuide = {
  "title": "systemd integration",
  "intro": "Nyvorel uses systemd --user for a supervised shell and selected integrations. The presence of a unit on disk is different from enablement, activity, and feature readiness.",
  "kind": "Technical reference",
  "number": "04",
  "concepts": [
    [
      "Source-to-installed templates",
      "Unit templates under systemd/ are materialized into ~/.config/systemd/user/; optional @HOME@ placeholders become target-user paths."
    ],
    [
      "The shell unit differs",
      "nyvorel-quickshell.service is started by Hyprland exec-once after session-environment import. It is not enabled at default.target."
    ],
    [
      "Watchers drive synchronization",
      "Style .path units monitor configuration or generated colors and trigger corresponding .service units when their watched inputs change."
    ],
    [
      "Operational monitor",
      "nyvorel-operations-monitor.service runs the Operations Center backend in monitor mode and uses a restart-on-failure policy."
    ]
  ],
  "steps": [
    [
      "Install unit templates",
      "The installer places materialized units in the user manager’s configuration area; it does not automatically activate them unless activation is requested."
    ],
    [
      "Activate in a live session",
      "The versioned installer activation imports the session variables, enables selected watchers and the monitor, and restarts the shell service."
    ],
    [
      "Inspect state separately",
      "Check enabled vs active vs failing units; not every synchronizer is a continuously running service."
    ],
    [
      "Investigate one failing unit",
      "Read its unit file and journal before modifying service state."
    ]
  ],
  "contracts": [
    [
      "nyvorel-quickshell.service",
      "long-running shell",
      "/usr/bin/qs -c nyvorel"
    ],
    [
      "nyvorel-operations-monitor.service",
      "long-running monitor",
      "Operations Center backend monitor mode"
    ],
    [
      "nyvorel-terminal-theme-sync.path",
      "path watcher",
      "colors.json and config.json"
    ],
    [
      "nyvorel-dolphin-theme-sync.path",
      "path watcher",
      "Palette/interface style"
    ],
    [
      "nyvorel-zed-theme-sync.path",
      "path watcher",
      "Zed appearance updates"
    ],
    [
      "nyvorel-btop-style-sync.path",
      "path watcher",
      "btop output generation"
    ],
    [
      "nyvorel-fuzzel-style-sync.path",
      "path watcher",
      "Fuzzel style"
    ],
    [
      "nyvorel-kde-app-style-sync.path",
      "path watcher",
      "KDE palette and kdeglobals"
    ],
    [
      "nyvorel-zen-code-style-sync.path",
      "path watcher",
      "Zen/VS Code style"
    ]
  ],
  "checks": [
    [
      "Inspect unit files",
      "systemctl --user cat nyvorel-quickshell.service",
      "Read-only; includes locally installed overrides."
    ],
    [
      "Check status",
      "systemctl --user status nyvorel-operations-monitor.service --no-pager",
      "Read-only; service may intentionally be inactive when not activated."
    ],
    [
      "List Nyvorel units",
      "systemctl --user list-units \"nyvorel-*\" --all --no-pager",
      "Read-only; shows loaded active/inactive units."
    ],
    [
      "Read recent logs",
      "journalctl --user -u nyvorel-operations-monitor.service -n 60 --no-pager",
      "Read-only; output may contain local system details."
    ]
  ],
  "cautions": [
    "Do not enable the Quickshell service under default.target as an ad-hoc repair; the graphical environment import is part of the supported startup contract.",
    "Do not treat an inactive oneshot synchronization service as a failure without checking its corresponding .path watcher and last execution."
  ],
  "refs": [
    "systemd/nyvorel-quickshell.service.in",
    "systemd/nyvorel-operations-monitor.service.in",
    "systemd/nyvorel-terminal-theme-sync.path.in",
    "hypr/hyprland/execs.conf"
  ],
  "previous": {
    "href": "/docs/reference/module-map",
    "title": "Module map"
  },
  "next": {
    "href": "/docs/reference/theme-synchronization",
    "title": "Theme synchronization"
  }
};

export default function ReferencePage() {
  return <TechnicalReference guide={guide} />;
}
