import Link from "next/link";
import { AdSenseSlot } from "@/components/ads/adsense-slot";

export default function Home() {
  const homeSlot = process.env.NEXT_PUBLIC_ADSENSE_SLOT_HOME?.trim();

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#f8fafc,#e2e8f0,#cbd5e1)] px-4 py-10 text-slate-950">
      <section className="mx-auto w-full max-w-6xl space-y-8">
        <div className="rounded-3xl border border-slate-900/10 bg-white/85 p-8 backdrop-blur">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-900/60">Cheap Gadget Finder</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight">Find The Best Gadget Price In Seconds</h1>
          <p className="mt-3 max-w-2xl text-slate-900/75">
            Compare prices across platforms, check key specs, and use trusted affiliate links to buy smarter.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/monitors" className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white">
              Browse Monitors
            </Link>
            <Link href="/blog" className="rounded-xl border border-slate-900/20 px-4 py-2 text-sm font-medium text-slate-950">
              Read Buying Guides
            </Link>
            <Link href="#what-you-get" className="rounded-xl border border-slate-900/20 px-4 py-2 text-sm font-medium text-slate-950">
              See How It Works
            </Link>
            <Link href="#quick-answers" className="rounded-xl border border-slate-900/20 px-4 py-2 text-sm font-medium text-slate-950">
              Quick Answers
            </Link>
          </div>

          <div className="mt-5">
            <Link
              href="#what-you-get"
              className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-slate-900/65 hover:text-slate-900"
            >
              <span className="inline-block animate-bounce">v</span>
              <span>Scroll for details</span>
            </Link>
          </div>
        </div>

        {homeSlot ? (
          <AdSenseSlot slot={homeSlot} className="rounded-2xl border border-slate-900/10 bg-white/90 p-4" />
        ) : null}

        <div className="grid gap-4 md:grid-cols-3">
          <article className="rounded-2xl border border-slate-900/10 bg-white/85 px-4 py-4">
            <p className="text-xs uppercase tracking-[0.16em] text-slate-900/60">Step 1</p>
            <h2 className="mt-1 text-lg font-semibold tracking-tight">Pick a product</h2>
            <p className="mt-1 text-sm text-slate-900/75">Open the monitor catalog and choose the model you want.</p>
          </article>
          <article className="rounded-2xl border border-slate-900/10 bg-white/85 px-4 py-4">
            <p className="text-xs uppercase tracking-[0.16em] text-slate-900/60">Step 2</p>
            <h2 className="mt-1 text-lg font-semibold tracking-tight">Compare platform prices</h2>
            <p className="mt-1 text-sm text-slate-900/75">See the cheapest offer from Amazon, AliExpress, eBay, and more.</p>
          </article>
          <article className="rounded-2xl border border-slate-900/10 bg-white/85 px-4 py-4">
            <p className="text-xs uppercase tracking-[0.16em] text-slate-900/60">Step 3</p>
            <h2 className="mt-1 text-lg font-semibold tracking-tight">Buy from trusted links</h2>
            <p className="mt-1 text-sm text-slate-900/75">Use affiliate links to jump directly to the selected offer.</p>
          </article>
        </div>

        <section id="what-you-get" className="grid gap-4 md:grid-cols-2">
          <article className="rounded-2xl border border-slate-900/10 bg-white/85 px-5 py-5">
            <p className="text-xs uppercase tracking-[0.16em] text-slate-900/60">What You Get</p>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight text-slate-950">Built for faster buying decisions</h2>
            <ul className="mt-4 space-y-2 text-sm text-slate-900/80">
              <li>Live price sorting so the best offer appears first.</li>
              <li>Simple spec overviews to compare without opening ten tabs.</li>
              <li>Guides that explain what matters before you buy.</li>
            </ul>
          </article>

          <article className="rounded-2xl border border-slate-900/10 bg-white/85 px-5 py-5">
            <p className="text-xs uppercase tracking-[0.16em] text-slate-900/60">Start Here</p>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight text-slate-950">Choose your browsing path</h2>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              <Link href="/monitors" className="rounded-xl border border-slate-900/15 bg-slate-50 px-3 py-3 text-sm font-medium text-slate-900 hover:bg-slate-100">
                Explore monitor deals
              </Link>
              <Link href="/blog" className="rounded-xl border border-slate-900/15 bg-slate-50 px-3 py-3 text-sm font-medium text-slate-900 hover:bg-slate-100">
                Read buying guides
              </Link>
            </div>
          </article>
        </section>

        <section id="quick-answers" className="rounded-2xl border border-slate-900/10 bg-white/85 px-5 py-5">
          <p className="text-xs uppercase tracking-[0.16em] text-slate-900/60">Quick Answers</p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight text-slate-950">Common questions before buying</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            <article className="rounded-xl border border-slate-900/10 bg-slate-50/80 px-3 py-3">
              <h3 className="text-sm font-semibold text-slate-950">Are prices always updated?</h3>
              <p className="mt-1 text-sm text-slate-900/75">Prices are refreshed regularly, but final checkout price is always on the retailer page.</p>
            </article>
            <article className="rounded-xl border border-slate-900/10 bg-slate-50/80 px-3 py-3">
              <h3 className="text-sm font-semibold text-slate-950">Do you sell products directly?</h3>
              <p className="mt-1 text-sm text-slate-900/75">No, we help compare options and send you to trusted stores through partner links.</p>
            </article>
            <article className="rounded-xl border border-slate-900/10 bg-slate-50/80 px-3 py-3">
              <h3 className="text-sm font-semibold text-slate-950">Where should I begin?</h3>
              <p className="mt-1 text-sm text-slate-900/75">Start with Monitors for deals, then check Guides if you need help choosing specs.</p>
            </article>
          </div>
        </section>
      </section>
    </main>
  );
}
