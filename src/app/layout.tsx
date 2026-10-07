import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://nyvorel-web.vercel.app"),
  title: {
    default: "Nyvorel Shell — A cohesive Hyprland desktop environment",
    template: "%s · Nyvorel",
  },
  description:
    "Nyvorel is a cohesive Hyprland + Quickshell desktop shell for Arch Linux, combining shell UI, appearance, operations, recovery, and session lifecycle.",
  applicationName: "Nyvorel",
  keywords: [
    "Nyvorel",
    "Hyprland",
    "Quickshell",
    "Arch Linux",
    "Linux desktop",
    "Wayland",
  ],
  openGraph: {
    type: "website",
    siteName: "Nyvorel",
    title: "Nyvorel Shell — A cohesive Hyprland desktop environment",
    description:
      "Nyvorel is a cohesive Hyprland + Quickshell desktop shell for Arch Linux, combining shell UI, appearance, operations, recovery, and session lifecycle.",
    url: "/",
    images: [
      {
        url: "/showcase/hero-desktop.webp",
        width: 1600,
        height: 899,
        alt: "Nyvorel desktop running on Hyprland",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nyvorel Shell — A cohesive Hyprland desktop environment",
    description:
      "A cohesive Hyprland + Quickshell desktop shell for Arch Linux.",
    images: ["/showcase/hero-desktop.webp"],
  },
  icons: {
    icon: "/brand/nyvorel.svg",
  },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#070b0d",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
