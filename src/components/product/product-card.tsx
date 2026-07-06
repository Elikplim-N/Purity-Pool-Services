"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { useCart } from "@/components/cart/cart-context";
import { useToast } from "@/components/ui/toast";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProductImage } from "@/components/ui/product-image";
import { formatPrice } from "@/lib/format";
import type { ProductWithCategory } from "@/lib/types";

export function ProductCard({ product }: { product: ProductWithCategory }) {
  const { addItem } = useCart();
  const { showToast } = useToast();

  const outOfStock = product.stock <= 0;
  const onSale =
    product.compareAtPrice !== null && product.compareAtPrice > product.price;

  const handleAddToCart = () => {
    addItem(
      {
        productId: product.id,
        slug: product.slug,
        name: product.name,
        price: product.price,
        image: product.image,
        categoryIcon: product.category.icon,
        stock: product.stock,
      },
      1
    );
    showToast(`${product.name} added to cart`, "View your cart to check out.");
  };

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-blue-100/80 bg-white shadow-sm shadow-blue-950/5 transition hover:-translate-y-0.5 hover:shadow-md hover:shadow-blue-950/10">
      <Link
        href={`/products/${product.slug}`}
        className="relative block aspect-4/3 overflow-hidden bg-blue-50"
      >
        <ProductImage
          image={product.image}
          name={product.name}
          categoryIcon={product.category.icon}
          className="transition duration-300 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {product.featured ? <Badge tone="blue">Featured</Badge> : null}
          {onSale ? <Badge tone="red">Sale</Badge> : null}
          {outOfStock ? <Badge tone="slate">Out of stock</Badge> : null}
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-blue-500">
          {product.category.name}
        </p>
        <Link href={`/products/${product.slug}`}>
          <h3 className="line-clamp-2 text-sm font-semibold text-slate-900 transition group-hover:text-blue-700">
            {product.name}
          </h3>
        </Link>
        <div className="mt-auto flex items-center justify-between pt-2">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-slate-900">
              {formatPrice(product.price)}
            </span>
            {onSale ? (
              <span className="text-sm text-slate-400 line-through">
                {formatPrice(product.compareAtPrice as number)}
              </span>
            ) : null}
          </div>
        </div>
        <Button
          type="button"
          size="sm"
          className="mt-2 w-full"
          disabled={outOfStock}
          onClick={handleAddToCart}
        >
          <Plus className="h-4 w-4" />
          {outOfStock ? "Out of stock" : "Add to cart"}
        </Button>
      </div>
    </div>
  );
}
