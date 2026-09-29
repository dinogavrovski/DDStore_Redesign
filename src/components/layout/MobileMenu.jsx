import { Link } from "@tanstack/react-router";
import { X, ChevronRight, Phone } from "lucide-react";
import { categories } from "../../data/categories";
import CategoryIcon from "../CategoryIcon";
import { useEffect } from "react";

// Slide-in drawer with all categories. The parent (Header) decides
// WHETHER it renders; this component only knows how to ask to be closed.
export default function MobileMenu({ onClose }) {
  // ============================================================
  // TODO #3b: close the drawer with the Escape key (useEffect + cleanup)
  // ============================================================
  // Hints:
  //  - import { useEffect } from "react";
  //  - In a useEffect, add a "keydown" listener on `window`.
  //    Inside the handler: if (event.key === "Escape") onClose();
  //  - Return a cleanup that REMOVES the same listener
  //    (window.removeEventListener with the same function reference).
  //    Without cleanup, every open adds another listener that never goes away.
  //  - Dependency array: which values from the component does the effect use?
  //  - Same pattern as useDebounce: set something up, return the teardown.
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [onClose])


  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Мени">
      {/* Backdrop: clicking it closes the menu */}
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      <div className="absolute inset-y-0 left-0 flex w-80 max-w-[85vw] flex-col bg-white text-gray-900 shadow-xl">
        <div className="flex items-center justify-between bg-ink-950 px-4 py-3 text-white">
          <span className="font-semibold">Категории</span>
          <button type="button" onClick={onClose} className="rounded-md p-1 hover:bg-white/10" aria-label="Затвори">
            <X className="size-6" aria-hidden="true" />
          </button>
        </div>

        <ul className="flex-1 overflow-y-auto py-2">
          {categories.map((cat) => (
            <li key={cat.slug}>
              <Link
                to="/category/$slug"
                params={{ slug: cat.slug }}
                onClick={onClose}
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
              >
                <CategoryIcon name={cat.icon} className="size-5 text-brand-600" />
                <span className="flex-1">{cat.name}</span>
                <ChevronRight className="size-4 text-gray-400" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>

        {/* PLACEHOLDER phone number, replace with DDStore's real one */}
        <a href="tel:+38923000000" className="flex items-center gap-3 border-t px-4 py-4 text-sm text-gray-600">
          <Phone className="size-4" aria-hidden="true" />
          Помош при нарачка: 02 3000 000
        </a>
      </div>
    </div>
  );
}
