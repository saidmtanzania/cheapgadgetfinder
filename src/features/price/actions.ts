"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/auth";
import { priceSchema } from "@/lib/validators";

export async function createPriceAction(formData: FormData) {
  await requireAdminSession();

  const parsed = priceSchema.safeParse({
    productId: formData.get("productId"),
    platformId: formData.get("platformId"),
    price: formData.get("price"),
    currency: formData.get("currency"),
    url: formData.get("url"),
    affiliateUrl: formData.get("affiliateUrl"),
  });

  if (!parsed.success) {
    throw new Error("Invalid price payload");
  }

  await prisma.productPrice.create({ data: parsed.data });
  revalidatePath("/admin/prices");
}

export async function updatePriceAction(formData: FormData) {
  await requireAdminSession();
  const id = String(formData.get("id") || "");
  if (!id) {
    throw new Error("Missing price id");
  }

  const parsed = priceSchema.safeParse({
    productId: formData.get("productId"),
    platformId: formData.get("platformId"),
    price: formData.get("price"),
    currency: formData.get("currency"),
    url: formData.get("url"),
    affiliateUrl: formData.get("affiliateUrl"),
  });

  if (!parsed.success) {
    throw new Error("Invalid price payload");
  }

  await prisma.productPrice.update({ where: { id }, data: parsed.data });
  revalidatePath("/admin/prices");
  revalidatePath(`/admin/prices/${id}`);
}

export async function deletePriceAction(formData: FormData) {
  await requireAdminSession();
  const id = String(formData.get("id") || "");
  if (!id) {
    throw new Error("Missing price id");
  }

  await prisma.productPrice.delete({ where: { id } });
  revalidatePath("/admin/prices");
}
