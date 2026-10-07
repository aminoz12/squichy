import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CartDrawer } from "@/components/CartDrawer";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { Navbar } from "@/components/Navbar";
import {
  collections,
  collectionProducts,
  getCollection,
} from "@/lib/collections";
import type { ProductOffer } from "@/lib/data";
import {
  breadcrumbJsonLd,
  collectionPageJsonLd,
  ogImageUrl,
  toAbsoluteImageUrl,
} from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) return {};

  const firstImage = collectionProducts(collection)[0]?.images[0];

  return {
    title: collection.title,
    description: collection.metaDescription,
    alternates: { canonical: `/collections/${slug}` },
    openGraph: {
      type: "website",
      url: `/collections/${slug}`,
      title: `${collection.title} | SquishyBun`,
      description: collection.metaDescription,
      images: [firstImage ? toAbsoluteImageUrl(firstImage) : ogImageUrl()],
    },
  };
}

export default async function CollectionPage({ params }: Props) {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) notFound();

  const items = collectionProducts(collection);

  return (
    <>
      <JsonLd
        data={[
          collectionPageJsonLd({
            slug: collection.slug,
            title: collection.title,
            metaDescription: collection.metaDescription,
            items,
          }),
          breadcrumbJsonLd(
            [
              { name: "Home", path: "/" },
              { name: "Shop", path: "/products" },
              { name: collection.title, path: `/collections/${collection.slug}` },
            ],
            `/collections/${collection.slug}#breadcrumb`,
          ),
        ]}
      />
      <Navbar />
      <main className="flex-1 bg-cream pb-16 pt-10 sm:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <nav aria-label="Breadcrumb" className="mb-4 text-sm font-bold text-ink-2">
            <Link href="/" className="hover:text-pink-pop">Home</Link>
            {" / "}
            <Link href="/products" className="hover:text-pink-pop">Shop</Link>
            {" / "}
            <span className="text-ink">{collection.title}</span>
          </nav>

          <h1 className="font-[family-name:var(--font-fredoka)] text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            {collection.title}
          </h1>
          <p className="mt-4 max-w-3xl text-base font-semibold leading-relaxed text-ink-2 sm:text-lg">
            {collection.intro}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            <Link
              href="/products"
              className="rounded-full border-[2.5px] border-ink bg-white px-4 py-1.5 font-[family-name:var(--font-fredoka)] text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5"
            >
              All squishies
            </Link>
            {collections.map((c) => (
              <Link
                key={c.slug}
                href={`/collections/${c.slug}`}
                className={`rounded-full border-[2.5px] border-ink px-4 py-1.5 font-[family-name:var(--font-fredoka)] text-sm font-semibold transition-transform hover:-translate-y-0.5 ${
                  c.slug === collection.slug
                    ? "bg-ink text-white"
                    : "bg-white text-ink"
                }`}
              >
                {c.category}
              </Link>
            ))}
            <Link
              href={{ pathname: "/products", query: { category: collection.category } }}
              className="rounded-full border-[2.5px] border-dashed border-ink px-4 py-1.5 font-[family-name:var(--font-fredoka)] text-sm font-semibold text-ink-2 transition-transform hover:-translate-y-0.5 hover:text-ink"
            >
              Sort by price ↕
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((product, i) => (
              <CollectionCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <CartDrawer />
    </>
  );
}

function CollectionCard({
  product,
  index,
}: {
  product: ProductOffer;
  index: number;
}) {
  const minPrice = Math.min(...product.options.map((o) => o.priceUsd));
  const priceDisplay =
    product.options.length === 1
      ? `$${minPrice.toFixed(2)}`
      : `From $${minPrice.toFixed(2)}`;

  return (
    <article className="sticker-card sticker-lift group overflow-hidden">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-square overflow-hidden border-b-[2.5px] border-ink bg-white">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            loading={index < 4 ? "eager" : undefined}
            className="object-cover transition-transform duration-300 ease-[cubic-bezier(0.3,1.6,0.5,1)] group-hover:-rotate-2 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          {product.badge && (
            <span className="absolute left-4 top-4 -rotate-3 rounded-full border-2 border-ink bg-sun px-3 py-1 font-[family-name:var(--font-fredoka)] text-xs font-semibold uppercase tracking-wide text-ink">
              {product.badge}
            </span>
          )}
        </div>
        <div className="p-5">
          <h2 className="mb-2 line-clamp-1 font-[family-name:var(--font-fredoka)] text-lg font-semibold text-ink">
            {product.name}
          </h2>
          <p className="mb-4 line-clamp-2 text-sm font-semibold text-ink-2">
            {product.description}
          </p>
          <div className="flex items-center justify-between gap-2">
            <span className="font-[family-name:var(--font-fredoka)] text-xl font-semibold text-ink">
              {priceDisplay}
            </span>
            <span className="inline-flex items-center justify-center rounded-full border-2 border-ink bg-sun px-4 py-1.5 font-[family-name:var(--font-fredoka)] text-xs font-semibold uppercase tracking-wide text-ink shadow-[2px_2px_0_var(--ink)] transition-colors group-hover:bg-pink-pop group-hover:text-white">
              View
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

export async function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}
