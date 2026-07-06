import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Card } from "@/components/ui/card";
import { CategoryForm } from "@/components/admin/category-form";
import { getCategoryById } from "@/lib/data/categories";
import { updateCategoryAction } from "../../actions";

type Params = Promise<{ id: string }>;

export const metadata: Metadata = {
  title: "Edit Category",
};

export default async function EditCategoryPage({ params }: { params: Params }) {
  const { id } = await params;
  const category = await getCategoryById(id);

  if (!category) {
    notFound();
  }

  const boundAction = updateCategoryAction.bind(null, id);

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-slate-900">
        Edit category
      </h1>
      <p className="mt-1 text-sm text-slate-500">{category.name}</p>

      <Card className="mt-6 max-w-2xl p-6">
        <CategoryForm action={boundAction} category={category} />
      </Card>
    </div>
  );
}
