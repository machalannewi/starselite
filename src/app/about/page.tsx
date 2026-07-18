import type { Metadata } from "next";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About — Notable Figures",
  description: "What Notable Figures is, and how each entry is made.",
};

export default function AboutPage() {
  return (
    <div
      style={{ background: "var(--paper)", color: "var(--ink)" }}
      className="min-h-screen"
    >
      <SiteNav />
      <main>
        <div className="max-w-3xl mx-auto px-6 py-20">
          <p
            className="font-mono-meta text-xs tracking-widest uppercase"
            style={{ color: "var(--sage)" }}
          >
            About Starselite
          </p>
          <h1 className="font-display text-4xl font-semibold mt-3 mb-8">
            A fast, factual page for every notable name.
          </h1>

          <div className="space-y-6 text-[16px] leading-[1.8]">
            <p>
              We are a professional platform specializing in celebrity booking,
              dedicated to bringing the charm and excitement of stars to your
              events. Whether it’s a corporate gathering, private party, or
              large celebration, we provide top-notch celebrity booking services
              to make your event truly unique.
            </p>
            <p>
              Our team has extensive industry experience and understands the
              unique needs of each event. We have built strong relationships
              with a wide range of celebrities, musicians, actors, and athletes,
              allowing us to recommend the perfect fit based on your budget and
              theme. We ensure that every detail is meticulously arranged, from
              booking to on-site coordination, striving to make your event
              seamless.
            </p>
            <p>
              By choosing us, you not only receive professional service but also
              experience exceptional event planning. Let us help you create the
              event of your dreams and leave a lasting impression on your
              guests!
            </p>
            <Link
              href="/explore"
              className="inline-block px-6 py-3 rounded-sm font-mono-meta text-xs tracking-widest uppercase whitespace-nowrap"
              style={{ background: "var(--ink)", color: "var(--paper)" }}
            >
              GET IN TOUCH
            </Link>
          </div>
        </div>

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

          <div className="relative max-w-5xl mx-auto px-6 pt-16 pb-24">
            <p
              className="font-mono-meta text-2xl tracking-widest uppercase text-center mb-9"
              style={{ color: "var(--gold)" }}
            >
              Why Us ?
            </p>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[
                {
                  t: "We Know What You Want",
                  d: "The most important part of who we are, and why we continue to last when other agencies come and go is simply that we know what you want. We’ve seen it all in our 40 plus years of booking and handling production and logistics in a variety of venues. Relationships, just like reputations need to be built on trust. It takes time to get to know an artist, learn their needs, ambitions, and how they like to work.",
                },
                {
                  t: "We Make Sure Everything Goes Smoothly",
                  d: "Our job is not just to make you money, find work, and keep your interests at the forefront of negotiations, but also to is to make things operate smoothly for everyone involved.",
                },
                {
                  t: "We Are Real People Who Want to Help",
                  d: "Venues expect us to delivery quality acts that show up ready to do their job. They expect us to stand behind our services and have the components in place to allow the best performance possible.",
                },
              ].map((feature) => (
                <div
                  key={feature.t}
                  className="group relative flex flex-col justify-end min-h-[380px] p-8 rounded-sm overflow-hidden transition-transform hover:-translate-y-1"
                >
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
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="max-w-3xl mx-auto px-6 py-20">
          <h1 className="font-display text-4xl font-semibold mt-10 mb-8">
            We Are a Great Full-Service platform
          </h1>

          <div className="space-y-6 text-[16px] leading-[1.8]">
            <p>
              We are a comprehensive full-service celebrity booking site,
              dedicated to providing an all-inclusive experience for our
              clients. Our platform simplifies the process of connecting with
              top-tier talent, ensuring that every aspect of your booking is
              handled with precision and care. From initial inquiries to final
              arrangements, we manage it all, allowing you to focus on what
              matters most—your event.
            </p>
            <p>
              Our extensive network includes a wide variety of celebrities
              across different fields, including music, film, sports, and social
              media. This diversity enables us to cater to a broad range of
              events and themes, ensuring that you find the perfect star to
              enhance your occasion. Our experienced team works closely with
              clients to understand their vision and requirements, providing
              personalized recommendations that fit their specific needs.
            </p>
            <p>
              In addition to booking, we offer a suite of services that includes
              event planning assistance, logistics coordination, and on-site
              support. Our goal is to create a seamless experience that exceeds
              your expectations. With our full-service approach, you can rest
              assured that every detail will be meticulously handled, resulting
              in an unforgettable event that leaves a lasting impression on your
              guests.
            </p>
          </div>
        </div>

        {/* Address & Map */}
        <section
          className="border-t"
          style={{
            borderColor: "rgba(0,0,0,0.08)",
            background: "var(--paper)",
          }}
        >
          <div className="max-w-7xl mx-auto px-6 py-20">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Contact Details */}
              <div>
                <p
                  className="font-mono-meta text-xs tracking-widest uppercase"
                  style={{ color: "var(--gold)" }}
                >
                  Visit Our Office
                </p>

                <h2 className="font-display text-4xl font-semibold mt-3 mb-6">
                  We would Love to Meet You
                </h2>

                <div className="space-y-5 text-[16px] leading-8">
                  <div>
                    <strong>Address</strong>
                    <p>123 Celebrity Avenue, Beverly Hills, CA 90210, USA</p>
                  </div>

                  <div>
                    <strong>Email</strong>
                    <p>
                      <a href="mailto:support@stars-elite.com">
                        support@stars-elite.com
                      </a>
                    </p>
                  </div>

                  <div>
                    <strong>Phone</strong>
                    <p>
                      <a href="tel:+12345678900">+1 (234) 567-8900</a>
                    </p>
                  </div>

                  <div>
                    <strong>Working Hours</strong>
                    <p>Monday – Friday: 9:00 AM – 6:00 PM</p>
                  </div>
                </div>
              </div>

              {/* Google Map */}
              <div className="overflow-hidden rounded-lg shadow-lg h-[450px]">
                <iframe
                  title="StarsElite Office Location"
                  src="https://www.google.com/maps?q=123+Celebrity+Avenue,+Beverly+Hills,+CA+90210&output=embed"
                  width="100%"
                  height="100%"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  className="border-0"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
