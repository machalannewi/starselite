"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Explore" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header
      className="border-b sticky top-0 z-30 backdrop-blur"
      style={{
        borderColor: "var(--line)",
        background: "rgba(238,240,234,0.85)",
      }}
    >
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="font-display text-lg font-semibold"
          style={{ color: "var(--ink)" }}
        >
          STARSELITE
        </Link>

        <nav className="hidden sm:flex items-center gap-7">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="font-mono-meta text-xs tracking-widest uppercase pb-1 border-b-2 transition-colors"
                style={{
                  color: active ? "var(--gold)" : "var(--sage)",
                  borderColor: active ? "var(--gold)" : "transparent",
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <button
          className="sm:hidden flex flex-col gap-1.5 w-6"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="h-px w-full" style={{ background: "var(--ink)" }} />
          <span className="h-px w-full" style={{ background: "var(--ink)" }} />
          <span className="h-px w-full" style={{ background: "var(--ink)" }} />
        </button>
      </div>

      {open && (
        <nav
          className="sm:hidden flex flex-col px-6 pb-4 gap-3"
          style={{ background: "var(--paper)" }}
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="font-mono-meta text-xs tracking-widest uppercase"
              style={{
                color: pathname === link.href ? "var(--gold)" : "var(--sage)",
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
