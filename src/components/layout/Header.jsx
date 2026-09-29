import { Link } from "@tanstack/react-router";
import { Menu, ShoppingCart, User, Truck } from "lucide-react";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import CategoryNav from "./CategoryNav";
import MobileMenu from "./MobileMenu";
import { useState } from "react";

export default function Header() {
  // ============================================================
  // TODO #3a: make the menu open and close (useState + passing callbacks)
  // ============================================================
  // Right now `isMenuOpen` is a constant, so the drawer can never open.
  //
  // Hints:
  //  - import { useState } from "react";
  //  - Replace the line below with a state variable + setter.
  //  - The "Мени" <button> below needs an onClick that opens it.
  //  - <MobileMenu> needs an `onClose` prop: a function that closes it.
  //    MobileMenu calls it when the X, the dark backdrop or a link is clicked.
  //    (This is "lifting state up": the parent owns the state, the child
  //     just calls a function it received through props.)
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  return (
    <header className="sticky top-0 z-40 bg-ink-950 text-white shadow-md">
      {/* Thin promo strip */}
      <div className="hidden bg-brand-600 text-center text-xs font-medium sm:block">
        <p className="flex items-center justify-center gap-2 py-1.5">
          <Truck className="size-4" aria-hidden="true" />
          Бесплатна достава низ цела Македонија за нарачки над 3.000 ден.
        </p>
      </div>

      {/* Main row: menu, logo, search, account, cart */}
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-4 gap-y-3 px-4 py-3">
        <button
          type="button"
          className="flex items-center gap-2 rounded-md p-1.5 text-sm font-semibold hover:bg-white/10"
          aria-label="Отвори мени"
          aria-expanded={isMenuOpen}
          onClick={() =>  setIsMenuOpen(!isMenuOpen)}
        >
          <Menu className="size-6" aria-hidden="true" />
          <span className="hidden lg:inline">Мени</span>
        </button>

        <Logo />

        {/* order-last + w-full on mobile pushes search to its own row; inline on desktop */}
        <div className="order-last w-full md:order-none md:flex-1">
          <SearchBar />
        </div>

        <nav className="ml-auto flex items-center gap-1 md:ml-0" aria-label="Корисник">
          <button
            type="button"
            className="flex items-center gap-2 rounded-md p-2 text-sm hover:bg-white/10"
          >
            <User className="size-6" aria-hidden="true" />
            <span className="hidden xl:inline">Најава</span>
          </button>
          <Link
            to="/"
            className="relative flex items-center gap-2 rounded-md p-2 text-sm hover:bg-white/10"
            aria-label="Кошничка"
          >
            <ShoppingCart className="size-6" aria-hidden="true" />
            <span className="hidden xl:inline">Кошничка</span>
            {/* Cart count, hardcoded until we build the cart */}
            <span className="absolute -top-0.5 left-6 grid size-5 place-items-center rounded-full bg-deal text-[11px] font-bold text-ink-950">
              0
            </span>
          </Link>
        </nav>
      </div>

      <CategoryNav />

      {isMenuOpen && <MobileMenu onClose={() => setIsMenuOpen(false)}/>}
    </header>
  );
}
