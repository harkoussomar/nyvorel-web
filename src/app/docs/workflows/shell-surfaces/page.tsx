import type { Metadata } from "next";
import { WorkflowGuide, type WorkflowGuideData } from "@/components/docs/workflow-guide";

export const metadata: Metadata = {
  title: "Shell surfaces — Nyvorel v0.1.0",
  description: "Find your way around the bar, panels, overlays and workspaces.",
  alternates: { canonical: "/docs/workflows/shell-surfaces" },
};

const guide: WorkflowGuideData = {
  "order": "03",
  "title": "Shell surfaces",
  "intro": "The Nyvorel experience is assembled from separate Quickshell surfaces. This tour helps you recognize what belongs to the shell and how to explore it safely.",
  "outcome": "Recognize the main shell surfaces, navigate to an appropriate tool, and understand where state comes from.",
  "prerequisites": [
    "Nyvorel is running in your Hyprland session.",
    "The available panel family and shortcuts may differ from example screenshots.",
    "Look for visible controls before assuming a keyboard shortcut."
  ],
  "orient": [
    [
      "Top bar",
      "Application context, workspaces/media and system state."
    ],
    [
      "Left sidebar",
      "Operational context such as Operations Center."
    ],
    [
      "Right sidebar",
      "Quick controls, connectivity and notifications."
    ],
    [
      "Overlays",
      "OSD, session, overview, selection and media surfaces."
    ],
    [
      "Workflow windows",
      "Settings, Appearance Studio, Recovery and other dedicated tools."
    ]
  ],
  "steps": [
    [
      "Orient using the bar",
      "Identify the active app context on the left, workspace/media area near the center, and system indicators to the right.",
      "You can distinguish app context, workspace selection and system status at a glance."
    ],
    [
      "Open a shell panel",
      "Use a visible panel control or the binding configured in your installation; try the quick-controls or operations side.",
      "A related Nyvorel surface appears without launching a conventional browser page."
    ],
    [
      "Inspect, then exit",
      "Explore labels and status without activating service-changing actions. Close the surface using its provided close control or the configured dismissal gesture.",
      "The panel closes and returns focus to the desktop."
    ],
    [
      "Explore workspace behavior",
      "Switch between workspaces using your available desktop controls. Observe which windows appear on each workspace.",
      "The workspace indicator and visible application context update accordingly."
    ]
  ],
  "understand": [
    [
      "Shell vs application",
      "A sidebar or OSD belongs to the shell; a Settings or Recovery tool may be a separate application-like window."
    ],
    [
      "Not every surface is permanent",
      "Notifications, media controls and OSD feedback can be transient or conditional."
    ],
    [
      "Panel families vary",
      "Optional dock, vertical-bar or surface choices depend on the installed configuration."
    ]
  ],
  "issues": [
    [
      "A panel is absent",
      "Verify the relevant feature is enabled and that the selected panel family includes the surface."
    ],
    [
      "A keyboard shortcut differs",
      "Use your installed Hyprland binding/configuration, not an unverified shortcut from a screenshot."
    ],
    [
      "A panel becomes stuck",
      "Avoid killing arbitrary system processes. Use the shell-service troubleshooting guide and preserve the logs."
    ]
  ],
  "source": [
    "quickshell/panelFamilies/NyvorelFamily.qml"
  ],
  "image": {
    "src": "/showcase/docs/shell-surfaces-and-notifications-desktop.png",
    "alt": "Nyvorel desktop showing quick controls, notifications and the side panel",
    "width": 1918,
    "height": 1078
  },
  "previous": {
    "title": "Appearance Studio",
    "href": "/docs/workflows/appearance-studio"
  },
  "next": {
    "title": "Operations Center",
    "href": "/docs/workflows/operations-center"
  }
};

export default function Page() {
  return <WorkflowGuide guide={guide} />;
}
