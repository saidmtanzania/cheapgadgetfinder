"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/auth";
import { affiliateSchema } from "@/lib/validators";

export async function createAffiliateAction(formData: FormData) {
  await requireAdminSession();

  const parsed = affiliateSchema.safeParse({
    label: formData.get("label"),
    url: formData.get("url"),
    trackingId: formData.get("trackingId") || undefined,
    productId: formData.get("productId") || undefined,
    platformId: formData.get("platformId") || undefined,
  });

  if (!parsed.success) {
    throw new Error("Invalid affiliate payload");
  }

  await prisma.affiliateLink.create({ data: parsed.data });
  revalidatePath("/admin/affiliate-links");
}

export async function updateAffiliateAction(formData: FormData) {
  await requireAdminSession();
  const id = String(formData.get("id") || "");
  if (!id) {
    throw new Error("Missing affiliate link id");
  }

  const parsed = affiliateSchema.safeParse({
    label: formData.get("label"),
    url: formData.get("url"),
    trackingId: formData.get("trackingId") || undefined,
    productId: formData.get("productId") || undefined,
    platformId: formData.get("platformId") || undefined,
  });

  if (!parsed.success) {
    throw new Error("Invalid affiliate payload");
  }

  await prisma.affiliateLink.update({ where: { id }, data: parsed.data });
  revalidatePath("/admin/affiliate-links");
  revalidatePath(`/admin/affiliate-links/${id}`);
}

export async function deleteAffiliateAction(formData: FormData) {
  await requireAdminSession();
  const id = String(formData.get("id") || "");
  if (!id) {
    throw new Error("Missing affiliate link id");
  }

  await prisma.affiliateLink.delete({ where: { id } });
  revalidatePath("/admin/affiliate-links");
}
