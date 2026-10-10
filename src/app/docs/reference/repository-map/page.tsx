import type { Metadata } from "next";
import { TechnicalReference, type TechnicalGuide } from "@/components/docs/technical-reference";

export const metadata: Metadata = {
  title: "Repository map",
  description: "A release-scoped map from public v0.1.0 files to installed Nyvorel destinations.",
  alternates: { canonical: "/docs/reference/repository-map" },
};

const guide: TechnicalGuide = {
  "title": "Repository map",
  "intro": "Start with the published tag, not an unreleased working tree. This page maps v0.1.0 and calls out the current development differences so the two installation paths stay distinct.",
  "kind": "Technical reference",
  "number": "06",
  "concepts": [
    [
      "Release identity",
      "The v0.1.0 root contains install.sh, uninstall.sh, VERSION and the portable Quickshell, Hyprland, systemd and integration trees."
    ],
    [
      "No tagged setup.sh",
      "The published v0.1.0 release is not the later experimental minimal-Arch setup workflow. Do not instruct stable users to run ./setup.sh from this tag."
    ],
    [
      "Current development tree",
      "The development checkout includes setup.sh for a minimal-Arch system and a native hyprland.lua configuration. nyvorel session prefers that Lua entry when present, while retaining an explicit .conf fallback. The Lua setup was verified on Hyprland 0.56.2; it is not part of v0.1.0, and 0.57 is not yet claimed as supported."
    ],
    [
      "Managed vs user state",
      "The installer maps source into the target HOME, preserves replaced managed files and records manifest checksums. It does not vendor private user configuration or secrets."
    ],
    [
      "Activation is explicit",
      "Install --yes places files; --activate additionally operates on services inside a supported live session."
    ]
  ],
  "steps": [
    [
      "Select a known release",
      "Use git tag v0.1.0 or clone the public repository then explicitly check out that tag."
    ],
    [
      "Preview planned files",
      "Run ./install.sh --dry-run before touching the target machine."
    ],
    [
      "Install and retain evidence",
      "Only after reviewing the dry-run plan, use the versioned installation guide for the --yes operation."
    ],
    [
      "Recover using the manifest",
      "The matching uninstall.sh handles restoration and user-edited file conflicts."
    ]
  ],
  "contracts": [
    [
      "install.sh / uninstall.sh",
      "Root",
      "Release-specific installation/recovery commands"
    ],
    [
      "quickshell/",
      "~/.config/quickshell/nyvorel/",
      "Shell runtime source"
    ],
    [
      "hypr/",
      "~/.config/hypr/",
      "Compositor configuration"
    ],
    [
      "bin/",
      "~/.local/bin/",
      "Nyvorel helper commands"
    ],
    [
      "systemd/",
      "~/.config/systemd/user/",
      "Materialized user units"
    ],
    [
      "integrations/fish/",
      "~/.config/fish/",
      "Shell integration"
    ],
    [
      "integrations/kitty/",
      "~/.config/kitty/",
      "Terminal integration"
    ],
    [
      "assets/nyvorel.svg",
      "~/.local/share/icons/hicolor/scalable/apps/nyvorel.svg",
      "Application icon"
    ],
    [
      "runtime-config/",
      "Repository-only source boundary",
      "Do not copy user secrets/runtime state from maintainer machine"
    ]
  ],
  "checks": [
    [
      "Inspect release marker",
      "git show v0.1.0:VERSION",
      "Read-only when run inside a Nyvorel repository checkout."
    ],
    [
      "Inspect installer options",
      "git show v0.1.0:install.sh | sed -n \"1,85p\"",
      "Read-only; check actual supported flags before using them."
    ],
    [
      "Inspect tagged tree",
      "git ls-tree --name-only v0.1.0",
      "Read-only; compare claims with the actual release content."
    ]
  ],
  "cautions": [
    "Do not mix development-branch setup.sh or nyvorel bootstrap/welcome commands into stable v0.1.0 instructions unless present in the tagged release.",
    "Never treat a missing optional app as a core install failure without checking the requirements and the relevant workflow."
  ],
  "refs": [
    "README.md",
    "INSTALL.md",
    "install.sh",
    "uninstall.sh",
    "PORTABILITY.md",
    "VERSION"
  ],
  "previous": {
    "href": "/docs/reference/theme-synchronization",
    "title": "Theme synchronization"
  },
  "next": {
    "href": "/docs/project/contributing",
    "title": "Contributing"
  }
};

export default function ReferencePage() {
  return <TechnicalReference guide={guide} />;
}
