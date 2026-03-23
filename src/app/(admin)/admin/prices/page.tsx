import Link from "next/link";
import { createPriceAction, deletePriceAction } from "@/features/price/actions";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function PricesPage() {
  const [prices, products, platforms] = await Promise.all([
    prisma.productPrice.findMany({
      include: { product: true, platform: true },
      orderBy: { updatedAt: "desc" },
      take: 30,
    }),
    prisma.product.findMany({ orderBy: { name: "asc" } }),
    prisma.platform.findMany({ orderBy: { name: "asc" } }),
  ]);

  return (
    <main className="space-y-5">
      <h1 className="text-2xl font-semibold tracking-tight">Prices</h1>

      <form action={createPriceAction} className="grid gap-3 rounded-xl border border-amber-900/15 bg-orange-50/60 p-4 sm:grid-cols-3">
        <select name="productId" required className="rounded-lg border border-amber-900/20 bg-white px-3 py-2 sm:col-span-2">
          <option value="">Select product</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>{product.name}</option>
          ))}
        </select>
        <select name="platformId" required className="rounded-lg border border-amber-900/20 bg-white px-3 py-2">
          <option value="">Platform</option>
          {platforms.map((platform) => (
            <option key={platform.id} value={platform.id}>{platform.name}</option>
          ))}
        </select>
        <input name="price" type="number" step="0.01" required placeholder="Price" className="rounded-lg border border-amber-900/20 bg-white px-3 py-2" />
        <input name="currency" required defaultValue="USD" placeholder="Currency" className="rounded-lg border border-amber-900/20 bg-white px-3 py-2" />
        <input name="url" required placeholder="Product URL" className="rounded-lg border border-amber-900/20 bg-white px-3 py-2 sm:col-span-3" />
        <input name="affiliateUrl" required placeholder="Affiliate URL" className="rounded-lg border border-amber-900/20 bg-white px-3 py-2 sm:col-span-3" />
        <button type="submit" className="rounded-lg bg-amber-900 px-4 py-2 text-sm font-medium text-white sm:col-span-3">Add price</button>
      </form>

      <section className="overflow-x-auto rounded-xl border border-amber-900/15">
        <table className="w-full min-w-190 text-left text-sm">
          <thead className="bg-orange-50 text-amber-900/70">
            <tr>
              <th className="px-3 py-2">Product</th>
              <th className="px-3 py-2">Platform</th>
              <th className="px-3 py-2">Price</th>
              <th className="px-3 py-2">Updated</th>
              <th className="px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {prices.map((row) => (
              <tr key={row.id} className="border-t border-amber-900/10">
                <td className="px-3 py-2">{row.product.name}</td>
                <td className="px-3 py-2">{row.platform.name}</td>
                <td className="px-3 py-2">{row.price.toFixed(2)} {row.currency}</td>
                <td className="px-3 py-2">{row.updatedAt.toLocaleDateString()}</td>
                <td className="px-3 py-2">
                  <div className="flex gap-2">
                    <Link href={`/admin/prices/${row.id}`} className="rounded-md border border-amber-900/20 px-2 py-1 text-xs text-amber-900">
                      Edit
                    </Link>
                    <form action={deletePriceAction}>
                      <input type="hidden" name="id" value={row.id} />
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
