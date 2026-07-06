# Purity Pool Services

A clean, professional e-commerce storefront for a pool supplies business, built with Next.js (App Router), TypeScript, Tailwind CSS, and Prisma/SQLite.

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
- Prisma ORM 7 with a SQLite database (via the `@prisma/adapter-libsql` driver adapter)
- [jose](https://github.com/panva/jose) for signing the admin session cookie
- [zod](https://zod.dev) for form validation
- [lucide-react](https://lucide.dev) for icons

## Getting started

Install dependencies:

```bash
npm install
```

Copy the example environment file and adjust as needed:

```bash
cp .env.example .env
```

Create the database and apply the schema:

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
| `npm run db:migrate`  | Apply Prisma migrations (creates the SQLite db) |
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

- The SQLite database file (`prisma/dev.db`) is not committed — run the migrate/seed commands above to create it locally.
- Product images are optional; if a product has no `image` URL, its category icon is shown on a gradient placeholder instead.
- Payments are intentionally not integrated. Placing an order reserves stock and creates an order record for staff follow-up.
