-- CreateEnum
CREATE TYPE "pps_order_status" AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'CANCELLED');

-- CreateTable
CREATE TABLE "pps_categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "icon" TEXT NOT NULL DEFAULT 'Droplets',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pps_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pps_products" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "compareAtPrice" DOUBLE PRECISION,
    "sku" TEXT,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "image" TEXT,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "categoryId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pps_products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pps_orders" (
    "id" TEXT NOT NULL,
    "orderNumber" TEXT NOT NULL,
    "customerName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT,
    "postalCode" TEXT,
    "notes" TEXT,
    "status" "pps_order_status" NOT NULL DEFAULT 'PENDING',
    "subtotal" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pps_orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pps_order_items" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "productId" TEXT,
    "productName" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "pps_order_items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "pps_categories_name_key" ON "pps_categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "pps_categories_slug_key" ON "pps_categories"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "pps_products_slug_key" ON "pps_products"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "pps_products_sku_key" ON "pps_products"("sku");

-- CreateIndex
CREATE INDEX "pps_products_categoryId_idx" ON "pps_products"("categoryId");

-- CreateIndex
CREATE UNIQUE INDEX "pps_orders_orderNumber_key" ON "pps_orders"("orderNumber");

-- CreateIndex
CREATE INDEX "pps_order_items_orderId_idx" ON "pps_order_items"("orderId");

-- AddForeignKey
ALTER TABLE "pps_products" ADD CONSTRAINT "pps_products_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "pps_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pps_order_items" ADD CONSTRAINT "pps_order_items_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "pps_orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pps_order_items" ADD CONSTRAINT "pps_order_items_productId_fkey" FOREIGN KEY ("productId") REFERENCES "pps_products"("id") ON DELETE SET NULL ON UPDATE CASCADE;
