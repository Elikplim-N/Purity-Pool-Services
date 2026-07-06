"use client";

import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/components/cart/cart-context";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { ProductImage } from "@/components/ui/product-image";
import { formatPrice } from "@/lib/format";

const FREE_DELIVERY_THRESHOLD = 150;

export function CartView() {
  const { items, subtotal, updateQuantity, removeItem, isHydrated } =
    useCart();

  if (!isHydrated) {
    return null;
  }

  if (items.length === 0) {
    return (
      <EmptyState
        icon={ShoppingBag}
        title="Your cart is empty"
        description="Looks like you haven't added any pool supplies yet."
        action={<Button href="/products">Start shopping</Button>}
      />
    );
  }

  const remainingForFreeDelivery = Math.max(
    0,
    FREE_DELIVERY_THRESHOLD - subtotal
  );

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]">
      <div className="flex flex-col gap-4">
        {items.map((item) => (
          <div
            key={item.productId}
            className="flex gap-4 rounded-2xl border border-blue-100/80 bg-white p-4 shadow-sm shadow-blue-950/5"
          >
            <Link
              href={`/products/${item.slug}`}
              className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-blue-50"
            >
              <ProductImage
                image={item.image}
                name={item.name}
                categoryIcon={item.categoryIcon}
                iconClassName="h-8 w-8"
              />
            </Link>

            <div className="flex flex-1 flex-col justify-between">
              <div className="flex items-start justify-between gap-3">
                <Link
                  href={`/products/${item.slug}`}
                  className="text-sm font-semibold text-slate-900 hover:text-blue-700"
                >
                  {item.name}
                </Link>
                <button
                  type="button"
                  onClick={() => removeItem(item.productId)}
                  className="shrink-0 text-slate-400 transition hover:text-red-600"
                  aria-label={`Remove ${item.name} from cart`}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center rounded-lg border border-slate-200">
                  <button
                    type="button"
                    onClick={() =>
                      updateQuantity(item.productId, item.quantity - 1)
                    }
                    className="flex h-9 w-9 items-center justify-center text-slate-500 transition hover:bg-slate-50 disabled:opacity-40"
                    aria-label="Decrease quantity"
                    disabled={item.quantity <= 1}
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="w-8 text-center text-sm font-semibold text-slate-900">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      updateQuantity(item.productId, item.quantity + 1)
                    }
                    className="flex h-9 w-9 items-center justify-center text-slate-500 transition hover:bg-slate-50 disabled:opacity-40"
                    aria-label="Increase quantity"
                    disabled={item.quantity >= item.stock}
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
                <span className="text-sm font-bold text-slate-900">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="h-fit rounded-2xl border border-blue-100/80 bg-white p-6 shadow-sm shadow-blue-950/5 lg:sticky lg:top-24">
        <h2 className="text-lg font-semibold text-slate-900">Order summary</h2>
        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="text-slate-500">Subtotal</span>
          <span className="font-medium text-slate-900">
            {formatPrice(subtotal)}
          </span>
        </div>
        <p className="mt-3 text-xs text-slate-400">
          Shipping and any applicable taxes are calculated at checkout.
        </p>
        {remainingForFreeDelivery > 0 ? (
          <p className="mt-3 rounded-lg bg-blue-50 px-3 py-2 text-xs text-blue-700">
            Add {formatPrice(remainingForFreeDelivery)} more to qualify for
            free local delivery.
          </p>
        ) : (
          <p className="mt-3 rounded-lg bg-emerald-50 px-3 py-2 text-xs text-emerald-700">
            You&apos;ve unlocked free local delivery!
          </p>
        )}
        <Button href="/checkout" size="lg" className="mt-5 w-full">
          Proceed to checkout
        </Button>
        <Button
          href="/products"
          variant="ghost"
          size="sm"
          className="mt-2 w-full"
        >
          Continue shopping
        </Button>
      </div>
    </div>
  );
}
