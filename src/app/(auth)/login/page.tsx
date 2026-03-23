"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const callbackUrl = "/admin/dashboard";
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") || "");
    const password = String(formData.get("password") || "");

    const result = await signIn("credentials", {
      email,
      password,
      callbackUrl,
      redirect: false,
    });

    setIsLoading(false);

    if (result?.error) {
      setError("Invalid credentials");
      return;
    }

    router.push(result?.url || callbackUrl);
    router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-linear-to-b from-amber-50 to-orange-100 p-4">
      <section className="w-full max-w-md rounded-2xl border border-amber-900/10 bg-white/90 p-8">
        <h1 className="text-2xl font-semibold tracking-tight text-amber-950">Admin Login</h1>
        <p className="mt-2 text-sm text-amber-900/70">Sign in to manage products, prices, and SEO articles.</p>
        <div className="mt-4 rounded-xl border border-amber-900/15 bg-orange-50 px-3 py-2 text-xs text-amber-900/75">
          Admin account is environment-based, not database-seeded. Use <span className="font-semibold">ADMIN_EMAIL</span> and <span className="font-semibold">ADMIN_PASSWORD</span> from your .env file.
        </div>

        <form className="mt-6 space-y-4" onSubmit={onSubmit}>
          <label className="block text-sm text-amber-950">
            Email
            <input
              name="email"
              type="email"
              required
              className="mt-1 w-full rounded-xl border border-amber-900/20 bg-white px-3 py-2"
            />
          </label>

          <label className="block text-sm text-amber-950">
            Password
            <input
              name="password"
              type="password"
              required
              className="mt-1 w-full rounded-xl border border-amber-900/20 bg-white px-3 py-2"
            />
          </label>

          {error ? <p className="text-sm text-red-700">{error}</p> : null}

          <button
            disabled={isLoading}
            className="w-full rounded-xl bg-amber-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
            type="submit"
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </section>
    </main>
  );
}
