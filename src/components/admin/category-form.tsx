"use client";

import { useActionState, useRef, useState } from "react";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Select, Textarea } from "@/components/ui/field";
import { CategoryIcon } from "@/components/ui/category-icon";
import { CATEGORY_ICON_OPTIONS } from "@/lib/icons";
import { slugify } from "@/lib/slug";
import type { CategoryFormState } from "@/app/admin/(dashboard)/categories/actions";
import type { Category } from "@/generated/prisma/client";

type CategoryFormAction = (
  prevState: CategoryFormState,
  formData: FormData
) => Promise<CategoryFormState>;

export function CategoryForm({
  action,
  category,
}: {
  action: CategoryFormAction;
  category?: Category;
}) {
  const [state, formAction, isPending] = useActionState(action, {});
  const slugRef = useRef<HTMLInputElement>(null);
  const [slugTouched, setSlugTouched] = useState(Boolean(category));
  const [icon, setIcon] = useState(category?.icon ?? CATEGORY_ICON_OPTIONS[0]);

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <Input
        label="Category name"
        name="name"
        required
        defaultValue={category?.name}
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
        defaultValue={category?.slug}
        hint="Used in the category URL, e.g. /categories/your-slug"
        onChange={() => setSlugTouched(true)}
      />
      <Textarea
        label="Description (optional)"
        name="description"
        defaultValue={category?.description ?? undefined}
      />

      <div className="flex items-end gap-4">
        <Select
          label="Icon"
          name="icon"
          value={icon}
          onChange={(event) => setIcon(event.target.value)}
          wrapperClassName="flex-1"
        >
          {CATEGORY_ICON_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Select>
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
          <CategoryIcon name={icon} className="h-5 w-5" />
        </div>
      </div>

      {state.error ? (
        <div className="flex items-start gap-2 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{state.error}</span>
        </div>
      ) : null}

      <div className="flex items-center gap-3">
        <Button type="submit" loading={isPending}>
          {category ? "Save changes" : "Create category"}
        </Button>
        <Button type="button" variant="ghost" href="/admin/categories">
          Cancel
        </Button>
      </div>
    </form>
  );
}
