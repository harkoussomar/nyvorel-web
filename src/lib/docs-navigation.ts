export type DocNavItem = {
  title: string;
  href: string;
  description: string;
};

export type DocNavSection = {
  title: string;
  items: readonly DocNavItem[];
};

export const docsNavigation: readonly DocNavSection[] = [
  {
    title: "Start",
    items: [
      {
        title: "Documentation",
        href: "/docs",
        description: "How the Nyvorel documentation is organized.",
      },
    ],
  },
  {
    title: "Getting started",
    items: [
      {
        title: "Requirements",
        href: "/docs/getting-started/requirements",
        description: "Compare the development minimal-Arch setup with stable v0.1.0 prerequisites.",
      },
      {
        title: "Install",
        href: "/docs/getting-started/install",
        description: "Follow the current development setup or the separate tagged v0.1.0 path.",
      },
      {
        title: "First launch",
        href: "/docs/getting-started/first-launch",
        description: "Verify the shell and discover your first Nyvorel workflows.",
      },
      {
        title: "Recovery",
        href: "/docs/getting-started/recovery",
        description: "Uninstall safely and protect post-install edits.",
      },
    ],
  },
  {
    title: "Using Nyvorel",
    items: [
      {
        title: "Settings",
        href: "/docs/workflows/settings",
        description: "Configure Nyvorel from its dedicated settings window.",
      },
      {
        title: "Appearance Studio",
        href: "/docs/workflows/appearance-studio",
        description: "Build, preview, and apply the desktop appearance.",
      },
      {
        title: "Shell surfaces",
        href: "/docs/workflows/shell-surfaces",
        description: "Understand the bar, sidebars, overlays, and desktop surfaces.",
      },
      {
        title: "Operations Center",
        href: "/docs/workflows/operations-center",
        description: "Inspect runtimes, jobs, attention, and system state.",
      },
      {
        title: "Backup & Recovery",
        href: "/docs/workflows/backup-recovery",
        description: "Inspect protection state, backups, disk health, and recovery readiness.",
      },
      {
        title: "Arch Remote",
        href: "/docs/workflows/arch-remote",
        description: "Manage private remote-access services, security, network, and phone access.",
      },
      {
        title: "Project Launcher",
        href: "/docs/workflows/project-launcher",
        description: "Discover projects, inspect context, and launch development tools.",
      },
    ],
  },
  {
    title: "Core concepts",
    items: [
      {
        title: "Architecture",
        href: "/docs/concepts/architecture",
        description: "Session, lifecycle, runtime, and module ownership.",
      },
      {
        title: "Portability",
        href: "/docs/concepts/portability",
        description: "Public-source boundaries and @HOME@ materialization.",
      },
    ],
  },
  {
    title: "Technical reference",
    items: [
      {
        title: "Runtime lifecycle",
        href: "/docs/reference/lifecycle",
        description: "How Hyprland, systemd, and Quickshell start and own Nyvorel.",
      },
      {
        title: "Configuration model",
        href: "/docs/reference/configuration",
        description: "Persistent config, XDG paths, defaults, and reload behavior.",
      },
      {
        title: "Module map",
        href: "/docs/reference/module-map",
        description: "How the Quickshell source tree is divided by responsibility.",
      },
      {
        title: "systemd integration",
        href: "/docs/reference/systemd-integration",
        description: "Installed user units, path activation, and service ownership.",
      },
      {
        title: "Theme synchronization",
        href: "/docs/reference/theme-synchronization",
        description: "How palette and interface-style changes propagate to applications.",
      },
      {
        title: "Repository map",
        href: "/docs/reference/repository-map",
        description: "Public source roots and their installed destinations.",
      },
    ],
  },
  {
    title: "Project & support",
    items: [
      {
        title: "Contributing",
        href: "/docs/project/contributing",
        description: "Contribution workflow, source boundaries, and validation expectations.",
      },
      {
        title: "Licensing & provenance",
        href: "/docs/project/licensing-provenance",
        description: "GPL-3.0, upstream derivation, third-party material, and trademark boundaries.",
      },
      {
        title: "Troubleshooting",
        href: "/docs/troubleshooting",
        description: "Diagnose installation, activation, service, and recovery problems.",
      },
    ],
  },
] as const;

export const allDocs = docsNavigation.flatMap((section) => section.items);
