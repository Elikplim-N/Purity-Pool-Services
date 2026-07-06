import { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";

export type ProductSort =
  | "featured"
  | "price-asc"
  | "price-desc"
  | "name-asc"
  | "newest";

const SORT_MAP: Record<ProductSort, Prisma.ProductOrderByWithRelationInput[]> = {
  featured: [{ featured: "desc" }, { createdAt: "desc" }],
  "price-asc": [{ price: "asc" }],
  "price-desc": [{ price: "desc" }],
  "name-asc": [{ name: "asc" }],
  newest: [{ createdAt: "desc" }],
};

export type ProductFilters = {
  categorySlug?: string;
  q?: string;
  sort?: ProductSort;
  activeOnly?: boolean;
};

export function getProducts(filters: ProductFilters = {}) {
  const { categorySlug, q, sort = "featured", activeOnly = true } = filters;

  const where: Prisma.ProductWhereInput = {
    ...(activeOnly ? { active: true } : {}),
    ...(categorySlug ? { category: { slug: categorySlug } } : {}),
    ...(q
      ? {
          OR: [
            { name: { contains: q } },
            { description: { contains: q } },
          ],
        }
      : {}),
  };

  return prisma.product.findMany({
    where,
    orderBy: SORT_MAP[sort],
    include: { category: true },
  });
}

export function getProductBySlug(slug: string) {
  return prisma.product.findUnique({
    where: { slug },
    include: { category: true },
  });
}

export function getProductById(id: string) {
  return prisma.product.findUnique({
    where: { id },
    include: { category: true },
  });
}

export function getFeaturedProducts(limit = 4) {
  return prisma.product.findMany({
    where: { active: true, featured: true },
    orderBy: { createdAt: "desc" },
    take: limit,
    include: { category: true },
  });
}

export function getRelatedProducts(
  categoryId: string,
  excludeProductId: string,
  limit = 4
) {
  return prisma.product.findMany({
    where: {
      categoryId,
      active: true,
      id: { not: excludeProductId },
    },
    take: limit,
    include: { category: true },
  });
}
