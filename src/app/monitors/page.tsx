import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function MonitorsPage() {
  const products = await prisma.product.findMany({
    include: {
      brand: true,
      prices: {
        include: { platform: true },
        orderBy: { price: "asc" },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="mx-auto w-full max-w-6xl space-y-6 px-4 py-8">
      <header className="overflow-hidden rounded-3xl border border-amber-900/10 bg-linear-to-r from-white/95 to-orange-50/80 p-6">
        <p className="text-xs uppercase tracking-[0.2em] text-amber-900/60">Client Catalog</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-amber-950">Monitor Deals You Can Actually Compare</h1>
        <p className="mt-2 max-w-3xl text-sm text-amber-900/80">
          Image-first browsing with clean rows, real specs, and sorted lowest prices so clients can decide fast.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-amber-900/75">
          <span className="rounded-full border border-amber-900/15 bg-white px-3 py-1">{products.length} products</span>
          <span className="rounded-full border border-amber-900/15 bg-white px-3 py-1">price-sorted</span>
          <span className="rounded-full border border-amber-900/15 bg-white px-3 py-1">affiliate-ready</span>
        </div>
      </header>

      <section className="overflow-hidden rounded-2xl border border-amber-900/10 bg-white/90">
        {products.length === 0 ? (
          <p className="px-4 py-8 text-sm text-amber-900/70">No products yet. Add products from admin.</p>
        ) : (
          <ul className="divide-y divide-amber-900/10">
            {products.map((product) => {
              const lowest = product.prices[0];
              return (
                <li key={product.id} className="grid gap-4 px-4 py-4 sm:grid-cols-[220px_1fr_auto] sm:items-center">
                  <Link href={`/product/${product.slug}`} className="block overflow-hidden rounded-xl bg-orange-100 ring-1 ring-amber-900/10">
                    {product.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={product.image} alt={product.name} className="h-32 w-full object-cover" />
                    ) : (
                      <div className="h-32 w-full" />
                    )}
                  </Link>

                  <div className="min-w-0">
                    <div className="flex flex-wrap gap-2">
                      <p className="text-xs uppercase tracking-[0.16em] text-amber-900/60">{product.brand.name}</p>
                      <span className="rounded-full bg-orange-100 px-2 py-0.5 text-[10px] uppercase tracking-[0.12em] text-amber-900/70">{product.prices.length} offers</span>
                    </div>
                    <Link href={`/product/${product.slug}`} className="mt-1 block text-lg font-semibold tracking-tight text-amber-950 hover:underline">
                      {product.name}
                    </Link>
                    <p className="mt-1 line-clamp-2 text-sm text-amber-900/75">{product.description ?? "No description"}</p>
                    <div className="mt-2">
                      <Link href={`/product/${product.slug}`} className="text-xs font-medium text-amber-900 underline-offset-4 hover:underline">
                        Open full comparison
                      </Link>
                    </div>
                  </div>

                  <div className="justify-self-start text-left sm:justify-self-end sm:text-right">
                    {lowest ? (
                      <>
                        <p className="text-xs uppercase tracking-[0.14em] text-amber-900/60">Best price</p>
                        <p className="text-lg font-semibold text-amber-950">
                          {lowest.price.toFixed(2)} {lowest.currency}
                        </p>
                        <p className="text-xs text-amber-900/70">{lowest.platform.name}</p>
                      </>
                    ) : (
                      <p className="text-xs text-amber-900/60">No price yet</p>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </main>
  );
}
