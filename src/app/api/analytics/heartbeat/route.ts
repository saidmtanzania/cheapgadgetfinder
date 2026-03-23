import { prisma } from "@/lib/prisma";

type Body = {
  visitorId?: string;
  path?: string;
  referrer?: string;
};

function sanitizePath(path: string) {
  if (!path.startsWith("/")) {
    return "/";
  }

  return path.slice(0, 200);
}

export async function POST(request: Request) {
  const visitorSession = (prisma as unknown as { visitorSession?: typeof prisma.visitorSession }).visitorSession;
  if (!visitorSession) {
    return Response.json({ ok: true, skipped: "visitor-session-model-unavailable" });
  }

  const body = (await request.json().catch(() => ({}))) as Body;
  const visitorId = typeof body.visitorId === "string" ? body.visitorId.trim() : "";
  const path = typeof body.path === "string" ? sanitizePath(body.path) : "/";
  const referrer = typeof body.referrer === "string" ? body.referrer.slice(0, 400) : null;

  if (!visitorId || visitorId.length > 120) {
    return Response.json({ message: "Invalid visitor id" }, { status: 400 });
  }

  const now = new Date();
  const userAgent = request.headers.get("user-agent");

  const existing = await visitorSession.findUnique({
    where: { visitorId },
    select: { id: true, pageViews: true },
  });

  if (existing) {
    await visitorSession.update({
      where: { visitorId },
      data: {
        currentPath: path,
        referrer,
        userAgent,
        lastSeenAt: now,
        pageViews: {
          increment: 1,
        },
      },
    });
  } else {
    await visitorSession.create({
      data: {
        visitorId,
        currentPath: path,
        referrer,
        userAgent,
        firstSeenAt: now,
        lastSeenAt: now,
        pageViews: 1,
      },
    });
  }

  return Response.json({ ok: true });
}
