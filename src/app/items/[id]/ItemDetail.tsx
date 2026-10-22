"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { ProductImage } from "@/components/ProductImage";
import { Breadcrumbs } from "@/components/PageHeader";
import { StarRating } from "@/components/StarRating";
import { Container } from "@/components/ui/Container";
import { accentFilledClassName, ButtonLink } from "@/components/ui/Button";
import {
  getProductById,
  getRelatedProducts,
  type Product,
} from "@/lib/products";

export function ItemDetail({ id }: { id: string }) {
  const [product, setProduct] = useState<Product | undefined>();
  const [related, setRelated] = useState<Product[]>([]);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const found = getProductById(id);
    setProduct(found);
    if (found) setRelated(getRelatedProducts(found));
  }, [id]);

  if (product === undefined) {
    return (
      <Container className="flex min-h-[50vh] items-center justify-center py-16">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-app border-t-accent" />
      </Container>
    );
  }

  if (!product) {
    return (
      <Container className="py-16 text-center">
        <h1 className="text-2xl font-semibold text-ink">Product not found</h1>
        <ButtonLink href="/items" variant="accent" className="mt-6">
          Back to items
        </ButtonLink>
      </Container>
    );
  }

  const sku = `MG-${product.id.replace("custom-", "").slice(0, 8).toUpperCase()}`;

  return (
    <>
      <div className="border-b border-app">
        <Container className="py-4">
          <Link
            href="/items"
            className="mb-3 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-bright"
          >
            ← Back to items
          </Link>
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Shop", href: "/items" },
              { label: product.title },
            ]}
          />
        </Container>
      </div>

      <Container className="py-10 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-square overflow-hidden rounded-2xl border border-app bg-surface-muted">
            <ProductImage
              src={product.imageUrl}
              alt={product.title}
              fill
              className="object-cover"
            />
          </div>

          <div className="lg:py-2">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-accent">
              {product.category}
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              {product.title}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-4">
              <StarRating rating={product.rating} size="md" />
              <span className="text-sm text-ink-muted">SKU: {sku}</span>
            </div>

            <p className="mt-8 text-4xl font-semibold tabular-nums text-ink">
              ${product.price.toFixed(2)}
            </p>
            <p className="mt-2 text-sm text-accent">
              Free delivery on orders over $75 · Ships in 2–4 business days
            </p>

            <p className="mt-6 leading-relaxed text-ink-muted">{product.fullDescription}</p>

            <div className="mt-8 rounded-2xl border border-app glass-panel p-5">
              <label className="block text-sm font-medium text-ink-muted">
                Quantity
                <select
                  value={qty}
                  onChange={(e) => setQty(Number(e.target.value))}
                  className="mt-2 w-full max-w-[120px] rounded-xl border border-app bg-surface-muted px-3 py-2 text-sm text-ink focus:border-accent focus:outline-none focus:ring-2 focus:ring-[rgba(26,107,107,0.25)]"
                >
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </label>
              <button
                type="button"
                className={`mt-4 w-full rounded-full py-3.5 text-sm transition sm:max-w-xs ${accentFilledClassName}`}
              >
                Add to bag — ${(product.price * qty).toFixed(2)}
              </button>
              <p className="mt-3 text-xs text-ink-muted">
                Demo storefront — checkout is not connected to a payment provider.
              </p>
            </div>

            <ul className="mt-8 grid gap-3 text-sm text-ink-muted sm:grid-cols-2">
              <li className="flex gap-2">
                <span className="text-accent">✓</span> 30-day returns
              </li>
              <li className="flex gap-2">
                <span className="text-accent">✓</span> 2-year warranty (select items)
              </li>
              <li className="flex gap-2">
                <span className="text-accent">✓</span> Secure checkout
              </li>
              <li className="flex gap-2">
                <span className="text-accent">✓</span> Added {product.createdAt}
              </li>
            </ul>
          </div>
        </div>

        <section className="mt-16 border-t border-app pt-12">
          <h2 className="text-xl font-semibold text-ink">Specifications</h2>
          <dl className="mt-4 divide-y divide-[var(--border)] rounded-2xl border border-app">
            {Object.entries(product.specifications).map(([key, value]) => (
              <div
                key={key}
                className="grid grid-cols-2 gap-4 px-5 py-4 text-sm sm:grid-cols-[200px_1fr]"
              >
                <dt className="font-medium text-ink-muted">{key}</dt>
                <dd className="text-ink">{value}</dd>
              </div>
            ))}
          </dl>
        </section>

        {related.length > 0 && (
          <section className="mt-16 border-t border-app pt-12">
            <div className="flex items-end justify-between gap-4">
              <h2 className="text-2xl font-semibold text-ink">Related items</h2>
              <Link
                href="/items"
                className="text-sm font-semibold text-accent hover:text-accent-bright"
              >
                View all
              </Link>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </Container>
    </>
  );
}
