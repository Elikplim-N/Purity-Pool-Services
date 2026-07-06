import { PrismaLibSql } from "@prisma/adapter-libsql";
import { PrismaClient } from "../src/generated/prisma/client";

const adapter = new PrismaLibSql({
  url: process.env.DATABASE_URL ?? "file:./prisma/dev.db",
});
const prisma = new PrismaClient({ adapter });

const categories = [
  {
    name: "Chemicals & Water Treatment",
    slug: "chemicals-water-treatment",
    description:
      "Chlorine, shock, algaecide, and pH balancers to keep your water clean, clear, and safe to swim in.",
    icon: "FlaskConical",
  },
  {
    name: "Pumps & Filters",
    slug: "pumps-filters",
    description:
      "Pool pumps, cartridge and sand filters, and replacement parts that keep your circulation system running smoothly.",
    icon: "Fan",
  },
  {
    name: "Cleaning Equipment",
    slug: "cleaning-equipment",
    description:
      "Manual and robotic vacuums, skimmers, brushes, and nets for effortless pool cleaning.",
    icon: "Sparkles",
  },
  {
    name: "Covers & Safety",
    slug: "covers-safety",
    description:
      "Solar covers, safety covers, and reels to protect your pool and everyone around it.",
    icon: "ShieldCheck",
  },
  {
    name: "Testing & Maintenance",
    slug: "testing-maintenance",
    description:
      "Test kits, strips, thermometers, and telescopic poles for everyday pool care.",
    icon: "TestTube",
  },
  {
    name: "Toys & Floats",
    slug: "toys-floats",
    description:
      "Inflatables, floats, and pool games to make the most of your backyard oasis.",
    icon: "Waves",
  },
];

