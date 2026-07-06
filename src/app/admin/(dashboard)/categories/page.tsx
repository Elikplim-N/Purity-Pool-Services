import type { Metadata } from "next";
import Link from "next/link";
import { AlertCircle, Plus, Tags } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { ConfirmSubmitButton } from "@/components/admin/confirm-submit-button";
import { CategoryIcon } from "@/components/ui/category-icon";
import { getCategories } from "@/lib/data/categories";
import { deleteCategoryAction } from "./actions";

export const metadata: Metadata = {
  title: "Manage Categories",
};

type SearchParams = Promise<{ error?: string }>;

export default async function AdminCategoriesPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const [categories, { error }] = await Promise.all([
    getCategories(),
    searchParams,
  ]);

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Categories
          </h1>
          <p className="text-sm text-slate-500">
            {categories.length}{" "}
            {categories.length === 1 ? "category" : "categories"} organizing
            your catalog.
          </p>
        </div>
        <Button href="/admin/categories/new">
          <Plus className="h-4 w-4" />
          Add category
        </Button>
      </div>

      {error ? (
        <div className="mt-4 flex items-start gap-2 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      ) : null}

      <Card className="mt-6 overflow-hidden">
        {categories.length === 0 ? (
          <EmptyState
            icon={Tags}
            title="No categories yet"
            description="Create your first category to start organizing products."
            action={<Button href="/admin/categories/new">Add category</Button>}
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-100 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-5 py-3 font-medium">Category</th>
                  <th className="px-5 py-3 font-medium">Slug</th>
                  <th className="px-5 py-3 font-medium">Products</th>
                  <th className="px-5 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {categories.map((category) => {
                  return (
                    <tr key={category.id} className="transition hover:bg-blue-50/40">
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                            <CategoryIcon name={category.icon} className="h-4.5 w-4.5" />
                          </div>
                          <span className="font-medium text-slate-900">
                            {category.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-3 text-slate-500">
                        {category.slug}
                      </td>
                      <td className="px-5 py-3 text-slate-600">
                        {category._count.products}
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/admin/categories/${category.id}/edit`}
                            className="rounded-lg px-3 py-1.5 text-sm font-medium text-blue-600 transition hover:bg-blue-50"
                          >
                            Edit
                          </Link>
                          <form action={deleteCategoryAction.bind(null, category.id)}>
                            <ConfirmSubmitButton
                              confirmMessage={`Delete "${category.name}"? This cannot be undone.`}
                            />
                          </form>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
