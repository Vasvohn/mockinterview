"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Wordmark } from "@/components/shell/Wordmark";
import { focusRing } from "@/lib/ui";

const links = [
  { href: "/dashboard", label: "Sessions" },
  { href: "/offres", label: "Offres" },
] as const;

export function AppHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-white/25 bg-secondary/75 backdrop-blur-xl">
      <a
        href="#contenu"
        className={`sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-md focus:bg-cta focus:px-3 focus:py-2 focus:text-sm focus:text-white ${focusRing}`}
      >
        Aller au contenu
      </a>
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-5">
        <Link href="/" className={`rounded-sm ${focusRing}`} aria-label="MockInterview, accueil">
          <Wordmark className="text-white" />
        </Link>
        <nav className="flex items-center gap-1" aria-label="Navigation">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-md px-3 py-1.5 text-sm text-white ${focusRing} ${
                  active ? "bg-white/15" : "hover:bg-white/10"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
