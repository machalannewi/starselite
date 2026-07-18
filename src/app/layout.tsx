import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import { Fraunces, Libre_Franklin, JetBrains_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import { LiveChat } from "@/components/live-chat";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
});

const libreFranklin = Libre_Franklin({
  subsets: ["latin"],
  variable: "--font-body",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Notable Figures",
  description: "Browse profiles of notable figures.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={`${fraunces.variable} ${libreFranklin.variable} ${jetbrainsMono.variable} font-body`}
      >
        <body className="min-h-full flex flex-col">
          {children}
          <Toaster position="bottom-center"/>
          <LiveChat />
        </body>
      </html>
    </ClerkProvider>
  );
}
