import { notFound } from "next/navigation";
import { updateArticleAction } from "@/features/article/actions";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ArticleEditPage({ params }: Props) {
  const { id } = await params;
  const article = await prisma.article.findUnique({ where: { id } });

  if (!article) {
    notFound();
  }

  return (
    <main className="space-y-5">
      <h1 className="text-2xl font-semibold tracking-tight">Edit Article</h1>
      <form action={updateArticleAction} className="grid gap-3 rounded-xl border border-slate-900/15 bg-slate-50/60 p-4 sm:grid-cols-2">
        <input type="hidden" name="id" value={article.id} />
        <input name="title" required defaultValue={article.title} placeholder="Article title" className="rounded-lg border border-slate-900/20 bg-white px-3 py-2" />
        <input name="slug" required defaultValue={article.slug} placeholder="article-slug" className="rounded-lg border border-slate-900/20 bg-white px-3 py-2" />
        <input name="seoTitle" defaultValue={article.seoTitle ?? ""} placeholder="SEO title" className="rounded-lg border border-slate-900/20 bg-white px-3 py-2 sm:col-span-2" />
        <textarea name="seoDesc" defaultValue={article.seoDesc ?? ""} placeholder="SEO description" rows={2} className="rounded-lg border border-slate-900/20 bg-white px-3 py-2 sm:col-span-2" />
        <textarea name="content" required defaultValue={article.content} placeholder="Write article content..." rows={10} className="rounded-lg border border-slate-900/20 bg-white px-3 py-2 sm:col-span-2" />
        <label className="flex items-center gap-2 text-sm text-slate-900/80 sm:col-span-2">
          <input name="published" type="checkbox" defaultChecked={article.published} /> Publish
        </label>
        <button type="submit" className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white sm:col-span-2">Save changes</button>
      </form>
    </main>
  );
}
