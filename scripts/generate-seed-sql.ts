// Generates prisma/seed.sql from the same data used by prisma/seed.ts,
// for use in environments where running `npm run db:seed` isn't convenient
// (e.g. pasting into the Supabase SQL Editor). Run with: npx tsx scripts/generate-seed-sql.ts
import { writeFileSync } from "node:fs";
import { categories, products } from "../prisma/seed-data";

function sqlString(value: string | null | undefined): string {
  if (value === null || value === undefined) return "NULL";
  return `'${value.replace(/'/g, "''")}'`;
}

function sqlNumber(value: number | null | undefined): string {
  if (value === null || value === undefined) return "NULL";
  return String(value);
}

const lines: string[] = [];

lines.push("-- Generated from prisma/seed-data.ts — do not edit by hand.");
lines.push("-- Safe to re-run: uses ON CONFLICT to upsert by slug.");
lines.push("");

lines.push("INSERT INTO pps_categories");
lines.push('  (id, name, slug, description, icon, "createdAt", "updatedAt")');
lines.push("VALUES");
lines.push(
  categories
    .map((c, i) => {
      const id = `cat_${c.slug.replace(/-/g, "_")}`;
      const row = `  (${sqlString(id)}, ${sqlString(c.name)}, ${sqlString(c.slug)}, ${sqlString(c.description)}, ${sqlString(c.icon)}, now(), now())`;
      return row + (i === categories.length - 1 ? "" : ",");
    })
    .join("\n")
);
lines.push("ON CONFLICT (slug) DO UPDATE SET");
lines.push('  name = EXCLUDED.name,');
lines.push('  description = EXCLUDED.description,');
lines.push('  icon = EXCLUDED.icon,');
lines.push('  "updatedAt" = now();');
lines.push("");

lines.push("INSERT INTO pps_products");
lines.push(
  '  (id, name, slug, description, price, "compareAtPrice", sku, stock, featured, active, "categoryId", "createdAt", "updatedAt")'
);
lines.push("VALUES");
lines.push(
  products
    .map((p, i) => {
      const id = `prod_${p.slug.replace(/-/g, "_")}`;
      const categoryId = `cat_${p.categorySlug.replace(/-/g, "_")}`;
      const row =
        `  (${sqlString(id)}, ${sqlString(p.name)}, ${sqlString(p.slug)}, ${sqlString(p.description)}, ` +
        `${sqlNumber(p.price)}, ${sqlNumber(p.compareAtPrice)}, ${sqlString(p.sku)}, ${sqlNumber(p.stock)}, ` +
        `${p.featured ? "true" : "false"}, true, ${sqlString(categoryId)}, now(), now())`;
      return row + (i === products.length - 1 ? "" : ",");
    })
    .join("\n")
);
lines.push("ON CONFLICT (slug) DO UPDATE SET");
lines.push("  name = EXCLUDED.name,");
lines.push("  description = EXCLUDED.description,");
lines.push("  price = EXCLUDED.price,");
lines.push('  "compareAtPrice" = EXCLUDED."compareAtPrice",');
lines.push("  sku = EXCLUDED.sku,");
lines.push("  stock = EXCLUDED.stock,");
lines.push("  featured = EXCLUDED.featured,");
lines.push('  "categoryId" = EXCLUDED."categoryId",');
lines.push('  "updatedAt" = now();');
lines.push("");

const outPath = new URL("../prisma/seed.sql", import.meta.url);
writeFileSync(outPath, lines.join("\n"));
console.log(`Wrote ${categories.length} categories and ${products.length} products to prisma/seed.sql`);
