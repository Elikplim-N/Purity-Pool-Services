import Link from "next/link";
import { AtSign, Mail, MapPin, Phone, Share2, Waves } from "lucide-react";

type FooterCategory = {
  name: string;
  slug: string;
};

export function Footer({ categories }: { categories: FooterCategory[] }) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-blue-100 bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white">
              <Waves className="h-5 w-5" />
            </span>
            <span className="text-lg font-bold tracking-tight text-slate-900">
              Purity Pool <span className="text-blue-600">Services</span>
            </span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-6 text-slate-500">
            Everything you need to keep your pool clean, balanced, and ready
            to swim &mdash; chemicals, equipment, and accessories in one
            place.
          </p>
          <div className="mt-4 flex items-center gap-3">
            <a
              href="#"
              aria-label="Facebook"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition hover:bg-blue-100"
            >
              <Share2 className="h-4 w-4" />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition hover:bg-blue-100"
            >
              <AtSign className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-slate-900">Shop</h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-500">
            <li>
              <Link href="/products" className="transition hover:text-blue-700">
                All products
              </Link>
            </li>
            <li>
              <Link href="/categories" className="transition hover:text-blue-700">
                All categories
              </Link>
            </li>
            <li>
              <Link href="/cart" className="transition hover:text-blue-700">
                Your cart
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-slate-900">Categories</h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-500">
            {categories.slice(0, 5).map((category) => (
              <li key={category.slug}>
                <Link
                  href={`/categories/${category.slug}`}
                  className="transition hover:text-blue-700"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-slate-900">Get in touch</h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-500">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />
              <span>123 Poolside Avenue, Sunview, FL 33101</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0 text-blue-500" />
              <span>(555) 012-3456</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0 text-blue-500" />
              <span>hello@puritypoolservices.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-blue-100">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-slate-400 sm:flex-row sm:px-6 lg:px-8">
          <p>&copy; {year} Purity Pool Services. All rights reserved.</p>
          <p>Online payments coming soon &mdash; orders are confirmed by our team after checkout.</p>
        </div>
      </div>
    </footer>
  );
}
