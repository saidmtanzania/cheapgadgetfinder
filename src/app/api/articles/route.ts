import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/auth";
import { articleSchema } from "@/lib/validators";

export async function GET() {
  try {
    await requireAdminSession();
    const articles = await prisma.article.findMany({
      orderBy: { createdAt: "desc" },
    });
    return Response.json(articles);
  } catch {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }
}

export async function POST(request: Request) {
  try {
    await requireAdminSession();
    const body = await request.json();
    const parsed = articleSchema.safeParse(body);

    if (!parsed.success) {
      return Response.json({ message: "Invalid payload" }, { status: 400 });
    }

    const created = await prisma.article.create({ data: parsed.data });
    return Response.json(created, { status: 201 });
  } catch {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }
}
