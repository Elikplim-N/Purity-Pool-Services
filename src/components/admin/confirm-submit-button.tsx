"use client";

import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ConfirmSubmitButton({
  confirmMessage,
  children,
}: {
  confirmMessage: string;
  children?: React.ReactNode;
}) {
  return (
    <Button
      type="submit"
      variant="danger"
      size="sm"
      onClick={(event) => {
        if (!window.confirm(confirmMessage)) {
          event.preventDefault();
        }
      }}
    >
      <Trash2 className="h-4 w-4" />
      {children ?? "Delete"}
    </Button>
  );
}
