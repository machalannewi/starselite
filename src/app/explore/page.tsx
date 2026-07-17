import Link from "next/link";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Explore — Notable Figures",
  description: "Browse every entry in the index, alphabetically.",
};

export default async function ExplorePage() {
  const profiles = await prisma.profile.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { name: "asc" },
  });

  const groups = profiles.reduce<Record<string, typeof profiles>>((acc, p) => {
    const letter = p.name.charAt(0).toUpperCase();
    acc[letter] = acc[letter] || [];
    acc[letter].push(p);
    return acc;
  }, {});

  console.log(groups);
  console.log(profiles);

  const letters = Object.keys(groups).sort();

  return (
    <div
      style={{ background: "var(--paper)", color: "var(--ink)" }}
      className="min-h-screen"
    >
      <SiteNav />

      <header
        className="max-w-5xl mx-auto px-6 pt-16 pb-10 border-b"
        style={{ borderColor: "var(--line)" }}
      >
        {/* <p
          className="font-mono-meta text-xs tracking-widest uppercase"
          style={{ color: "var(--sage)" }}
        >
          {profiles.length} {profiles.length === 1 ? "entry" : "entries"} on
          record
        </p> */}
        <h1 className="font-display text-5xl font-semibold mt-2">
          The Celebrities
        </h1>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">
        {letters.length === 0 ? (
          <p style={{ color: "var(--sage)" }}>No entries yet.</p>
        ) : (
          letters.map((letter) => (
            <section key={letter} className="mb-14">
              <div className="flex items-baseline gap-4 mb-6">
                <span
                  className="font-display text-4xl"
                  style={{ color: "var(--gold)" }}
                >
                  {letter}
                </span>
                <span
                  className="flex-1 h-px"
                  style={{ background: "var(--line)" }}
                />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
                {groups[letter].map((profile) => (
                  <Link
                    key={profile.id}
                    href={`/${profile.slug}`}
                    className="group block rounded-sm border bg-white/40 hover:bg-white/70 transition-colors p-3"
                    style={{ borderColor: "var(--line)" }}
                  >
                    <div
                      className="aspect-square w-full overflow-hidden rounded-sm mb-3"
                      style={{ background: "var(--line)" }}
                    >
                      {profile.thumbnailUrl ? (
                        <Image
                          src={profile.thumbnailUrl}
                          alt={profile.name}
                          className="w-full h-full object-cover"
                          width={50}
                          height={50}
                        />
                      ) : (
                        <div
                          className="w-full h-full flex items-center justify-center font-display text-2xl"
                          style={{ color: "var(--sage)" }}
                        >
                          {profile.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <p className="font-display text-base leading-tight group-hover:underline">
                      {profile.name}
                    </p>

                    <Button className="mt-2">Book Now</Button>
                  </Link>
                ))}
              </div>
            </section>
          ))
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
