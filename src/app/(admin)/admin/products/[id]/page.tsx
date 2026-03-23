import { notFound } from "next/navigation";
import { RichTextField } from "@/components/admin/rich-text-field";
import { SpecsField } from "@/components/admin/specs-field";
import { updateProductAction } from "@/features/product/actions";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ProductEditPage({ params }: Props) {
  const { id } = await params;
  const [product, brands, categories] = await Promise.all([
    prisma.product.findUnique({ where: { id }, include: { specs: true } }),
    prisma.brand.findMany({ orderBy: { name: "asc" } }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);

  if (!product) {
    notFound();
  }

  return (
    <main className="space-y-5">
      <h1 className="text-2xl font-semibold tracking-tight">Edit Product</h1>
      <form action={updateProductAction} className="grid gap-3 rounded-xl border border-slate-900/15 bg-slate-50/60 p-4 sm:grid-cols-2">
        <input type="hidden" name="id" value={product.id} />
        <input name="name" required defaultValue={product.name} placeholder="Product name" className="rounded-lg border border-slate-900/20 bg-white px-3 py-2" />
        <input name="slug" required defaultValue={product.slug} placeholder="product-slug" className="rounded-lg border border-slate-900/20 bg-white px-3 py-2" />
        <input name="image" defaultValue={product.image ?? ""} placeholder="Image URL" className="rounded-lg border border-slate-900/20 bg-white px-3 py-2 sm:col-span-2" />
        <input name="youtubeReviewUrl" defaultValue={product.youtubeReviewUrl ?? ""} placeholder="YouTube review URL" className="rounded-lg border border-slate-900/20 bg-white px-3 py-2 sm:col-span-2" />
        <RichTextField
          name="description"
          label="Product Description"
          initialValue={product.description ?? ""}
          placeholder="Write formatted product description..."
        />
        <SpecsField
          name="specItems"
          label="Specifications"
          defaultSpecs={product.specs.map((spec) => ({ key: spec.key, value: spec.value }))}
        />
        <select name="brandId" required defaultValue={product.brandId} className="rounded-lg border border-slate-900/20 bg-white px-3 py-2">
          {brands.map((brand) => (
            <option key={brand.id} value={brand.id}>{brand.name}</option>
          ))}
        </select>
        <select name="categoryId" required defaultValue={product.categoryId} className="rounded-lg border border-slate-900/20 bg-white px-3 py-2">
          {categories.map((category) => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select>
        <button type="submit" className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white sm:col-span-2">Save changes</button>
      </form>
    </main>
  );
}
