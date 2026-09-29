import { Link } from "@tanstack/react-router";
import { Tag } from "lucide-react";
import { categories } from "../../data/categories";

// Desktop-only horizontal category bar (Best Buy style).
// On mobile the same categories live in the MobileMenu drawer instead.
export default function CategoryNav() {
  return (
    <nav className="hidden border-t border-white/10 bg-ink-900 md:block" aria-label="Категории">
      <ul className="mx-auto flex max-w-7xl items-center gap-1 overflow-x-auto px-4 text-sm no-scrollbar">
        <li>
          <Link
            to="/search"
            search={{ sale: true }}
            className="flex items-center gap-1.5 whitespace-nowrap px-3 py-2.5 font-semibold text-deal hover:text-white"
          >
            <Tag className="size-4" aria-hidden="true" />
            Понуди
          </Link>
        </li>
        {categories.map((cat) => (
          <li key={cat.slug}>
            <Link
              to="/category/$slug"
              params={{ slug: cat.slug }}
              className="block whitespace-nowrap px-3 py-2.5 text-gray-300 hover:text-white"
              // Styles applied automatically when this link matches the current URL
              activeProps={{ className: "!text-white font-semibold" }}
            >
              {cat.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
