"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const PLACEHOLDER_IMAGES = [
  "/assets/inmoyang.jpg",
  "/assets/Luzidasl.jpg",
  "/assets/BillyJoel.jpg",
  "/assets/rick-trevino-showcase.jpg",
  "/assets/michael-grandinetti-showcase.jpg",
  "/assets/henry-cavill.jpg",
  "/assets/jason-momoa.jpg",
];

export function FeaturedCarousel() {
  const [index, setIndex] = useState(0);
  const visibleCount = 4;
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % PLACEHOLDER_IMAGES.length);
    }, 3500);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  function prev() {
    setIndex(
      (i) => (i - 1 + PLACEHOLDER_IMAGES.length) % PLACEHOLDER_IMAGES.length,
    );
  }
  function next() {
    setIndex((i) => (i + 1) % PLACEHOLDER_IMAGES.length);
  }

  const visible = Array.from(
    { length: visibleCount },
    (_, i) => PLACEHOLDER_IMAGES[(index + i) % PLACEHOLDER_IMAGES.length],
  );

  return (
    <section className="relative py-12" style={{ background: "var(--ink)" }}>
      <div className="max-w-6xl mx-auto px-6">
        <p
          className="font-mono-meta text-xs tracking-widest uppercase text-center mb-8"
          style={{ color: "var(--gold)" }}
        >
          Featured celebrities
        </p>

        <div className="relative flex items-center">
          <button
            onClick={prev}
            aria-label="Previous"
            className="absolute left-0 z-10 w-9 h-9 rounded-full flex items-center justify-center -translate-x-4"
            style={{
              background: "rgba(238,240,234,0.15)",
              color: "var(--paper)",
            }}
          >
            ‹
          </button>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 w-full overflow-hidden">
            {visible.map((img, i) => (
              <div
                key={`${img}-${index}-${i}`}
                className="relative aspect-[3/4] overflow-hidden"
              >
                <Image
                  src={img}
                  alt=""
                  className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-500"
                  width={500}
                  height={500}
                />
              </div>
            ))}
          </div>

          <button
            onClick={next}
            aria-label="Next"
            className="absolute right-0 z-10 w-9 h-9 rounded-full flex items-center justify-center translate-x-4"
            style={{
              background: "rgba(238,240,234,0.15)",
              color: "var(--paper)",
            }}
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}
