"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, Search, ShoppingCart, Waves, X } from "lucide-react";
import { useCart } from "@/components/cart/cart-context";
import { cn } from "@/lib/cn";

type NavCategory = {
  name: string;
  slug: string;
};

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Shop" },
  { href: "/categories", label: "Categories" },
];

export function Header({ categories }: { categories: NavCategory[] }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { itemCount } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-blue-100 bg-white/90 backdrop-blur">
      <div className="bg-blue-600 text-white">
        <p className="mx-auto max-w-7xl px-4 py-1.5 text-center text-xs font-medium tracking-wide sm:px-6 lg:px-8">
          Free local delivery on orders over $150 &middot; Chemicals tested for
          purity
        </p>
      </div>

      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3.5 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white">
            <Waves className="h-5 w-5" strokeWidth={2} />
          </span>
          <span className="text-lg font-bold tracking-tight text-slate-900">
            Purity Pool <span className="text-blue-600">Services</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-blue-50 hover:text-blue-700"
            >
              {link.label}
            </Link>
          ))}
          <div className="group relative">
            <button
              type="button"
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-blue-50 hover:text-blue-700"
            >
              Shop by category
            </button>
            <div className="invisible absolute left-0 top-full z-50 w-64 rounded-xl border border-blue-100 bg-white p-2 opacity-0 shadow-lg shadow-blue-950/10 transition group-hover:visible group-hover:opacity-100">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/categories/${category.slug}`}
                  className="block rounded-lg px-3 py-2 text-sm text-slate-600 transition hover:bg-blue-50 hover:text-blue-700"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        <form
          action="/products"
          method="GET"
          className="ml-auto hidden max-w-xs flex-1 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 md:flex"
        >
          <Search className="h-4 w-4 text-slate-400" />
          <input
            type="search"
            name="q"
            placeholder="Search pool supplies..."
            className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
          />
        </form>

        <Link
          href="/cart"
          className={cn(
            "relative flex h-10 w-10 items-center justify-center rounded-lg text-slate-600 transition hover:bg-blue-50 hover:text-blue-700",
            "md:ml-0 ml-auto"
          )}
          aria-label="View cart"
        >
          <ShoppingCart className="h-5 w-5" />
          {itemCount > 0 ? (
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-600 px-1 text-[11px] font-semibold text-white">
              {itemCount > 99 ? "99+" : itemCount}
            </span>
          ) : null}
        </Link>

        <button
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-600 transition hover:bg-blue-50 lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen ? (
        <div className="border-t border-blue-100 bg-white px-4 pb-4 pt-2 lg:hidden">
          <form action="/products" method="GET" className="mb-3 flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
            <Search className="h-4 w-4 text-slate-400" />
            <input
              type="search"
              name="q"
              placeholder="Search pool supplies..."
              className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
            />
          </form>
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-blue-50"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 border-t border-slate-100 pt-2">
              <p className="px-3 pb-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
                Categories
              </p>
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/categories/${category.slug}`}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-sm text-slate-700 transition hover:bg-blue-50"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
