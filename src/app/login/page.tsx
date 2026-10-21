"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { AuthLayout } from "@/components/AuthLayout";
import { accentFilledClassName } from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";

const inputClass =
  "mt-1.5 w-full rounded-xl border border-app bg-surface-muted px-4 py-3 text-sm text-ink focus:border-accent focus:outline-none focus:ring-2 focus:ring-[rgba(26,107,107,0.25)]";

export default function LoginPage() {
  const { login, loginWithGoogle, configured } = useAuth();
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const form = new FormData(e.currentTarget);
    try {
      await login(String(form.get("email")), String(form.get("password")));
      router.push("/");
    } catch {
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogle() {
    setError("");
    setLoading(true);
    try {
      await loginWithGoogle();
      router.push("/");
    } catch {
      setError("Google sign-in failed. Check Firebase configuration.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to track orders, save favorites, and manage your seller inventory."
    >
      {!configured && (
        <p
          className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950"
          role="status"
        >
          Add Firebase keys to <code className="font-mono text-xs">.env.local</code> and restart
          the dev server to enable sign-in.
        </p>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-2xl border border-app glass-panel p-6 shadow-soft"
      >
        {error && (
          <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">
            {error}
          </p>
        )}
        <label className="block text-sm font-medium text-ink-muted">
          Email address
          <input name="email" type="email" required autoComplete="email" className={inputClass} />
        </label>
        <label className="block text-sm font-medium text-ink-muted">
          Password
          <input
            name="password"
            type="password"
            required
            minLength={6}
            autoComplete="current-password"
            className={inputClass}
          />
        </label>
        <button
          type="submit"
          disabled={loading || !configured}
          className={`w-full rounded-full py-3.5 text-sm transition disabled:opacity-50 ${accentFilledClassName}`}
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
        <div className="relative py-2 text-center text-xs text-ink-muted">
          <span className="glass-panel px-2">or continue with</span>
          <div className="absolute inset-x-0 top-1/2 -z-10 border-t border-app" />
        </div>
        <button
          type="button"
          onClick={() => void handleGoogle()}
          disabled={loading || !configured}
          className="w-full rounded-full border border-app py-3.5 text-sm font-semibold text-ink hover:bg-[rgba(30,51,72,0.06)] disabled:opacity-50"
        >
          Google
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-ink-muted">
        New to Meridian Goods?{" "}
        <Link href="/register" className="font-semibold text-accent hover:text-accent-bright">
          Create an account
        </Link>
      </p>
    </AuthLayout>
  );
}
