import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#fff7ed,#ffedd5,#fdba74)] px-4 py-10 text-amber-950">
      <section className="mx-auto w-full max-w-6xl space-y-8">
        <div className="rounded-3xl border border-amber-900/10 bg-white/85 p-8 backdrop-blur">
          <p className="text-xs uppercase tracking-[0.2em] text-amber-900/60">Cheap Gadget Finder</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight">Find The Best Gadget Price In Seconds</h1>
          <p className="mt-3 max-w-2xl text-amber-900/75">
            Compare prices across platforms, check key specs, and use trusted affiliate links to buy smarter.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/monitors" className="rounded-xl bg-amber-900 px-4 py-2 text-sm font-medium text-white">
              Browse Monitors
            </Link>
            <Link href="/blog" className="rounded-xl border border-amber-900/20 px-4 py-2 text-sm font-medium text-amber-950">
              Read Buying Guides
            </Link>
            <Link href="/login" className="rounded-xl border border-amber-900/20 px-4 py-2 text-sm font-medium text-amber-950">
              Admin Login
            </Link>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <article className="rounded-2xl border border-amber-900/10 bg-white/85 px-4 py-4">
            <p className="text-xs uppercase tracking-[0.16em] text-amber-900/60">Step 1</p>
            <h2 className="mt-1 text-lg font-semibold tracking-tight">Pick a product</h2>
            <p className="mt-1 text-sm text-amber-900/75">Open the monitor catalog and choose the model you want.</p>
          </article>
          <article className="rounded-2xl border border-amber-900/10 bg-white/85 px-4 py-4">
            <p className="text-xs uppercase tracking-[0.16em] text-amber-900/60">Step 2</p>
            <h2 className="mt-1 text-lg font-semibold tracking-tight">Compare platform prices</h2>
            <p className="mt-1 text-sm text-amber-900/75">See the cheapest offer from Amazon, AliExpress, eBay, and more.</p>
          </article>
          <article className="rounded-2xl border border-amber-900/10 bg-white/85 px-4 py-4">
            <p className="text-xs uppercase tracking-[0.16em] text-amber-900/60">Step 3</p>
            <h2 className="mt-1 text-lg font-semibold tracking-tight">Buy from trusted links</h2>
            <p className="mt-1 text-sm text-amber-900/75">Use affiliate links to jump directly to the selected offer.</p>
          </article>
        </div>
      </section>
    </main>
  );
}
