"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { updateOrderStatus } from "@/lib/data/orders";
import { OrderStatus } from "@/generated/prisma/enums";

const statusSchema = z.enum(OrderStatus);

export type UpdateStatusState = {
  error?: string;
  success?: boolean;
};

export async function updateOrderStatusAction(
  id: string,
  _prevState: UpdateStatusState,
  formData: FormData
): Promise<UpdateStatusState> {
  const parsed = statusSchema.safeParse(formData.get("status"));
  if (!parsed.success) {
    return { error: "Invalid status" };
  }

  await updateOrderStatus(id, parsed.data);
  revalidatePath("/admin/orders");
  revalidatePath(`/admin/orders/${id}`);
  revalidatePath("/admin");
  return { success: true };
}
