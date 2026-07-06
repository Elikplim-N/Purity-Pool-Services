"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle } from "lucide-react";
import { useCart } from "@/components/cart/cart-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/field";
import { Textarea } from "@/components/ui/field";
import { formatPrice } from "@/lib/format";
import {
  placeOrderAction,
  type CheckoutFormState,
} from "@/app/(storefront)/checkout/actions";

const initialState: CheckoutFormState = {};

export function CheckoutForm() {
  const { items, subtotal, clearCart, isHydrated } = useCart();
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(
    placeOrderAction,
    initialState
  );

  useEffect(() => {
    if (state.orderNumber) {
      clearCart();
      router.push(`/order-confirmation/${state.orderNumber}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.orderNumber]);

  if (!isHydrated) {
    return null;
  }

  if (items.length === 0 && !state.orderNumber) {
    return (
      <div className="rounded-2xl border border-dashed border-blue-200 bg-blue-50/40 px-6 py-16 text-center">
        <p className="text-slate-600">
          Your cart is empty. Add some products before checking out.
        </p>
        <Button href="/products" className="mt-6">
          Browse products
        </Button>
      </div>
    );
  }

  return (
    <form action={formAction} className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]">
      <input type="hidden" name="items" value={JSON.stringify(
        items.map((item) => ({ productId: item.productId, quantity: item.quantity }))
      )} />

      <div className="flex flex-col gap-6 rounded-2xl border border-blue-100/80 bg-white p-6 shadow-sm shadow-blue-950/5">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Contact information
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input
              label="Full name"
              name="customerName"
              autoComplete="name"
              required
              wrapperClassName="sm:col-span-2"
            />
            <Input
              label="Email"
              type="email"
              name="email"
              autoComplete="email"
              required
            />
            <Input
              label="Phone"
              type="tel"
              name="phone"
              autoComplete="tel"
              required
            />
          </div>
        </div>

        <div className="border-t border-blue-100 pt-6">
          <h2 className="text-lg font-semibold text-slate-900">
            Delivery address
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input
              label="Street address"
              name="address"
              autoComplete="street-address"
              required
              wrapperClassName="sm:col-span-2"
            />
            <Input label="City" name="city" autoComplete="address-level2" required />
            <Input label="State / Province" name="state" autoComplete="address-level1" />
            <Input label="Postal code" name="postalCode" autoComplete="postal-code" />
          </div>
        </div>

        <div className="border-t border-blue-100 pt-6">
          <Textarea
            label="Order notes (optional)"
            name="notes"
            placeholder="Gate code, preferred delivery time, etc."
          />
        </div>

        <div className="rounded-lg bg-blue-50 px-4 py-3 text-sm text-blue-700">
          Online payments aren&apos;t available yet. After you place your
          order, our team will contact you to arrange payment (cash, card on
          delivery, or bank transfer).
        </div>

        {state.error ? (
          <div className="flex items-start gap-2 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{state.error}</span>
          </div>
        ) : null}

        <Button type="submit" size="lg" loading={isPending} className="w-full sm:w-auto">
          Place order
        </Button>
      </div>

      <div className="h-fit rounded-2xl border border-blue-100/80 bg-white p-6 shadow-sm shadow-blue-950/5 lg:sticky lg:top-24">
        <h2 className="text-lg font-semibold text-slate-900">Order summary</h2>
        <ul className="mt-4 flex flex-col gap-3">
          {items.map((item) => (
            <li key={item.productId} className="flex justify-between gap-3 text-sm">
              <span className="text-slate-600">
                {item.name} <span className="text-slate-400">&times; {item.quantity}</span>
              </span>
              <span className="shrink-0 font-medium text-slate-900">
                {formatPrice(item.price * item.quantity)}
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex items-center justify-between border-t border-blue-100 pt-4 text-base font-semibold text-slate-900">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
      </div>
    </form>
  );
}
