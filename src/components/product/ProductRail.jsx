import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";

// Horizontal row of products. Pure CSS scroll-snap: swipeable on mobile,
// scrollable on desktop, no carousel library, no cloned DOM nodes.
// It only DISPLAYS data; the parent does the fetching and passes it in.
export default function ProductRail({ title, products, isLoading, viewAllLink }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-6">
      <div className="mb-4 flex items-end justify-between">
        <h2 className="text-xl font-bold sm:text-2xl">{title}</h2>
        {viewAllLink && (
          <Link {...viewAllLink} className="flex items-center text-sm font-semibold text-brand-600 hover:underline">
            Види ги сите <ChevronRight className="size-4" aria-hidden="true" />
          </Link>
        )}
      </div>

      <ul className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 no-scrollbar">
        {isLoading
          ? Array.from({ length: 5 }, (_, i) => (
              <li key={i} className="w-56 shrink-0 snap-start">
                <ProductCardSkeleton />
              </li>
            ))
          : products.map((product) => (
              <li key={product.id} className="w-56 shrink-0 snap-start">
                <ProductCard product={product} />
              </li>
            ))}
      </ul>
    </section>
  );
}
