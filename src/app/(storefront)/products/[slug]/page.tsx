import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, ShieldCheck, Truck } from "lucide-react";
import { AddToCartPanel } from "@/components/product/add-to-cart-panel";
import { ProductCard } from "@/components/product/product-card";
import { Badge } from "@/components/ui/badge";
import { ProductImage } from "@/components/ui/product-image";
import { formatPrice } from "@/lib/format";
import { getProductBySlug, getRelatedProducts } from "@/lib/data/products";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Product not found" };
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product || !product.active) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(
    product.categoryId,
    product.id,
    4
  );

  const onSale =
    product.compareAtPrice !== null && product.compareAtPrice > product.price;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <nav className="flex items-center gap-1.5 text-sm text-slate-500">
        <Link href="/products" className="hover:text-blue-700">
          Shop
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link
          href={`/categories/${product.category.slug}`}
          className="hover:text-blue-700"
        >
          {product.category.name}
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-slate-700">{product.name}</span>
      </nav>

      <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div className="aspect-square overflow-hidden rounded-2xl border border-blue-100/80 bg-blue-50">
          <ProductImage
            image={product.image}
            name={product.name}
            categoryIcon={product.category.icon}
            iconClassName="h-24 w-24"
          />
        </div>

        <div className="flex flex-col">
          <div className="flex flex-wrap gap-2">
            {product.featured ? <Badge tone="blue">Featured</Badge> : null}
            {onSale ? <Badge tone="red">Sale</Badge> : null}
            {product.stock <= 0 ? (
              <Badge tone="slate">Out of stock</Badge>
            ) : product.stock <= 5 ? (
              <Badge tone="amber">Only {product.stock} left</Badge>
            ) : (
              <Badge tone="green">In stock</Badge>
            )}
          </div>

          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
            {product.name}
          </h1>

          <div className="mt-3 flex items-baseline gap-3">
            <span className="text-2xl font-bold text-slate-900">
              {formatPrice(product.price)}
            </span>
            {onSale ? (
              <span className="text-lg text-slate-400 line-through">
                {formatPrice(product.compareAtPrice as number)}
              </span>
            ) : null}
          </div>

          <p className="mt-5 leading-7 text-slate-600">
            {product.description}
          </p>

          {product.sku ? (
            <p className="mt-4 text-sm text-slate-400">SKU: {product.sku}</p>
          ) : null}

          <div className="mt-6">
            <AddToCartPanel product={product} />
          </div>

          <div className="mt-8 flex flex-col gap-3 border-t border-blue-100 pt-6 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-blue-500" />
              Free local delivery on orders over $150
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-blue-500" />
              Quality-tested for purity and performance
            </div>
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 ? (
        <section className="mt-16">
          <h2 className="text-xl font-bold tracking-tight text-slate-900">
            You may also like
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((related) => (
              <ProductCard key={related.id} product={related} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
