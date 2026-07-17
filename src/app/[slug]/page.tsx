import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { SiteNav } from "@/components/site-nav";
import { BookingForm } from "@/components/booking-form";
import { SiteFooter } from "@/components/site-footer";

interface ProfilePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ProfilePageProps): Promise<Metadata> {
  const { slug } = await params;
  const profile = await prisma.profile.findUnique({ where: { slug } });
  if (!profile) return {};

  return {
    title: profile.name,
    description: profile.extract.slice(0, 160),
    openGraph: {
      title: profile.name,
      description: profile.extract.slice(0, 160),
      images: profile.thumbnailUrl ? [profile.thumbnailUrl] : [],
    },
  };
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { slug } = await params;
  const profile = await prisma.profile.findUnique({ where: { slug } });

  if (!profile || profile.status !== "PUBLISHED") {
    notFound();
  }

  return (
    <div
      style={{ background: "var(--paper)", color: "var(--ink)" }}
      className="min-h-screen"
    >
      <SiteNav />
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link
          href="/"
          className="font-mono-meta text-xs tracking-widest uppercase inline-block mb-10"
          style={{ color: "var(--sage)" }}
        >
          ← Home
        </Link>

        <div
          className="relative border rounded-sm bg-white/50 p-8 md:p-10"
          style={{ borderColor: "var(--line)" }}
        >
          {/* corner stamp */}
          <div
            className="absolute top-6 right-6 rotate-6 font-mono-meta text-[10px] tracking-widest uppercase border rounded-full px-3 py-1.5"
            style={{ borderColor: "var(--seal)", color: "var(--seal)" }}
          >
            Wikipedia entry
          </div>

          <div className="flex flex-col sm:flex-row gap-8 items-start">
            {profile.thumbnailUrl && (
              <Image
                src={profile.thumbnailUrl}
                alt={profile.name}
                className="w-32 h-32 object-cover rounded-sm flex-shrink-0"
                style={{ border: "1px solid var(--line)" }}
                width={50}
                height={50}
              />
            )}
            <div>
              <h1 className="font-display text-4xl font-semibold leading-tight">
                {profile.name}
              </h1>
              <div
                className="h-px w-16 my-4"
                style={{ background: "var(--gold)" }}
              />
            </div>
          </div>

          <p className="mt-8 text-[16px] leading-[1.8] whitespace-pre-line max-w-2xl">
            {profile.extract}
          </p>

          <div
            className="mt-10 pt-6 border-t font-mono-meta text-xs"
            style={{ borderColor: "var(--line)", color: "var(--sage)" }}
          >
            Sourced from{" "}
            <a
              href={profile.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
              style={{ color: "var(--gold)" }}
            >
              Wikipedia
            </a>
            , available under{" "}
            <a
              href="https://creativecommons.org/licenses/by-sa/4.0/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
              style={{ color: "var(--gold)" }}
            >
              CC BY-SA 4.0
            </a>
            .
          </div>
        </div>
      </div>
      <BookingForm figureName={profile.name} figureSlug={profile.slug} />
      <SiteFooter />
    </div>
  );
}
