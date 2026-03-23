import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { VisitorHeartbeat } from "@/components/analytics/visitor-heartbeat";
import { AdSenseScript } from "@/components/ads/adsense-script";
import { SiteHeader } from "@/components/site/site-header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cheap Gadget Finder",
  description: "Affiliate-friendly gadget comparison and admin platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentYear = new Date().getFullYear();

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AdSenseScript />
        <VisitorHeartbeat />
        <SiteHeader />
        <div className="flex-1">{children}</div>
        <footer className="border-t border-slate-900/10 bg-white/75 px-4 py-4 text-xs text-slate-900/75">
          <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-2">
            <p>© {currentYear} Cheap Gadget Finder</p>
            <nav className="flex flex-wrap gap-3">
              <Link href="/privacy-policy" className="hover:underline">
                Privacy Policy
              </Link>
              <Link href="/disclosure" className="hover:underline">
                Affiliate & Ads Disclosure
              </Link>
            </nav>
          </div>
        </footer>
      </body>
    </html>
  );
}
