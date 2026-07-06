# Purity Pool Services

A clean, professional e-commerce storefront for a pool supplies business, built with Next.js (App Router), TypeScript, Tailwind CSS, and Prisma with a Supabase (Postgres) database.

It includes a full storefront with a cart and checkout (no payment processor yet — orders are placed and confirmed by staff afterward), plus an admin dashboard for managing products, categories, and orders.

## Features

- **Storefront**: home page, product catalog with search/filter/sort, category pages, product detail pages, cart, checkout, and an order confirmation page.
- **Cart**: persisted client-side in `localStorage`, no account required.
- **Checkout**: collects contact/delivery info and creates an order in the database. No payment gateway is integrated — the footer and confirmation page make clear that payment is arranged afterward (cash, card on delivery, or bank transfer).
- **Admin dashboard** (`/admin`): revenue/orders/products/categories overview, low-stock and pending-order alerts, and recent orders.
- **Admin product & category management**: create, edit, and delete products and categories (with an icon picker for categories, used as a placeholder image when a product has no photo URL).
- **Admin order management**: view order details and update order status (Pending → Processing → Completed/Cancelled).
- **Auth**: a single admin account (configured via environment variables) protected by a signed, HTTP-only session cookie. Unauthenticated visits to `/admin/*` redirect to `/admin/login`.
- **Design**: a blue-and-white visual theme throughout, fully responsive.

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router, Server Actions, `proxy.ts` for route protection)
- TypeScript
- Tailwind CSS v4
- Prisma ORM 7 with Supabase Postgres (via the `@prisma/adapter-pg` driver adapter)
- [jose](https://github.com/panva/jose) for signing the admin session cookie
- [zod](https://zod.dev) for form validation
- [lucide-react](https://lucide.dev) for icons

## Getting started

Install dependencies:

```bash
npm install
```

Copy the example environment file and fill in your Supabase connection strings (Supabase dashboard → Project Settings → Database → Connection string):

```bash
cp .env.example .env
```

- `DATABASE_URL` — the **pooled** connection string (port 6543, with `?pgbouncer=true`). Used by the app at runtime; required for serverless deployments.
- `DIRECT_URL` — the **direct** connection string (port 5432). Used by Prisma migrations only.

All tables this app creates are prefixed with `pps_` (e.g. `pps_products`, `pps_categories`), so it can safely share a Supabase project with other apps.

Apply the schema to your database:

```bash
npm run db:migrate
```

Seed the database with sample categories and products:

```bash
npm run db:seed
```

Start the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the storefront, and [http://localhost:3000/admin/login](http://localhost:3000/admin/login) for the admin panel.

### Default admin login

Set in `.env` (see `.env.example`):

- Email: `admin@puritypoolservices.com`
- Password: `PoolAdmin123!`

Change `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and `SESSION_SECRET` before deploying anywhere real.

## Scripts

| Command              | Description                                   |
| --------------------- | ---------------------------------------------- |
| `npm run dev`         | Start the Next.js dev server                    |
| `npm run build`       | Production build                                |
| `npm run start`       | Run the production build                        |
| `npm run lint`        | Lint the project                                |
| `npm run db:migrate`  | Apply Prisma migrations to the database         |
| `npm run db:seed`     | Seed sample categories and products             |
| `npm run db:studio`   | Open Prisma Studio to browse/edit data directly |

## Project structure

```
prisma/               Prisma schema, migrations, and seed script
src/app/(storefront)/  Public storefront routes (home, products, categories, cart, checkout)
src/app/admin/         Admin login + dashboard (route-grouped so only authenticated pages get the sidebar)
src/components/        Shared UI, cart, product, layout, and admin components
src/lib/               Data access (Prisma queries), auth/session helpers, formatting utilities
src/proxy.ts           Route protection for /admin/* (Next.js's middleware replacement)
```

## Notes

- Every table, index, and enum type this app owns is prefixed with `pps_`, so it won't conflict with existing tables in a shared Supabase project.
- For local development without Supabase, any Postgres instance works — point both `DATABASE_URL` and `DIRECT_URL` at it.
- Product images are optional; if a product has no `image` URL, its category icon is shown on a gradient placeholder instead.
- Payments are intentionally not integrated. Placing an order reserves stock and creates an order record for staff follow-up.
- A natural next step is Supabase Storage for real product photo uploads (the admin form currently takes an image URL).