const products: Array<{
  name: string;
  slug: string;
  categorySlug: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  sku: string;
  stock: number;
  featured?: boolean;
}> = [
  {
    name: "3-Inch Chlorine Tablets (25 lb Bucket)",
    slug: "3-inch-chlorine-tablets-25lb",
    categorySlug: "chemicals-water-treatment",
    description:
      "Slow-dissolving stabilized chlorine tablets for consistent sanitization all season long. Ideal for skimmers, floaters, and automatic feeders.",
    price: 89.99,
    compareAtPrice: 104.99,
    sku: "CHM-CHL-025",
    stock: 42,
    featured: true,
  },
  {
    name: "Pool Shock Oxidizer (12 x 1 lb Bags)",
    slug: "pool-shock-oxidizer-12pack",
    categorySlug: "chemicals-water-treatment",
    description:
      "Fast-acting granular shock that eliminates algae, bacteria, and chloramines for sparkling clear water.",
    price: 54.99,
    sku: "CHM-SHK-012",
    stock: 60,
    featured: true,
  },
  {
    name: "Algaecide Concentrate 60 (1 Gallon)",
    slug: "algaecide-concentrate-1gal",
    categorySlug: "chemicals-water-treatment",
    description:
      "Concentrated broad-spectrum algaecide that prevents and eliminates green, black, and mustard algae.",
    price: 38.5,
    sku: "CHM-ALG-001",
    stock: 35,
  },
  {
    name: "pH Increaser (10 lb)",
    slug: "ph-increaser-10lb",
    categorySlug: "chemicals-water-treatment",
    description:
      "Raises pH quickly and safely to keep your water balanced and comfortable for swimmers.",
    price: 24.99,
    sku: "CHM-PHI-010",
    stock: 50,
  },
  {
    name: "pH Decreaser (10 lb)",
    slug: "ph-decreaser-10lb",
    categorySlug: "chemicals-water-treatment",
    description:
      "Lowers pH and total alkalinity to prevent scaling and cloudy water.",
    price: 24.99,
    sku: "CHM-PHD-010",
    stock: 48,
  },
  {
    name: "Water Clarifier (1 Quart)",
    slug: "water-clarifier-1qt",
    categorySlug: "chemicals-water-treatment",
    description:
      "Coagulates fine particles so your filter can catch them, turning hazy water crystal clear within 24 hours.",
    price: 19.99,
    sku: "CHM-CLR-001",
    stock: 55,
  },
  {
    name: "1.5 HP Single-Speed Pool Pump",
    slug: "1-5-hp-single-speed-pool-pump",
    categorySlug: "pumps-filters",
    description:
      "Durable, energy-efficient pump built for reliable circulation in above-ground and small in-ground pools.",
    price: 349.0,
    compareAtPrice: 399.0,
    sku: "PMP-SGL-150",
    stock: 14,
    featured: true,
  },
  {
    name: "2 HP Variable-Speed Pool Pump",
    slug: "2-hp-variable-speed-pool-pump",
    categorySlug: "pumps-filters",
    description:
      "Whisper-quiet variable-speed pump that cuts energy costs while giving you full control over flow rate.",
    price: 749.0,
    sku: "PMP-VAR-200",
    stock: 8,
    featured: true,
  },
  {
    name: "Cartridge Filter Replacement Element",
    slug: "cartridge-filter-replacement-element",
    categorySlug: "pumps-filters",
    description:
      "High-density pleated cartridge that restores peak filtration performance in minutes.",
    price: 42.99,
    sku: "PMP-CFE-001",
    stock: 70,
  },
  {
    name: "Sand Filter System (24-inch Tank)",
    slug: "sand-filter-system-24-inch",
    categorySlug: "pumps-filters",
    description:
      "Complete sand filter system with 7-way multiport valve, ideal for medium to large pools.",
    price: 529.0,
    sku: "PMP-SND-024",
    stock: 10,
  },
  {
    name: "Multiport Valve Repair Kit",
    slug: "multiport-valve-repair-kit",
    categorySlug: "pumps-filters",
    description:
      "O-rings, gaskets, and spider gasket for a complete multiport valve rebuild.",
    price: 27.49,
    sku: "PMP-MPV-001",
    stock: 33,
  },
  {
    name: "Robotic Pool Cleaner Pro",
    slug: "robotic-pool-cleaner-pro",
    categorySlug: "cleaning-equipment",
    description:
      "Smart robotic cleaner that scrubs floors, walls, and the waterline automatically, with a 60-minute cleaning cycle.",
    price: 599.0,
    compareAtPrice: 679.0,
    sku: "CLN-ROB-001",
    stock: 12,
    featured: true,
  },
  {
    name: "Manual Suction Pool Vacuum",
    slug: "manual-suction-pool-vacuum",
    categorySlug: "cleaning-equipment",
    description:
      "Budget-friendly vacuum head that connects to your existing pump for effective debris removal.",
    price: 44.99,
    sku: "CLN-VAC-001",
    stock: 40,
  },
  {
    name: "Telescopic Pool Skimmer Net",
    slug: "telescopic-pool-skimmer-net",
    categorySlug: "cleaning-equipment",
    description:
      "Fine-mesh skimmer net with a lightweight aluminum handle for daily leaf and debris removal.",
    price: 21.99,
    sku: "CLN-SKM-001",
    stock: 65,
  },
  {
    name: "Pool Wall & Tile Brush",
    slug: "pool-wall-tile-brush",
    categorySlug: "cleaning-equipment",
    description:
      "Nylon-bristle brush that clears algae and grime from walls, steps, and tile lines without scratching.",
    price: 16.99,
    sku: "CLN-BRS-001",
    stock: 80,
  },
  {
    name: "Heavy-Duty Leaf Rake",
    slug: "heavy-duty-leaf-rake",
    categorySlug: "cleaning-equipment",
    description:
      "Deep-bag leaf rake designed to scoop large debris quickly from the pool surface and floor.",
    price: 18.99,
    sku: "CLN-RAK-001",
    stock: 45,
  },
  {
    name: "Solar Pool Cover (16 x 32 ft)",
    slug: "solar-pool-cover-16x32",
    categorySlug: "covers-safety",
    description:
      "Heat-retaining solar cover that reduces evaporation and keeps your pool warmer for longer swim seasons.",
    price: 129.0,
    sku: "SAF-SOL-1632",
    stock: 20,
    featured: true,
  },
  {
    name: "Mesh Safety Cover (18 x 36 ft)",
    slug: "mesh-safety-cover-18x36",
    categorySlug: "covers-safety",
    description:
      "Heavy-duty mesh safety cover rated to keep children and pets safe during the off-season.",
    price: 449.0,
    sku: "SAF-MSH-1836",
    stock: 9,
  },
  {
    name: "Solar Cover Reel System",
    slug: "solar-cover-reel-system",
    categorySlug: "covers-safety",
    description:
      "Rolls your solar cover on and off in seconds, protecting it from tears and extending its lifespan.",
    price: 189.0,
    sku: "SAF-REL-001",
    stock: 15,
  },
  {
    name: "Pool Safety Alarm",
    slug: "pool-safety-alarm",
    categorySlug: "covers-safety",
    description:
      "Immersion alarm that alerts you the moment someone enters the pool unsupervised.",
    price: 79.99,
    sku: "SAF-ALM-001",
    stock: 25,
  },
  {
    name: "6-Way Test Strips (100 ct)",
    slug: "6-way-test-strips-100ct",
    categorySlug: "testing-maintenance",
    description:
      "Quick-read strips that test free chlorine, pH, alkalinity, hardness, and more in seconds.",
    price: 15.99,
    sku: "TST-STR-100",
    stock: 90,
    featured: true,
  },
  {
    name: "Digital Pool Water Tester",
    slug: "digital-pool-water-tester",
    categorySlug: "testing-maintenance",
    description:
      "Handheld digital meter delivering lab-accurate chlorine and pH readings in one dip.",
    price: 64.99,
    sku: "TST-DIG-001",
    stock: 22,
  },
  {
    name: "Floating Pool Thermometer",
    slug: "floating-pool-thermometer",
    categorySlug: "testing-maintenance",
    description:
      "Shatterproof floating thermometer with an easy-read dial for accurate water temperature.",
    price: 9.99,
    sku: "TST-THM-001",
    stock: 75,
  },
  {
    name: "8 ft Telescopic Aluminum Pole",
    slug: "8ft-telescopic-aluminum-pole",
    categorySlug: "testing-maintenance",
    description:
      "Lightweight, corrosion-resistant pole that extends up to 16 feet and fits all standard attachments.",
    price: 34.99,
    sku: "TST-POL-008",
    stock: 38,
  },
  {
    name: "Inflatable Lounge Float",
    slug: "inflatable-lounge-float",
    categorySlug: "toys-floats",
    description:
      "Oversized, puncture-resistant lounge float with a built-in cup holder for all-day comfort.",
    price: 29.99,
    sku: "TOY-LNG-001",
    stock: 48,
    featured: true,
  },
  {
    name: "Pool Volleyball Game Set",
    slug: "pool-volleyball-game-set",
    categorySlug: "toys-floats",
    description:
      "Complete net, ball, and anchor set for backyard pool volleyball tournaments.",
    price: 59.99,
    sku: "TOY-VBL-001",
    stock: 18,
  },
  {
    name: "Kids Ring Float Set (3-Pack)",
    slug: "kids-ring-float-set-3pack",
    categorySlug: "toys-floats",
    description:
      "Colorful, durable ring floats sized for young swimmers, sold as a set of three.",
    price: 22.99,
    sku: "TOY-RNG-003",
    stock: 55,
  },
];

async function main() {
  console.log("Seeding database...");

  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {
        name: category.name,
        description: category.description,
        icon: category.icon,
      },
      create: category,
    });
  }

  for (const product of products) {
    const category = await prisma.category.findUniqueOrThrow({
      where: { slug: product.categorySlug },
    });

    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {
        name: product.name,
        description: product.description,
        price: product.price,
        compareAtPrice: product.compareAtPrice,
        sku: product.sku,
        stock: product.stock,
        featured: product.featured ?? false,
        categoryId: category.id,
      },
      create: {
        name: product.name,
        slug: product.slug,
        description: product.description,
        price: product.price,
        compareAtPrice: product.compareAtPrice,
        sku: product.sku,
        stock: product.stock,
        featured: product.featured ?? false,
        categoryId: category.id,
      },
    });
  }

  console.log(
    `Seeded ${categories.length} categories and ${products.length} products.`
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
