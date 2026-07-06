import Link from "next/link";
import {
  Award,
  Headset,
  ShieldCheck,
  Truck,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CategoryCard } from "@/components/product/category-card";
import { ProductCard } from "@/components/product/product-card";
import { getCategories } from "@/lib/data/categories";
import { getFeaturedProducts, getProducts } from "@/lib/data/products";

const FEATURES = [
  {
    icon: ShieldCheck,
    title: "Lab-tested chemicals",
    description: "Every batch is quality-checked for purity and potency.",
  },
  {
    icon: Truck,
    title: "Fast local delivery",
    description: "Free delivery on orders over $150 within our service area.",
  },
  {
    icon: Award,
    title: "Trusted by pool pros",
    description: "Stocked by technicians and homeowners across the region.",
  },
  {
    icon: Headset,
    title: "Real support",
    description: "Talk to a real pool-care expert when you need help.",
  },
];

export default async function HomePage() {
  const [categories, featuredProducts] = await Promise.all([
    getCategories(),
    getFeaturedProducts(4),
  ]);

  let bestSellers = featuredProducts;
  if (bestSellers.length < 4) {
    bestSellers = await getProducts({ sort: "newest" });
    bestSellers = bestSellers.slice(0, 4);
  }

  return (
    <div>
      <section className="relative overflow-hidden bg-linear-to-br from-blue-600 via-blue-600 to-sky-500">
        <div className="absolute inset-0 opacity-20 [background:radial-gradient(circle_at_20%_20%,white,transparent_35%)]" />
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-2 lg:px-8">
          <div>
            <span className="inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
              Pool season is here
            </span>
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Crystal-clear water, delivered to your door.
            </h1>
            <p className="mt-4 max-w-lg text-base leading-7 text-blue-50">
              Shop chemicals, pumps, filters, cleaning equipment, and safety
              covers &mdash; everything a pool owner needs, all in one place.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/products" size="lg" variant="inverse">
                Shop all products
              </Button>
              <Button href="/categories" size="lg" variant="inverse-outline">
                Browse categories
              </Button>
            </div>
          </div>
          <div className="relative hidden lg:block">
            <div className="mx-auto flex h-72 w-72 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
              <div className="flex h-52 w-52 items-center justify-center rounded-full bg-white/15">
                <div className="flex h-32 w-32 items-center justify-center rounded-full bg-white text-blue-600 shadow-xl">
                  <span className="text-5xl">💧</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-blue-100 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 sm:px-6 lg:grid-cols-4 lg:px-8">
          {FEATURES.map((feature) => (
            <div key={feature.title} className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <feature.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  {feature.title}
                </p>
                <p className="mt-0.5 text-sm text-slate-500">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Shop by category
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Find exactly what your pool needs.
            </p>
          </div>
          <Link
            href="/categories"
            className="hidden items-center gap-1 text-sm font-medium text-blue-600 hover:gap-2 sm:flex"
          >
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.slice(0, 6).map((category) => (
            <CategoryCard
              key={category.id}
              name={category.name}
              slug={category.slug}
              description={category.description}
              icon={category.icon}
              productCount={category._count.products}
            />
          ))}
        </div>
      </section>

      {bestSellers.length > 0 ? (
        <section className="bg-blue-50/50">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                  Featured products
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Customer favorites, restocked and ready to ship.
                </p>
              </div>
              <Link
                href="/products"
                className="hidden items-center gap-1 text-sm font-medium text-blue-600 hover:gap-2 sm:flex"
              >
                Shop all <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {bestSellers.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 rounded-3xl bg-blue-600 px-6 py-10 text-center sm:px-12 md:flex-row md:text-left">
          <div>
            <h2 className="text-2xl font-bold text-white">
              Not sure what your pool needs?
            </h2>
            <p className="mt-2 max-w-xl text-sm text-blue-50">
              Browse our full catalog or reach out and our team will help you
              put together the right order.
            </p>
          </div>
          <Button href="/products" size="lg" variant="inverse" className="shrink-0">
            Start shopping
          </Button>
        </div>
      </section>
    </div>
  );
}
