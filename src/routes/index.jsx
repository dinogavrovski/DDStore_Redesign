import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/products";
import { categories } from "../data/categories";
import CategoryIcon from "../components/CategoryIcon";
import ProductRail from "../components/product/ProductRail";

// "/" -> the home page. The string must match the file's path;
// the Vite plugin fills it in for you when you create a new route file.
export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  // ---------- WORKED EXAMPLE: useQuery ----------
  // queryKey: unique cache ID. Same key anywhere in the app = same cached data.
  // queryFn:  any function that returns a Promise (our fake API).
  // We get back: data (undefined until loaded), isPending (first load),
  // isFetching (any load incl. background refetch), error, and more.
  const deals = useQuery({
    queryKey: ["products", { onSale: true, limit: 10 }],
    queryFn: () => getProducts({ onSale: true, limit: 10 }),
  });

  const configs = useQuery({
    queryKey: ["products", { category: "konfiguracii" }],
    queryFn: () => getProducts({ category: "konfiguracii" }),
  });

  const refurbished = useQuery({
    queryKey: ["products", { category: "refurbished" }],
    queryFn: () => getProducts({ category: "refurbished" }),
  });

  return (
    <>
      <Hero />

      {/* Shop by category */}
      <section className="mx-auto max-w-7xl px-4 py-8">
        <h2 className="mb-4 text-xl font-bold sm:text-2xl">Купувај по категорија</h2>
        <ul className="grid grid-cols-3 gap-3 sm:grid-cols-5 lg:grid-cols-9">
          {categories.map((cat) => (
            <li key={cat.slug}>
              <Link
                to="/category/$slug"
                params={{ slug: cat.slug }}
                className="flex h-full flex-col items-center gap-2 rounded-lg bg-white p-4 text-center text-sm font-medium shadow-sm ring-1 ring-gray-200 hover:ring-brand-500"
              >
                <CategoryIcon name={cat.icon} className="size-8 text-brand-600" />
                {cat.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <ProductRail
        title="Актуелни понуди"
        products={deals.data ?? []}
        isLoading={deals.isPending}
        viewAllLink={{ to: "/search", search: { sale: true } }}
      />
      <ProductRail
        title="ДД Конфигурации"
        products={configs.data ?? []}
        isLoading={configs.isPending}
        viewAllLink={{ to: "/category/$slug", params: { slug: "konfiguracii" } }}
      />
      <ProductRail
        title="Refurbished компјутери"
        products={refurbished.data ?? []}
        isLoading={refurbished.isPending}
        viewAllLink={{ to: "/category/$slug", params: { slug: "refurbished" } }}
      />
    </>
  );
}

function Hero() {
  return (
    <section className="bg-gradient-to-br from-ink-900 via-ink-950 to-black text-white">
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-12 md:grid-cols-2 md:py-16">
        <div>
          <p className="mb-3 inline-block rounded bg-deal px-2 py-1 text-xs font-bold tracking-wide text-ink-950 uppercase">
            Флеш понуда
          </p>
          <h1 className="text-3xl leading-tight font-extrabold sm:text-5xl">
            Гејминг конфигурации <span className="text-brand-500">склопени и на залиха</span>
          </h1>
          <p className="mt-4 max-w-md text-gray-300">
            Над 40 модели DD конфигурации, тестирани и спремни за подигање денес.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/category/$slug"
              params={{ slug: "konfiguracii" }}
              className="rounded-md bg-brand-600 px-5 py-3 font-semibold hover:bg-brand-700"
            >
              Види конфигурации
            </Link>
            <Link
              to="/search"
              search={{ sale: true }}
              className="rounded-md px-5 py-3 font-semibold ring-1 ring-white/30 hover:bg-white/10"
            >
              Сите понуди
            </Link>
          </div>
        </div>
        {/* Placeholder for a hero image; it will be the page's LCP element, so no lazy-loading there */}
        <div className="hidden aspect-[4/3] place-items-center rounded-xl bg-white/5 ring-1 ring-white/10 md:grid">
          <CategoryIcon name="Cpu" className="size-32 text-white/20" />
        </div>
      </div>
    </section>
  );
}
