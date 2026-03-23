"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type NavItem = {
  href: string;
  label: string;
  isActive: (pathname: string) => boolean;
};

const navItems: NavItem[] = [
  {
    href: "/",
    label: "Home",
    isActive: (pathname) => pathname === "/",
  },
  {
    href: "/monitors",
    label: "Monitors",
    isActive: (pathname) => pathname.startsWith("/monitors") || pathname.startsWith("/product/"),
  },
  {
    href: "/blog",
    label: "Guides",
    isActive: (pathname) => pathname.startsWith("/blog"),
  },
  {
    href: "/disclosure",
    label: "Disclosure",
    isActive: (pathname) => pathname.startsWith("/disclosure") || pathname.startsWith("/privacy-policy"),
  },
];

const hiddenPrefixes = ["/admin", "/dashboard", "/products", "/prices", "/articles", "/affiliate-links", "/login"];

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  if (hiddenPrefixes.some((prefix) => pathname.startsWith(prefix))) {
    return null;
  }

  return (
    <header className="sticky top-0 z-40 border-b border-slate-900/10 bg-white/85 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-950">
          Cheap Gadget Finder
        </Link>

        <button
          type="button"
          className="inline-flex items-center rounded-full border border-slate-900/15 bg-white px-3 py-1.5 text-xs font-medium text-slate-900 md:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mobile-primary-nav"
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? "Close" : "Menu"}
        </button>

        <nav aria-label="Primary" className="hidden max-w-full overflow-x-auto md:block">
          <ul className="flex items-center gap-2 whitespace-nowrap">
            {navItems.map((item) => {
              const active = item.isActive(pathname);

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={[
                      "inline-block rounded-full px-3 py-1.5 text-xs font-medium transition",
                      active
                        ? "bg-slate-900 text-white"
                        : "border border-slate-900/15 bg-white text-slate-900 hover:bg-slate-50",
                    ].join(" ")}
                    aria-current={active ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {mobileOpen ? (
        <nav id="mobile-primary-nav" aria-label="Mobile primary" className="border-t border-slate-900/10 px-4 pb-3 md:hidden">
          <ul className="mx-auto grid w-full max-w-6xl gap-2 pt-3">
            {navItems.map((item) => {
              const active = item.isActive(pathname);

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={[
                      "block rounded-xl px-3 py-2 text-sm font-medium transition",
                      active
                        ? "bg-slate-900 text-white"
                        : "border border-slate-900/15 bg-white text-slate-900 hover:bg-slate-50",
                    ].join(" ")}
                    aria-current={active ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
