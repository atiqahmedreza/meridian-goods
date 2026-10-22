import Link from "next/link";
import { accentFilledClassName } from "@/components/ui/Button";
import { ProductImage } from "@/components/ProductImage";
import { StarRating } from "@/components/StarRating";
import type { Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-app shadow-soft transition duration-300 hover:-translate-y-1 hover:border-app-strong hover:shadow-elevated">
      <Link
        href={`/items/${product.id}`}
        className="absolute inset-0 z-10 rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        <span className="sr-only">View {product.title}</span>
      </Link>
      <div className="relative aspect-[4/5] overflow-hidden bg-surface-muted">
        <ProductImage
          src={product.imageUrl}
          alt={product.title}
          fill
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute left-3 top-3 z-[1] rounded-full border border-app glass-panel px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-ink">
          {product.category}
        </div>
      </div>
      <div className="relative z-[1] flex flex-1 flex-col p-5 pointer-events-none">
        <StarRating rating={product.rating} />
        <h3 className="mt-2 line-clamp-2 text-base font-semibold leading-snug text-ink">
          {product.title}
        </h3>
        <p className="mt-1.5 line-clamp-2 flex-1 text-sm leading-relaxed text-ink-muted">
          {product.shortDescription}
        </p>
        <div className="mt-4 flex items-end justify-between gap-2 border-t border-app pt-4">
          <div>
            <p className="text-xs text-ink-muted">From</p>
            <p className="text-lg font-semibold tabular-nums text-ink">
              ${product.price.toFixed(0)}
              <span className="text-sm font-normal text-ink-muted">.00</span>
            </p>
          </div>
          <Link
            href={`/items/${product.id}`}
            className={`relative z-20 shrink-0 rounded-full px-4 py-2 text-xs font-semibold pointer-events-auto ${accentFilledClassName}`}
          >
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
}
