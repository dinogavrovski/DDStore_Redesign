// Grey "shape" of a ProductCard shown while data loads.
// Same size as the real card, so nothing jumps when data arrives.
export default function ProductCardSkeleton() {
  return (
    <div className="flex h-full animate-pulse flex-col rounded-lg bg-white p-4 ring-1 ring-gray-200" aria-hidden="true">
      <div className="mb-4 aspect-square rounded-md bg-gray-200" />
      <div className="h-3 w-full rounded bg-gray-200" />
      <div className="mt-2 h-3 w-4/5 rounded bg-gray-200" />
      <div className="mt-6 h-6 w-1/2 rounded bg-gray-200" />
      <div className="mt-6 h-9 w-full rounded bg-gray-200" />
    </div>
  );
}
