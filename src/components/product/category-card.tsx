import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CategoryIcon } from "@/components/ui/category-icon";

type CategoryCardProps = {
  name: string;
  slug: string;
  description?: string | null;
  icon: string;
  productCount?: number;
};

export function CategoryCard({
  name,
  slug,
  description,
  icon,
  productCount,
}: CategoryCardProps) {
  return (
    <Link
      href={`/categories/${slug}`}
      className="group flex flex-col justify-between rounded-2xl border border-blue-100/80 bg-white p-6 shadow-sm shadow-blue-950/5 transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md hover:shadow-blue-950/10"
    >
      <div>
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
          <CategoryIcon name={icon} className="h-6 w-6" strokeWidth={1.75} />
        </div>
        <h3 className="mt-4 text-base font-semibold text-slate-900">
          {name}
        </h3>
        {description ? (
          <p className="mt-1.5 line-clamp-2 text-sm text-slate-500">
            {description}
          </p>
        ) : null}
      </div>
      <div className="mt-4 flex items-center justify-between text-sm">
        {typeof productCount === "number" ? (
          <span className="text-slate-400">
            {productCount} {productCount === 1 ? "product" : "products"}
          </span>
        ) : (
          <span />
        )}
        <span className="inline-flex items-center gap-1 font-medium text-blue-600 transition group-hover:gap-2">
          Shop now <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}
