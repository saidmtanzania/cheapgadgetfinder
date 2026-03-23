"use server";

import { revalidatePath } from "next/cache";
import sanitizeHtml from "sanitize-html";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/auth";
import { productSchema } from "@/lib/validators";

type SpecItem = {
  key: string;
  value: string;
};

function parseSpecItems(formData: FormData): SpecItem[] {
  const raw = String(formData.get("specItems") || "[]");

  try {
    const parsed = JSON.parse(raw) as Array<{ key?: unknown; value?: unknown }>;

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .map((item) => ({
        key: typeof item.key === "string" ? item.key.trim() : "",
        value: typeof item.value === "string" ? item.value.trim() : "",
      }))
      .filter((item) => item.key.length > 0 && item.value.length > 0)
      .slice(0, 40);
  } catch {
    return [];
  }
}

function normalizeDescription(input?: string) {
  if (!input) {
    return null;
  }

  const plainText = sanitizeHtml(input, { allowedTags: [], allowedAttributes: {} }).trim();
  if (!plainText) {
    return null;
  }

  return sanitizeHtml(input, {
    allowedTags: [
      "p",
      "br",
      "strong",
      "em",
      "ul",
      "ol",
      "li",
      "h2",
      "h3",
      "blockquote",
      "code",
      "pre",
      "a",
    ],
    allowedAttributes: {
      a: ["href", "target", "rel"],
    },
    allowedSchemes: ["http", "https", "mailto"],
  });
}

export async function createProductAction(formData: FormData) {
  await requireAdminSession();

  const parsed = productSchema.safeParse({
    name: formData.get("name"),
    slug: formData.get("slug"),
    description: formData.get("description") || undefined,
    image: formData.get("image") || "",
    youtubeReviewUrl: formData.get("youtubeReviewUrl") || "",
    brandId: formData.get("brandId"),
    categoryId: formData.get("categoryId"),
  });

  if (!parsed.success) {
    throw new Error("Invalid product payload");
  }

  const description = normalizeDescription(parsed.data.description);
  const specItems = parseSpecItems(formData);

  const createdProduct = await prisma.product.create({
    data: {
      ...parsed.data,
      description,
      image: parsed.data.image || null,
      youtubeReviewUrl: parsed.data.youtubeReviewUrl || null,
    },
  });

  if (specItems.length > 0) {
    await prisma.productSpec.createMany({
      data: specItems.map((item) => ({
        productId: createdProduct.id,
        key: item.key,
        value: item.value,
      })),
    });
  }

  revalidatePath("/admin/products");
}

export async function updateProductAction(formData: FormData) {
  await requireAdminSession();
  const id = String(formData.get("id") || "");
  if (!id) {
    throw new Error("Missing product id");
  }

  const parsed = productSchema.safeParse({
    name: formData.get("name"),
    slug: formData.get("slug"),
    description: formData.get("description") || undefined,
    image: formData.get("image") || "",
    youtubeReviewUrl: formData.get("youtubeReviewUrl") || "",
    brandId: formData.get("brandId"),
    categoryId: formData.get("categoryId"),
  });

  if (!parsed.success) {
    throw new Error("Invalid product payload");
  }

  const description = normalizeDescription(parsed.data.description);
  const specItems = parseSpecItems(formData);

  await prisma.product.update({
    where: { id },
    data: {
      ...parsed.data,
      description,
      image: parsed.data.image || null,
      youtubeReviewUrl: parsed.data.youtubeReviewUrl || null,
    },
  });

  await prisma.productSpec.deleteMany({ where: { productId: id } });
  if (specItems.length > 0) {
    await prisma.productSpec.createMany({
      data: specItems.map((item) => ({
        productId: id,
        key: item.key,
        value: item.value,
      })),
    });
  }

  revalidatePath("/admin/products");
  revalidatePath(`/admin/products/${id}`);
}

export async function deleteProductAction(formData: FormData) {
  await requireAdminSession();
  const id = String(formData.get("id") || "");
  if (!id) {
    throw new Error("Missing product id");
  }

  await prisma.product.delete({ where: { id } });
  revalidatePath("/admin/products");
}
