"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/auth";
import { categorySchema } from "@/lib/validators";

export async function createCategoryAction(formData: FormData) {
  await requireAdminSession();

  const parsed = categorySchema.safeParse({
    name: formData.get("name"),
    slug: formData.get("slug"),
    parentId: formData.get("parentId") || undefined,
  });

  if (!parsed.success) {
    throw new Error("Invalid category payload");
  }

  await prisma.category.create({
    data: {
      ...parsed.data,
      parentId: parsed.data.parentId || null,
    },
  });

  revalidatePath("/admin/categories");
  revalidatePath("/admin/products");
}

export async function deleteCategoryAction(formData: FormData) {
  await requireAdminSession();
  const id = String(formData.get("id") || "");

  if (!id) {
    throw new Error("Missing category id");
  }

  const productsCount = await prisma.product.count({ where: { categoryId: id } });
  if (productsCount > 0) {
    throw new Error("Cannot delete a category that is already used by products");
  }

  await prisma.category.delete({ where: { id } });
  revalidatePath("/admin/categories");
  revalidatePath("/admin/products");
}
