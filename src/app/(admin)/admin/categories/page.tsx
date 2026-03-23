import { createCategoryAction, deleteCategoryAction } from "@/features/category/actions";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function CategoriesPage() {
  const [categories, parentOptions] = await Promise.all([
    prisma.category.findMany({
      include: {
        parent: true,
        _count: {
          select: {
            products: true,
            children: true,
          },
        },
      },
      orderBy: [{ parentId: "asc" }, { name: "asc" }],
    }),
    prisma.category.findMany({
      orderBy: { name: "asc" },
    }),
  ]);

  return (
    <main className="space-y-5">
      <h1 className="text-2xl font-semibold tracking-tight">Categories</h1>

      <form action={createCategoryAction} className="grid gap-3 rounded-xl border border-amber-900/15 bg-orange-50/60 p-4 sm:grid-cols-3">
        <input name="name" required placeholder="Category name" className="rounded-lg border border-amber-900/20 bg-white px-3 py-2" />
        <input name="slug" required placeholder="category-slug" className="rounded-lg border border-amber-900/20 bg-white px-3 py-2" />
        <select name="parentId" className="rounded-lg border border-amber-900/20 bg-white px-3 py-2">
          <option value="">No parent</option>
          {parentOptions.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <button type="submit" className="rounded-lg bg-amber-900 px-4 py-2 text-sm font-medium text-white sm:col-span-3">
          Create category
        </button>
      </form>

      <section className="overflow-x-auto rounded-xl border border-amber-900/15">
        <table className="w-full min-w-190 text-left text-sm">
          <thead className="bg-orange-50 text-amber-900/70">
            <tr>
              <th className="px-3 py-2">Name</th>
              <th className="px-3 py-2">Slug</th>
              <th className="px-3 py-2">Parent</th>
              <th className="px-3 py-2">Products</th>
              <th className="px-3 py-2">Subcategories</th>
              <th className="px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id} className="border-t border-amber-900/10">
                <td className="px-3 py-2 font-medium text-amber-950">{category.name}</td>
                <td className="px-3 py-2">{category.slug}</td>
                <td className="px-3 py-2">{category.parent?.name ?? "-"}</td>
                <td className="px-3 py-2">{category._count.products}</td>
                <td className="px-3 py-2">{category._count.children}</td>
                <td className="px-3 py-2">
                  {category._count.products > 0 ? (
                    <span className="text-xs text-amber-900/65">In use</span>
                  ) : (
                    <form action={deleteCategoryAction}>
                      <input type="hidden" name="id" value={category.id} />
                      <button type="submit" className="rounded-md border border-red-900/20 px-2 py-1 text-xs text-red-800">
                        Delete
                      </button>
                    </form>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
