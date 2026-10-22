"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { ThemeToggle } from "@/components/ThemeToggle";
import { accentFilledClassName, accentLogoBadgeClassName } from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";

const navLinks = [
  { href: "/items", label: "Shop" },
  { href: "/items?category=Electronics", label: "Electronics" },
  { href: "/items?category=Fashion", label: "Fashion" },
  { href: "/about", label: "About" },
];

function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const base = href.split("?")[0];
  const active = base === "/" ? pathname === "/" : pathname.startsWith(base);
  return (
    <Link
      href={href}
      className={`relative px-1 py-2 text-sm font-medium transition-colors after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:w-full after:origin-left after:bg-accent after:transition-transform hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${
        active
          ? "text-ink after:scale-x-100"
          : "text-ink-muted after:scale-x-0 hover:after:scale-x-100"
      }`}
    >
      {label}
    </Link>
  );
}

export function Navbar() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const displayName =
    user?.displayName || user?.email?.split("@")[0] || "Account";

  function handleSearch(e: FormEvent) {
    e.preventDefault();
    const q = searchQuery.trim();
    router.push(q ? `/items?q=${encodeURIComponent(q)}` : "/items");
    setMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-app glass-panel">
      <Container>
        <div className="flex h-16 items-center justify-between gap-4 lg:h-[4.25rem]">
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <span
              className={`flex h-9 w-9 items-center justify-center rounded-full text-[10px] tracking-widest ${accentLogoBadgeClassName}`}
            >
              MG
            </span>
            <span className="hidden text-lg font-semibold tracking-tight text-ink sm:inline">
              Meridian Goods
            </span>
          </Link>

          <form
            onSubmit={handleSearch}
            className="hidden max-w-md flex-1 lg:flex lg:justify-center"
            role="search"
          >
            <div className="relative w-full max-w-sm">
              <svg
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products…"
                className="w-full rounded-full border border-app bg-surface-muted py-2.5 pl-10 pr-4 text-sm text-ink placeholder:text-ink-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-[rgba(26,107,107,0.25)]"
              />
            </div>
          </form>

          <nav className="hidden items-center gap-6 xl:flex" aria-label="Main">
            {navLinks.map((link) => (
              <NavLink key={link.href} {...link} />
            ))}
          </nav>

          <div className="flex items-center gap-1 sm:gap-2">
            {mounted && !loading && !user && (
              <>
                <Link
                  href="/login"
                  className="hidden rounded-full px-4 py-2 text-sm font-medium text-ink-muted transition hover:text-ink sm:inline-flex"
                >
                  Sign in
                </Link>
                <Link
                  href="/register"
                  className={`inline-flex rounded-full px-4 py-2 text-sm transition ${accentFilledClassName}`}
                >
                  Create account
                </Link>
              </>
            )}

            {mounted && !loading && user && (
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setDropdownOpen((o) => !o)}
                  className="flex items-center gap-2 rounded-full border border-app py-1.5 pl-1.5 pr-3 text-sm font-medium text-ink transition hover:border-app-strong"
                  aria-expanded={dropdownOpen}
                  aria-haspopup="menu"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-soft text-xs font-bold text-accent">
                    {displayName.charAt(0).toUpperCase()}
                  </span>
                  <span className="hidden max-w-[100px] truncate md:inline">{displayName}</span>
                </button>
                {dropdownOpen && (
                  <div
                    role="menu"
                    className="absolute right-0 mt-2 w-60 overflow-hidden rounded-2xl border border-app glass-panel py-1 shadow-elevated"
                  >
                    <div className="border-b border-app px-4 py-3">
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-muted">
                        Account
                      </p>
                      <p className="truncate text-sm font-medium text-ink">{user.email}</p>
                    </div>
                    <Link
                      href="/items/add"
                      role="menuitem"
                      className="block px-4 py-2.5 text-sm text-ink-muted hover:text-ink"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Add Product
                    </Link>
                    <Link
                      href="/items/manage"
                      role="menuitem"
                      className="block px-4 py-2.5 text-sm text-ink-muted hover:text-ink"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Manage Products
                    </Link>
                    <button
                      type="button"
                      role="menuitem"
                      className="block w-full border-t border-app px-4 py-2.5 text-left text-sm text-[#8b3a3a] hover:opacity-80"
                      onClick={() => {
                        setDropdownOpen(false);
                        void logout();
                      }}
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            )}

            <ThemeToggle />

            <button
              type="button"
              className="rounded-full p-2.5 text-ink-muted hover:text-ink xl:hidden"
              aria-label="Toggle menu"
              onClick={() => setMenuOpen((o) => !o)}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </Container>

      {menuOpen && (
        <div className="border-t border-app xl:hidden">
          <Container className="py-4">
            <form onSubmit={handleSearch} className="mb-4 lg:hidden">
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products…"
                className="w-full rounded-full border border-app bg-surface-muted px-4 py-2.5 text-sm text-ink focus:border-accent focus:outline-none focus:ring-2 focus:ring-[rgba(26,107,107,0.25)]"
              />
            </form>
            <nav className="flex flex-col gap-1" aria-label="Mobile">
              <Link
                href="/"
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-ink-muted hover:text-ink"
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-ink-muted hover:text-ink"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </Container>
        </div>
      )}
    </header>
  );
}
