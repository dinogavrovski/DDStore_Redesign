import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

// The root route wraps EVERY page. Header and Footer render once,
// and <Outlet /> is where the current page (index, search, ...) gets rendered.
export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: () => (
    <div className="mx-auto max-w-7xl px-4 py-24 text-center">
      <h1 className="text-3xl font-bold">404</h1>
      <p className="mt-2 text-gray-600">Страницата не постои.</p>
    </div>
  ),
});

function RootLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      {/* Both devtools only render in development, never in the production build */}
      <TanStackRouterDevtools position="bottom-right" />
      <ReactQueryDevtools buttonPosition="bottom-left" />
    </div>
  );
}
