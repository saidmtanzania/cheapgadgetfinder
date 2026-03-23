# Cheap Gadget Finder

Affiliate-friendly gadget comparison platform with blog content, admin CMS, and AdSense-ready ad placements.

## Run Locally

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`.

## AdSense Setup

1. In `.env`, set:

```dotenv
NEXT_PUBLIC_ADSENSE_CLIENT="ca-pub-your-publisher-id"
NEXT_PUBLIC_ADSENSE_SLOT_HOME="your-home-slot-id"
NEXT_PUBLIC_ADSENSE_SLOT_BLOG="your-blog-slot-id"
NEXT_PUBLIC_ADSENSE_SLOT_ARTICLE="your-article-slot-id"
NEXT_PUBLIC_ADSENSE_SLOT_PRODUCT="your-product-slot-id"
```

1. Update `public/ads.txt` with your real publisher ID:

```txt
google.com, pub-your-publisher-id, DIRECT, f08c47fec0942fa0
```

1. Deploy, then verify these public pages are accessible:

- `/privacy-policy`
- `/disclosure`
- `/blog`
- `/monitors`

## Policy-Safe Monetization Checklist

- Keep ad labels visible ("Advertisement") and avoid deceptive placement near affiliate buttons.
- Do not ask users to click ads or use incentivized wording.
- Ensure meaningful original content exists before applying (guides, comparisons, product info).
- Keep navigation, legal pages, and contact/privacy information easy to find.
- Avoid placing ads in admin/auth areas or on low-content/thin pages.

## Useful Commands

```bash
pnpm lint
pnpm prisma:generate
pnpm prisma:migrate
pnpm prisma:seed
```
