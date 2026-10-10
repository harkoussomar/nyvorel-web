import type { Metadata } from "next";
import { TechnicalReference, type TechnicalGuide } from "@/components/docs/technical-reference";

export const metadata: Metadata = {
  title: "Theme synchronization",
  description: "The data flow from Nyvorel appearance inputs to application-specific generated outputs.",
  alternates: { canonical: "/docs/reference/theme-synchronization" },
};

const guide: TechnicalGuide = {
  "title": "Theme synchronization",
  "intro": "The Quickshell theme and external application themes are related but not identical. Per-application helpers translate Nyvorel’s state into each target application’s own format.",
  "kind": "Technical reference",
  "number": "05",
  "concepts": [
    [
      "Two main inputs",
      "The palette is emitted to ~/.local/state/quickshell/user/generated/colors.json; persistent shell/interface choices live in ~/.config/nyvorel/config.json."
    ],
    [
      "Path-driven updates",
      "Published systemd .path templates watch changes to those sources; a matching .service calls an application-specific helper."
    ],
    [
      "Application outputs are generated",
      "Kitty/Fish, Zed, btop, Fuzzel, KDE/Dolphin and Zen/VS Code each consume files and conventions they understand."
    ],
    [
      "Not every integration must exist",
      "Application-specific tooling is optional for the overall shell. A missing optional application is not itself evidence that Nyvorel is broken."
    ]
  ],
  "steps": [
    [
      "Choose a visual treatment",
      "Use the shell appearance interface; do not manually alter generated sync outputs as the authoritative source."
    ],
    [
      "Generate/write palette input",
      "The shell creates or updates colors.json and persistent interface configuration as needed."
    ],
    [
      "Trigger the appropriate watcher",
      "When the watched file changes, systemd can activate the corresponding sync service."
    ],
    [
      "Observe the actual target",
      "Check the updated application independently, because a completed helper does not guarantee the application currently displays its new styling."
    ]
  ],
  "contracts": [
    [
      "Terminal",
      "Kitty and Fish; optional Starship integration",
      "nyvorel-terminal-theme-sync"
    ],
    [
      "Dolphin",
      "KDE color schemes and Dolphin integration",
      "nyvorel-dolphin-theme-sync"
    ],
    [
      "Zed",
      "Zed user settings/theme overrides",
      "nyvorel-zed-theme-sync"
    ],
    [
      "btop",
      "Generated btop themes",
      "nyvorel-btop-style-sync"
    ],
    [
      "Fuzzel",
      "Interface-style-aware theme include",
      "nyvorel-fuzzel-style-sync"
    ],
    [
      "KDE apps",
      "KDE color schemes, including kdeglobals input",
      "nyvorel-kde-app-style-sync"
    ],
    [
      "Zen / VS Code",
      "Browser chrome and editor theme integration",
      "nyvorel-zen-code-style-sync"
    ]
  ],
  "checks": [
    [
      "Inspect watchers",
      "systemctl --user list-units \"nyvorel-*.path\" --all --no-pager",
      "Read-only; check whether watchers exist and are active."
    ],
    [
      "Inspect terminal sync unit",
      "systemctl --user cat nyvorel-terminal-theme-sync.path",
      "Read-only; shows actual watched file locations."
    ],
    [
      "Check terminal theme results",
      "journalctl --user -u nyvorel-terminal-theme-sync.service -n 40 --no-pager",
      "Read-only; reveal error traces without changing settings."
    ]
  ],
  "cautions": [
    "Do not hand-edit generated theme outputs expecting them to persist through the next synchronization.",
    "The exact appearance result depends on the target application, installed integration, and active interface style; there is no single universal CSS/JSON format.",
    "The Zed helper uses a different write behavior from typical atomic generated outputs to support filesystem change detection."
  ],
  "refs": [
    "systemd/nyvorel-terminal-theme-sync.path.in",
    "systemd/nyvorel-kde-app-style-sync.path.in",
    "bin/nyvorel-terminal-theme-sync",
    "quickshell/modules/common/Config.qml"
  ],
  "previous": {
    "href": "/docs/reference/systemd-integration",
    "title": "systemd integration"
  },
  "next": {
    "href": "/docs/reference/repository-map",
    "title": "Repository map"
  }
};

export default function ReferencePage() {
  return <TechnicalReference guide={guide} />;
}
