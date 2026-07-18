"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Explore" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

interface SearchResult {
  slug: string;
  name: string;
  thumbnailUrl: string | null;
}

export function SiteNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // debounced search
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    setLoading(true);
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data.results || []);
      } finally {
        setLoading(false);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  // close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function openSearch() {
    setSearchOpen(true);
    setTimeout(() => inputRef.current?.focus(), 50);
  }

  function goTo(slug: string) {
    setSearchOpen(false);
    setQuery("");
    setResults([]);
    router.push(`/${slug}`);
  }

  return (
    <header className="sticky top-0 z-[9999] border-b" style={{ borderColor: "var(--line)" }}>
      {/* blurred background layer, isolated from interactive content
          (Safari on iOS can swallow touch hit-testing on buttons that
          share a stacking context with backdrop-filter) */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: "rgba(238,240,234,0.85)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-display text-lg font-semibold" style={{ color: "var(--ink)" }}>
          <Image alt="Starselite" src="/assets/starselite-logo.png" width={150} height={150} />
        </Link>

        <div className="flex items-center gap-6">
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

          <div className="relative" ref={searchRef}>
            <button
              type="button"
              onClick={openSearch}
              aria-label="Search"
              className="w-10 h-10 flex items-center justify-center rounded-full transition-colors touch-manipulation"
              style={{ color: "var(--ink)" }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="7" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>

              {searchOpen && (
                <div
                  className="fixed left-4 right-4 top-16 z-50 rounded-sm border shadow-lg overflow-hidden sm:absolute sm:left-auto sm:right-0 sm:top-auto sm:mt-3 sm:w-80"
                  style={{ borderColor: "var(--line)", background: "var(--paper)" }}
                >
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search a celebrity..."
                  className="w-full px-4 py-3 text-sm bg-transparent outline-none"
                  style={{ color: "var(--ink)", borderBottom: "1px solid var(--line)" }}
                />

                {query.trim() && (
                  <div className="max-h-80 overflow-y-auto">
                    {loading ? (
                      <p className="px-4 py-3 text-xs font-mono-meta" style={{ color: "var(--sage)" }}>
                        Searching...
                      </p>
                    ) : results.length === 0 ? (
                      <p className="px-4 py-3 text-xs font-mono-meta" style={{ color: "var(--sage)" }}>
                        No matches found.
                      </p>
                    ) : (
                      results.map((r) => (
                        <button
                          type="button"
                          key={r.slug}
                          onClick={() => goTo(r.slug)}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-black/5 transition-colors touch-manipulation"
                        >
                          <div
                            className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0"
                            style={{ background: "var(--line)" }}
                          >
                            {r.thumbnailUrl && (
                              <img src={r.thumbnailUrl} alt={r.name} className="w-full h-full object-cover" />
                            )}
                          </div>
                          <span className="font-display text-sm" style={{ color: "var(--ink)" }}>
                            {r.name}
                          </span>
                        </button>
                      ))
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          <button
            type="button"
            className="sm:hidden flex flex-col items-center justify-center gap-1.5 w-8 h-8 touch-manipulation"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="h-px w-full" style={{ background: "var(--ink)" }} />
            <span className="h-px w-full" style={{ background: "var(--ink)" }} />
            <span className="h-px w-full" style={{ background: "var(--ink)" }} />
          </button>
        </div>
      </div>

      {open && (
        <nav
          className="sm:hidden relative z-10 flex flex-col px-6 pb-4 gap-3"
          style={{ background: "var(--paper)" }}
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="font-mono-meta text-xs tracking-widest uppercase"
              style={{ color: pathname === link.href ? "var(--gold)" : "var(--sage)" }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}