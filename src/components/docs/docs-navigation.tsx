"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

import { docsNavigation } from "@/lib/docs-navigation";

function isCurrent(pathname: string, href: string) {
  return pathname === href;
}

function NavigationSections({ pathname }: { pathname: string }) {
  return (
    <>
      {docsNavigation.map((section) => (
        <section className="docsNavSection" key={section.title}>
          <h2>{section.title}</h2>
          <nav aria-label={`${section.title} documentation`}>
            {section.items.map((item) => {
              const current = isCurrent(pathname, item.href);

              return (
                <Link
                  href={item.href}
                  key={item.href}
                  aria-current={current ? "page" : undefined}
                >
                  <span>{item.title}</span>
                  <small>{item.description}</small>
                </Link>
              );
            })}
          </nav>
        </section>
      ))}
    </>
  );
}

export function DocsSidebarNavigation() {
  const pathname = usePathname();

  return <NavigationSections pathname={pathname} />;
}

export function DocsMobileNavigation() {
  const pathname = usePathname();
  const detailsRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    if (detailsRef.current) {
      detailsRef.current.open = false;
    }
  }, [pathname]);

  return (
    <div className="docsMobileNav">
      <details ref={detailsRef}>
        <summary>Documentation menu</summary>
        <div>
          <NavigationSections pathname={pathname} />
        </div>
      </details>
    </div>
  );
}
