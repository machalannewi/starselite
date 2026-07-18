import Link from "next/link";

export function SiteFooter() {
  return (
    <footer
      className="border-t mt-20"
      style={{ borderColor: "var(--line)", backgroundColor: "black" }}
    >
      <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col sm:flex-row justify-between gap-6">
        <div>
          <p className="font-display text-base font-semibold text-white">
            STARSELITE
          </p>
          <p
            className="font-mono-meta text-xs mt-2 max-w-xs"
            style={{ color: "gray" }}
          >
            Connecting you to your favorites, With 40 years of building industry
            relationships and knowledge means you get the best rates and someone
            at your side advising you every step of the way, saving you time and
            money.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <Link
            href="/explore"
            className="font-mono-meta text-xs uppercase tracking-widest"
            style={{ color: "white" }}
          >
            Explore
          </Link>
          <Link
            href="/about"
            className="font-mono-meta text-xs uppercase tracking-widest"
            style={{ color: "white" }}
          >
            About
          </Link>
          <Link
            href="/contact"
            className="font-mono-meta text-xs uppercase tracking-widest"
            style={{ color: "white" }}
          >
            Contact
          </Link>
          <Link
            href="mailto:support@stars-elite.com"
            className="font-mono-meta text-xs uppercase tracking-widest"
            style={{ color: "var(--gold)" }}
          >
            support@stars-elite.com
          </Link>
        </div>
      </div>

      <div
        className="max-w-5xl mx-auto px-6 pb-8 font-mono-meta text-[11px]"
        style={{ color: "var(--sage)" }}
      >
        © {new Date().getFullYear()} STARSELITE.
      </div>
    </footer>
  );
}
