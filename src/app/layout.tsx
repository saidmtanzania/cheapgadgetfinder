import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { VisitorHeartbeat } from "@/components/analytics/visitor-heartbeat";
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
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <VisitorHeartbeat />
        {children}
      </body>
    </html>
  );
}
