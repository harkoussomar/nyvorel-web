import type { Metadata } from "next";
import { WorkflowGuide, type WorkflowGuideData } from "@/components/docs/workflow-guide";

export const metadata: Metadata = {
  title: "Settings — Nyvorel v0.1.0",
  description: "Find a setting, change it deliberately, and verify what happened.",
  alternates: { canonical: "/docs/workflows/settings" },
};

const guide: WorkflowGuideData = {
  "order": "01",
  "title": "Settings",
  "intro": "Use Nyvorel Settings when you want to change shell behavior, bar layout, background or integrations without editing QML by hand.",
  "outcome": "Locate a control in Settings, decide whether to change it, and confirm the result on the desktop.",
  "prerequisites": [
    "Nyvorel is running inside the supported Hyprland session.",
    "You can open its Settings window from your configured launcher or shell controls.",
    "Record the original value of any setting you plan to change."
  ],
  "orient": [
    [
      "Quick",
      "Frequent adjustments and appearance entry points."
    ],
    [
      "General",
      "Broad shell behavior and environment choices."
    ],
    [
      "Bar",
      "Location, display and behavior of the shell bar."
    ],
    [
      "Background / Interface",
      "Wallpaper and visual surface options."
    ],
    [
      "Services / Advanced",
      "Integrations and lower-level options; inspect before changing."
    ]
  ],
  "steps": [
    [
      "Open Settings",
      "Use the entry point supplied by your installed launcher or shell. If it does not appear, check that the Nyvorel Quickshell service is active.",
      "The Settings window opens and exposes its main navigation."
    ],
    [
      "Find the control",
      "Choose a section from the top tabs or compact navigation rail. When available, use the in-window search to locate a named control instead of scanning every page.",
      "You reach a page that explains the control or highlights the matching setting."
    ],
    [
      "Change one reversible preference",
      "Start with a low-risk visual preference such as bar position or appearance mode. Note the original value before selecting a new one.",
      "The related shell surface reflects the new preference. If it does not, check whether the control needs an Apply action."
    ],
    [
      "Verify and restore if needed",
      "Return to the affected surface, confirm the effect, then switch back to your original value if you were only exploring.",
      "The desktop matches the chosen value and can return to its original appearance."
    ]
  ],
  "understand": [
    [
      "Search is navigation",
      "Search helps locate existing settings; it is not a system-wide command runner."
    ],
    [
      "Settings vs Appearance Studio",
      "Settings covers the broader shell; Appearance Studio groups wallpaper, palette and visual composition into one staged workflow."
    ],
    [
      "Some controls affect services",
      "Do not change service or advanced options until you understand their effect on the live session."
    ]
  ],
  "issues": [
    [
      "Settings does not open",
      "Check your configured launcher entry point, then inspect the user service with systemctl --user status nyvorel-quickshell.service."
    ],
    [
      "A change does not appear",
      "Check if the specific control supports preview, needs confirmation, or is unavailable in the selected panel family."
    ],
    [
      "A setting appears missing",
      "Search the other relevant section and confirm the installed shell version; UI options may differ across releases."
    ]
  ],
  "source": [
    "quickshell/settings.qml",
    "quickshell/modules/settings/"
  ],
  "image": {
    "src": "/showcase/docs/settings-appearance-overview.png",
    "alt": "Settings appearance controls in Nyvorel",
    "width": 1100,
    "height": 750
  },
  "previous": {
    "title": "First launch",
    "href": "/docs/getting-started/first-launch"
  },
  "next": {
    "title": "Appearance Studio",
    "href": "/docs/workflows/appearance-studio"
  }
};

export default function Page() {
  return <WorkflowGuide guide={guide} />;
}
