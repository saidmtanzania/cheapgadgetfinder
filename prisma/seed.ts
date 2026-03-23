import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

async function main() {
  const displaysCategory = await prisma.category.upsert({
    where: { slug: "displays" },
    update: { name: "Displays", parentId: null },
    create: { name: "Displays", slug: "displays", parentId: null },
  });

  const monitorCategory = await prisma.category.upsert({
    where: { slug: "monitors" },
    update: { name: "Monitors", parentId: displaysCategory.id },
    create: {
      name: "Monitors",
      slug: "monitors",
      parentId: displaysCategory.id,
    },
  });

  const extraCategories = [
    { name: "Ultrawide Monitors", slug: "ultrawide-monitors", parentId: monitorCategory.id },
    { name: "Gaming Monitors", slug: "gaming-monitors", parentId: monitorCategory.id },
    { name: "Portable Monitors", slug: "portable-monitors", parentId: monitorCategory.id },
    { name: "Accessories", slug: "accessories", parentId: null },
    { name: "Monitor Arms", slug: "monitor-arms", parentId: null },
    { name: "Video Cables", slug: "video-cables", parentId: null },
  ];

  for (const category of extraCategories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: { name: category.name, parentId: category.parentId },
      create: category,
    });
  }

  const brands = [
    { name: "MSI", slug: "msi" },
    { name: "LG", slug: "lg" },
    { name: "Samsung", slug: "samsung" },
  ];

  for (const brand of brands) {
    await prisma.brand.upsert({
      where: { slug: brand.slug },
      update: { name: brand.name },
      create: brand,
    });
  }

  const platforms = [
    { name: "Amazon", slug: "amazon" },
    { name: "AliExpress", slug: "aliexpress" },
    { name: "eBay", slug: "ebay" },
    { name: "Alibaba", slug: "alibaba" },
  ];

  for (const platform of platforms) {
    await prisma.platform.upsert({
      where: { slug: platform.slug },
      update: { name: platform.name },
      create: platform,
    });
  }

  const msiBrand = await prisma.brand.findUnique({ where: { slug: "msi" } });
  if (!msiBrand) {
    throw new Error("MSI brand missing after seed upsert");
  }

  const sampleProduct = await prisma.product.upsert({
    where: { slug: "msi-mag-346cq" },
    update: {
      name: "MSI MAG 346CQ",
      description: "34-inch ultrawide gaming monitor.",
      image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1200&q=80",
      youtubeReviewUrl: "https://www.youtube.com/watch?v=QpkL7Gm9qf4",
      brandId: msiBrand.id,
      categoryId: monitorCategory.id,
    },
    create: {
      name: "MSI MAG 346CQ",
      slug: "msi-mag-346cq",
      description: "34-inch ultrawide gaming monitor.",
      image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1200&q=80",
      youtubeReviewUrl: "https://www.youtube.com/watch?v=QpkL7Gm9qf4",
      brandId: msiBrand.id,
      categoryId: monitorCategory.id,
    },
  });

  await prisma.productSpec.upsert({
    where: { id: `${sampleProduct.id}-resolution` },
    update: { key: "Resolution", value: "3440x1440" },
    create: {
      id: `${sampleProduct.id}-resolution`,
      key: "Resolution",
      value: "3440x1440",
      productId: sampleProduct.id,
    },
  });

  const amazon = await prisma.platform.findUnique({ where: { slug: "amazon" } });
  const aliexpress = await prisma.platform.findUnique({ where: { slug: "aliexpress" } });
  const ebay = await prisma.platform.findUnique({ where: { slug: "ebay" } });
  const alibaba = await prisma.platform.findUnique({ where: { slug: "alibaba" } });
  const lgBrand = await prisma.brand.findUnique({ where: { slug: "lg" } });

  if (!amazon) {
    throw new Error("Amazon platform missing after seed upsert");
  }
  if (!aliexpress) {
    throw new Error("AliExpress platform missing after seed upsert");
  }
  if (!ebay) {
    throw new Error("eBay platform missing after seed upsert");
  }
  if (!alibaba) {
    throw new Error("Alibaba platform missing after seed upsert");
  }
  if (!lgBrand) {
    throw new Error("LG brand missing after seed upsert");
  }

  const secondProduct = await prisma.product.upsert({
    where: { slug: "lg-ultragear-34gn850" },
    update: {
      name: "LG UltraGear 34GN850",
      description: "34-inch Nano IPS curved gaming monitor.",
      image: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&q=80",
      youtubeReviewUrl: "https://www.youtube.com/watch?v=fW2R7WQn0nA",
      brandId: lgBrand.id,
      categoryId: monitorCategory.id,
    },
    create: {
      name: "LG UltraGear 34GN850",
      slug: "lg-ultragear-34gn850",
      description: "34-inch Nano IPS curved gaming monitor.",
      image: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&q=80",
      youtubeReviewUrl: "https://www.youtube.com/watch?v=fW2R7WQn0nA",
      brandId: lgBrand.id,
      categoryId: monitorCategory.id,
    },
  });

  await prisma.productSpec.upsert({
    where: { id: `${secondProduct.id}-refresh` },
    update: { key: "Refresh Rate", value: "160Hz" },
    create: {
      id: `${secondProduct.id}-refresh`,
      key: "Refresh Rate",
      value: "160Hz",
      productId: secondProduct.id,
    },
  });

  const existingPrice = await prisma.productPrice.findFirst({
    where: {
      productId: sampleProduct.id,
      platformId: amazon.id,
    },
  });

  if (existingPrice) {
    await prisma.productPrice.update({
      where: { id: existingPrice.id },
      data: {
        price: 520,
        currency: "USD",
        url: "https://amazon.com/example-msi-mag-346cq",
        affiliateUrl: "https://amazon.com/example-msi-mag-346cq?tag=cheapgadgetfinder-20",
      },
    });
  } else {
    await prisma.productPrice.create({
      data: {
        price: 520,
        currency: "USD",
        url: "https://amazon.com/example-msi-mag-346cq",
        affiliateUrl: "https://amazon.com/example-msi-mag-346cq?tag=cheapgadgetfinder-20",
        productId: sampleProduct.id,
        platformId: amazon.id,
      },
    });
  }

  const secondProductPrice = await prisma.productPrice.findFirst({
    where: {
      productId: secondProduct.id,
      platformId: aliexpress.id,
    },
  });

  if (secondProductPrice) {
    await prisma.productPrice.update({
      where: { id: secondProductPrice.id },
      data: {
        price: 639,
        currency: "USD",
        url: "https://aliexpress.com/example-lg-ultragear-34gn850",
        affiliateUrl: "https://aliexpress.com/example-lg-ultragear-34gn850?aff_fcid=cheapgadgetfinder",
      },
    });
  } else {
    await prisma.productPrice.create({
      data: {
        price: 639,
        currency: "USD",
        url: "https://aliexpress.com/example-lg-ultragear-34gn850",
        affiliateUrl: "https://aliexpress.com/example-lg-ultragear-34gn850?aff_fcid=cheapgadgetfinder",
        productId: secondProduct.id,
        platformId: aliexpress.id,
      },
    });
  }

  const ebayPrice = await prisma.productPrice.findFirst({
    where: {
      productId: sampleProduct.id,
      platformId: ebay.id,
    },
  });

  if (ebayPrice) {
    await prisma.productPrice.update({
      where: { id: ebayPrice.id },
      data: {
        price: 534,
        currency: "USD",
        url: "https://ebay.com/itm/example-msi-mag-346cq",
        affiliateUrl: "https://rover.ebay.com/rover/1/711-53200-19255-0/1?mpre=https://ebay.com/itm/example-msi-mag-346cq",
      },
    });
  } else {
    await prisma.productPrice.create({
      data: {
        price: 534,
        currency: "USD",
        url: "https://ebay.com/itm/example-msi-mag-346cq",
        affiliateUrl: "https://rover.ebay.com/rover/1/711-53200-19255-0/1?mpre=https://ebay.com/itm/example-msi-mag-346cq",
        productId: sampleProduct.id,
        platformId: ebay.id,
      },
    });
  }

  const alibabaPrice = await prisma.productPrice.findFirst({
    where: {
      productId: secondProduct.id,
      platformId: alibaba.id,
    },
  });

  if (alibabaPrice) {
    await prisma.productPrice.update({
      where: { id: alibabaPrice.id },
      data: {
        price: 612,
        currency: "USD",
        url: "https://www.alibaba.com/product-detail/example-lg-ultragear-34gn850",
        affiliateUrl: "https://www.alibaba.com/product-detail/example-lg-ultragear-34gn850?spm=affiliate-demo",
      },
    });
  } else {
    await prisma.productPrice.create({
      data: {
        price: 612,
        currency: "USD",
        url: "https://www.alibaba.com/product-detail/example-lg-ultragear-34gn850",
        affiliateUrl: "https://www.alibaba.com/product-detail/example-lg-ultragear-34gn850?spm=affiliate-demo",
        productId: secondProduct.id,
        platformId: alibaba.id,
      },
    });
  }

  await prisma.article.upsert({
    where: { slug: "best-monitor-for-rtx-4060" },
    update: {
      title: "Best Monitor for RTX 4060 in 2026",
      seoTitle: "Best Monitor for RTX 4060 - Budget and High FPS Picks",
      seoDesc: "Compare top budget and ultrawide monitors for RTX 4060 with real price differences.",
      content:
        "If you are pairing a monitor with RTX 4060, focus on 1440p high-refresh options first. Ultrawide is great for immersion, but check both panel quality and pricing gaps across platforms before buying.",
      published: true,
    },
    create: {
      title: "Best Monitor for RTX 4060 in 2026",
      slug: "best-monitor-for-rtx-4060",
      seoTitle: "Best Monitor for RTX 4060 - Budget and High FPS Picks",
      seoDesc: "Compare top budget and ultrawide monitors for RTX 4060 with real price differences.",
      content:
        "If you are pairing a monitor with RTX 4060, focus on 1440p high-refresh options first. Ultrawide is great for immersion, but check both panel quality and pricing gaps across platforms before buying.",
      published: true,
    },
  });

  await prisma.affiliateLink.upsert({
    where: { id: "seed-amazon-monitor-link" },
    update: {
      label: "Amazon MSI MAG Deal",
      url: "https://amazon.com/example-msi-mag-346cq?tag=cheapgadgetfinder-20",
      trackingId: "cheapgadgetfinder-20",
      productId: sampleProduct.id,
      platformId: amazon.id,
    },
    create: {
      id: "seed-amazon-monitor-link",
      label: "Amazon MSI MAG Deal",
      url: "https://amazon.com/example-msi-mag-346cq?tag=cheapgadgetfinder-20",
      trackingId: "cheapgadgetfinder-20",
      productId: sampleProduct.id,
      platformId: amazon.id,
    },
  });

  await prisma.affiliateLink.upsert({
    where: { id: "seed-ebay-monitor-link" },
    update: {
      label: "eBay MSI MAG Deal",
      url: "https://rover.ebay.com/rover/1/711-53200-19255-0/1?mpre=https://ebay.com/itm/example-msi-mag-346cq",
      trackingId: "ebay-campaign-01",
      productId: sampleProduct.id,
      platformId: ebay.id,
    },
    create: {
      id: "seed-ebay-monitor-link",
      label: "eBay MSI MAG Deal",
      url: "https://rover.ebay.com/rover/1/711-53200-19255-0/1?mpre=https://ebay.com/itm/example-msi-mag-346cq",
      trackingId: "ebay-campaign-01",
      productId: sampleProduct.id,
      platformId: ebay.id,
    },
  });

  await prisma.affiliateLink.upsert({
    where: { id: "seed-alibaba-lg-link" },
    update: {
      label: "Alibaba LG UltraGear Offer",
      url: "https://www.alibaba.com/product-detail/example-lg-ultragear-34gn850?spm=affiliate-demo",
      trackingId: "alibaba-affiliate-demo",
      productId: secondProduct.id,
      platformId: alibaba.id,
    },
    create: {
      id: "seed-alibaba-lg-link",
      label: "Alibaba LG UltraGear Offer",
      url: "https://www.alibaba.com/product-detail/example-lg-ultragear-34gn850?spm=affiliate-demo",
      trackingId: "alibaba-affiliate-demo",
      productId: secondProduct.id,
      platformId: alibaba.id,
    },
  });

  await prisma.affiliateLink.upsert({
    where: { id: "seed-aliexpress-lg-link" },
    update: {
      label: "AliExpress LG UltraGear Offer",
      url: "https://aliexpress.com/example-lg-ultragear-34gn850?aff_fcid=cheapgadgetfinder",
      trackingId: "cheapgadgetfinder",
      productId: secondProduct.id,
      platformId: aliexpress.id,
    },
    create: {
      id: "seed-aliexpress-lg-link",
      label: "AliExpress LG UltraGear Offer",
      url: "https://aliexpress.com/example-lg-ultragear-34gn850?aff_fcid=cheapgadgetfinder",
      trackingId: "cheapgadgetfinder",
      productId: secondProduct.id,
      platformId: aliexpress.id,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
