import Image from "next/image";
import { PageHeader } from "@/components/PageHeader";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";

const values = [
  {
    title: "Quality first",
    text: "We partner with makers and brands that prioritize durability, ethics, and design integrity.",
  },
  {
    title: "Transparent pricing",
    text: "No hidden fees at checkout. What you see on the product page is what you pay.",
  },
  {
    title: "Customer obsession",
    text: "From search to returns, every flow is tested for clarity on mobile and desktop.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="Our story"
        description="Meridian Goods is a modern destination for everyday essentials—built with the same care you'd expect from a global retail brand."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About" },
        ]}
      />

      <Container className="py-14 lg:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Est. 2026
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Retail-grade experience, thoughtfully engineered
            </h2>
            <p className="mt-6 text-base leading-relaxed text-ink-muted">
              Meridian Goods brings together curated products, fast discovery, and a checkout
              experience that feels familiar—whether you are browsing on your phone or managing
              inventory as a signed-in seller.
            </p>
            <p className="mt-4 text-base leading-relaxed text-ink-muted">
              Browse our curated catalog or sign in to add and manage products stored in your
              browser. Firebase powers authentication; the storefront is built on Next.js and
              Tailwind CSS.
            </p>
            <ButtonLink href="/items" variant="accent" className="mt-8">
              Explore the catalog
            </ButtonLink>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-app shadow-elevated sm:aspect-[4/3] lg:aspect-[4/5]">
            <Image
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=900&q=80"
              alt="Meridian Goods retail space"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>

        <section className="mt-20">
          <h2 className="text-center text-2xl font-semibold text-ink">What we stand for</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {values.map((v) => (
              <div
                key={v.title}
                className="rounded-2xl border border-app glass-panel p-6 shadow-soft"
              >
                <h3 className="font-semibold text-ink">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{v.text}</p>
              </div>
            ))}
          </div>
        </section>
      </Container>
    </>
  );
}
