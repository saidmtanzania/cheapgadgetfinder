import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdSenseSlot } from "@/components/ads/adsense-slot";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ProductDetailPage({ params }: Props) {
  const productSlot = process.env.NEXT_PUBLIC_ADSENSE_SLOT_PRODUCT?.trim();

  const { slug } = await params;

  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      brand: true,
      category: true,
      specs: true,
      prices: {
        include: { platform: true },
        orderBy: { price: "asc" },
      },
    },
  });

  if (!product) {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-6xl space-y-8 px-4 py-8">
      <Link href="/monitors" className="inline-block text-sm text-slate-900/80 hover:underline">
        Back to monitors
      </Link>

      <section className="grid gap-6 md:grid-cols-[1.3fr_1fr]">
        <div className="overflow-hidden rounded-2xl border border-slate-900/10 bg-white/90">
          {product.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={product.image} alt={product.name} className="h-72 w-full object-cover" />
          ) : (
            <div className="h-72 w-full bg-slate-100" />
          )}
          <div className="space-y-2 px-5 py-4">
            <p className="text-xs uppercase tracking-[0.16em] text-slate-900/60">{product.brand.name}</p>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-950">{product.name}</h1>
            {product.description ? (
              <article
                className="space-y-2 text-sm leading-6 text-slate-900/85 [&_a]:font-medium [&_a]:text-slate-900 [&_a]:underline [&_blockquote]:border-l-2 [&_blockquote]:border-slate-900/20 [&_blockquote]:pl-3 [&_h2]:mt-3 [&_h2]:text-base [&_h2]:font-semibold [&_h3]:mt-2 [&_h3]:font-semibold [&_li]:ml-5 [&_li]:list-disc"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            ) : (
              <p className="text-sm text-slate-900/80">No description available yet.</p>
            )}
            <div className="flex flex-wrap gap-2 text-xs text-slate-900/75">
              <span className="rounded-full border border-slate-900/15 bg-white px-3 py-1">{product.prices.length} live offers</span>
              <span className="rounded-full border border-slate-900/15 bg-white px-3 py-1">{product.specs.length} specs captured</span>
            </div>
            {product.youtubeReviewUrl ? (
              <a
                href={product.youtubeReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-block rounded-lg border border-red-700/30 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-900"
              >
                Watch YouTube review
              </a>
            ) : null}
          </div>
        </div>

        <aside className="space-y-4 rounded-2xl border border-slate-900/10 bg-white/90 px-4 py-4">
          <h2 className="text-lg font-semibold tracking-tight text-slate-950">Best Deals</h2>
          {product.prices.length === 0 ? (
            <p className="text-sm text-slate-900/70">No prices yet.</p>
          ) : (
            <ul className="space-y-3">
              {product.prices.map((entry) => (
                <li key={entry.id} className="rounded-xl border border-slate-900/10 bg-slate-50/70 px-3 py-3">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-medium text-slate-950">{entry.platform.name}</p>
                    <p className="text-base font-semibold text-slate-950">
                      {entry.price.toFixed(2)} {entry.currency}
                    </p>
                  </div>
                  <a
                    href={entry.affiliateUrl || entry.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-medium text-white"
                  >
                    View Deal
                  </a>
                </li>
              ))}
            </ul>
          )}
        </aside>
      </section>

      <section className="space-y-3 rounded-2xl border border-slate-900/10 bg-white/90 px-4 py-4">
        <h2 className="text-xl font-semibold tracking-tight text-slate-950">Specifications</h2>
        {product.specs.length === 0 ? (
          <p className="text-sm text-slate-900/70">No specs yet.</p>
        ) : (
          <dl className="grid gap-2 sm:grid-cols-2">
            {product.specs.map((spec) => (
              <div key={spec.id} className="rounded-lg border border-slate-900/10 bg-slate-50/70 px-3 py-2">
                <dt className="text-xs uppercase tracking-[0.14em] text-slate-900/60">{spec.key}</dt>
                <dd className="mt-1 text-sm font-medium text-slate-950">{spec.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </section>

      {productSlot ? <AdSenseSlot slot={productSlot} /> : null}
    </main>
  );
}
