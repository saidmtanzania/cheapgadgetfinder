import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/auth";
import { priceSchema } from "@/lib/validators";

export async function GET() {
  try {
    await requireAdminSession();
    const prices = await prisma.productPrice.findMany({
      include: { product: true, platform: true },
      orderBy: { updatedAt: "desc" },
    });

    return Response.json(prices);
  } catch {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }
}

export async function POST(request: Request) {
  try {
    await requireAdminSession();
    const body = await request.json();
    const parsed = priceSchema.safeParse(body);

    if (!parsed.success) {
      return Response.json({ message: "Invalid payload" }, { status: 400 });
    }

    const created = await prisma.productPrice.create({ data: parsed.data });
    return Response.json(created, { status: 201 });
  } catch {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }
}
