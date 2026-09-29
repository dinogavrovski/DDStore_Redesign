import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { SearchX } from "lucide-react";
import { getProducts, searchProducts } from "../api/products";
import ProductGrid from "../components/product/ProductGrid";

// /search?q=rtx&sale=true
// validateSearch turns the raw URL query string into clean, typed values.
// Putting search + filters in the URL means results are shareable,
// bookmarkable and survive a refresh. The filter sidebar will build on this.
export const Route = createFileRoute("/search")({
  validateSearch: (search) => ({
    q: typeof search.q === "string" ? search.q : "",
    sale: search.sale === true || search.sale === "true" ? true : undefined,
  }),
  component: SearchPage,
});

function SearchPage() {
  const { q, sale } = Route.useSearch();

  const { data, isPending } = useQuery({
    // Different key prefix from the SearchBar suggestions: those are limited to 6,
    // these are the full result list, so they must not share a cache entry.
    queryKey: ["products", "search", { q, sale }],
    queryFn: async () => {
      const results = q ? await searchProducts(q) : await getProducts();
      return sale ? results.filter((p) => p.oldPrice !== null) : results;
    },
  });

  const title = q ? `Резултати за „${q}“` : sale ? "Актуелни понуди" : "Сите производи";

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-2xl font-bold">{title}</h1>
      {!isPending && <p className="mt-1 text-sm text-gray-600">{data.length} производи</p>}

      <div className="mt-6">
        {!isPending && data.length === 0 ? (
          <div className="rounded-lg bg-white py-16 text-center ring-1 ring-gray-200">
            <SearchX className="mx-auto size-12 text-gray-400" aria-hidden="true" />
            <p className="mt-4 font-semibold">Нема резултати</p>
            <p className="mt-1 text-sm text-gray-600">Пробај со друг збор, на пр. „лаптоп“ или „RTX“.</p>
          </div>
        ) : (
          <ProductGrid products={data ?? []} isLoading={isPending} />
        )}
      </div>
    </div>
  );
}
