import Link from "next/link";
import { RichTextField } from "@/components/admin/rich-text-field";
import { SpecsField } from "@/components/admin/specs-field";
import { createProductAction, deleteProductAction } from "@/features/product/actions";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const [products, brands, categories] = await Promise.all([
    prisma.product.findMany({
      orderBy: { createdAt: "desc" },
      include: { brand: true, category: true },
      take: 20,
    }),
    prisma.brand.findMany({ orderBy: { name: "asc" } }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);

  return (
    <main className="space-y-5">
      <h1 className="text-2xl font-semibold tracking-tight">Products</h1>

      <form action={createProductAction} className="grid gap-3 rounded-xl border border-slate-900/15 bg-slate-50/60 p-4 sm:grid-cols-2">
        <input name="name" required placeholder="Product name" className="rounded-lg border border-slate-900/20 bg-white px-3 py-2" />
        <input name="slug" required placeholder="product-slug" className="rounded-lg border border-slate-900/20 bg-white px-3 py-2" />
        <input name="image" placeholder="Image URL" className="rounded-lg border border-slate-900/20 bg-white px-3 py-2 sm:col-span-2" />
        <input name="youtubeReviewUrl" placeholder="YouTube review URL" className="rounded-lg border border-slate-900/20 bg-white px-3 py-2 sm:col-span-2" />
        <RichTextField
          name="description"
          label="Product Description"
          placeholder="Write formatted product description..."
        />
        <SpecsField name="specItems" label="Specifications" />
        <select name="brandId" required className="rounded-lg border border-slate-900/20 bg-white px-3 py-2">
          <option value="">Select brand</option>
          {brands.map((brand) => (
            <option key={brand.id} value={brand.id}>{brand.name}</option>
          ))}
        </select>
        <select name="categoryId" required className="rounded-lg border border-slate-900/20 bg-white px-3 py-2">
          <option value="">Select category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select>
        <button type="submit" className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white sm:col-span-2">Create product</button>
      </form>

      <section className="overflow-x-auto rounded-xl border border-slate-900/15">
        <table className="w-full min-w-180 text-left text-sm">
          <thead className="bg-slate-50 text-slate-900/70">
            <tr>
              <th className="px-3 py-2">Product</th>
              <th className="px-3 py-2">Brand</th>
              <th className="px-3 py-2">Category</th>
              <th className="px-3 py-2">YouTube Review</th>
              <th className="px-3 py-2">Slug</th>
              <th className="px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-t border-slate-900/10">
                <td className="px-3 py-2">
                  <div className="flex items-center gap-3">
                    <div className="h-11 w-16 overflow-hidden rounded-md bg-slate-100">
                      {product.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                      ) : null}
                    </div>
                    <span>{product.name}</span>
                  </div>
                </td>
                <td className="px-3 py-2">{product.brand.name}</td>
                <td className="px-3 py-2">{product.category.name}</td>
                <td className="px-3 py-2">{product.youtubeReviewUrl ? "Yes" : "No"}</td>
                <td className="px-3 py-2">{product.slug}</td>
                <td className="px-3 py-2">
                  <div className="flex gap-2">
                    <Link href={`/admin/products/${product.id}`} className="rounded-md border border-slate-900/20 px-2 py-1 text-xs text-slate-900">
                      Edit
                    </Link>
                    <form action={deleteProductAction}>
                      <input type="hidden" name="id" value={product.id} />
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
