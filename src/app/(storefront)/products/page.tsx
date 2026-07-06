import type { Metadata } from "next";
import Link from "next/link";
import { PackageSearch } from "lucide-react";
import { ProductCard } from "@/components/product/product-card";
import { SortSelect } from "@/components/product/sort-select";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";
import { getCategories } from "@/lib/data/categories";
import { getProducts, type ProductSort } from "@/lib/data/products";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Shop All Products",
  description:
    "Browse chemicals, pumps, filters, cleaning equipment, and pool accessories.",
};

const VALID_SORTS: ProductSort[] = [
  "featured",
  "newest",
  "price-asc",
  "price-desc",
  "name-asc",
];

type SearchParams = Promise<{
  category?: string;
  q?: string;
  sort?: string;
}>;

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const sort = VALID_SORTS.includes(params.sort as ProductSort)
    ? (params.sort as ProductSort)
    : "featured";

  const [products, categories] = await Promise.all([
    getProducts({ categorySlug: params.category, q: params.q, sort }),
    getCategories(),
  ]);

  const activeCategory = categories.find((c) => c.slug === params.category);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          {activeCategory ? activeCategory.name : "Shop all products"}
        </h1>
        <p className="text-sm text-slate-500">
          {params.q
            ? `Search results for "${params.q}" — ${products.length} ${products.length === 1 ? "item" : "items"}`
            : `${products.length} ${products.length === 1 ? "product" : "products"} available`}
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[240px_1fr]">
        <aside className="lg:sticky lg:top-24 lg:h-fit">
          <h2 className="text-sm font-semibold text-slate-900">Categories</h2>
          <div className="mt-3 flex flex-wrap gap-2 lg:flex-col lg:gap-1">
            <Link
              href="/products"
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-medium transition",
                !params.category
                  ? "bg-blue-600 text-white"
                  : "bg-blue-50 text-slate-600 hover:bg-blue-100 lg:bg-transparent lg:hover:bg-blue-50"
              )}
            >
              All products
            </Link>
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/products?category=${category.slug}`}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium transition",
                  params.category === category.slug
                    ? "bg-blue-600 text-white"
                    : "bg-blue-50 text-slate-600 hover:bg-blue-100 lg:bg-transparent lg:hover:bg-blue-50"
                )}
              >
                {category.name}
              </Link>
            ))}
          </div>
        </aside>

        <div>
          <div className="mb-6 flex items-center justify-end">
            <SortSelect />
          </div>

          {products.length === 0 ? (
            <EmptyState
              icon={PackageSearch}
              title="No products found"
              description="Try a different search term or browse all categories instead."
              action={<Button href="/products">View all products</Button>}
            />
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
