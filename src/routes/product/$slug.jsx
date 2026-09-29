import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { getProductBySlug } from "../../api/products";
import { formatPrice } from "../../lib/formatPrice";

// Product detail page: bare-bones placeholder, gets its own milestone later.
export const Route = createFileRoute("/product/$slug")({
  component: ProductPage,
});

function ProductPage() {
  const { slug } = Route.useParams();
  const { data: product, isPending, error } = useQuery({
    queryKey: ["product", slug],
    queryFn: () => getProductBySlug(slug),
  });

  if (isPending) return <p className="mx-auto max-w-7xl px-4 py-8">Се вчитува...</p>;
  if (error) return <p className="mx-auto max-w-7xl px-4 py-8">{error.message}</p>;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <p className="mt-4 text-3xl font-bold">{formatPrice(product.price)}</p>
      <dl className="mt-6 grid max-w-md grid-cols-2 gap-2 text-sm">
        {Object.entries(product.specs).map(([key, value]) => (
          <div key={key} className="contents">
            <dt className="text-gray-500 uppercase">{key}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
