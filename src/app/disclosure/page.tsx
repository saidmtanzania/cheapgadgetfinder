export const metadata = {
  title: "Affiliate & Ads Disclosure | Cheap Gadget Finder",
  description: "Disclosure for affiliate links and advertising on Cheap Gadget Finder.",
};

export default function DisclosurePage() {
  return (
    <main className="mx-auto w-full max-w-4xl space-y-6 px-4 py-8 text-slate-950">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-900/60">Legal</p>
        <h1 className="text-3xl font-semibold tracking-tight">Affiliate & Ads Disclosure</h1>
      </header>

      <section className="space-y-4 rounded-2xl border border-slate-900/10 bg-white/90 px-5 py-5 text-sm leading-7 text-slate-900/85">
        <p>
          Cheap Gadget Finder participates in affiliate programs. Some outbound links are affiliate links, which means
          we may earn a commission if you click through and make a purchase, at no extra cost to you.
        </p>
        <p>
          Current affiliate platforms include Amazon, eBay, Alibaba, and AliExpress. Available merchants can change
          over time based on pricing and program terms.
        </p>
        <p>
          We also display third-party advertisements (including Google AdSense). Ads are labeled as advertisement and
          are intended to support ongoing operations of this website.
        </p>
        <p>
          Editorial decisions are made independently. Sponsored or affiliate relationships do not guarantee positive
          coverage and do not change the listed prices shown from merchants.
        </p>
        <p>
          Please verify final pricing, shipping costs, taxes, and merchant terms directly on the retailer site before
          purchasing.
        </p>
      </section>
    </main>
  );
}
