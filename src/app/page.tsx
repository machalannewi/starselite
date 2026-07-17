import Link from "next/link";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { FeaturedCarousel } from "@/components/featuresd-carousel";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Notable Figures — An index of people worth knowing",
  description: "A living directory of biographies, sourced from Wikipedia.",
};

export default async function HomePage() {
  const recent = await prisma.profile.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { createdAt: "desc" },
    take: 6,
  });

  return (
    <div
      style={{ background: "var(--paper)", color: "var(--ink)" }}
      className="min-h-screen"
    >
      <SiteNav />

      <section className="relative overflow-hidden">
        <Image
          src="/assets/banner.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          width={500}
          height={500}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65))",
          }}
        />

        <div className="relative max-w-5xl mx-auto px-6 pt-24 pb-24">
          <p
            className="font-mono-meta text-2xl tracking-widest uppercase"
            style={{ color: "var(--gold)" }}
          >
            STARSELITE
          </p>
          <h1
            className="font-display text-4xl md:text-5xl font-semibold mt-3 max-w-2xl leading-[1.05]"
            style={{ color: "var(--paper)" }}
          >
            Your ultimate destination for all things glamorous and star-studded!
          </h1>
          <p
            className="mt-5 max-w-lg text-[16px] leading-relaxed"
            style={{ color: "rgba(238,240,234,0.8)" }}
          >
            Here, we dive into your favorite icons, bringing you from Hollywood
            A-listers to rising stars, connecting you to your favorites,
            building industry relationships and knowledge means a lot, getting
            to meet your favorites and spreading joy and love is our goal.
          </p>
          <div className="mt-8 flex items-center gap-5">
            <Link
              href="/explore"
              className="inline-block px-6 py-3 rounded-sm font-mono-meta text-xs tracking-widest uppercase"
              style={{ background: "var(--gold)", color: "var(--ink)" }}
            >
              Explore the stars
            </Link>
            <Link
              href="/about"
              className="font-mono-meta text-xs tracking-widest uppercase underline"
              style={{ color: "var(--paper)" }}
            >
              How it works
            </Link>
          </div>
        </div>
      </section>

      <section
        className="max-w-5xl mx-auto px-6 py-16 border-t"
        style={{ borderColor: "var(--line)" }}
      >
        <div className="max-w-xl">
          <h2 className="font-display text-3xl font-semibold mb-4">
            Elevate your status: Book your favorite celebrities with ease!
          </h2>
          <p
            className="text-[17px] leading-relaxed"
            style={{ color: "var(--sage)" }}
          >
            Starselite is your premier destination for connecting with the
            biggest names in the entertainment industry! Whether you’re planning
            a corporate event, private party, or special occasion, we make it
            easy to book your favorite stars for unforgettable experiences. Our
            extensive roster includes actors, musicians, athletes, and
            influencers, ensuring you find the perfect fit for your event.
          </p>
          <Link
            href="/explore"
            className="inline-block mt-4 font-mono-meta text-xs uppercase tracking-widest underline"
            style={{ color: "var(--gold)" }}
          >
            <Button>Book a celebrity</Button>
          </Link>
        </div>
      </section>

      {recent.length > 0 && (
        <section
          className="max-w-5xl mx-auto px-6 py-16 border-t"
          style={{ borderColor: "var(--line)" }}
        >
          <div className="flex items-baseline justify-between mb-8">
            <h2 className="font-display text-3xl font-semibold">
              Some of your favorites
            </h2>
            <Link
              href="/explore"
              className="font-mono-meta text-xs uppercase tracking-widest"
              style={{ color: "var(--gold)" }}
            >
              View all →
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-5">
            {recent.map((profile) => (
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
                      width={150}
                      height={150}
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
                <p className="font-display text-sm leading-tight group-hover:underline">
                  {profile.name}
                </p>
                <Button className="cursor-pointer mt-4">Book Now</Button>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section
        className="max-w-5xl mx-auto px-6 py-16 border-t"
        style={{ borderColor: "var(--line)" }}
      >
        <p
          className="font-mono-meta text-xs tracking-widest uppercase text-center"
          style={{ color: "var(--sage)" }}
        >
          Booking Process
        </p>
        <h2 className="font-display text-3xl font-semibold mt-2 mb-10 text-center">
          How an entry is made
        </h2>

        <div className="grid sm:grid-cols-3 gap-6">
          {[
            {
              n: "01",
              t: "Find a Celebrity",
              d: "Browse or search for your favorite celebrity, influencer, athlete, or public figure and explore their profile.",
            },
            {
              n: "02",
              t: "Submit a Booking Request",
              d: "Select your event details, submit your booking information, and complete the request securely.",
            },
            {
              n: "03",
              t: "Meet Your Celebrity",
              d: "Receive confirmation, coordinate the final details, and enjoy a memorable experience with your chosen celebrity.",
            },
          ].map((step) => (
            <div
              key={step.n}
              className="group relative flex flex-col justify-between min-h-[380px] p-8 rounded-sm overflow-hidden transition-transform hover:-translate-y-1"
              style={{ background: "var(--ink)" }}
            >
              {/* subtle corner glow accent */}
              <div
                className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-20 blur-2xl"
                style={{ background: "var(--gold)" }}
              />

              <div className="relative">
                <p
                  className="font-mono-meta text-xs tracking-widest"
                  style={{ color: "var(--gold)" }}
                >
                  {step.n}
                </p>
                <h3
                  className="font-display text-2xl font-semibold mt-3 uppercase tracking-tight"
                  style={{ color: "var(--paper)" }}
                >
                  {step.t}
                </h3>
                <p
                  className="mt-4 text-[15px] leading-relaxed"
                  style={{ color: "rgba(238,240,234,0.7)" }}
                >
                  {step.d}
                </p>
              </div>

              <Link
                href="/about"
                className="relative inline-block mt-8 px-5 py-3 text-center font-mono-meta text-xs tracking-widest uppercase border transition-colors"
                style={{ borderColor: "var(--paper)", color: "var(--paper)" }}
              >
                Learn more
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section
        className="max-w-6xl mx-auto px-6 py-16 border-t"
        style={{ borderColor: "var(--line)" }}
      >
        <p
          className="font-mono-meta text-xs tracking-widest uppercase text-center"
          style={{ color: "var(--sage)" }}
        >
          What Starselite offers
        </p>
        <h2 className="font-display text-3xl font-semibold mt-2 mb-10 text-center">
          Built for Events. Your ultimate destination
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[
            {
              t: "Bookings",
              d: "From local to internationally acclaimed talent, starsdeck books them all. With 40+ years of booking experience,  stardeck can handle any need for finding, negotiating, and hiring talent for venues or one-time events.",
              img: "/assets/bookings.jpg",
            },
            {
              t: "Event Production",
              d: "Providing the right stage, sound system, and lighting arrays is critical to any performance.  Management provides whatever local production support is needed for a great show.",
              img: "/assets/event-production.jpg",
            },
            {
              t: "Event Management",
              d: "We are here to provide the help you need for your concert or festival. From planning and management functions, to putting a experienced production team on site to handle everything involved with it.",
              img: "/assets/event-management.jpg",
            },
            {
              t: "Event Sponsorship",
              d: "Our experienced team can provide your fair, festival, concert series or venue with turn-key sponsorship services to create more revenue and partnerships with local, regional and national brands.",
              img: "/assets/event-sponsorship.jpg",
            },
            {
              t: "Event Ticketing",
              d: "Looking for a full-featured, affordable, easy-to-use online ticketing platform, backed by 5-star customer service? Our ticketing platform is customized to your needs for your events.",
              img: "/assets/event-ticketing.jpg",
            },
            {
              t: "Event Marketing",
              d: "Our team of professionals can promote your concert or festival, using both online and offline channels. From extensive research to creating content, our team can handle everything from beginning to end.",
              img: "/assets/event-marketing.jpg",
            },
          ].map((feature) => (
            <div
              key={feature.t}
              className="group relative flex flex-col justify-end min-h-[380px] p-8 rounded-sm overflow-hidden transition-transform hover:-translate-y-1"
            >
              <Image
                src={feature.img}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
                width={500}
                height={500}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(32,43,34,0.95) 10%, rgba(32,43,34,0.55) 55%, rgba(32,43,34,0.15) 100%)",
                }}
              />

              <div className="relative">
                <h3
                  className="font-display text-2xl font-semibold uppercase tracking-tight"
                  style={{ color: "var(--paper)" }}
                >
                  {feature.t}
                </h3>
                <p
                  className="mt-3 text-[15px] leading-relaxed"
                  style={{ color: "rgba(238,240,234,0.85)" }}
                >
                  {feature.d}
                </p>

                <Link
                  href="/about"
                  className="inline-block mt-6 px-5 py-3 text-center font-mono-meta text-xs tracking-widest uppercase border transition-colors"
                  style={{ borderColor: "var(--paper)", color: "var(--paper)" }}
                >
                  Learn more
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <FeaturedCarousel />

      <section
        className="border-t"
        style={{
          borderColor: "var(--line)",
          background: "rgba(184,134,59,0.08)",
        }}
      >
        <div className="max-w-5xl mx-auto px-6 py-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h2 className="font-display text-2xl font-semibold">
              Looking for someone specific?
            </h2>
            <p className="mt-1 text-[15px]" style={{ color: "var(--sage)" }}>
              Browse every person on record.
            </p>
          </div>
          <Link
            href="/explore"
            className="inline-block px-6 py-3 rounded-sm font-mono-meta text-xs tracking-widest uppercase whitespace-nowrap"
            style={{ background: "var(--ink)", color: "var(--paper)" }}
          >
            Explore Celebrities
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
