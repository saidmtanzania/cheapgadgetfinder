import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/auth";
import { productSchema } from "@/lib/validators";

export async function GET() {
  try {
    await requireAdminSession();
    const products = await prisma.product.findMany({
      include: { brand: true, category: true, prices: true, specs: true },
      orderBy: { createdAt: "desc" },
    });
    return Response.json(products);
  } catch {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }
}

export async function POST(request: Request) {
  try {
    await requireAdminSession();
    const body = await request.json();
    const parsed = productSchema.safeParse(body);

    if (!parsed.success) {
      return Response.json({ message: "Invalid payload" }, { status: 400 });
    }

    const created = await prisma.product.create({
      data: {
        ...parsed.data,
        image: parsed.data.image || null,
        youtubeReviewUrl: parsed.data.youtubeReviewUrl || null,
      },
    });

    return Response.json(created, { status: 201 });
  } catch {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }
}
