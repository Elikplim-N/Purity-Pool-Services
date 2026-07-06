import type { Metadata } from "next";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  DollarSign,
  Package,
  ShoppingBag,
  Tags,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { formatPrice } from "@/lib/format";
import { getDashboardStats, getOrders } from "@/lib/data/orders";

export const metadata: Metadata = {
  title: "Admin Dashboard",
};

const STATUS_TONE = {
  PENDING: "amber",
  PROCESSING: "blue",
  COMPLETED: "green",
  CANCELLED: "red",
} as const;

export default async function AdminDashboardPage() {
  const [stats, orders] = await Promise.all([
    getDashboardStats(),
    getOrders(),
  ]);

  const recentOrders = orders.slice(0, 5);

  const cards = [
    {
      label: "Total revenue",
      value: formatPrice(stats.revenue),
      icon: DollarSign,
    },
    { label: "Orders", value: stats.orderCount, icon: ShoppingBag },
    { label: "Products", value: stats.productCount, icon: Package },
    { label: "Categories", value: stats.categoryCount, icon: Tags },
  ];

  return (
    <div>
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Dashboard
        </h1>
        <p className="text-sm text-slate-500">
          A quick overview of your store&apos;s activity.
        </p>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Card key={card.label} className="p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500">
                {card.label}
              </p>
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <card.icon className="h-4.5 w-4.5" />
              </span>
            </div>
            <p className="mt-3 text-2xl font-bold text-slate-900">
              {card.value}
            </p>
          </Card>
        ))}
      </div>

      {stats.pendingOrders > 0 || stats.lowStockCount > 0 ? (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {stats.pendingOrders > 0 ? (
            <Card className="flex items-center gap-3 p-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                <ShoppingBag className="h-5 w-5" />
              </span>
              <p className="text-sm text-slate-600">
                <span className="font-semibold text-slate-900">
                  {stats.pendingOrders}
                </span>{" "}
                order{stats.pendingOrders === 1 ? "" : "s"} awaiting
                processing.{" "}
                <Link href="/admin/orders" className="font-medium text-blue-600 hover:underline">
                  Review orders
                </Link>
              </p>
            </Card>
          ) : null}
          {stats.lowStockCount > 0 ? (
            <Card className="flex items-center gap-3 p-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 text-red-600">
                <AlertTriangle className="h-5 w-5" />
              </span>
              <p className="text-sm text-slate-600">
                <span className="font-semibold text-slate-900">
                  {stats.lowStockCount}
                </span>{" "}
                product{stats.lowStockCount === 1 ? "" : "s"} low on stock
                (5 or fewer left).{" "}
                <Link href="/admin/products" className="font-medium text-blue-600 hover:underline">
                  View products
                </Link>
              </p>
            </Card>
          ) : null}
        </div>
      ) : null}

      <div className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">
            Recent orders
          </h2>
          <Link
            href="/admin/orders"
            className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:gap-1.5"
          >
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <Card className="mt-4 overflow-hidden">
          {recentOrders.length === 0 ? (
            <p className="p-6 text-sm text-slate-500">
              No orders have been placed yet.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-slate-100 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-5 py-3 font-medium">Order</th>
                    <th className="px-5 py-3 font-medium">Customer</th>
                    <th className="px-5 py-3 font-medium">Status</th>
                    <th className="px-5 py-3 font-medium text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {recentOrders.map((order) => (
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
    </div>
  );
}
