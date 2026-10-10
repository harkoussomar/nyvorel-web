"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { docsNavigation } from "@/lib/docs-navigation";

export function DocsBreadcrumbs() {
  const pathname = usePathname();
  const section = docsNavigation.find((group) => group.items.some((item) => item.href === pathname));
  const current = section?.items.find((item) => item.href === pathname);

  return (
    <nav className="docsBreadcrumbs" aria-label="Breadcrumb">
      <Link href="/docs">Docs</Link>
      {pathname !== "/docs" ? (
        <>
          <span className="docsBreadcrumbDivider" aria-hidden="true">/</span>
          <span>{section?.title ?? "Documentation"}</span>
          {current ? <><span className="docsBreadcrumbDivider" aria-hidden="true">/</span><strong aria-current="page">{current.title}</strong></> : null}
        </>
      ) : <><span className="docsBreadcrumbDivider" aria-hidden="true">/</span><strong aria-current="page">Overview</strong></>}
    </nav>
  );
}
