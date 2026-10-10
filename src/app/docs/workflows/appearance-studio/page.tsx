import type { Metadata } from "next";
import { WorkflowGuide, type WorkflowGuideData } from "@/components/docs/workflow-guide";

export const metadata: Metadata = {
  title: "Appearance Studio — Nyvorel v0.1.0",
  description: "Personalize wallpaper, palette and interface—with a way back.",
  alternates: { canonical: "/docs/workflows/appearance-studio" },
};

const guide: WorkflowGuideData = {
  "order": "02",
  "title": "Appearance Studio",
  "intro": "Appearance Studio is a focused workflow for composing the visual identity of your desktop. Treat theme edits as a previewed change, not as a one-click irreversible transformation.",
  "outcome": "Choose a wallpaper-based theme, understand what will change, and keep or revert the result.",
  "prerequisites": [
    "The shell and Appearance Studio are available in your current session.",
    "Keep the original wallpaper or saved appearance selection available.",
    "An application-sync target must be installed for its external styling to change."
  ],
  "orient": [
    [
      "Theme",
      "Source, appearance mode and palette direction."
    ],
    [
      "Wallpaper",
      "Desktop background selection and context."
    ],
    [
      "Interface",
      "Transparency, geometry, motion and surface treatment."
    ],
    [
      "Targets",
      "Destinations for application-theme synchronization."
    ],
    [
      "Saved",
      "Previously saved appearance compositions, when available."
    ]
  ],
  "steps": [
    [
      "Inspect the current appearance",
      "Open Appearance Studio and identify the selected theme source, dark/light mode and wallpaper. Take note of the starting state.",
      "The current composition is visible before you make changes."
    ],
    [
      "Choose the source",
      "On Theme, select a wallpaper-driven palette or an available preset. Choose an appearance mode without changing multiple unrelated settings at once.",
      "The editor shows the selected source and corresponding color direction."
    ],
    [
      "Preview a controlled change",
      "Select a different wallpaper or adjust one palette characteristic. Observe the editor preview and the affected shell surfaces.",
      "The appearance preview changes; the rest of the desktop changes only when the applicable preview or apply behavior is used."
    ],
    [
      "Review interface and targets",
      "Check transparency and readability, then inspect Targets before propagating changes to other applications.",
      "You understand which surfaces and applications are included in the proposed composition."
    ],
    [
      "Keep or restore",
      "Use the available Keep/Apply action when satisfied; otherwise use the revert/restore behavior provided by the current editor.",
      "The desktop reflects the retained choice or returns to the previous known composition."
    ]
  ],
  "understand": [
    [
      "Wallpaper is a palette input",
      "A generated palette depends on the selected image; not every wallpaper produces equally readable colors."
    ],
    [
      "Targets may vary",
      "Application integration depends on available apps and installed theme-sync services."
    ],
    [
      "Preview is not the same as persist",
      "A staged visual preview should not be assumed to be permanently saved until the UI confirms it."
    ]
  ],
  "issues": [
    [
      "Palette seems hard to read",
      "Try a different style or contrast setting; verify small text and selected states before keeping the theme."
    ],
    [
      "An external app does not change",
      "Check whether that application is a supported and installed synchronization target."
    ],
    [
      "The preview looks different after restart",
      "Revisit the retained/saved appearance choice and inspect the installed release’s persistence behavior."
    ]
  ],
  "source": [
    "quickshell/modules/appearanceStudio/AppearanceStudio.qml"
  ],
  "image": {
    "src": "/showcase/docs/appearance-studio-theme-editor.png",
    "alt": "Appearance Studio theme editor showing palette and interface options",
    "width": 1128,
    "height": 728
  },
  "previous": {
    "title": "Settings",
    "href": "/docs/workflows/settings"
  },
  "next": {
    "title": "Shell surfaces",
    "href": "/docs/workflows/shell-surfaces"
  }
};

export default function Page() {
  return <WorkflowGuide guide={guide} />;
}
