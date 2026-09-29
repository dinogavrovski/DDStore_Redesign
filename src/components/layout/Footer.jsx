import { Link } from "@tanstack/react-router";
import { Truck, ShieldCheck, Store, Phone, Mail, MapPin } from "lucide-react";
import { categories } from "../../data/categories";

// PLACEHOLDER contact details. Replace with DDStore's real ones.
const perks = [
  { icon: Truck, title: "Брза достава", text: "1–3 работни дена низ МК" },
  { icon: ShieldCheck, title: "Гаранција", text: "До 36 месеци на конфигурации" },
  { icon: Store, title: "Подигни во продавница", text: "Бесплатно, истиот ден" },
];

export default function Footer() {
  return (
    <footer className="mt-16 bg-ink-950 text-gray-300">
      <div className="border-b border-white/10">
        <ul className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:grid-cols-3">
          {perks.map(({ icon: Icon, title, text }) => (
            <li key={title} className="flex items-center gap-3">
              <Icon className="size-8 shrink-0 text-brand-500" aria-hidden="true" />
              <div>
                <p className="font-semibold text-white">{title}</p>
                <p className="text-sm">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 text-sm sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <h2 className="mb-3 font-semibold text-white">Категории</h2>
          <ul className="space-y-2">
            {categories.slice(0, 5).map((cat) => (
              <li key={cat.slug}>
                <Link to="/category/$slug" params={{ slug: cat.slug }} className="hover:text-white">
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="mb-3 font-semibold text-white">Помош</h2>
          <ul className="space-y-2">
            <li>Начини на плаќање</li>
            <li>Достава</li>
            <li>Рекламации и гаранција</li>
            <li>Често поставувани прашања</li>
          </ul>
        </div>
        <div>
          <h2 className="mb-3 font-semibold text-white">За нас</h2>
          <ul className="space-y-2">
            <li>За DDStore</li>
            <li>Сервис</li>
            <li>Политика за колачиња</li>
            <li>Услови за користење</li>
          </ul>
        </div>
        <div>
          <h2 className="mb-3 font-semibold text-white">Контакт</h2>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <MapPin className="size-4" aria-hidden="true" /> Скопје, Македонија
            </li>
            <li className="flex items-center gap-2">
              <Phone className="size-4" aria-hidden="true" /> 02 3000 000
            </li>
            <li className="flex items-center gap-2">
              <Mail className="size-4" aria-hidden="true" /> info@example.mk
            </li>
          </ul>
        </div>
      </div>

      <p className="border-t border-white/10 py-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} DDStore. Сите права задржани.
      </p>
    </footer>
  );
}
