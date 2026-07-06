import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    // Migrations need a direct (non-pooled) connection. On Supabase, set
    // DIRECT_URL to the port-5432 connection string; DATABASE_URL stays on
    // the pgbouncer pooler (port 6543) for the app itself.
    url: process.env["DIRECT_URL"] ?? process.env["DATABASE_URL"],
  },
});
