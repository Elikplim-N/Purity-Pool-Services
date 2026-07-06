import { prisma } from "@/lib/prisma";
import type { OrderStatus } from "@/generated/prisma/enums";

export type CreateOrderInput = {
  orderNumber: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state?: string;
  postalCode?: string;
  notes?: string;
  items: Array<{
    productId: string;
    productName: string;
    price: number;
    quantity: number;
  }>;
};

export async function createOrder(input: CreateOrderInput) {
  const subtotal = input.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return prisma.$transaction(async (tx) => {
    for (const item of input.items) {
      const result = await tx.product.updateMany({
        where: { id: item.productId, stock: { gte: item.quantity } },
        data: { stock: { decrement: item.quantity } },
      });
      if (result.count === 0) {
        throw new Error(`Insufficient stock for ${item.productName}`);
      }
    }

    return tx.order.create({
      data: {
        orderNumber: input.orderNumber,
        customerName: input.customerName,
        email: input.email,
        phone: input.phone,
        address: input.address,
        city: input.city,
        state: input.state,
        postalCode: input.postalCode,
        notes: input.notes,
        subtotal,
        items: {
          create: input.items.map((item) => ({
            productId: item.productId,
            productName: item.productName,
            price: item.price,
            quantity: item.quantity,
          })),
        },
      },
      include: { items: true },
    });
  });
}

export function getOrders() {
  return prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: { items: true },
  });
}

export function getOrderByNumber(orderNumber: string) {
  return prisma.order.findUnique({
    where: { orderNumber },
    include: { items: true },
  });
}

export function getOrderById(id: string) {
  return prisma.order.findUnique({
    where: { id },
    include: { items: true },
  });
}

export function updateOrderStatus(id: string, status: OrderStatus) {
  return prisma.order.update({
    where: { id },
    data: { status },
  });
}

export async function getDashboardStats() {
  const [productCount, categoryCount, orderCount, orders, lowStockCount] =
    await Promise.all([
      prisma.product.count(),
      prisma.category.count(),
      prisma.order.count(),
      prisma.order.findMany({ select: { subtotal: true, status: true } }),
      prisma.product.count({ where: { stock: { lte: 5 } } }),
    ]);

  const revenue = orders
    .filter((order) => order.status !== "CANCELLED")
    .reduce((sum, order) => sum + order.subtotal, 0);

  const pendingOrders = orders.filter(
    (order) => order.status === "PENDING"
  ).length;

  return {
    productCount,
    categoryCount,
    orderCount,
    revenue,
    pendingOrders,
    lowStockCount,
  };
}
