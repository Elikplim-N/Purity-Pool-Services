import type { Metadata } from "next";
import { Card } from "@/components/ui/card";
import { ProductForm } from "@/components/admin/product-form";
import { getCategories } from "@/lib/data/categories";
import { createProductAction } from "../actions";

export const metadata: Metadata = {
  title: "Add Product",
};

export default async function NewProductPage() {
  const categories = await getCategories();

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-slate-900">
        Add product
      </h1>
      <p className="mt-1 text-sm text-slate-500">
        Fill in the details below to add a new product to your catalog.
      </p>

      <Card className="mt-6 max-w-3xl p-6">
        <ProductForm action={createProductAction} categories={categories} />
      </Card>
    </div>
  );
}
