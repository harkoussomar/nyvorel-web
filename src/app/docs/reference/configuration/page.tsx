import type { Metadata } from "next";
import { TechnicalReference, type TechnicalGuide } from "@/components/docs/technical-reference";

export const metadata: Metadata = {
  title: "Configuration model",
  description: "Verified v0.1.0 persistent configuration keys, defaults, reload behavior and safe inspection paths.",
  alternates: { canonical: "/docs/reference/configuration" },
};

const guide: TechnicalGuide = {
  "title": "Configuration model",
  "intro": "The typed QML adapter defines the configuration schema; the JSON file stores the current user’s values. Reading the JSON is safe. Editing or replacing it is a separate, state-changing operation.",
  "kind": "Technical reference",
  "number": "02",
  "concepts": [
    [
      "The schema lives in QML",
      "quickshell/modules/common/Config.qml exposes Config.options through a typed JsonAdapter. Its defaults—not a documentation example—are the canonical values."
    ],
    [
      "The path is user-scoped",
      "Directories.qml resolves the XDG configuration directory and appends nyvorel/config.json. On a conventional Arch setup this is ~/.config/nyvorel/config.json."
    ],
    [
      "Changes are observed",
      "Config.qml watches the JSON file and debounces reloads and adapter writes by 50 ms. Config.reload() also exists for external atomic replacements."
    ],
    [
      "Configuration can gate UI",
      "The selected panel family only loads after Config.ready. Incorrect user settings can therefore affect the visible runtime without meaning the process itself is stopped."
    ]
  ],
  "steps": [
    [
      "Read the schema",
      "Inspect the tagged Config.qml for key names, types and actual defaults."
    ],
    [
      "Inspect the current file",
      "Use a read-only JSON validation command before manually comparing settings to the adapter."
    ],
    [
      "Change via supported Settings controls",
      "Prefer Settings or Appearance Studio when available. Keep a backup before manual config edits."
    ],
    [
      "Verify the effect",
      "Check whether the shell or integration responds; never assume a file write implies successful state propagation."
    ]
  ],
  "contracts": [
    [
      "panelFamily",
      "string",
      "\"nyvorel\"; chooses the panel family"
    ],
    [
      "appearance.interfaceStyle",
      "string",
      "\"\" by default in v0.1.0; UI normalizes supported identities"
    ],
    [
      "appearance.motion.scale",
      "real",
      "1.0"
    ],
    [
      "appearance.motion.reduced",
      "boolean",
      "false"
    ],
    [
      "appearance.motion.expressive",
      "boolean",
      "true"
    ],
    [
      "appearance.geometry.radius.global",
      "integer",
      "17"
    ],
    [
      "appearance.transparency.enable",
      "boolean",
      "false"
    ],
    [
      "appearance.transparency.automatic",
      "boolean",
      "true"
    ]
  ],
  "checks": [
    [
      "Validate JSON syntax",
      "python3 -m json.tool \"$HOME/.config/nyvorel/config.json\" >/dev/null",
      "Read-only validation; a nonzero exit means JSON is malformed or missing."
    ],
    [
      "Inspect schema in source",
      "git show v0.1.0:quickshell/modules/common/Config.qml",
      "Read-only when run inside a Nyvorel repository checkout."
    ],
    [
      "Inspect settings without editing",
      "python3 -c \"import json,pathlib; p=pathlib.Path.home()/'.config/nyvorel/config.json'; print(list(json.loads(p.read_text()).keys()))\"",
      "Read-only. Prints top-level keys; output may reveal custom settings."
    ]
  ],
  "cautions": [
    "Defaults listed above are from v0.1.0 source. Settings can change them and may migrate values; do not paste a partial example over an existing config.json.",
    "Generated colors, notification caches and installation manifests are different state categories. Never delete them in an attempt to fix a single option without confirming ownership."
  ],
  "refs": [
    "quickshell/modules/common/Config.qml",
    "quickshell/modules/common/Directories.qml",
    "quickshell/shell.qml",
    "runtime-config/README.md"
  ],
  "previous": {
    "href": "/docs/reference/lifecycle",
    "title": "Runtime lifecycle"
  },
  "next": {
    "href": "/docs/reference/module-map",
    "title": "Module map"
  }
};

export default function ReferencePage() {
  return <TechnicalReference guide={guide} />;
}
