"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const STORAGE_KEY = "cgf_visitor_id";

function getVisitorId() {
  if (typeof window === "undefined") {
    return "";
  }

  const existing = window.localStorage.getItem(STORAGE_KEY);
  if (existing) {
    return existing;
  }

  const generated = typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `v-${Date.now()}-${Math.random().toString(36).slice(2)}`;

  window.localStorage.setItem(STORAGE_KEY, generated);
  return generated;
}

async function sendHeartbeat(visitorId: string, path: string) {
  await fetch("/api/analytics/heartbeat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      visitorId,
      path,
      referrer: typeof document !== "undefined" ? document.referrer : "",
    }),
    keepalive: true,
  }).catch(() => undefined);
}

export function VisitorHeartbeat() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname || pathname.startsWith("/admin") || pathname.startsWith("/api")) {
      return;
    }

    const visitorId = getVisitorId();
    if (!visitorId) {
      return;
    }

    sendHeartbeat(visitorId, pathname);
    const interval = window.setInterval(() => {
      sendHeartbeat(visitorId, pathname);
    }, 20000);

    return () => {
      window.clearInterval(interval);
    };
  }, [pathname]);

  return null;
}
