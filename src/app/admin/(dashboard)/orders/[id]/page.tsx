import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Mail, MapPin, Phone } from "lucide-react";
import { Card } from "@/components/ui/card";
import { OrderStatusForm } from "@/components/admin/order-status-form";
import { formatPrice } from "@/lib/format";
import { getOrderById } from "@/lib/data/orders";

type Params = Promise<{ id: string }>;

export const metadata: Metadata = {
  title: "Order Details",
};

export default async function AdminOrderDetailPage({
  params,
}: {
  params: Params;
}) {
  const { id } = await params;
  const order = await getOrderById(id);

  if (!order) {
    notFound();
  }

  return (
    <div>
      <Link
        href="/admin/orders"
        className="flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to orders
      </Link>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            {order.orderNumber}
          </h1>
          <p className="text-sm text-slate-500">
            Placed on{" "}
            {new Intl.DateTimeFormat("en-US", {
              dateStyle: "long",
              timeStyle: "short",
            }).format(order.createdAt)}
          </p>
        </div>
        <OrderStatusForm orderId={order.id} currentStatus={order.status} />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
        <Card className="p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Order items
          </h2>
          <ul className="mt-4 flex flex-col gap-3">
            {order.items.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between border-b border-slate-100 pb-3 text-sm last:border-0 last:pb-0"
              >
                <div>
                  <p className="font-medium text-slate-900">
                    {item.productName}
                  </p>
                  <p className="text-slate-500">
                    {formatPrice(item.price)} &times; {item.quantity}
                  </p>
                </div>
                <span className="font-semibold text-slate-900">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center justify-between border-t border-blue-100 pt-4 text-base font-semibold text-slate-900">
            <span>Subtotal</span>
            <span>{formatPrice(order.subtotal)}</span>
          </div>

          {order.notes ? (
            <div className="mt-6 rounded-lg bg-slate-50 p-4 text-sm text-slate-600">
              <p className="font-medium text-slate-700">Customer notes</p>
              <p className="mt-1">{order.notes}</p>
            </div>
          ) : null}
        </Card>

        <Card className="p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Customer
          </h2>
          <p className="mt-3 text-sm font-medium text-slate-900">
            {order.customerName}
          </p>
          <div className="mt-3 flex flex-col gap-2 text-sm text-slate-600">
            <span className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-blue-500" /> {order.email}
            </span>
            <span className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-blue-500" /> {order.phone}
            </span>
            <span className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />
              <span>
                {order.address}
                <br />
                {order.city}
                {order.state ? `, ${order.state}` : ""} {order.postalCode ?? ""}
              </span>
            </span>
          </div>
        </Card>
      </div>
    </div>
  );
}
