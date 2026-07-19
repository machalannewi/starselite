"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    smartsupp?: (...args: any[]) => void;
  }
}

const EXCLUDED_PATHS = ["/admin", "/sign-in", "/sign-up"];
const DISMISS_KEY = "chat-teaser-dismissed";
const SHOW_AFTER_MS = 4000;

export function ChatTeaser() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  const isExcluded = EXCLUDED_PATHS.some((path) => pathname.startsWith(path));

  useEffect(() => {
    if (isExcluded) return;

    const dismissedAt = sessionStorage.getItem(DISMISS_KEY);
    if (dismissedAt) return;

    const timer = setTimeout(() => setVisible(true), SHOW_AFTER_MS);
    return () => clearTimeout(timer);
  }, [isExcluded]);

  function dismiss() {
    setVisible(false);
    sessionStorage.setItem(DISMISS_KEY, "1");
  }

  function openChat() {
    if (typeof window !== "undefined" && window.smartsupp) {
      window.smartsupp("chat:open");
    }
    dismiss();
  }

  if (isExcluded || !visible) return null;

  return (
    <div
      className="fixed bottom-24 right-6 z-[9998] max-w-[240px] animate-in fade-in slide-in-from-bottom-2 duration-300"
      role="status"
    >
      <div
        className="relative rounded-sm border shadow-lg px-4 py-3"
        style={{ background: "var(--ink)", borderColor: "var(--gold)" }}
      >
        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss"
          className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center text-[10px] touch-manipulation"
          style={{ background: "var(--paper)", color: "var(--ink)" }}
        >
          ✕
        </button>

        <button
          type="button"
          onClick={openChat}
          className="text-left w-full touch-manipulation"
        >
          <p
            className="font-mono-meta text-[10px] tracking-widest uppercase mb-1"
            style={{ color: "var(--gold)" }}
          >
            Need help?
          </p>
          <p className="font-display text-sm leading-snug" style={{ color: "var(--paper)" }}>
            Welcome to StarsElite! Chat with us for any questions or assistance you need. We're here to help you make the most of your experience.
          </p>
        </button>

        {/* pointer tail toward the chat bubble */}
        <div
          className="absolute -bottom-2 right-6 w-3 h-3 rotate-45"
          style={{ background: "var(--ink)", borderRight: "1px solid var(--gold)", borderBottom: "1px solid var(--gold)" }}
        />
      </div>
    </div>
  );
}