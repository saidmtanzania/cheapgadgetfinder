import { notFound } from "next/navigation";
import { updateAffiliateAction } from "@/features/affiliate/actions";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function AffiliateEditPage({ params }: Props) {
  const { id } = await params;
  const [link, products, platforms] = await Promise.all([
    prisma.affiliateLink.findUnique({ where: { id } }),
    prisma.product.findMany({ orderBy: { name: "asc" } }),
    prisma.platform.findMany({ orderBy: { name: "asc" } }),
  ]);

  if (!link) {
    notFound();
  }

  return (
    <main className="space-y-5">
      <h1 className="text-2xl font-semibold tracking-tight">Edit Affiliate Link</h1>
      <form action={updateAffiliateAction} className="grid gap-3 rounded-xl border border-amber-900/15 bg-orange-50/60 p-4 sm:grid-cols-2">
        <input type="hidden" name="id" value={link.id} />
        <input name="label" required defaultValue={link.label} placeholder="Label" className="rounded-lg border border-amber-900/20 bg-white px-3 py-2" />
        <input name="trackingId" defaultValue={link.trackingId ?? ""} placeholder="Tracking ID" className="rounded-lg border border-amber-900/20 bg-white px-3 py-2" />
        <input name="url" required defaultValue={link.url} placeholder="Affiliate URL" className="rounded-lg border border-amber-900/20 bg-white px-3 py-2 sm:col-span-2" />
        <select name="productId" defaultValue={link.productId ?? ""} className="rounded-lg border border-amber-900/20 bg-white px-3 py-2">
          <option value="">No product</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>{product.name}</option>
          ))}
        </select>
        <select name="platformId" defaultValue={link.platformId ?? ""} className="rounded-lg border border-amber-900/20 bg-white px-3 py-2">
          <option value="">No platform</option>
          {platforms.map((platform) => (
            <option key={platform.id} value={platform.id}>{platform.name}</option>
          ))}
        </select>
        <button type="submit" className="rounded-lg bg-amber-900 px-4 py-2 text-sm font-medium text-white sm:col-span-2">Save changes</button>
      </form>
    </main>
  );
}
