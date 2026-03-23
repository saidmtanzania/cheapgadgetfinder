"use client";

import { useEffect } from "react";

type AdSenseSlotProps = {
  slot: string;
  className?: string;
  format?: "auto" | "rectangle" | "horizontal" | "vertical";
  responsive?: boolean;
};

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT?.trim();

export function AdSenseSlot({
  slot,
  className,
  format = "auto",
  responsive = true,
}: AdSenseSlotProps) {
  useEffect(() => {
    if (!clientId || typeof window === "undefined") {
      return;
    }

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // Swallow duplicate push/runtime noise to keep UI stable.
    }
  }, []);

  if (!clientId) {
    return null;
  }

  return (
    <aside
      aria-label="Advertisement"
      className={className ?? "overflow-hidden rounded-2xl border border-slate-900/10 bg-white/90 p-3"}
    >
      <p className="mb-2 text-[10px] uppercase tracking-[0.16em] text-slate-900/60">Advertisement</p>
      <ins
        className="adsbygoogle block"
        style={{ display: "block" }}
        data-ad-client={clientId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? "true" : "false"}
      />
    </aside>
  );
}
