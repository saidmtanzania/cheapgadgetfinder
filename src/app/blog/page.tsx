import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const articles = await prisma.article.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="mx-auto w-full max-w-4xl space-y-6 px-4 py-8">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.2em] text-amber-900/60">Guides</p>
        <h1 className="text-3xl font-semibold tracking-tight text-amber-950">Buying Guides & Comparisons</h1>
      </header>

      <section className="overflow-hidden rounded-2xl border border-amber-900/10 bg-white/90">
        {articles.length === 0 ? (
          <p className="px-4 py-8 text-sm text-amber-900/70">No published articles yet.</p>
        ) : (
          <ul className="divide-y divide-amber-900/10">
            {articles.map((article) => (
              <li key={article.id} className="space-y-2 px-4 py-4">
                <h2 className="text-xl font-semibold tracking-tight text-amber-950">{article.title}</h2>
                <p className="text-sm text-amber-900/75">{article.seoDesc || "New article available."}</p>
                <Link href={`/blog/${article.slug}`} className="inline-block text-sm font-medium text-amber-900 hover:underline">
                  Read article
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
