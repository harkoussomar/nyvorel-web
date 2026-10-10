import type { Metadata } from "next";
import { WorkflowGuide, type WorkflowGuideData } from "@/components/docs/workflow-guide";

export const metadata: Metadata = {
  title: "Project Launcher — Nyvorel v0.1.0",
  description: "Go from a project list to the right development tool.",
  alternates: { canonical: "/docs/workflows/project-launcher" },
};

const guide: WorkflowGuideData = {
  "order": "07",
  "title": "Project Launcher",
  "intro": "Project Launcher discovers local projects, offers a bounded preview and opens an available editor or terminal. Start by arranging projects in the expected directory structure.",
  "outcome": "Discover a local project, inspect it, and open it in a supported development tool.",
  "prerequisites": [
    "Project discovery uses category folders below ~/dev-mine/projects in the audited project layout.",
    "At least one category contains a non-empty project folder.",
    "The chosen editor or terminal must be installed before its launch action can work."
  ],
  "orient": [
    [
      "Categories",
      "The first directories under ~/dev-mine/projects."
    ],
    [
      "Projects",
      "Non-empty folders directly under each category."
    ],
    [
      "Preview",
      "Description, Git, stack, tree and common project markers."
    ],
    [
      "Tools",
      "VS Code (code), Kitty and Zed, when installed."
    ]
  ],
  "steps": [
    [
      "Check the project layout",
      "Confirm your project lives under ~/dev-mine/projects/<category>/<project> and is not an empty folder.",
      "The folder matches the launcher’s expected discovery depth."
    ],
    [
      "Open and refresh the launcher",
      "Use the shell’s Project Launcher entry point. Refresh discovery if you have added a project since the last scan.",
      "The category and project appear in the list."
    ],
    [
      "Find and inspect your project",
      "Type part of its project name, category or path, select the result and examine Git state, stack signals or its compact tree.",
      "The preview refers to the selected directory, not a path outside the allowed roots."
    ],
    [
      "Open the right tool",
      "Choose a listed available editor or terminal action. Where supported, Enter opens VS Code, Ctrl+Enter opens Kitty and Alt+Enter opens Zed.",
      "The selected tool opens at the intended project path."
    ],
    [
      "Return or troubleshoot",
      "Close with Escape and reopen if you want a different project. If no tool launches, inspect tool availability first.",
      "You return to your workspace without changing unrelated project files."
    ]
  ],
  "understand": [
    [
      "Discovery is intentionally bounded",
      "The helper rejects arbitrary paths outside configured project categories."
    ],
    [
      "Preview is lightweight",
      "Generated folders such as node_modules, .next and dist are omitted from compact inspection."
    ],
    [
      "Detection is not execution",
      "Stack and Git signals describe the project; the preview does not run its build or install dependencies."
    ]
  ],
  "issues": [
    [
      "A project is missing",
      "Check directory depth and that the project is non-empty; refresh discovery and verify category visibility."
    ],
    [
      "An editor action is unavailable",
      "Check whether code, kitty or zed is installed and on PATH in the shell environment."
    ],
    [
      "The preview is incomplete",
      "Markers and README content are hints; a project without recognized files can still be a valid directory."
    ]
  ],
  "source": [
    "quickshell/modules/nyvorel/projectLauncher/ProjectLauncher.qml",
    "quickshell/modules/nyvorel/projectLauncher/nyvorel-projects.py"
  ],
  "image": {
    "src": "/showcase/docs/project-launcher-project-browser.png",
    "alt": "Nyvorel Project Launcher showing the project browser",
    "width": 1048,
    "height": 678
  },
  "previous": {
    "title": "Arch Remote",
    "href": "/docs/workflows/arch-remote"
  },
  "next": {
    "title": "Architecture",
    "href": "/docs/concepts/architecture"
  }
};

export default function Page() {
  return <WorkflowGuide guide={guide} />;
}
