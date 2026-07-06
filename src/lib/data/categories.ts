import { prisma } from "@/lib/prisma";

export function getCategories() {
  return prisma.category.findMany({
    orderBy: { name: "asc" },
    include: {
      _count: { select: { products: true } },
    },
  });
}

export function getCategoryBySlug(slug: string) {
  return prisma.category.findUnique({
    where: { slug },
  });
}

export function getCategoryById(id: string) {
  return prisma.category.findUnique({
    where: { id },
  });
}
