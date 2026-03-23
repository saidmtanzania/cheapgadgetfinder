import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/auth";
import { priceSchema } from "@/lib/validators";

type Params = { params: Promise<{ id: string }> };

export async function GET(_: Request, { params }: Params) {
  try {
    await requireAdminSession();
    const { id } = await params;
    const price = await prisma.productPrice.findUnique({
      where: { id },
      include: { product: true, platform: true },
    });

    if (!price) {
      return Response.json({ message: "Not found" }, { status: 404 });
    }

    return Response.json(price);
  } catch {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }
}

export async function PUT(request: Request, { params }: Params) {
  try {
    await requireAdminSession();
    const { id } = await params;
    const body = await request.json();
    const parsed = priceSchema.safeParse(body);

    if (!parsed.success) {
      return Response.json({ message: "Invalid payload" }, { status: 400 });
    }

    const updated = await prisma.productPrice.update({ where: { id }, data: parsed.data });
    return Response.json(updated);
  } catch {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }
}

export async function DELETE(_: Request, { params }: Params) {
  try {
    await requireAdminSession();
    const { id } = await params;
    await prisma.productPrice.delete({ where: { id } });
    return new Response(null, { status: 204 });
  } catch {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }
}
