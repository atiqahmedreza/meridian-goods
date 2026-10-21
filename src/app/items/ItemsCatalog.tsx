"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { PageHeader } from "@/components/PageHeader";
import { Container } from "@/components/ui/Container";
import {
  CATEGORIES,
  getAllProducts,
  type ProductCategory,
} from "@/lib/products";

export function ItemsCatalog() {
  const searchParams = useSearchParams();
  const initialQ = searchParams.get("q") ?? "";
  const initialCategory = searchParams.get("category") as ProductCategory | null;

  const [search, setSearch] = useState(initialQ);
  const [category, setCategory] = useState<ProductCategory | "All">(
    initialCategory && CATEGORIES.includes(initialCategory) ? initialCategory : "All",
  );
  const [maxPrice, setMaxPrice] = useState(500);
  const [sort, setSort] = useState<"featured" | "price-asc" | "price-desc" | "rating">(
    "featured",
  );
  const [products, setProducts] = useState(() => getAllProducts());

  useEffect(() => {
    setSearch(initialQ);
  }, [initialQ]);

  useEffect(() => {
    if (initialCategory && CATEGORIES.includes(initialCategory)) {
      setCategory(initialCategory);
    }
  }, [initialCategory]);

  const refresh = () => setProducts(getAllProducts());

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = products.filter((p) => {
      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q);
      const matchesCategory = category === "All" || p.category === category;
      const matchesPrice = p.price <= maxPrice;
      return matchesSearch && matchesCategory && matchesPrice;
    });

    switch (sort) {
      case "price-asc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list = [...list].sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }
    return list;
  }, [products, search, category, maxPrice, sort]);

  return (
    <>
      <PageHeader
        title="All products"
        description="Filter by category and price, or search by name. Inventory includes our curated catalog plus items you add when signed in."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Shop" },
        ]}
      />

      <Container className="py-10 lg:py-12">
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-12">
          <aside className="lg:w-64 lg:shrink-0">
            <div className="sticky top-24 space-y-6 rounded-2xl border border-app glass-panel p-5 shadow-soft">
              <div>
                <h2 className="text-sm font-semibold text-ink">Filters</h2>
                <p className="mt-1 text-xs text-ink-muted">{filtered.length} results</p>
              </div>

              <label className="block">
                <span className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
                  Search
                </span>
                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Product name…"
                  className="mt-2 w-full rounded-xl border border-app bg-surface-muted px-3 py-2.5 text-sm text-ink focus:border-accent focus:outline-none focus:ring-2 focus:ring-[rgba(26,107,107,0.25)]"
                />
              </label>

              <label className="block">
                <span className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
                  Category
                </span>
                <select
                  value={category}
                  onChange={(e) =>
                    setCategory(e.target.value as ProductCategory | "All")
                  }
                  className="mt-2 w-full rounded-xl border border-app bg-surface-muted px-3 py-2.5 text-sm text-ink focus:border-accent focus:outline-none focus:ring-2 focus:ring-[rgba(26,107,107,0.25)]"
                >
                  <option value="All">All categories</option>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </label>

              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
                    Max price
                  </span>
                  <span className="text-sm font-semibold tabular-nums text-ink">
                    ${maxPrice}
                  </span>
                </div>
                <input
                  type="range"
                  min={20}
                  max={500}
                  step={10}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="mt-3 w-full accent-accent"
                />
              </div>

              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setCategory("All");
                  setMaxPrice(500);
                  setSort("featured");
                }}
                className="w-full rounded-full border border-app py-2 text-sm font-medium text-ink-muted hover:text-ink"
              >
                Clear filters
              </button>
              <button
                type="button"
                onClick={refresh}
                className="w-full text-center text-xs font-medium text-accent hover:text-accent-bright"
              >
                Refresh inventory
              </button>
            </div>
          </aside>

          <div className="min-w-0 flex-1">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-ink-muted">
                Showing{" "}
                <span className="font-semibold text-ink">{filtered.length}</span>{" "}
                products
              </p>
              <label className="flex items-center gap-2 text-sm">
                <span className="text-ink-muted">Sort by</span>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as typeof sort)}
                  className="rounded-full border border-app bg-surface-muted px-3 py-1.5 text-sm font-medium text-ink focus:border-accent focus:outline-none focus:ring-2 focus:ring-[rgba(26,107,107,0.25)]"
                >
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: low to high</option>
                  <option value="price-desc">Price: high to low</option>
                  <option value="rating">Top rated</option>
                </select>
              </label>
            </div>

            {filtered.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-app px-6 py-16 text-center">
                <p className="text-lg font-semibold text-ink">No products found</p>
                <p className="mt-2 text-sm text-ink-muted">
                  Try adjusting your filters or search term.
                </p>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </Container>
    </>
  );
}
