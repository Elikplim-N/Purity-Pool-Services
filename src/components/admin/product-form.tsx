"use client";

import { useActionState, useRef, useState } from "react";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Select, Textarea } from "@/components/ui/field";
import { slugify } from "@/lib/slug";
import type { ProductFormState } from "@/app/admin/(dashboard)/products/actions";
import type { Category, Product } from "@/generated/prisma/client";

type ProductFormAction = (
  prevState: ProductFormState,
  formData: FormData
) => Promise<ProductFormState>;

export function ProductForm({
  action,
  categories,
  product,
}: {
  action: ProductFormAction;
  categories: Category[];
  product?: Product;
}) {
  const [state, formAction, isPending] = useActionState(action, {});
  const slugRef = useRef<HTMLInputElement>(null);
  const [slugTouched, setSlugTouched] = useState(Boolean(product));

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label="Product name"
          name="name"
          required
          defaultValue={product?.name}
          wrapperClassName="sm:col-span-2"
          onChange={(event) => {
            if (!slugTouched && slugRef.current) {
              slugRef.current.value = slugify(event.target.value);
            }
          }}
        />
        <Input
          label="Slug"
          name="slug"
          required
          ref={slugRef}
          defaultValue={product?.slug}
          hint="Used in the product URL, e.g. /products/your-slug"
          onChange={() => setSlugTouched(true)}
        />
        <Select
          label="Category"
          name="categoryId"
          required
          defaultValue={product?.categoryId}
        >
          <option value="" disabled>
            Select a category
          </option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Select>
      </div>

      <Textarea
        label="Description"
        name="description"
        required
        defaultValue={product?.description}
        wrapperClassName="w-full"
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Input
          label="Price (USD)"
          name="price"
          type="number"
          min="0"
          step="0.01"
          required
          defaultValue={product?.price}
        />
        <Input
          label="Compare-at price"
          name="compareAtPrice"
          type="number"
          min="0"
          step="0.01"
          hint="Optional. Shown crossed out for sale items."
          defaultValue={product?.compareAtPrice ?? undefined}
        />
        <Input
          label="Stock quantity"
          name="stock"
          type="number"
          min="0"
          step="1"
          required
          defaultValue={product?.stock}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input label="SKU" name="sku" defaultValue={product?.sku ?? undefined} />
        <Input
          label="Image URL"
          name="image"
          type="url"
          placeholder="https://..."
          hint="Leave blank to use a placeholder icon"
          defaultValue={product?.image ?? undefined}
        />
      </div>

      <div className="flex flex-wrap gap-6">
        <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
          <input
            type="checkbox"
            name="featured"
            defaultChecked={product?.featured ?? false}
            className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
          />
          Featured product
        </label>
        <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
          <input
            type="checkbox"
            name="active"
            defaultChecked={product?.active ?? true}
            className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
          />
          Visible in store
        </label>
      </div>

      {state.error ? (
        <div className="flex items-start gap-2 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{state.error}</span>
        </div>
      ) : null}

      <div className="flex items-center gap-3">
        <Button type="submit" loading={isPending}>
          {product ? "Save changes" : "Create product"}
        </Button>
        <Button type="button" variant="ghost" href="/admin/products">
          Cancel
        </Button>
      </div>
    </form>
  );
}
