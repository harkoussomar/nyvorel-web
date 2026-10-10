import type { Metadata } from "next";
import { TechnicalReference, type TechnicalGuide } from "@/components/docs/technical-reference";

export const metadata: Metadata = {
  title: "Portable public source",
  description: "How the v0.1.0 release separates portable source from user configuration, generated outputs and recovery state.",
  alternates: { canonical: "/docs/concepts/portability" },
};

const guide: TechnicalGuide = {
  "title": "Portable public source",
  "intro": "Portable source is not a copy of the maintainer’s home directory. Nyvorel resolves machine-specific paths at installation time and keeps mutable user state outside the release tree.",
  "kind": "Core concepts",
  "number": "02",
  "concepts": [
    [
      "Source is reusable",
      "The repository includes source, portable templates, helpers, integrations, license information and redistributable assets—not live credentials or backup history."
    ],
    [
      "A token is not a path",
      "The literal @HOME@ is a placeholder in files requiring the target-user absolute home. Install materializes it in destination copies, not in the public source."
    ],
    [
      "State is not installation source",
      "User settings and installation history may survive uninstall. A restore of managed files is not the same as deleting all user/runtime data."
    ]
  ],
  "steps": [
    [
      "Select a target home",
      "The installer defaults to the invoking user’s HOME; the target-home option exists for isolated staging and testing."
    ],
    [
      "Render copied files",
      "install.sh replaces @HOME@ while copying managed files and converts .service.in/.path.in templates to installed unit filenames."
    ],
    [
      "Record the transaction",
      "The installer preserves pre-existing managed files and produces a timestamped manifest."
    ],
    [
      "Recover deliberately",
      "uninstall.sh consults that manifest, protects user-modified managed files, and retains user state/history."
    ]
  ],
  "contracts": [
    [
      "@HOME@",
      "Literal install-time home placeholder",
      "29 occurrences across 10 source templates in v0.1.0"
    ],
    [
      "~/.config/nyvorel/",
      "Mutable user/runtime settings",
      "Not copied from the maintainer’s home"
    ],
    [
      "~/.local/state/nyvorel/installations/",
      "Installation manifests/backups",
      "Retained after normal uninstall"
    ],
    [
      "~/.config/systemd/user/",
      "Installed systemd unit templates",
      "Derived from systemd/*.in sources"
    ]
  ],
  "checks": [
    [
      "Check documented portability model",
      "git show v0.1.0:PORTABILITY.md",
      "Read-only when run inside a cloned Nyvorel repository."
    ],
    [
      "Preview before installing",
      "./install.sh --dry-run",
      "Read-only, run from a checked-out v0.1.0 release; do not substitute development setup commands."
    ]
  ],
  "cautions": [
    "Never publish screenshots or archives containing credentials, private network identifiers or user-specific state.",
    "A backup-first installer is not a substitute for independent system backups before replacing a desktop environment."
  ],
  "refs": [
    "PORTABILITY.md",
    "INSTALL.md",
    "install.sh",
    "uninstall.sh"
  ],
  "previous": {
    "href": "/docs/concepts/architecture",
    "title": "Architecture"
  },
  "next": {
    "href": "/docs/reference/lifecycle",
    "title": "Runtime lifecycle"
  }
};

export default function ReferencePage() {
  return <TechnicalReference guide={guide} />;
}
