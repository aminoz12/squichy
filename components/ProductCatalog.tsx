"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { ProductDetail } from "@/lib/data";
import { singleProductOffer } from "@/lib/data";
import { useCartStore } from "@/lib/store/use-cart-store";

function formatMoney(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
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
        <p className="eyebrow-pill text-sm uppercase tracking-wide">
          Products
        </p>
        <h2 className="mt-4 font-[family-name:var(--font-fredoka)] text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          {title}
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm font-semibold text-ink-2 sm:text-base">
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
            className={`sticker-card sticker-lift overflow-hidden text-left ${
              selected.id === item.id ? "bg-sun-soft" : "bg-white"
            }`}
          >
            <div className="relative aspect-[4/3] border-b-[2.5px] border-ink">
              <Image
                src={item.images[0]}
                alt={item.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <p className="text-xs font-extrabold uppercase tracking-widest text-pink-pop">
                {item.size}
              </p>
              <h3 className="mt-1 font-[family-name:var(--font-fredoka)] text-xl font-semibold text-ink">
                {item.name}
              </h3>
              <div className="mt-2 flex items-center gap-2">
                <span className="font-[family-name:var(--font-fredoka)] text-2xl font-semibold text-ink">
                  {formatMoney(item.price)}
                </span>
                {item.compareAt != null && (
                  <span className="text-sm font-bold text-ink-2 line-through">
                    {formatMoney(item.compareAt)}
                  </span>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>

      <article className="sticker-card mt-8 p-5 sm:p-7">
        <p className="eyebrow-pill text-xs uppercase tracking-wide">
          Selected product
        </p>
        <h3 className="mt-4 font-[family-name:var(--font-fredoka)] text-2xl font-semibold text-ink sm:text-3xl">
          {selected.name}
        </h3>
        <p className="mt-1 text-sm font-bold text-pink-pop">{selected.size}</p>

        <div className="mt-4 flex items-center gap-2">
          <span className="font-[family-name:var(--font-fredoka)] text-3xl font-semibold text-ink">
            {formatMoney(selected.price)}
          </span>
          {selected.compareAt != null && (
            <span className="text-sm font-bold text-ink-2 line-through">
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
              className={`relative aspect-square overflow-hidden rounded-[16px] border-2 ${
                imageIndex === i ? "border-ink" : "border-transparent"
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

        <div className="mt-4 relative aspect-[4/3] overflow-hidden rounded-[18px] border-[2.5px] border-ink bg-pink-soft shadow-[3px_3px_0_var(--ink)]">
          <Image
            src={selected.images[imageIndex]}
            alt={`${selected.name} preview`}
            fill
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover"
          />
        </div>

        <p className="mt-6 text-sm font-semibold leading-relaxed text-ink-2 sm:text-base">
          {selected.description}
        </p>

        <h4 className="mt-6 font-[family-name:var(--font-fredoka)] text-sm font-semibold uppercase tracking-wider text-ink">
          Product details
        </h4>
        <ul className="mt-3 space-y-2">
          {selected.details.map((line) => (
            <li key={line} className="flex gap-2 text-sm font-semibold text-ink-2">
              <span className="mt-0.5 text-pink-pop">•</span>
              <span>{line}</span>
            </li>
          ))}
        </ul>

        <h4 className="mt-6 font-[family-name:var(--font-fredoka)] text-sm font-semibold uppercase tracking-wider text-ink">
          Specs
        </h4>
        <dl className="mt-3 grid gap-2 rounded-[16px] border-2 border-ink bg-cream p-4 sm:grid-cols-2">
          <div>
            <dt className="text-xs font-bold uppercase tracking-wide text-ink-2">Color</dt>
            <dd className="text-sm font-bold text-ink">{selected.specs.color}</dd>
          </div>
          <div>
            <dt className="text-xs font-bold uppercase tracking-wide text-ink-2">Theme</dt>
            <dd className="text-sm font-bold text-ink">{selected.specs.theme}</dd>
          </div>
          <div>
            <dt className="text-xs font-bold uppercase tracking-wide text-ink-2">Brand</dt>
            <dd className="text-sm font-bold text-ink">{selected.specs.brand}</dd>
          </div>
          <div>
            <dt className="text-xs font-bold uppercase tracking-wide text-ink-2">
              Character
            </dt>
            <dd className="text-sm font-bold text-ink">
              {selected.specs.character}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-bold uppercase tracking-wide text-ink-2">
              Dimensions
            </dt>
            <dd className="text-sm font-bold text-ink">
              {selected.specs.dimensions}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-bold uppercase tracking-wide text-ink-2">Weight</dt>
            <dd className="text-sm font-bold text-ink">{selected.specs.weight}</dd>
          </div>
        </dl>

        <div className="mt-6 grid gap-2 sm:max-w-sm">
          <button
            type="button"
            onClick={() =>
              putLine({
                id: sizeOption.id,
                name: selected.name,
                unitPriceUsd: sizeOption.priceUsd,
                quantity: 1,
              })
            }
            className="btn-squish w-full text-sm"
          >
            Add to cart
          </button>
          <Link
            href="/products#offer"
            className="btn-squish btn-white w-full text-sm"
          >
            Buy now
          </Link>
        </div>
      </article>
    </section>
  );
}
