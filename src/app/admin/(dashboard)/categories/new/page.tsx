import type { Metadata } from "next";
import { Card } from "@/components/ui/card";
import { CategoryForm } from "@/components/admin/category-form";
import { createCategoryAction } from "../actions";

export const metadata: Metadata = {
  title: "Add Category",
};

export default function NewCategoryPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-slate-900">
        Add category
      </h1>
      <p className="mt-1 text-sm text-slate-500">
        Categories help customers browse your catalog.
      </p>

      <Card className="mt-6 max-w-2xl p-6">
        <CategoryForm action={createCategoryAction} />
      </Card>
    </div>
  );
}
