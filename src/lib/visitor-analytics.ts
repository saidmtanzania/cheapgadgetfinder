import { prisma } from "@/lib/prisma";

export type VisitorSnapshot = {
  activeVisitors: number;
  totalVisitors: number;
  viewsLast24h: number;
  topActivePaths: Array<{ path: string; visitors: number }>;
  recentlySeen: Array<{ visitorId: string; path: string; lastSeenAt: string }>;
};

export async function getVisitorSnapshot(): Promise<VisitorSnapshot> {
  const visitorSession = (prisma as unknown as { visitorSession?: typeof prisma.visitorSession }).visitorSession;
  if (!visitorSession) {
    return {
      activeVisitors: 0,
      totalVisitors: 0,
      viewsLast24h: 0,
      topActivePaths: [],
      recentlySeen: [],
    };
  }

  const now = Date.now();
  const activeSince = new Date(now - 5 * 60 * 1000);
  const since24h = new Date(now - 24 * 60 * 60 * 1000);

  const [activeSessions, totalVisitors, sessionsLast24h] = await Promise.all([
    visitorSession.findMany({
      where: {
        lastSeenAt: {
          gte: activeSince,
        },
      },
      orderBy: {
        lastSeenAt: "desc",
      },
      take: 100,
    }),
    visitorSession.count(),
    visitorSession.findMany({
      where: {
        lastSeenAt: {
          gte: since24h,
        },
      },
      select: {
        pageViews: true,
      },
    }),
  ]);

  const pathCounter = new Map<string, number>();
  for (const session of activeSessions) {
    pathCounter.set(session.currentPath, (pathCounter.get(session.currentPath) ?? 0) + 1);
  }

  const topActivePaths = [...pathCounter.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([path, visitors]) => ({ path, visitors }));

  const viewsLast24h = sessionsLast24h.reduce((sum, row) => sum + row.pageViews, 0);

  return {
    activeVisitors: activeSessions.length,
    totalVisitors,
    viewsLast24h,
    topActivePaths,
    recentlySeen: activeSessions.slice(0, 8).map((session) => ({
      visitorId: session.visitorId,
      path: session.currentPath,
      lastSeenAt: session.lastSeenAt.toISOString(),
    })),
  };
}
