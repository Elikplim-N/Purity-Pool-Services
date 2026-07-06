"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  LogOut,
  Menu,
  Package,
  ShoppingBag,
  Tags,
  Waves,
  X,
} from "lucide-react";
import { logoutAction } from "@/app/admin/actions";
import { cn } from "@/lib/cn";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/categories", label: "Categories", icon: Tags },
  { href: "/admin/orders", label: "Orders", icon: ShoppingBag },
];

export function AdminShell({
  email,
  children,
}: {
  email: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  const navLinks = (onNavigate?: () => void) => (
    <nav className="flex flex-1 flex-col gap-1 px-3">
      {NAV_ITEMS.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={onNavigate}
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition",
            isActive(item.href, item.exact)
              ? "bg-blue-600 text-white"
              : "text-blue-100 hover:bg-blue-800/60 hover:text-white"
          )}
        >
          <item.icon className="h-4.5 w-4.5" />
          {item.label}
        </Link>
      ))}
    </nav>
  );

  return (
    <div className="flex min-h-screen bg-slate-50">
      <aside className="hidden w-64 shrink-0 flex-col bg-blue-950 py-6 lg:flex">
        <Link href="/admin" className="flex items-center gap-2 px-6">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white">
            <Waves className="h-5 w-5" />
          </span>
          <span className="text-base font-bold text-white">
            Purity Admin
          </span>
        </Link>
        <div className="mt-8">{navLinks()}</div>
        <div className="mt-auto flex flex-col gap-3 border-t border-blue-900 px-6 pt-4">
          <p className="truncate text-xs text-blue-300">{email}</p>
          <Link href="/" className="text-xs text-blue-300 hover:text-white">
            &larr; Back to store
          </Link>
          <form action={logoutAction}>
            <button
              type="submit"
              className="flex items-center gap-2 text-sm font-medium text-blue-100 hover:text-white"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </form>
        </div>
      </aside>

      <div className="flex min-h-screen flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 lg:hidden">
          <Link href="/admin" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
              <Waves className="h-4.5 w-4.5" />
            </span>
            <span className="text-sm font-bold text-slate-900">
              Purity Admin
            </span>
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </header>

        {mobileOpen ? (
          <div className="fixed inset-0 z-50 flex lg:hidden">
            <div
              className="absolute inset-0 bg-slate-900/40"
              onClick={() => setMobileOpen(false)}
            />
            <div className="relative flex w-72 flex-col bg-blue-950 py-6">
              <div className="flex items-center justify-between px-6">
                <span className="text-base font-bold text-white">
                  Purity Admin
                </span>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="text-blue-200 hover:text-white"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="mt-8">{navLinks(() => setMobileOpen(false))}</div>
              <div className="mt-auto flex flex-col gap-3 border-t border-blue-900 px-6 pt-4">
                <p className="truncate text-xs text-blue-300">{email}</p>
                <Link href="/" className="text-xs text-blue-300 hover:text-white">
                  &larr; Back to store
                </Link>
                <form action={logoutAction}>
                  <button
                    type="submit"
                    className="flex items-center gap-2 text-sm font-medium text-blue-100 hover:text-white"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign out
                  </button>
                </form>
              </div>
            </div>
          </div>
        ) : null}

        <main className="flex-1 px-4 py-8 sm:px-6 lg:px-10">{children}</main>
      </div>
    </div>
  );
}
