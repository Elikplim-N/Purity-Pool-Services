import type { Metadata } from "next";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { cn } from "@/lib/cn";
import { formatPrice } from "@/lib/format";
import { getOrders } from "@/lib/data/orders";
import { OrderStatus } from "@/generated/prisma/enums";

export const metadata: Metadata = {
  title: "Manage Orders",
};

const STATUS_TONE = {
  PENDING: "amber",
  PROCESSING: "blue",
  COMPLETED: "green",
  CANCELLED: "red",
} as const;

const STATUS_FILTERS = ["ALL", ...Object.values(OrderStatus)] as const;

type SearchParams = Promise<{ status?: string }>;

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { status } = await searchParams;
  const orders = await getOrders();

  const filteredOrders =
    status && status !== "ALL"
      ? orders.filter((order) => order.status === status)
      : orders;

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-slate-900">
        Orders
      </h1>
      <p className="mt-1 text-sm text-slate-500">
        {orders.length} total {orders.length === 1 ? "order" : "orders"}{" "}
        placed since launch.
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {STATUS_FILTERS.map((filter) => (
          <Link
            key={filter}
            href={filter === "ALL" ? "/admin/orders" : `/admin/orders?status=${filter}`}
            className={cn(
              "rounded-lg px-3 py-1.5 text-xs font-semibold uppercase tracking-wide transition",
              (status ?? "ALL") === filter
                ? "bg-blue-600 text-white"
                : "bg-blue-50 text-blue-700 hover:bg-blue-100"
            )}
          >
            {filter}
          </Link>
        ))}
      </div>

      <Card className="mt-6 overflow-hidden">
        {filteredOrders.length === 0 ? (
          <EmptyState
            icon={ShoppingBag}
            title="No orders found"
            description="Orders placed by customers will show up here."
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-100 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-5 py-3 font-medium">Order</th>
                  <th className="px-5 py-3 font-medium">Customer</th>
                  <th className="px-5 py-3 font-medium">Date</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="transition hover:bg-blue-50/40">
                    <td className="px-5 py-3">
                      <Link
                        href={`/admin/orders/${order.id}`}
                        className="font-medium text-blue-600 hover:underline"
                      >
                        {order.orderNumber}
                      </Link>
                    </td>
                    <td className="px-5 py-3 text-slate-700">
                      {order.customerName}
                    </td>
                    <td className="px-5 py-3 text-slate-500">
                      {new Intl.DateTimeFormat("en-US", {
                        dateStyle: "medium",
                      }).format(order.createdAt)}
                    </td>
                    <td className="px-5 py-3">
                      <Badge tone={STATUS_TONE[order.status]}>
                        {order.status}
                      </Badge>
                    </td>
                    <td className="px-5 py-3 text-right font-medium text-slate-900">
                      {formatPrice(order.subtotal)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
