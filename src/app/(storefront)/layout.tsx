import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { getCategories } from "@/lib/data/categories";

export default async function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await getCategories();
  const navCategories = categories.map((category) => ({
    name: category.name,
    slug: category.slug,
  }));

  return (
    <div className="flex min-h-screen flex-col">
      <Header categories={navCategories} />
      <main className="flex-1">{children}</main>
      <Footer categories={navCategories} />
    </div>
  );
}
