import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/auth";
import { productSchema } from "@/lib/validators";

type Params = { params: Promise<{ id: string }> };

export async function GET(_: Request, { params }: Params) {
  try {
    await requireAdminSession();
    const { id } = await params;
    const product = await prisma.product.findUnique({
      where: { id },
      include: { brand: true, category: true, prices: true, specs: true },
    });

    if (!product) {
      return Response.json({ message: "Not found" }, { status: 404 });
    }

    return Response.json(product);
  } catch {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }
}

export async function PUT(request: Request, { params }: Params) {
  try {
    await requireAdminSession();
    const { id } = await params;
    const body = await request.json();
    const parsed = productSchema.safeParse(body);

    if (!parsed.success) {
      return Response.json({ message: "Invalid payload" }, { status: 400 });
    }

    const updated = await prisma.product.update({
      where: { id },
      data: {
        ...parsed.data,
        image: parsed.data.image || null,
        youtubeReviewUrl: parsed.data.youtubeReviewUrl || null,
      },
    });

    return Response.json(updated);
  } catch {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }
}

export async function DELETE(_: Request, { params }: Params) {
  try {
    await requireAdminSession();
    const { id } = await params;
    await prisma.product.delete({ where: { id } });
    return new Response(null, { status: 204 });
  } catch {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }
}
