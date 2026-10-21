import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { accentLogoBadgeClassName } from "@/components/ui/Button";

export function AuthLayout({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-[calc(100vh-4rem)] lg:grid lg:grid-cols-2">
      <div className="relative hidden border-r border-app lg:block">
        <Image
          src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80"
          alt="Customer shopping online"
          fill
          className="object-cover opacity-90"
          sizes="50vw"
          priority
        />
        <div className="absolute inset-0 bg-[rgba(15,23,42,0.55)]" />
        <div className="relative flex h-full flex-col justify-between p-12 text-white">
          <Link href="/" className="inline-flex items-center gap-2 font-semibold text-white">
            <span
              className={`flex h-9 w-9 items-center justify-center rounded-full text-[10px] tracking-widest ${accentLogoBadgeClassName}`}
            >
              MG
            </span>
            Meridian Goods
          </Link>
          <blockquote className="max-w-md">
            <p className="text-2xl font-medium leading-snug text-white">
              &ldquo;Shopping should feel effortless—from the first scroll to the confirmation
              email.&rdquo;
            </p>
            <footer className="mt-4 text-sm text-white/80">The Meridian Goods team</footer>
          </blockquote>
        </div>
      </div>

      <div className="flex flex-col justify-center px-4 py-12 sm:px-8 lg:px-14">
        <div className="mx-auto w-full max-w-md">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-ink-muted hover:text-ink lg:hidden"
          >
            ← Back to store
          </Link>
          <h1 className="text-3xl font-semibold tracking-tight text-ink">{title}</h1>
          <p className="mt-2 text-ink-muted">{subtitle}</p>
          <div className="mt-8">{children}</div>
        </div>
      </div>
    </div>
  );
}
