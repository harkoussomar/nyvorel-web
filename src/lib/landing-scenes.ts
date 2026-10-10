/** Source-authentic screenshot states. These are views, NOT a fake Linux runtime. */
export const landingScenes = [
  {
    id: "appearance",
    number: "01",
    label: "Appearance",
    title: "Appearance Studio",
    subtitle: "A desktop with character, chosen by you.",
    description: "The real Nyvorel Appearance Studio, shown inside the desktop.",
    image: "/showcase/v2/appearance-studio-theme-desktop.png",
    mobileImage: "/showcase/v2/mobile/appearance-focus.png",
    alt: "Nyvorel desktop showing the actual Appearance Studio interface with wallpaper-derived colors",
  },
  {
    id: "settings",
    number: "02",
    label: "Settings",
    title: "Every detail, considered",
    subtitle: "The settings that shape your environment, together in one place.",
    description: "The real Nyvorel Settings window, in desktop context.",
    image: "/showcase/v2/settings-appearance-desktop.png",
    mobileImage: "/showcase/v2/mobile/settings-focus.png",
    alt: "Nyvorel desktop with the actual Settings window open",
  },
  {
    id: "operations",
    number: "03",
    label: "Operations",
    title: "A system you can see",
    subtitle: "Operational tools are part of the desktop, not an afterthought.",
    description: "The real Nyvorel Operations Center left sidebar.",
    image: "/showcase/v2/operations-center-left-sidebar-desktop.png",
    mobileImage: "/showcase/v2/mobile/operations-focus.png",
    alt: "Nyvorel desktop with its Operations Center sidebar expanded",
  },
  {
    id: "calendar",
    number: "04",
    label: "Daily rhythm",
    title: "The small things, in reach",
    subtitle: "A cohesive shell for everyday desktop moments.",
    description: "Nyvorel's real desktop calendar popover.",
    image: "/showcase/v2/calendar-popover-desktop-primary.png",
    mobileImage: "/showcase/v2/mobile/calendar-focus.png",
    alt: "Nyvorel desktop showing its calendar popover in context",
  },
] as const;

export type LandingSceneId = (typeof landingScenes)[number]["id"];
