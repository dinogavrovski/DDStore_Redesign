import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { Search, LoaderCircle } from "lucide-react";
import { searchProducts } from "../../api/products";
import { useDebounce } from "../../hooks/useDebounce";
import { formatPrice } from "../../lib/formatPrice";

export default function SearchBar() {
  // Controlled input: React state is the single source of truth for the text.
  const [term, setTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const debouncedTerm = useDebounce(term, 300);
  const navigate = useNavigate();

  // ============================================================
  // TODO #4a: fetch live suggestions with TanStack Query
  // ============================================================
  // Look at src/routes/index.jsx first: it has a complete useQuery example.
  //
  // Hints:
  //  - const { data, isFetching } = useQuery({ ... })   (already imported)
  //  - queryKey: ["search", debouncedTerm]
  //      The key is the cache ID. Different term = different cache entry,
  //      so typing "rtx" again later is instant (served from cache).
  //  - queryFn: () => searchProducts(debouncedTerm, { limit: 6 })
  //  - enabled: debouncedTerm.length >= 2
  //      Don't search for "" or a single letter.
  //  - placeholderData: keepPreviousData
  //      Keeps showing the old suggestions while new ones load,
  //      so the dropdown doesn't flicker empty on each keystroke.
  //  - data is `undefined` before the first fetch, so default it:
  //      const suggestions = data ?? [];
  const suggestions = [];
  const isFetching = false;

  // ============================================================
  // TODO #4b: go to the search results page on Enter / button click
  // ============================================================
  // Hints:
  //  - Keep e.preventDefault(): without it the browser reloads the whole page
  //    (old-school form submit), which is exactly what we're avoiding.
  //  - Ignore empty searches: if (!term.trim()) return;
  //  - navigate({ to: "/search", search: { q: term.trim() } })
  //    This produces the URL /search?q=... and the search route reads it.
  //  - Close the dropdown afterwards (setIsFocused(false)).
  function handleSubmit(e) {
    e.preventDefault();
  }

  const showDropdown = isFocused && term.trim().length >= 2;

  return (
    <form onSubmit={handleSubmit} className="relative" role="search">
      <label htmlFor="site-search" className="sr-only">
        Пребарај производи
      </label>
      <input
        id="site-search"
        type="search"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="Пребарај: лаптоп, RTX 5060, монитор..."
        autoComplete="off"
        className="h-11 w-full rounded-md bg-white pr-12 pl-4 text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-brand-500 focus:outline-none"
      />
      <button
        type="submit"
        className="absolute inset-y-0 right-0 grid w-12 place-items-center rounded-r-md text-ink-900 hover:text-brand-600"
        aria-label="Пребарај"
      >
        {isFetching ? (
          <LoaderCircle className="size-5 animate-spin" aria-hidden="true" />
        ) : (
          <Search className="size-5" aria-hidden="true" />
        )}
      </button>

      {showDropdown && (
        <div className="absolute inset-x-0 top-full z-50 mt-1 overflow-hidden rounded-md bg-white text-gray-900 shadow-xl ring-1 ring-black/5">
          {suggestions.length === 0 ? (
            <p className="px-4 py-3 text-sm text-gray-500">
              {isFetching ? "Се пребарува..." : `Нема резултати за „${term}“`}
            </p>
          ) : (
            <ul>
              {suggestions.map((p) => (
                <li key={p.id}>
                  <Link
                    to="/product/$slug"
                    params={{ slug: p.slug }}
                    // onMouseDown fires BEFORE the input's onBlur. Without this,
                    // blur would hide the dropdown before the click lands.
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => setIsFocused(false)}
                    className="flex items-center justify-between gap-4 px-4 py-2.5 text-sm hover:bg-gray-100"
                  >
                    <span className="line-clamp-1">{p.name}</span>
                    <span className="shrink-0 font-semibold">{formatPrice(p.price)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </form>
  );
}
