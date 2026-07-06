import type { Metadata } from "next";
import Link from "next/link";
import { Package, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { ProductImage } from "@/components/ui/product-image";
import { ConfirmSubmitButton } from "@/components/admin/confirm-submit-button";
import { formatPrice } from "@/lib/format";
import { getProducts } from "@/lib/data/products";
import { deleteProductAction } from "./actions";

export const metadata: Metadata = {
  title: "Manage Products",
};

export default async function AdminProductsPage() {
  const products = await getProducts({ activeOnly: false, sort: "newest" });

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Products
          </h1>
          <p className="text-sm text-slate-500">
            {products.length} {products.length === 1 ? "product" : "products"}{" "}
            in your catalog.
          </p>
        </div>
        <Button href="/admin/products/new">
          <Plus className="h-4 w-4" />
          Add product
        </Button>
      </div>

      <Card className="mt-6 overflow-hidden">
        {products.length === 0 ? (
          <EmptyState
            icon={Package}
            title="No products yet"
            description="Add your first product to start selling."
            action={<Button href="/admin/products/new">Add product</Button>}
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-100 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-5 py-3 font-medium">Product</th>
                  <th className="px-5 py-3 font-medium">Category</th>
                  <th className="px-5 py-3 font-medium">Price</th>
                  <th className="px-5 py-3 font-medium">Stock</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {products.map((product) => (
                  <tr key={product.id} className="transition hover:bg-blue-50/40">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-blue-50">
                          <ProductImage
                            image={product.image}
                            name={product.name}
                            categoryIcon={product.category.icon}
                            iconClassName="h-5 w-5"
                          />
                        </div>
                        <div className="max-w-64">
                          <p className="truncate font-medium text-slate-900">
                            {product.name}
                          </p>
                          {product.featured ? (
                            <Badge tone="blue" className="mt-1">
                              Featured
                            </Badge>
                          ) : null}
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-slate-600">
                      {product.category.name}
                    </td>
                    <td className="px-5 py-3 font-medium text-slate-900">
                      {formatPrice(product.price)}
                    </td>
                    <td className="px-5 py-3">
                      <span
                        className={
                          product.stock <= 5
                            ? "font-medium text-amber-600"
                            : "text-slate-600"
                        }
                      >
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <Badge tone={product.active ? "green" : "slate"}>
                        {product.active ? "Active" : "Hidden"}
                      </Badge>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/products/${product.id}/edit`}
                          className="rounded-lg px-3 py-1.5 text-sm font-medium text-blue-600 transition hover:bg-blue-50"
                        >
                          Edit
                        </Link>
                        <form action={deleteProductAction.bind(null, product.id)}>
                          <ConfirmSubmitButton
                            confirmMessage={`Delete "${product.name}"? This cannot be undone.`}
                          />
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
