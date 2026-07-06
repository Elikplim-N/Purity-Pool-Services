import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, PackageSearch } from "lucide-react";
import { ProductCard } from "@/components/product/product-card";
import { SortSelect } from "@/components/product/sort-select";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";
import { getCategoryBySlug } from "@/lib/data/categories";
import { getProducts, type ProductSort } from "@/lib/data/products";

type Params = Promise<{ slug: string }>;
type SearchParams = Promise<{ sort?: string }>;

const VALID_SORTS: ProductSort[] = [
  "featured",
  "newest",
  "price-asc",
  "price-desc",
  "name-asc",
];

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return { title: "Category not found" };
  return { title: category.name, description: category.description ?? undefined };
}

export default async function CategoryDetailPage({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  const { slug } = await params;
  const { sort: sortParam } = await searchParams;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const sort = VALID_SORTS.includes(sortParam as ProductSort)
    ? (sortParam as ProductSort)
    : "featured";

  const products = await getProducts({ categorySlug: slug, sort });

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <nav className="flex items-center gap-1.5 text-sm text-slate-500">
        <Link href="/categories" className="hover:text-blue-700">
          Categories
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-slate-700">{category.name}</span>
      </nav>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            {category.name}
          </h1>
          {category.description ? (
            <p className="mt-1 max-w-2xl text-sm text-slate-500">
              {category.description}
            </p>
          ) : null}
        </div>
        <SortSelect />
      </div>

      <div className="mt-8">
        {products.length === 0 ? (
          <EmptyState
            icon={PackageSearch}
            title="No products in this category yet"
            description="Check back soon, or browse our full catalog in the meantime."
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
  );
}
