"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/auth";
import { articleSchema } from "@/lib/validators";

export async function createArticleAction(formData: FormData) {
  await requireAdminSession();

  const parsed = articleSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    content: formData.get("content"),
    seoTitle: formData.get("seoTitle") || undefined,
    seoDesc: formData.get("seoDesc") || undefined,
    published: formData.get("published") === "on",
  });

  if (!parsed.success) {
    throw new Error("Invalid article payload");
  }

  await prisma.article.create({ data: parsed.data });
  revalidatePath("/admin/articles");
}

export async function updateArticleAction(formData: FormData) {
  await requireAdminSession();
  const id = String(formData.get("id") || "");
  if (!id) {
    throw new Error("Missing article id");
  }

  const parsed = articleSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    content: formData.get("content"),
    seoTitle: formData.get("seoTitle") || undefined,
    seoDesc: formData.get("seoDesc") || undefined,
    published: formData.get("published") === "on",
  });

  if (!parsed.success) {
    throw new Error("Invalid article payload");
  }

  await prisma.article.update({ where: { id }, data: parsed.data });
  revalidatePath("/admin/articles");
  revalidatePath(`/admin/articles/${id}`);
}

export async function deleteArticleAction(formData: FormData) {
  await requireAdminSession();
  const id = String(formData.get("id") || "");
  if (!id) {
    throw new Error("Missing article id");
  }

  await prisma.article.delete({ where: { id } });
  revalidatePath("/admin/articles");
}
