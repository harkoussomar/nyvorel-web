import type { Metadata } from "next";
import { TechnicalReference, type TechnicalGuide } from "@/components/docs/technical-reference";

export const metadata: Metadata = {
  title: "Module map",
  description: "Source-level ownership and navigation map for the Nyvorel v0.1.0 Quickshell tree.",
  alternates: { canonical: "/docs/reference/module-map" },
};

const guide: TechnicalGuide = {
  "title": "Module map",
  "intro": "Use this map when you need to find the correct implementation layer. Prefer looking for the owner of a state or interaction before editing a visually adjacent component.",
  "kind": "Technical reference",
  "number": "03",
  "concepts": [
    [
      "Entry point",
      "quickshell/shell.qml is the ShellRoot. It wires global service initialization, Appearance Studio loading and panel-family selection."
    ],
    [
      "Shared foundation",
      "quickshell/modules/common/ and quickshell/services/ expose common components, typed configuration and application/system state."
    ],
    [
      "Composition",
      "quickshell/panelFamilies/NyvorelFamily.qml assembles surface components and enables conditional modules such as vertical bar or dock."
    ],
    [
      "Feature owners",
      "quickshell/modules/nyvorel/ owns feature modules; scripts and Python backends implement heavier system operations outside of declarative QML."
    ]
  ],
  "steps": [
    [
      "Trace the request",
      "Determine whether the behavior belongs to session startup, shared state, one specific surface, or an external helper."
    ],
    [
      "Find the entry point",
      "Start at shell.qml or the family; follow imports only into the feature you are changing."
    ],
    [
      "Verify the boundary",
      "If an action invokes a script or systemd unit, inspect that contract before altering the QML presentation."
    ],
    [
      "Limit the change",
      "Keep modifications in the owning module and verify any cross-surface state is still consistent."
    ]
  ],
  "contracts": [
    [
      "quickshell/shell.qml",
      "Root",
      "Runtime initialization and family loader"
    ],
    [
      "quickshell/modules/common/",
      "Shared",
      "Reusable controls, Config and Directories"
    ],
    [
      "quickshell/services/",
      "Integration",
      "System-facing state providers"
    ],
    [
      "quickshell/panelFamilies/NyvorelFamily.qml",
      "Composition",
      "Conditional surface construction"
    ],
    [
      "quickshell/modules/nyvorel/",
      "Feature",
      "Bar, sidebars, Project Launcher, remote and recovery"
    ],
    [
      "quickshell/settings.qml",
      "Standalone window",
      "Native Settings application"
    ],
    [
      "quickshell/scripts/",
      "Helpers",
      "Backend utilities and app/system integrations"
    ]
  ],
  "checks": [
    [
      "Examine root",
      "git show v0.1.0:quickshell/shell.qml",
      "Read-only; start here for startup and dynamic loading."
    ],
    [
      "Inspect family",
      "git show v0.1.0:quickshell/panelFamilies/NyvorelFamily.qml",
      "Read-only; shows the authoritative surface composition."
    ]
  ],
  "cautions": [
    "Being imported does not necessarily mean a surface is always visible or resident. Conditions and LazyLoader ownership matter.",
    "Do not infer an IPC command from a UI label; check the actual IpcHandler or helper implementation first."
  ],
  "refs": [
    "quickshell/shell.qml",
    "quickshell/panelFamilies/NyvorelFamily.qml",
    "quickshell/settings.qml",
    "quickshell/modules/common/Config.qml"
  ],
  "previous": {
    "href": "/docs/reference/configuration",
    "title": "Configuration model"
  },
  "next": {
    "href": "/docs/reference/systemd-integration",
    "title": "systemd integration"
  }
};

export default function ReferencePage() {
  return <TechnicalReference guide={guide} />;
}
