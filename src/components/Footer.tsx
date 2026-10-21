import Link from "next/link";
import { accentFilledClassName, accentLogoBadgeClassName } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

const shopLinks = [
  { href: "/items", label: "All products" },
  { href: "/items?category=Electronics", label: "Electronics" },
  { href: "/items?category=Fashion", label: "Fashion" },
  { href: "/items?category=Home", label: "Home" },
];

const companyLinks = [
  { href: "/about", label: "Our story" },
  { href: "/items", label: "New arrivals" },
  { href: "/login", label: "Sign in" },
  { href: "/register", label: "Create account" },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-app-strong">
      <Container className="py-14 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-2">
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-full text-[10px] tracking-widest ${accentLogoBadgeClassName}`}
              >
                MG
              </span>
              <span className="text-lg font-semibold text-ink">Meridian Goods</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-muted">
              Premium essentials for modern life. Thoughtfully sourced products, transparent
              pricing, and a shopping experience built for clarity and trust.
            </p>
            <div className="mt-6 flex max-w-sm gap-2" role="group" aria-label="Newsletter signup">
              <label htmlFor="footer-email" className="sr-only">
                Email for newsletter
              </label>
              <input
                id="footer-email"
                type="email"
                placeholder="Email for updates"
                className="min-w-0 flex-1 rounded-full border border-app bg-surface-muted px-4 py-2.5 text-sm text-ink placeholder:text-ink-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              />
              <button
                type="button"
                className={`shrink-0 rounded-full px-4 py-2.5 text-sm ${accentFilledClassName}`}
              >
                Join
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-5 lg:col-start-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-ink-muted">
                Shop
              </p>
              <ul className="mt-4 space-y-2.5">
                {shopLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-ink-muted transition hover:text-ink"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-ink-muted">
                Company
              </p>
              <ul className="mt-4 space-y-2.5">
                {companyLinks.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-ink-muted transition hover:text-ink"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-ink-muted">
                Support
              </p>
              <ul className="mt-4 space-y-2.5 text-sm text-ink-muted">
                <li>Shipping & delivery</li>
                <li>Returns & exchanges</li>
                <li>help@meridiangoods.com</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-app pt-8 sm:flex-row">
          <p className="text-xs text-ink-muted">© 2026 Meridian Goods Inc. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-3 text-[10px] font-semibold uppercase tracking-wider text-ink-muted">
            <span className="rounded border border-app px-2 py-1">Visa</span>
            <span className="rounded border border-app px-2 py-1">Mastercard</span>
            <span className="rounded border border-app px-2 py-1">PayPal</span>
            <span className="rounded border border-app px-2 py-1">Apple Pay</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
