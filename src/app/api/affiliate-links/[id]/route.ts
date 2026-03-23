import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/auth";
import { affiliateSchema } from "@/lib/validators";

type Params = { params: Promise<{ id: string }> };

export async function GET(_: Request, { params }: Params) {
  try {
    await requireAdminSession();
    const { id } = await params;
    const link = await prisma.affiliateLink.findUnique({
      where: { id },
      include: { product: true, platform: true },
    });

    if (!link) {
      return Response.json({ message: "Not found" }, { status: 404 });
    }

    return Response.json(link);
  } catch {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }
}

export async function PUT(request: Request, { params }: Params) {
  try {
    await requireAdminSession();
    const { id } = await params;
    const body = await request.json();
    const parsed = affiliateSchema.safeParse(body);

    if (!parsed.success) {
      return Response.json({ message: "Invalid payload" }, { status: 400 });
    }

    const updated = await prisma.affiliateLink.update({ where: { id }, data: parsed.data });
    return Response.json(updated);
  } catch {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }
}

export async function DELETE(_: Request, { params }: Params) {
  try {
    await requireAdminSession();
    const { id } = await params;
    await prisma.affiliateLink.delete({ where: { id } });
    return new Response(null, { status: 204 });
  } catch {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }
}
