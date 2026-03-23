import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdSenseSlot } from "@/components/ads/adsense-slot";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function BlogDetailPage({ params }: Props) {
  const articleSlot = process.env.NEXT_PUBLIC_ADSENSE_SLOT_ARTICLE?.trim();

  const { slug } = await params;
  const article = await prisma.article.findUnique({
    where: { slug },
  });

  if (!article || !article.published) {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-3xl space-y-6 px-4 py-8">
      <Link href="/blog" className="inline-block text-sm text-slate-900/80 hover:underline">
        Back to blog
      </Link>
      <article className="space-y-4 rounded-2xl border border-slate-900/10 bg-white/90 px-5 py-5">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-950">{article.title}</h1>
        <p className="text-sm leading-7 text-slate-900/85 whitespace-pre-wrap">{article.content}</p>
      </article>
      {articleSlot ? <AdSenseSlot slot={articleSlot} /> : null}
    </main>
  );
}
