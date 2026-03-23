"use client";

import { signOut } from "next-auth/react";

export function AdminSignOut() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="rounded-xl border border-amber-900/15 bg-white px-3 py-2 text-sm font-medium text-amber-950 hover:bg-amber-100/70"
    >
      Sign out
    </button>
  );
}
