import type { Metadata } from "next";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Contact — Notable Figures",
  description: "Report an error or suggest a name for the index.",
};

export default function ContactPage() {
  return (
    <div
      style={{ background: "var(--paper)", color: "var(--ink)" }}
      className="min-h-screen"
    >
      <SiteNav />
      <main className="max-w-2xl mx-auto px-6 py-20">
        <p
          className="font-mono-meta text-xs tracking-widest uppercase"
          style={{ color: "var(--sage)" }}
        >
          Get in touch
        </p>
        <h1 className="font-display text-4xl font-semibold mt-3 mb-6">
          Have any projects and creative ideas in mind ?
        </h1>
        <p
          className="text-[16px] leading-relaxed mb-8"
          style={{ color: "var(--sage)" }}
        >
          Feel free to get in touch with us. We are always open to discussing
          new projects, creative ideas or opportunities to be part of your
          videos.
        </p>
        <a
          href="mailto:hello@yourdomain.com"
          className="inline-block px-6 py-3 rounded-sm font-mono-meta text-xs tracking-widest uppercase"
          style={{ background: "var(--ink)", color: "var(--paper)" }}
        >
          support@stars-elite.com
        </a>
      </main>

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
      <SiteFooter />
    </div>
  );
}
