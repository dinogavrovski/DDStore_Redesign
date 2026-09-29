import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight } from "lucide-react";
import { getProducts } from "../../api/products";
import { categories } from "../../data/categories";
import ProductGrid from "../../components/product/ProductGrid";

// /category/gaming, /category/laptopi, ...  `$slug` is a dynamic URL segment.
// NEXT MILESTONE: filter sidebar (brand, price, CPU, GPU, in stock) + sorting.
export const Route = createFileRoute("/category/$slug")({
  component: CategoryPage,
});

function CategoryPage() {
  const { slug } = Route.useParams();
  const category = categories.find((c) => c.slug === slug);

  const { data, isPending } = useQuery({
    queryKey: ["products", { category: slug }],
    queryFn: () => getProducts({ category: slug }),
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <nav className="mb-2 flex items-center gap-1 text-sm text-gray-600" aria-label="Breadcrumb">
        <Link to="/" className="hover:underline">
          Почетна
        </Link>
        <ChevronRight className="size-4" aria-hidden="true" />
        <span className="text-gray-900">{category?.name ?? slug}</span>
      </nav>
      <h1 className="text-2xl font-bold">{category?.name ?? "Категорија"}</h1>
      {!isPending && <p className="mt-1 text-sm text-gray-600">{data.length} производи</p>}

      <div className="mt-6 grid gap-6 lg:grid-cols-[240px_1fr]">
        <aside className="hidden rounded-lg bg-white p-4 text-sm text-gray-500 ring-1 ring-gray-200 lg:block">
          Филтри (следно)
        </aside>
        <ProductGrid products={data ?? []} isLoading={isPending} />
      </div>
    </div>
  );
}
