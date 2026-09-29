import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";

export default function ProductGrid({ products, isLoading }) {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
      {isLoading
        ? Array.from({ length: 8 }, (_, i) => (
            <li key={i}>
              <ProductCardSkeleton />
            </li>
          ))
        : products.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
    </ul>
  );
}
