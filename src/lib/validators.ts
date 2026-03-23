import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  description: z.string().optional(),
  image: z.string().url().optional().or(z.literal("")),
  youtubeReviewUrl: z.string().url().optional().or(z.literal("")),
  brandId: z.string().min(1),
  categoryId: z.string().min(1),
});

export const priceSchema = z.object({
  productId: z.string().min(1),
  platformId: z.string().min(1),
  price: z.coerce.number().positive(),
  currency: z.string().min(1),
  url: z.string().url(),
  affiliateUrl: z.string().url(),
});

export const articleSchema = z.object({
  title: z.string().min(3),
  slug: z.string().min(3),
  content: z.string().min(10),
  seoTitle: z.string().optional(),
  seoDesc: z.string().optional(),
  published: z.boolean().optional(),
});

export const affiliateSchema = z.object({
  label: z.string().min(2),
  url: z.string().url(),
  trackingId: z.string().optional(),
  productId: z.string().optional(),
  platformId: z.string().optional(),
});

export const categorySchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  parentId: z.string().optional(),
});
