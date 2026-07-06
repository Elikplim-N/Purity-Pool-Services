import type { Category, Product } from "@/generated/prisma/client";

export type ProductWithCategory = Product & { category: Category };
