import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Card } from "@/components/ui/card";
import { ProductForm } from "@/components/admin/product-form";
import { getCategories } from "@/lib/data/categories";
import { getProductById } from "@/lib/data/products";
import { updateProductAction } from "../../actions";

type Params = Promise<{ id: string }>;

export const metadata: Metadata = {
  title: "Edit Product",
};

export default async function EditProductPage({ params }: { params: Params }) {
  const { id } = await params;
  const [product, categories] = await Promise.all([
    getProductById(id),
    getCategories(),
  ]);

  if (!product) {
    notFound();
  }

  const boundAction = updateProductAction.bind(null, id);

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-slate-900">
        Edit product
      </h1>
      <p className="mt-1 text-sm text-slate-500">{product.name}</p>

      <Card className="mt-6 max-w-3xl p-6">
        <ProductForm
          action={boundAction}
          categories={categories}
          product={product}
        />
      </Card>
    </div>
  );
}
