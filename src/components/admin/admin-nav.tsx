import Link from "next/link";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard" },
  { href: "/admin/categories", label: "Categories" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/prices", label: "Prices" },
  { href: "/admin/articles", label: "Articles" },
  { href: "/admin/affiliate-links", label: "Affiliate Links" },
];

export function AdminNav() {
  return (
    <nav className="space-y-2">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="block rounded-xl border border-slate-900/15 bg-white/80 px-3 py-2 text-sm font-medium text-slate-950 transition hover:bg-slate-100/70"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
