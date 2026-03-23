import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const [productCount, priceCount, articleCount, affiliateCount] = await Promise.all([
    prisma.product.count(),
    prisma.productPrice.count(),
    prisma.article.count(),
    prisma.affiliateLink.count(),
  ]);

  const stats = [
    { label: "Products", value: productCount },
    { label: "Tracked Prices", value: priceCount },
    { label: "Articles", value: articleCount },
    { label: "Affiliate Links", value: affiliateCount },
  ];

  return (
    <main className="space-y-5">
      <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <article key={stat.label} className="rounded-xl border border-amber-900/15 bg-orange-50/70 px-4 py-3">
            <p className="text-xs uppercase tracking-[0.16em] text-amber-900/60">{stat.label}</p>
            <p className="mt-2 text-2xl font-semibold text-amber-950">{stat.value}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
