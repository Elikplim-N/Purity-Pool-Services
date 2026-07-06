"use client";

import { useActionState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/field";
import { updateOrderStatusAction } from "@/app/admin/(dashboard)/orders/actions";
import { OrderStatus } from "@/generated/prisma/enums";

export function OrderStatusForm({
  orderId,
  currentStatus,
}: {
  orderId: string;
  currentStatus: string;
}) {
  const boundAction = updateOrderStatusAction.bind(null, orderId);
  const [state, formAction, isPending] = useActionState(boundAction, {});

  return (
    <form action={formAction} className="flex flex-wrap items-end gap-3">
      <Select
        label="Order status"
        name="status"
        defaultValue={currentStatus}
        wrapperClassName="w-48"
      >
        {Object.values(OrderStatus).map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </Select>
      <Button type="submit" size="md" loading={isPending}>
        Update status
      </Button>
      {state.success ? (
        <span className="flex items-center gap-1.5 text-sm font-medium text-emerald-600">
          <CheckCircle2 className="h-4 w-4" />
          Updated
        </span>
      ) : null}
    </form>
  );
}
