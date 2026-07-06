import {
  Droplets,
  FlaskConical,
  Fan,
  Sparkles,
  ShieldCheck,
  TestTube,
  Waves,
  Wrench,
  Package,
  type LucideIcon,
} from "lucide-react";

export const CATEGORY_ICON_OPTIONS = [
  "Droplets",
  "FlaskConical",
  "Fan",
  "Sparkles",
  "ShieldCheck",
  "TestTube",
  "Waves",
  "Wrench",
  "Package",
] as const;

export type CategoryIconName = (typeof CATEGORY_ICON_OPTIONS)[number];

const ICON_MAP: Record<CategoryIconName, LucideIcon> = {
  Droplets,
  FlaskConical,
  Fan,
  Sparkles,
  ShieldCheck,
  TestTube,
  Waves,
  Wrench,
  Package,
};

export function getCategoryIcon(name: string | null | undefined): LucideIcon {
  if (name && name in ICON_MAP) {
    return ICON_MAP[name as CategoryIconName];
  }
  return Droplets;
}
