import { notFound } from "next/navigation";
import { updatePriceAction } from "@/features/price/actions";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function PriceEditPage({ params }: Props) {
  const { id } = await params;
  const [row, products, platforms] = await Promise.all([
    prisma.productPrice.findUnique({ where: { id } }),
    prisma.product.findMany({ orderBy: { name: "asc" } }),
    prisma.platform.findMany({ orderBy: { name: "asc" } }),
  ]);

  if (!row) {
    notFound();
  }

  return (
    <main className="space-y-5">
      <h1 className="text-2xl font-semibold tracking-tight">Edit Price</h1>
      <form action={updatePriceAction} className="grid gap-3 rounded-xl border border-amber-900/15 bg-orange-50/60 p-4 sm:grid-cols-3">
        <input type="hidden" name="id" value={row.id} />
        <select name="productId" required defaultValue={row.productId} className="rounded-lg border border-amber-900/20 bg-white px-3 py-2 sm:col-span-2">
          {products.map((product) => (
            <option key={product.id} value={product.id}>{product.name}</option>
          ))}
        </select>
        <select name="platformId" required defaultValue={row.platformId} className="rounded-lg border border-amber-900/20 bg-white px-3 py-2">
          {platforms.map((platform) => (
            <option key={platform.id} value={platform.id}>{platform.name}</option>
          ))}
        </select>
        <input name="price" type="number" step="0.01" required defaultValue={row.price} placeholder="Price" className="rounded-lg border border-amber-900/20 bg-white px-3 py-2" />
        <input name="currency" required defaultValue={row.currency} placeholder="Currency" className="rounded-lg border border-amber-900/20 bg-white px-3 py-2" />
        <input name="url" required defaultValue={row.url} placeholder="Product URL" className="rounded-lg border border-amber-900/20 bg-white px-3 py-2 sm:col-span-3" />
        <input name="affiliateUrl" required defaultValue={row.affiliateUrl} placeholder="Affiliate URL" className="rounded-lg border border-amber-900/20 bg-white px-3 py-2 sm:col-span-3" />
        <button type="submit" className="rounded-lg bg-amber-900 px-4 py-2 text-sm font-medium text-white sm:col-span-3">Save changes</button>
      </form>
    </main>
  );
}
