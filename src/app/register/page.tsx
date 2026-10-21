"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { AuthLayout } from "@/components/AuthLayout";
import { accentFilledClassName } from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";

const inputClass =
  "mt-1.5 w-full rounded-xl border border-app bg-surface-muted px-4 py-3 text-sm text-ink focus:border-accent focus:outline-none focus:ring-2 focus:ring-[rgba(26,107,107,0.25)]";

export default function RegisterPage() {
  const { register, loginWithGoogle, configured } = useAuth();
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const form = new FormData(e.currentTarget);
    const password = String(form.get("password"));
    const confirm = String(form.get("confirm"));
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      await register(String(form.get("email")), password);
      router.push("/");
    } catch {
      setError("Could not create account. This email may already be registered.");
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
      title="Create your account"
      subtitle="Join Meridian Goods for faster checkout and access to add and manage products."
    >
      {!configured && (
        <p
          className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950"
          role="status"
        >
          Add Firebase keys to <code className="font-mono text-xs">.env.local</code> and restart
          the dev server to enable registration.
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
            autoComplete="new-password"
            className={inputClass}
          />
        </label>
        <label className="block text-sm font-medium text-ink-muted">
          Confirm password
          <input
            name="confirm"
            type="password"
            required
            minLength={6}
            autoComplete="new-password"
            className={inputClass}
          />
        </label>
        <button
          type="submit"
          disabled={loading || !configured}
          className={`w-full rounded-full py-3.5 text-sm transition disabled:opacity-50 ${accentFilledClassName}`}
        >
          {loading ? "Creating account…" : "Create account"}
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
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-accent hover:text-accent-bright">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}
