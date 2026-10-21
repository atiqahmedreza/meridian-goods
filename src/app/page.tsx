import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StarRating } from "@/components/StarRating";
import { CATEGORIES, STATIC_PRODUCTS } from "@/lib/products";

const features = [
  {
    title: "Curated catalog",
    description: "Every product meets our standards for materials, design, and long-term value.",
  },
  {
    title: "Fast, tracked shipping",
    description: "Real-time updates from warehouse to doorstep on every order.",
  },
  {
    title: "30-day returns",
    description: "Not the right fit? Return unused items within 30 days—no hassle.",
  },
  {
    title: "Secure payments",
    description: "Encrypted checkout and trusted payment partners protect your data.",
  },
];

const testimonials = [
  {
    quote:
      "The site feels like a major retailer—clean layout, fast filters, and the headphones are genuinely excellent.",
    name: "Sarah Mitchell",
    role: "Verified customer",
    rating: 5,
  },
  {
    quote:
      "I found a running jacket and home goods in one session. Checkout flow is straightforward and professional.",
    name: "James Liu",
    role: "Verified customer",
    rating: 5,
  },
  {
    quote:
      "Love the product photography and detail pages. Makes comparison shopping easy on mobile too.",
    name: "Aisha Khan",
    role: "Verified customer",
    rating: 4.8,
  },
];

const categoryImages: Record<string, string> = {
  Electronics:
    "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&q=80",
  Fashion:
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80",
  Home: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=80",
  Sports:
    "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&q=80",
};

export default function HomePage() {
  const featured = STATIC_PRODUCTS.slice(0, 4);
  const showcaseCategories = CATEGORIES.slice(0, 4);

  return (
    <>
      <section className="relative overflow-hidden border-b border-app">
        <Container className="relative grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-app glass-panel px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-accent">
              Spring 2026 collection
            </p>
            <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-5xl lg:text-6xl">
              Essentials designed for how you actually live
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-muted">
              Shop electronics, apparel, and home goods from a curated catalog—with the polish
              and clarity you expect from a modern global storefront.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href="/items" variant="accent" size="lg">
                Browse products
              </ButtonLink>
              <ButtonLink href="/about" variant="outline" size="lg">
                Our story
              </ButtonLink>
            </div>
            <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-app pt-8">
              {[
                { label: "Products", value: "500+" },
                { label: "Happy customers", value: "48k" },
                { label: "Avg. rating", value: "4.8★" },
              ].map((stat) => (
                <div key={stat.label}>
                  <dt className="text-xs uppercase tracking-wide text-ink-muted">{stat.label}</dt>
                  <dd className="mt-1 text-2xl font-semibold tabular-nums text-ink">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="relative">
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-app shadow-elevated">
              <Image
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80"
                alt="Retail collection display"
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-app py-4">
        <Container>
          <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs font-medium uppercase tracking-[0.12em] text-ink-muted sm:text-sm">
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Free shipping $75+
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Authentic products
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              24/7 support
            </li>
          </ul>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeader
            eyebrow="Categories"
            title="Shop by department"
            description="Browse our most popular collections, updated weekly with new arrivals."
            align="center"
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {showcaseCategories.map((cat) => (
              <Link
                key={cat}
                href={`/items?category=${encodeURIComponent(cat)}`}
                className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-app shadow-soft"
              >
                <Image
                  src={categoryImages[cat] ?? categoryImages.Electronics}
                  alt={cat}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(30,51,72,0.75)] via-[rgba(30,51,72,0.2)] to-transparent" />
                <span className="absolute bottom-5 left-5 text-lg font-semibold text-[#c5d6e8]">
                  {cat}
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeader
            eyebrow="Why Meridian"
            title="Built for confident shopping"
            description="From discovery to delivery, every touchpoint is designed to feel fast, clear, and trustworthy."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f, i) => (
              <div
                key={f.title}
                className="rounded-2xl border border-app glass-panel p-6 transition hover:border-app-strong hover:shadow-soft"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-soft text-sm font-bold text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-semibold text-ink">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{f.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeader
            eyebrow="Trending"
            title="Featured this week"
            description="Top-rated picks from our catalog."
            action={
              <Link
                href="/items"
                className="text-sm font-semibold text-accent hover:text-accent-bright"
              >
                View all products →
              </Link>
            }
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="overflow-hidden rounded-3xl border border-app-strong shadow-elevated">
            <div className="grid lg:grid-cols-2">
              <div className="relative min-h-[280px] lg:min-h-full">
                <Image
                  src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=900&q=80"
                  alt="Promotional banner"
                  fill
                  className="object-cover"
                  sizes="50vw"
                />
                <div className="absolute inset-0 bg-[rgba(30,51,72,0.25)]" />
              </div>
              <div className="flex flex-col justify-center border-t border-app p-8 sm:p-12 lg:border-l lg:border-t-0 lg:p-14">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                  Member offer
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                  15% off your first order when you create an account
                </h2>
                <p className="mt-4 text-ink-muted">
                  Join thousands of shoppers who use Meridian Goods for quality essentials and
                  hassle-free returns.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <ButtonLink href="/register" variant="accent" size="lg">
                    Get started
                  </ButtonLink>
                  <ButtonLink href="/items" variant="outline" size="lg">
                    Browse catalog
                  </ButtonLink>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-app py-16 sm:py-20">
        <Container>
          <SectionHeader
            eyebrow="Reviews"
            title="Trusted by shoppers worldwide"
            align="center"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure
                key={t.name}
                className="flex flex-col rounded-2xl border border-app glass-panel p-6 shadow-soft"
              >
                <StarRating rating={t.rating} size="md" />
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-ink-muted">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 border-t border-app pt-4">
                  <p className="font-semibold text-ink">{t.name}</p>
                  <p className="text-xs text-ink-muted">{t.role}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
