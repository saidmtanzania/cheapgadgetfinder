export const metadata = {
  title: "Privacy Policy | Cheap Gadget Finder",
  description: "Privacy information for Cheap Gadget Finder visitors.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="mx-auto w-full max-w-4xl space-y-6 px-4 py-8 text-slate-950">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-900/60">Legal</p>
        <h1 className="text-3xl font-semibold tracking-tight">Privacy Policy</h1>
        <p className="text-sm text-slate-900/75">Last updated: March 23, 2026</p>
      </header>

      <section className="space-y-4 rounded-2xl border border-slate-900/10 bg-white/90 px-5 py-5 text-sm leading-7 text-slate-900/85">
        <p>
          Cheap Gadget Finder uses analytics and advertising technologies to understand traffic and fund the service.
          We may collect device, browser, and interaction data such as visited pages, timestamps, and referral source.
        </p>
        <p>
          We may use cookies or similar identifiers for essential functionality, traffic measurement, and advertising.
          Third-party vendors, including Google, may use cookies to serve ads based on your prior visits to this and
          other websites.
        </p>
        <p>
          Google&apos;s use of advertising cookies enables it and its partners to serve ads based on your visit to this
          site and/or other sites on the Internet. You can opt out of personalized advertising by visiting Google Ads
          Settings.
        </p>
        <p>
          We do not knowingly collect personal information from children under 13. If you believe personal data has
          been submitted in error, contact us and we will remove it where possible.
        </p>
        <p>
          This policy may be updated as our product, analytics, and ad setup evolve. Continued use of the site after
          changes means you accept the updated policy.
        </p>
      </section>
    </main>
  );
}
