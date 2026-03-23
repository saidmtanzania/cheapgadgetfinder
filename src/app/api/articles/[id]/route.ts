import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/lib/auth";
import { articleSchema } from "@/lib/validators";

type Params = { params: Promise<{ id: string }> };

export async function GET(_: Request, { params }: Params) {
  try {
    await requireAdminSession();
    const { id } = await params;
    const article = await prisma.article.findUnique({ where: { id } });

    if (!article) {
      return Response.json({ message: "Not found" }, { status: 404 });
    }

    return Response.json(article);
  } catch {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }
}

export async function PUT(request: Request, { params }: Params) {
  try {
    await requireAdminSession();
    const { id } = await params;
    const body = await request.json();
    const parsed = articleSchema.safeParse(body);

    if (!parsed.success) {
      return Response.json({ message: "Invalid payload" }, { status: 400 });
    }

    const updated = await prisma.article.update({ where: { id }, data: parsed.data });
    return Response.json(updated);
  } catch {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }
}

export async function DELETE(_: Request, { params }: Params) {
  try {
    await requireAdminSession();
    const { id } = await params;
    await prisma.article.delete({ where: { id } });
    return new Response(null, { status: 204 });
  } catch {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }
}
