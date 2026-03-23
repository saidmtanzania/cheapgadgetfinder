"use client";

import { useEffect, useState } from "react";
import type { VisitorSnapshot } from "@/lib/visitor-analytics";

type Props = {
  initialSnapshot: VisitorSnapshot;
};

export function RealtimeVisitorsPanel({ initialSnapshot }: Props) {
  const [snapshot, setSnapshot] = useState<VisitorSnapshot>(initialSnapshot);

  useEffect(() => {
    let cancelled = false;

    async function pull() {
      const response = await fetch("/api/admin/visitors/realtime", { cache: "no-store" });
      if (!response.ok) {
        return;
      }

      const data = (await response.json()) as VisitorSnapshot;
      if (!cancelled) {
        setSnapshot(data);
      }
    }

    const interval = window.setInterval(pull, 10000);
    return () => {
      cancelled = true;
      window.clearInterval(interval);
    };
  }, []);

  return (
    <section className="space-y-4 rounded-2xl border border-amber-900/15 bg-white p-4">
      <header className="space-y-1">
        <p className="text-xs uppercase tracking-[0.16em] text-amber-900/60">Visitor Monitor</p>
        <h2 className="text-xl font-semibold tracking-tight text-amber-950">Realtime Visitors</h2>
      </header>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <article className="rounded-xl border border-amber-900/15 bg-orange-50/70 px-3 py-3">
          <p className="text-xs uppercase tracking-[0.14em] text-amber-900/60">Active now</p>
          <p className="mt-1 text-2xl font-semibold text-amber-950">{snapshot.activeVisitors}</p>
          <p className="text-xs text-amber-900/70">last 5 minutes</p>
        </article>
        <article className="rounded-xl border border-amber-900/15 bg-orange-50/70 px-3 py-3">
          <p className="text-xs uppercase tracking-[0.14em] text-amber-900/60">Total visitors</p>
          <p className="mt-1 text-2xl font-semibold text-amber-950">{snapshot.totalVisitors}</p>
          <p className="text-xs text-amber-900/70">known visitor IDs</p>
        </article>
        <article className="rounded-xl border border-amber-900/15 bg-orange-50/70 px-3 py-3">
          <p className="text-xs uppercase tracking-[0.14em] text-amber-900/60">Views (24h)</p>
          <p className="mt-1 text-2xl font-semibold text-amber-950">{snapshot.viewsLast24h}</p>
          <p className="text-xs text-amber-900/70">heartbeat-based</p>
        </article>
      </div>

      <div className="grid gap-3 lg:grid-cols-2">
        <article className="rounded-xl border border-amber-900/15 bg-orange-50/60 p-3">
          <h3 className="text-sm font-semibold text-amber-950">Top Active Paths</h3>
          {snapshot.topActivePaths.length === 0 ? (
            <p className="mt-2 text-xs text-amber-900/70">No active traffic yet.</p>
          ) : (
            <ul className="mt-2 space-y-1 text-sm">
              {snapshot.topActivePaths.map((item) => (
                <li key={item.path} className="flex items-center justify-between gap-3">
                  <span className="truncate text-amber-900">{item.path}</span>
                  <span className="rounded-full bg-white px-2 py-0.5 text-xs font-medium text-amber-900">{item.visitors}</span>
                </li>
              ))}
            </ul>
          )}
        </article>

        <article className="rounded-xl border border-amber-900/15 bg-orange-50/60 p-3">
          <h3 className="text-sm font-semibold text-amber-950">Recently Seen Visitors</h3>
          {snapshot.recentlySeen.length === 0 ? (
            <p className="mt-2 text-xs text-amber-900/70">No active sessions yet.</p>
          ) : (
            <ul className="mt-2 space-y-1 text-xs text-amber-900/85">
              {snapshot.recentlySeen.map((item) => (
                <li key={`${item.visitorId}-${item.lastSeenAt}`} className="flex items-center justify-between gap-3">
                  <span className="truncate">{item.path}</span>
                  <span className="text-amber-900/65">{new Date(item.lastSeenAt).toLocaleTimeString()}</span>
                </li>
              ))}
            </ul>
          )}
        </article>
      </div>
    </section>
  );
}
