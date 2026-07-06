import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckCircle2, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";
import { getOrderByNumber } from "@/lib/data/orders";

type Params = Promise<{ orderNumber: string }>;

export const metadata: Metadata = {
  title: "Order Confirmed",
};

export default async function OrderConfirmationPage({
  params,
}: {
  params: Params;
}) {
  const { orderNumber } = await params;
  const order = await getOrderByNumber(orderNumber);

  if (!order) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
          <CheckCircle2 className="h-9 w-9 text-emerald-600" />
        </div>
        <h1 className="mt-5 text-2xl font-bold tracking-tight text-slate-900">
          Thank you, {order.customerName.split(" ")[0]}! Your order is confirmed.
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Order <span className="font-semibold text-slate-700">{order.orderNumber}</span>{" "}
          was placed on{" "}
          {new Intl.DateTimeFormat("en-US", {
            dateStyle: "long",
          }).format(order.createdAt)}
          .
        </p>
      </div>

      <div className="mt-10 rounded-2xl border border-blue-100/80 bg-white p-6 shadow-sm shadow-blue-950/5">
        <div className="rounded-lg bg-blue-50 px-4 py-3 text-sm text-blue-700">
          Payment isn&apos;t collected online yet. Our team will reach out to{" "}
          <span className="font-medium">{order.email}</span> or{" "}
          <span className="font-medium">{order.phone}</span> shortly to
          arrange payment and delivery.
        </div>

        <h2 className="mt-6 text-sm font-semibold uppercase tracking-wide text-slate-500">
          Order items
        </h2>
        <ul className="mt-3 flex flex-col gap-3">
          {order.items.map((item) => (
            <li key={item.id} className="flex justify-between text-sm">
              <span className="text-slate-700">
                {item.productName}{" "}
                <span className="text-slate-400">&times; {item.quantity}</span>
              </span>
              <span className="font-medium text-slate-900">
                {formatPrice(item.price * item.quantity)}
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex items-center justify-between border-t border-blue-100 pt-4 text-base font-semibold text-slate-900">
          <span>Subtotal</span>
          <span>{formatPrice(order.subtotal)}</span>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 border-t border-blue-100 pt-6 sm:grid-cols-2">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Delivery address
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-700">
              {order.address}
              <br />
              {order.city}
              {order.state ? `, ${order.state}` : ""} {order.postalCode ?? ""}
            </p>
          </div>
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Need help with your order?
            </h2>
            <div className="mt-2 flex flex-col gap-1.5 text-sm text-slate-700">
              <span className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-blue-500" /> (555) 012-3456
              </span>
              <span className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-blue-500" />{" "}
                hello@puritypoolservices.com
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <Button href="/products">Continue shopping</Button>
      </div>
    </div>
  );
}
