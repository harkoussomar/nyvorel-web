import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
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
