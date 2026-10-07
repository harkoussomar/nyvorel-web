import type { MetadataRoute } from "next";

import { allDocs } from "@/lib/docs-navigation";

const siteUrl = "https://nyvorel-web.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["/", ...allDocs.map((item) => item.href)];

  return routes.map((route) => ({
    url: `${siteUrl}${route === "/" ? "" : route}`,
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : route === "/docs" ? 0.9 : 0.8,
  }));
}
