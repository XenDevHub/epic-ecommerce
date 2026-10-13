import type { ProductCatalogItem } from "./products";
import { getAllProducts } from "./products";

export interface ShopData {
  id: string;
  name: string;
  initials: string;
  tagline: string;
  description: string;
  rating: number;
  reviews_count: number;
  products_count: number;
  dispatch_speed: string;
  location: string;
  since: string;
  is_verified: boolean;
  accent_color: string;
  accent_bg: string;
  cover_image: string;
  specialties: string[];
}

export const SHOP_CATALOG: Record<string, ShopData> = {
  "shop-apex-artisanal": {
    id: "shop-apex-artisanal",
    name: "Apex Artisanal",
    initials: "AX",
    tagline: "Official Flagship • 2-Hr Dispatch",
    description:
      "Premium tech accessories and lifestyle gear. Curated selection of keyboards, chargers, and smart devices from world-class brands — all verified authentic with official warranty.",
    rating: 4.9,
    reviews_count: 426,
    products_count: 142,
    dispatch_speed: "2-Hour Express",
    location: "Banani, Dhaka",
    since: "2023",
    is_verified: true,
    accent_color: "text-on-surface",
    accent_bg: "bg-surface-container-highest",
    cover_image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDZwR2qdke35-YhmXDncKNWF4Hsp5lXyaDhGGxoXZX4J1TMRVoCx1gVlxA52-G6hoTuNJlMf6tLJA_qnrGjGpt6FtOizUoPvo7tenvfN4XXZwwO9nPwVrYdkbapNIGTmn-_0AWVH4Wm-XvPJdJMdqHgscOEf3ptSuSyWCWLjWx5lh4zKpoT9AwrADMjaz8pulJutH8jAu5fJAT6GFI1Yb4Y4el26FlMbtOZR2WRV7UxxFkzE3KEuVztdw",
    specialties: ["Mechanical Keyboards", "GaN Chargers", "Smart Audio", "Premium Accessories"],
  },
  "shop-anokhi-handloom": {
    id: "shop-anokhi-handloom",
    name: "Anokhi Handloom",
    initials: "AK",
    tagline: "Authentic Weavers • Dhaka",
    description:
      "Master artisans from Tangail district bringing century-old Jamdani and handloom traditions to the digital marketplace. Every piece is hand-woven with love, carrying the heritage of Bengal's finest textile legacy.",
    rating: 4.8,
    reviews_count: 312,
    products_count: 86,
    dispatch_speed: "48-Hour Craft",
    location: "Tangail & Dhaka",
    since: "2022",
    is_verified: true,
    accent_color: "text-primary",
    accent_bg: "bg-primary/20",
    cover_image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD2EsvU-4XBMnP0BBVU4vCS0dc8QwDrc_PjoyzL4v32idZQACNFoBZgIvGLNcjaieFwvNKBXcr7FOPcnCWmFk2pFQCgyRAFInyBmWTik-mZJ_6mWUJGlZqmznqQPBe5ZCn0Nhpfrd8yAu2Xpv_cylWt-rKW9M_M5Isouq-85EbNsZFmEWv5v1QWdaDrqvF_cTVyUgxFxWjqsCC7Bh9BXvOuGNI1kGQW-VV42ddzKB4qOs3EFhN77v20HQ",
    specialties: ["Tangail Saree", "Jamdani", "Cotton Handloom", "Heritage Textiles"],
  },
  "shop-pulse-acoustics": {
    id: "shop-pulse-acoustics",
    name: "Pulse Acoustics",
    initials: "PA",
    tagline: "Official Hi-Res Audio Importer",
    description:
      "Bangladesh's premier hi-resolution audio destination. Authorized importer of studio-grade earphones, headphones, and portable DACs. Every product comes with 1-year official warranty and authentic certification.",
    rating: 4.9,
    reviews_count: 289,
    products_count: 34,
    dispatch_speed: "24-Hour Express",
    location: "Dhanmondi, Dhaka",
    since: "2023",
    is_verified: true,
    accent_color: "text-tertiary",
    accent_bg: "bg-tertiary/20",
    cover_image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuArLaHe7PGVtYzIy4w8MlTUERrmcXK4boooAfqv0KN_krTDzTK-p2zK3AgrlY1q5vKzhL2zsQSARBXGjWf1yW8jgxg0dfws6-lxSMhiB99JEdrtDN2Fo1BfyS-08lpcxyXd0w6RrlzR2kQQUdNbKaI5Uq_gLEPukGvXLI15qS6dsgrr1O3a2VmH39KEKnRVJJ1phrgchS9fsgMXIacXgqbK-mhns5M-Y23fX9QQYElZJ2ybJQHbpSxF2A",
    specialties: ["Wireless Earbuds", "ANC Headphones", "Portable DAC", "Audio Cables"],
  },
  "shop-pure-glow": {
    id: "shop-pure-glow",
    name: "Pure Glow Beauty",
    initials: "PG",
    tagline: "Dermatologist-Approved Skincare",
    description:
      "Clinical-grade K-beauty and dermatologist-recommended skincare products. All products are EWG-verified, fragrance-free options available, and sourced directly from certified manufacturers.",
    rating: 4.7,
    reviews_count: 198,
    products_count: 52,
    dispatch_speed: "Cool-Chain 24hr",
    location: "Uttara, Dhaka",
    since: "2024",
    is_verified: true,
    accent_color: "text-secondary",
    accent_bg: "bg-secondary/20",
    cover_image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDasgckhLJOGXZ88qG2h4cToX9bq68Y2YQHJFW1l5HxoQIbMGX0a-eg7u12jZNJlQZh-b71l9aikHFuV3fdr78isaq9boQ8VltqUh1r3dNWhT3W6DT6sFPccQLm1b0i7iWJ4PKdPAvOWWcMNCsn6BRNLL9RG2_c-GRIIcDOTHSDJLpQY0Kh0SjuhEwQvKxE04oz-f9vD0RWTazgUzl7TjESp580ru_pbcI9xFH_jBwfkNNYe7SQ6MxzcQ",
    specialties: ["CICA Ampoules", "Barrier Repair", "Sunscreen SPF50+", "Gentle Cleansers"],
  },
};

export function getShop(id: string): ShopData | null {
  return SHOP_CATALOG[id] ?? null;
}

export function getAllShops(): ShopData[] {
  return Object.values(SHOP_CATALOG);
}

export function getShopProducts(shopId: string): ProductCatalogItem[] {
  return getAllProducts().filter((p) => p.shop_id === shopId);
}
