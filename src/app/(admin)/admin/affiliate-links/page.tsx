import Link from "next/link";
import { createAffiliateAction, deleteAffiliateAction } from "@/features/affiliate/actions";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AffiliateLinksPage() {
  const [links, products, platforms] = await Promise.all([
    prisma.affiliateLink.findMany({
      include: { product: true, platform: true },
      orderBy: { createdAt: "desc" },
      take: 30,
    }),
    prisma.product.findMany({ orderBy: { name: "asc" } }),
    prisma.platform.findMany({ orderBy: { name: "asc" } }),
  ]);

  return (
    <main className="space-y-5">
      <h1 className="text-2xl font-semibold tracking-tight">Affiliate Links</h1>

      <form action={createAffiliateAction} className="grid gap-3 rounded-xl border border-amber-900/15 bg-orange-50/60 p-4 sm:grid-cols-2">
        <input name="label" required placeholder="Label" className="rounded-lg border border-amber-900/20 bg-white px-3 py-2" />
        <input name="trackingId" placeholder="Tracking ID" className="rounded-lg border border-amber-900/20 bg-white px-3 py-2" />
        <input name="url" required placeholder="Affiliate URL" className="rounded-lg border border-amber-900/20 bg-white px-3 py-2 sm:col-span-2" />
        <select name="productId" className="rounded-lg border border-amber-900/20 bg-white px-3 py-2">
          <option value="">No product</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>{product.name}</option>
          ))}
        </select>
        <select name="platformId" className="rounded-lg border border-amber-900/20 bg-white px-3 py-2">
          <option value="">No platform</option>
          {platforms.map((platform) => (
            <option key={platform.id} value={platform.id}>{platform.name}</option>
          ))}
        </select>
        <button type="submit" className="rounded-lg bg-amber-900 px-4 py-2 text-sm font-medium text-white sm:col-span-2">Create affiliate link</button>
      </form>

      <section className="overflow-x-auto rounded-xl border border-amber-900/15">
        <table className="w-full min-w-190 text-left text-sm">
          <thead className="bg-orange-50 text-amber-900/70">
            <tr>
              <th className="px-3 py-2">Label</th>
              <th className="px-3 py-2">Product</th>
              <th className="px-3 py-2">Platform</th>
              <th className="px-3 py-2">Tracking ID</th>
              <th className="px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {links.map((link) => (
              <tr key={link.id} className="border-t border-amber-900/10">
                <td className="px-3 py-2">{link.label}</td>
                <td className="px-3 py-2">{link.product?.name ?? "-"}</td>
                <td className="px-3 py-2">{link.platform?.name ?? "-"}</td>
                <td className="px-3 py-2">{link.trackingId ?? "-"}</td>
                <td className="px-3 py-2">
                  <div className="flex gap-2">
                    <Link href={`/admin/affiliate-links/${link.id}`} className="rounded-md border border-amber-900/20 px-2 py-1 text-xs text-amber-900">
                      Edit
                    </Link>
                    <form action={deleteAffiliateAction}>
                      <input type="hidden" name="id" value={link.id} />
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
