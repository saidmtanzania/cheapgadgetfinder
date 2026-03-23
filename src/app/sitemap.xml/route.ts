import { NextResponse } from "next/server";

export async function GET() {
  // TODO: Dynamically generate URLs for all important pages
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "cheapgadgetfinder.com";
  const staticUrls = [
    "",
    "blog",
    "monitors",
    "privacy-policy",
    "disclosure",
    "product",
    "admin",
    "auth/login"
  ];

  const urls = staticUrls.map(
    (path) => `<url><loc>${baseUrl}/${path}</loc></url>`
  ).join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml"
    }
  });
}
