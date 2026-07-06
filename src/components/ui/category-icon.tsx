import { createElement, type SVGProps } from "react";
import { getCategoryIcon } from "@/lib/icons";

type CategoryIconProps = SVGProps<SVGSVGElement> & {
  name: string | null | undefined;
  strokeWidth?: number;
};

export function CategoryIcon({ name, ...props }: CategoryIconProps) {
  return createElement(getCategoryIcon(name), props);
}
