"use client";

import { useState } from "react";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { useCart } from "@/components/cart/cart-context";
import { useToast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import type { ProductWithCategory } from "@/lib/types";

export function AddToCartPanel({ product }: { product: ProductWithCategory }) {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const { showToast } = useToast();

  const outOfStock = product.stock <= 0;

  const decrease = () => setQuantity((q) => Math.max(1, q - 1));
  const increase = () =>
    setQuantity((q) => Math.min(product.stock, q + 1));

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
      quantity
    );
    showToast(
      `${quantity} × ${product.name} added to cart`,
      "View your cart to check out."
    );
    setQuantity(1);
  };

  if (outOfStock) {
    return (
      <Button size="lg" disabled className="w-full sm:w-auto">
        Out of stock
      </Button>
    );
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="flex items-center justify-between rounded-lg border border-slate-200 sm:justify-start">
        <button
          type="button"
          onClick={decrease}
          className="flex h-11 w-11 items-center justify-center text-slate-500 transition hover:bg-slate-50 disabled:opacity-40"
          aria-label="Decrease quantity"
          disabled={quantity <= 1}
        >
          <Minus className="h-4 w-4" />
        </button>
        <span className="w-10 text-center text-sm font-semibold text-slate-900">
          {quantity}
        </span>
        <button
          type="button"
          onClick={increase}
          className="flex h-11 w-11 items-center justify-center text-slate-500 transition hover:bg-slate-50 disabled:opacity-40"
          aria-label="Increase quantity"
          disabled={quantity >= product.stock}
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
      <Button size="lg" onClick={handleAddToCart} className="flex-1 sm:flex-none">
        <ShoppingCart className="h-4 w-4" />
        Add to cart
      </Button>
    </div>
  );
}
