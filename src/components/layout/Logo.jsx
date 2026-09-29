import { Link } from "@tanstack/react-router";

export default function Logo() {
  return (
    <Link to="/" className="flex shrink-0 items-center gap-1.5" aria-label="DDStore почетна">
      <span className="rounded-md bg-brand-600 px-1.5 py-0.5 text-lg font-black tracking-tight text-white">
        DD
      </span>
      <span className="text-lg font-bold tracking-widest text-white">STORE</span>
    </Link>
  );
}
