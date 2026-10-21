import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

/** Teal filled buttons — high contrast in light and dark mode */
export const accentFilledClassName =
  "bg-accent font-semibold text-white shadow-soft hover:bg-accent-bright active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent dark:bg-accent-bright dark:text-slate-950 dark:shadow-[0_2px_14px_rgba(45,212,191,0.4)] dark:hover:brightness-110";

/** Small circular brand mark (e.g. MG logo) */
export const accentLogoBadgeClassName =
  "bg-accent font-bold text-white shadow-soft dark:bg-accent-bright dark:text-slate-950 dark:shadow-[0_2px_10px_rgba(45,212,191,0.35)]";

const variants = {
  primary: accentFilledClassName,
  accent: `${accentFilledClassName} ring-1 ring-black/10 dark:ring-white/20`,
  outline:
    "border border-app-strong bg-transparent text-ink hover:bg-[rgba(30,51,72,0.06)]",
  ghost: "text-ink-muted hover:bg-[rgba(30,51,72,0.06)]",
};

const sizes = {
  sm: "px-3.5 py-2 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-sm",
};

type Variant = keyof typeof variants;
type Size = keyof typeof sizes;

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
};

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center gap-2 rounded-full font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:pointer-events-none disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className = "",
  children,
}: {
  href: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-full font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </Link>
  );
}
