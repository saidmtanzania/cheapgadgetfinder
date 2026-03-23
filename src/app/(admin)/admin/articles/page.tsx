import Link from "next/link";
import { createArticleAction, deleteArticleAction } from "@/features/article/actions";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function ArticlesPage() {
  const articles = await prisma.article.findMany({
    orderBy: { createdAt: "desc" },
    take: 30,
  });

  return (
    <main className="space-y-5">
      <h1 className="text-2xl font-semibold tracking-tight">Articles</h1>

      <form action={createArticleAction} className="grid gap-3 rounded-xl border border-slate-900/15 bg-slate-50/60 p-4 sm:grid-cols-2">
        <input name="title" required placeholder="Article title" className="rounded-lg border border-slate-900/20 bg-white px-3 py-2" />
        <input name="slug" required placeholder="article-slug" className="rounded-lg border border-slate-900/20 bg-white px-3 py-2" />
        <input name="seoTitle" placeholder="SEO title" className="rounded-lg border border-slate-900/20 bg-white px-3 py-2 sm:col-span-2" />
        <textarea name="seoDesc" placeholder="SEO description" rows={2} className="rounded-lg border border-slate-900/20 bg-white px-3 py-2 sm:col-span-2" />
        <textarea name="content" required placeholder="Write article content..." rows={8} className="rounded-lg border border-slate-900/20 bg-white px-3 py-2 sm:col-span-2" />
        <label className="flex items-center gap-2 text-sm text-slate-900/80 sm:col-span-2">
          <input name="published" type="checkbox" /> Publish now
        </label>
        <button type="submit" className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white sm:col-span-2">Create article</button>
      </form>

      <section className="overflow-x-auto rounded-xl border border-slate-900/15">
        <table className="w-full min-w-190 text-left text-sm">
          <thead className="bg-slate-50 text-slate-900/70">
            <tr>
              <th className="px-3 py-2">Title</th>
              <th className="px-3 py-2">Slug</th>
              <th className="px-3 py-2">Published</th>
              <th className="px-3 py-2">Created</th>
              <th className="px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article) => (
              <tr key={article.id} className="border-t border-slate-900/10">
                <td className="px-3 py-2">{article.title}</td>
                <td className="px-3 py-2">{article.slug}</td>
                <td className="px-3 py-2">{article.published ? "Yes" : "No"}</td>
                <td className="px-3 py-2">{article.createdAt.toLocaleDateString()}</td>
                <td className="px-3 py-2">
                  <div className="flex gap-2">
                    <Link href={`/admin/articles/${article.id}`} className="rounded-md border border-slate-900/20 px-2 py-1 text-xs text-slate-900">
                      Edit
                    </Link>
                    <form action={deleteArticleAction}>
                      <input type="hidden" name="id" value={article.id} />
                      <button type="submit" className="rounded-md border border-red-900/20 px-2 py-1 text-xs text-red-800">Delete</button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
