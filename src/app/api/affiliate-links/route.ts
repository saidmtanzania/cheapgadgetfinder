import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/auth";
import { affiliateSchema } from "@/lib/validators";

export async function GET() {
  try {
    await requireAdminSession();
    const links = await prisma.affiliateLink.findMany({
      include: { product: true, platform: true },
      orderBy: { createdAt: "desc" },
    });

    return Response.json(links);
  } catch {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }
}

export async function POST(request: Request) {
  try {
    await requireAdminSession();
    const body = await request.json();
    const parsed = affiliateSchema.safeParse(body);

    if (!parsed.success) {
      return Response.json({ message: "Invalid payload" }, { status: 400 });
    }

    const created = await prisma.affiliateLink.create({ data: parsed.data });
    return Response.json(created, { status: 201 });
  } catch {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }
}
