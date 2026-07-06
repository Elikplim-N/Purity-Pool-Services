import { cn } from "@/lib/cn";

export function Card({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-blue-100/80 bg-white shadow-sm shadow-blue-950/5",
        className
      )}
    >
      {children}
    </div>
  );
}
