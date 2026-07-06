import { CategoryIcon } from "@/components/ui/category-icon";
import { cn } from "@/lib/cn";

type ProductImageProps = {
  image: string | null;
  name: string;
  categoryIcon: string;
  className?: string;
  iconClassName?: string;
};

export function ProductImage({
  image,
  name,
  categoryIcon,
  className,
  iconClassName,
}: ProductImageProps) {
  if (image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- arbitrary admin-provided URLs, not part of the Next.js image pipeline
      <img
        src={image}
        alt={name}
        className={cn("h-full w-full object-cover", className)}
        loading="lazy"
      />
    );
  }

  return (
    <div
      className={cn(
        "flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-50 via-sky-100 to-blue-100",
        className
      )}
    >
      <CategoryIcon
        name={categoryIcon}
        className={cn("h-10 w-10 text-blue-400", iconClassName)}
        strokeWidth={1.5}
      />
    </div>
  );
}
