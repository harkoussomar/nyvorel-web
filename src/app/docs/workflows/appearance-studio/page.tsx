import type { Metadata } from "next";
import { WorkflowGuide, type WorkflowGuideData } from "@/components/docs/workflow-guide";

export const metadata: Metadata = {
  title: "Appearance Studio — Current Nyvorel UI",
  description: "Personalize wallpaper, palette and interface—with a way back.",
  alternates: { canonical: "/docs/workflows/appearance-studio" },
};

const guide: WorkflowGuideData = {
  "order": "02",
  "scope": "development",
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
      "Choose Wallpaper, Preset, Hybrid, or Custom as the source, then set a color scheme and light/dark mode."
    ],
    [
      "Wallpaper",
      "Desktop background selection and context."
    ],
    [
      "Interface",
      "Choose a complete interface style or refine transparency, geometry, and motion."
    ],
    [
      "Targets",
      "Destinations for application-theme synchronization."
    ],
    [
      "Saved",
      "Reuse saved favorites and revisit recent appearance choices."
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
      "On Theme, choose Wallpaper, Preset, Hybrid, or Custom. Then select a light/dark mode and color scheme; for a custom palette, start with one seed color.",
      "The editor shows the selected source and palette direction."
    ],
    [
      "Preview a controlled change",
      "Select a different wallpaper or adjust one palette characteristic, then use the preview action before committing the full appearance.",
      "The candidate appearance is shown across the desktop. An unkept preview restores the previous appearance after 15 seconds; Escape also reverts it while the Studio is open."
    ],
    [
      "Review interface and targets",
      "Check transparency and readability, then inspect Targets before propagating changes to other applications.",
      "You understand which surfaces and applications are included in the proposed composition."
    ],
    [
      "Keep or restore",
      "Use Keep to commit the candidate when satisfied. Revert or Escape restores the previous composition; if the preview expires, it restores automatically.",
      "The desktop reflects the retained choice or returns to the previous composition."
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
      "Preview is temporary",
      "Keep commits a preview. If you leave it untouched, the 15-second timeout restores the saved composition."
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
