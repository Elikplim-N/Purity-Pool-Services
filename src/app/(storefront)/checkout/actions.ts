"use server";

import { z } from "zod";
import { createOrder } from "@/lib/data/orders";
import { getProductById } from "@/lib/data/products";
import { generateOrderNumber } from "@/lib/format";

const cartItemSchema = z.object({
  productId: z.string().min(1),
  quantity: z.number().int().positive(),
});

const checkoutSchema = z.object({
  customerName: z.string().trim().min(2, "Enter your full name"),
  email: z.string().trim().email("Enter a valid email address"),
  phone: z.string().trim().min(7, "Enter a valid phone number"),
  address: z.string().trim().min(4, "Enter your delivery address"),
  city: z.string().trim().min(2, "Enter your city"),
  state: z.string().trim().optional(),
  postalCode: z.string().trim().optional(),
  notes: z.string().trim().optional(),
  items: z
    .string()
    .min(1)
    .transform((value, ctx) => {
      try {
        const parsed = JSON.parse(value);
        return z.array(cartItemSchema).parse(parsed);
      } catch {
        ctx.addIssue({ code: "custom", message: "Invalid cart data" });
        return z.NEVER;
      }
    }),
});

export type CheckoutFormState = {
  error?: string;
  orderNumber?: string;
};

export async function placeOrderAction(
  _prevState: CheckoutFormState,
  formData: FormData
): Promise<CheckoutFormState> {
  const parsed = checkoutSchema.safeParse({
    customerName: formData.get("customerName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    address: formData.get("address"),
    city: formData.get("city"),
    state: formData.get("state") ?? undefined,
    postalCode: formData.get("postalCode") ?? undefined,
    notes: formData.get("notes") ?? undefined,
    items: formData.get("items"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const { items, ...customer } = parsed.data;

  if (items.length === 0) {
    return { error: "Your cart is empty." };
  }

  const orderItems: Array<{
    productId: string;
    productName: string;
    price: number;
    quantity: number;
  }> = [];

  for (const item of items) {
    const product = await getProductById(item.productId);
    if (!product || !product.active) {
      return { error: "One of the items in your cart is no longer available." };
    }
    if (product.stock < item.quantity) {
      return {
        error: `Only ${product.stock} left in stock for "${product.name}". Please update your cart.`,
      };
    }
    orderItems.push({
      productId: product.id,
      productName: product.name,
      price: product.price,
      quantity: item.quantity,
    });
  }

  const orderNumber = generateOrderNumber();

  try {
    await createOrder({
      orderNumber,
      ...customer,
      items: orderItems,
    });
  } catch {
    return {
      error:
        "We couldn't place your order because an item just sold out. Please review your cart and try again.",
    };
  }

  return { orderNumber };
}
