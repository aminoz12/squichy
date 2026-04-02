"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { ProductDetail } from "@/lib/data";
import { singleProductOffer } from "@/lib/data";
import { useCartStore } from "@/lib/store/use-cart-store";

function formatMoney(n: number) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(n);
}

type ProductCatalogProps = {
  products: ProductDetail[];
  title?: string;
  subtitle?: string;
  className?: string;
  id?: string;
};

export function ProductCatalog({
  products,
  title = "Products",
  subtitle = "Choose a product to view full details.",
  className = "",
  id,
}: ProductCatalogProps) {
  const putLine = useCartStore((s) => s.putLine);
  const [selectedId, setSelectedId] = useState(products[0]?.id ?? "");
  const [imageIndex, setImageIndex] = useState(0);

  const selected = useMemo(
    () => products.find((p) => p.id === selectedId) ?? products[0],
    [products, selectedId],
  );

  if (!selected) return null;

  function sizeIdForProduct(productId: string): string {
    if (productId === "mini-crazy-fun-rainbow") return "size-17";
    if (productId === "big-crazy-fun-rainbow") return "size-24";
    return singleProductOffer.options[0]!.id;
  }

  const selectedSizeId = sizeIdForProduct(selected.id);
  const sizeOption =
    singleProductOffer.options.find((o) => o.id === selectedSizeId) ??
    singleProductOffer.options[0]!;

  return (
    <section id={id} className={className}>
      <div className="text-center">
        <p className="text-sm font-extrabold uppercase tracking-widest text-accent">
          Products
        </p>
        <h2 className="mt-2 font-[family-name:var(--font-fredoka)] text-3xl font-bold text-foreground sm:text-4xl">
          {title}
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm font-semibold text-muted sm:text-base">
          {subtitle}
        </p>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {products.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              setSelectedId(item.id);
              setImageIndex(0);
            }}
            className={`overflow-hidden rounded-3xl border bg-white text-left shadow-lg transition hover:-translate-y-0.5 ${
              selected.id === item.id
                ? "border-accent/50 ring-2 ring-accent/20"
                : "border-pink-100"
            }`}
          >
            <div className="relative aspect-[4/3]">
              <Image
                src={item.images[0]}
                alt={item.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <p className="text-xs font-extrabold uppercase tracking-widest text-accent">
                {item.size}
              </p>
              <h3 className="mt-1 font-[family-name:var(--font-fredoka)] text-xl font-bold text-foreground">
                {item.name}
              </h3>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-2xl font-extrabold text-foreground">
                  {formatMoney(item.price)}
                </span>
                {item.compareAt != null && (
                  <span className="text-sm font-bold text-muted line-through">
                    {formatMoney(item.compareAt)}
                  </span>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>

      <article className="mt-8 rounded-3xl border border-pink-100 bg-white p-5 shadow-xl shadow-pink-200/30 sm:p-7">
        <p className="text-xs font-extrabold uppercase tracking-widest text-accent">
          Selected product
        </p>
        <h3 className="mt-2 font-[family-name:var(--font-fredoka)] text-2xl font-bold text-foreground sm:text-3xl">
          {selected.name}
        </h3>
        <p className="mt-1 text-sm font-bold text-primary-dark">{selected.size}</p>

        <div className="mt-4 flex items-center gap-2">
          <span className="text-3xl font-extrabold text-foreground">
            {formatMoney(selected.price)}
          </span>
          {selected.compareAt != null && (
            <span className="text-sm font-bold text-muted line-through">
              {formatMoney(selected.compareAt)}
            </span>
          )}
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {selected.images.map((src, i) => (
            <button
              type="button"
              key={src}
              onClick={() => setImageIndex(i)}
              className={`relative aspect-square overflow-hidden rounded-2xl border ${
                imageIndex === i ? "border-accent" : "border-pink-100"
              }`}
            >
              <Image
                src={src}
                alt={`${selected.name} image ${i + 1}`}
                fill
                sizes="(max-width: 640px) 100vw, 33vw"
                className="object-cover"
              />
            </button>
          ))}
        </div>

        <div className="mt-4 relative aspect-[4/3] overflow-hidden rounded-2xl border border-pink-100 bg-pink-50">
          <Image
            src={selected.images[imageIndex]}
            alt={`${selected.name} preview`}
            fill
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover"
          />
        </div>

        <p className="mt-6 text-sm font-semibold leading-relaxed text-muted sm:text-base">
          {selected.description}
        </p>

        <h4 className="mt-6 text-sm font-extrabold uppercase tracking-wider text-foreground">
          Product details
        </h4>
        <ul className="mt-3 space-y-2">
          {selected.details.map((line) => (
            <li key={line} className="flex gap-2 text-sm font-semibold text-muted">
              <span className="mt-0.5 text-primary-dark">•</span>
              <span>{line}</span>
            </li>
          ))}
        </ul>

        <h4 className="mt-6 text-sm font-extrabold uppercase tracking-wider text-foreground">
          Specs
        </h4>
        <dl className="mt-3 grid gap-2 rounded-2xl border border-pink-100 bg-pink-50/40 p-4 sm:grid-cols-2">
          <div>
            <dt className="text-xs font-bold uppercase tracking-wide text-muted">Color</dt>
            <dd className="text-sm font-extrabold text-foreground">{selected.specs.color}</dd>
          </div>
          <div>
            <dt className="text-xs font-bold uppercase tracking-wide text-muted">Theme</dt>
            <dd className="text-sm font-extrabold text-foreground">{selected.specs.theme}</dd>
          </div>
          <div>
            <dt className="text-xs font-bold uppercase tracking-wide text-muted">Brand</dt>
            <dd className="text-sm font-extrabold text-foreground">{selected.specs.brand}</dd>
          </div>
          <div>
            <dt className="text-xs font-bold uppercase tracking-wide text-muted">
              Character
            </dt>
            <dd className="text-sm font-extrabold text-foreground">
              {selected.specs.character}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-bold uppercase tracking-wide text-muted">
              Dimensions
            </dt>
            <dd className="text-sm font-extrabold text-foreground">
              {selected.specs.dimensions}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-bold uppercase tracking-wide text-muted">Weight</dt>
            <dd className="text-sm font-extrabold text-foreground">{selected.specs.weight}</dd>
          </div>
        </dl>

        <div className="mt-6 grid gap-2 sm:max-w-sm">
          <button
            type="button"
            onClick={() =>
              putLine({
                id: sizeOption.id,
                name: selected.name,
                unitPriceEuro: sizeOption.priceEuro,
                quantity: 1,
              })
            }
            className="w-full rounded-2xl bg-foreground py-3.5 text-center text-sm font-extrabold text-white shadow-lg transition hover:opacity-95 active:scale-[0.99]"
          >
            Add to cart
          </button>
          <a
            href="/products#offer"
            className="w-full rounded-2xl border-2 border-pink-200 py-3 text-center text-sm font-extrabold text-foreground transition hover:border-accent/50"
          >
            Buy now
          </a>
        </div>
      </article>
    </section>
  );
}
