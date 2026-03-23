import { redirect } from "next/navigation";
import { AdminNav } from "@/components/admin/admin-nav";
import { AdminSignOut } from "@/components/admin/admin-sign-out";
import { getAuthSession } from "@/lib/auth";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getAuthSession();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,#fff7ed,#ffedd5,#fed7aa)] text-amber-950">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 p-4 md:grid-cols-[240px_1fr]">
        <aside className="rounded-2xl border border-amber-900/10 bg-white/80 p-4 backdrop-blur">
          <div className="mb-4">
            <p className="text-xs uppercase tracking-[0.2em] text-amber-900/60">Cheap Gadget Finder</p>
            <h2 className="text-lg font-semibold">Admin</h2>
          </div>
          <AdminNav />
        </aside>

        <div className="space-y-4">
          <header className="flex items-center justify-between rounded-2xl border border-amber-900/10 bg-white/80 px-4 py-3">
            <p className="text-sm text-amber-900/70">Signed in as {session.user.email}</p>
            <AdminSignOut />
          </header>
          <section className="rounded-2xl border border-amber-900/10 bg-white/80 p-4">{children}</section>
        </div>
      </div>
    </div>
  );
}
