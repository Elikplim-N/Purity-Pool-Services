import type { Metadata } from "next";
import { CategoryCard } from "@/components/product/category-card";
import { getCategories } from "@/lib/data/categories";

export const metadata: Metadata = {
  title: "All Categories",
  description: "Browse pool supplies by category.",
};

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Shop by category
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          {categories.length} categories to help you find exactly what your
          pool needs.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
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
    </div>
  );
}
