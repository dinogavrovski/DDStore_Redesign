import { Link } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { formatPrice } from "../../lib/formatPrice";
import { categories } from "../../data/categories";
import CategoryIcon from "../CategoryIcon";

export default function ProductCard({ product }) {
  const { slug, name, price, oldPrice, inStock, rating, reviews, category } = product;
  const onSale = oldPrice !== null && oldPrice > price;
  const iconName = categories.find((c) => c.slug === category)?.icon;

  return (
    <article className="group flex h-full flex-col rounded-lg bg-white p-4 shadow-sm ring-1 ring-gray-200 transition hover:shadow-md">
      <Link to="/product/$slug" params={{ slug }} className="flex flex-1 flex-col">
        {/* Image placeholder until we have real product photos.
            Real images will use loading="lazy" + fixed width/height (no layout shift). */}
        <div className="relative mb-4 grid aspect-square place-items-center rounded-md bg-gray-50">
          <CategoryIcon name={iconName} className="size-16 text-gray-300" />
          {onSale && (
            <span className="absolute top-2 left-2 rounded bg-deal px-2 py-0.5 text-xs font-bold text-ink-950">
              Заштеди {formatPrice(oldPrice - price)}
            </span>
          )}
        </div>

        <h3 className="line-clamp-3 text-sm leading-snug group-hover:text-brand-600 group-hover:underline">
          {name}
        </h3>

        <div className="mt-2 flex items-center gap-1 text-xs text-gray-600">
          <Star className="size-3.5 fill-amber-400 text-amber-400" aria-hidden="true" />
          <span className="font-medium">{rating.toFixed(1)}</span>
          <span>({reviews})</span>
        </div>

        <div className="mt-auto pt-3">
          <p className="text-xl font-bold">{formatPrice(price)}</p>
          {/* Only show the old price when there actually is one, unlike the current site */}
          {onSale && <p className="text-sm text-gray-500 line-through">{formatPrice(oldPrice)}</p>}
        </div>
      </Link>

      <p className={`mt-2 text-xs font-medium ${inStock ? "text-green-700" : "text-gray-500"}`}>
        {inStock ? "● На залиха" : "○ Нема на залиха"}
      </p>
      <button
        type="button"
        disabled={!inStock}
        className="mt-3 w-full rounded-md bg-brand-600 py-2 text-sm font-semibold text-white hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500"
      >
        Додади во кошничка
      </button>
    </article>
  );
}
