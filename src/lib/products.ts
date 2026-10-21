export type ProductCategory =
  | "Electronics"
  | "Fashion"
  | "Home"
  | "Sports"
  | "Accessories";

export type Product = {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  price: number;
  category: ProductCategory;
  rating: number;
  imageUrl: string;
  specifications: Record<string, string>;
  createdAt: string;
  custom?: boolean;
};

export const STATIC_PRODUCTS: Product[] = [
  {
    id: "1",
    title: "Wireless Noise-Canceling Headphones",
    shortDescription: "Premium sound with 30-hour battery life.",
    fullDescription:
      "Experience immersive audio with adaptive noise cancellation, plush ear cushions, and seamless multi-device pairing. Perfect for travel, focus sessions, and everyday listening.",
    price: 249,
    category: "Electronics",
    rating: 4.8,
    imageUrl:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
    specifications: {
      Driver: "40mm dynamic",
      Battery: "30 hours",
      Weight: "250g",
      Connectivity: "Bluetooth 5.3",
    },
    createdAt: "2025-01-15",
  },
  {
    id: "2",
    title: "Minimalist Leather Sneakers",
    shortDescription: "Handcrafted comfort for all-day wear.",
    fullDescription:
      "These sneakers blend premium full-grain leather with a cushioned insole and flexible outsole. A clean silhouette that pairs with everything from denim to tailored looks.",
    price: 129,
    category: "Fashion",
    rating: 4.6,
    imageUrl:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80",
    specifications: {
      Material: "Full-grain leather",
      Sole: "Rubber cup sole",
      Sizes: "EU 38–46",
    },
    createdAt: "2025-02-01",
  },
  {
    id: "3",
    title: "Smart Home Hub",
    shortDescription: "Control lights, climate, and security in one app.",
    fullDescription:
      "Centralize your connected home with voice control, automation routines, and real-time alerts. Works with major smart device brands out of the box.",
    price: 89,
    category: "Electronics",
    rating: 4.4,
    imageUrl:
      "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800&q=80",
    specifications: {
      Protocol: "Wi‑Fi, Zigbee, Thread",
      Display: "7\" touchscreen",
      Voice: "Built-in assistant",
    },
    createdAt: "2025-02-10",
  },
  {
    id: "4",
    title: "Ceramic Pour-Over Set",
    shortDescription: "Barista-quality coffee at home.",
    fullDescription:
      "A matte ceramic dripper, glass carafe, and reusable filter deliver clean, balanced cups. Includes a quick-start guide for perfect extraction every time.",
    price: 54,
    category: "Home",
    rating: 4.7,
    imageUrl:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80",
    specifications: {
      Capacity: "600ml carafe",
      Filter: "Stainless steel mesh",
      Dishwasher: "Top rack safe",
    },
    createdAt: "2025-03-05",
  },
  {
    id: "5",
    title: "Performance Running Jacket",
    shortDescription: "Lightweight, weather-resistant layer.",
    fullDescription:
      "Breathable fabric with sealed seams keeps wind and light rain out while reflective details improve visibility on early-morning runs.",
    price: 98,
    category: "Sports",
    rating: 4.5,
    imageUrl:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80",
    specifications: {
      Fabric: "Recycled polyester",
      Fit: "Athletic",
      Pockets: "2 zippered",
    },
    createdAt: "2025-03-18",
  },
  {
    id: "6",
    title: "Everyday Canvas Tote",
    shortDescription: "Spacious bag with internal laptop sleeve.",
    fullDescription:
      "Durable organic cotton canvas, reinforced handles, and a structured base make this tote ideal for work, markets, and weekend trips.",
    price: 42,
    category: "Accessories",
    rating: 4.3,
    imageUrl:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
    specifications: {
      Dimensions: "42 × 38 × 12 cm",
      Laptop: "Up to 15\"",
      Material: "Organic cotton",
    },
    createdAt: "2025-04-02",
  },
  {
    id: "7",
    title: "4K Ultra HD Monitor",
    shortDescription: "Crisp visuals for creators and gamers.",
    fullDescription:
      "27-inch IPS panel with 99% sRGB coverage, HDR10, and adjustable stand. Low input lag and USB-C power delivery for a clean desk setup.",
    price: 399,
    category: "Electronics",
    rating: 4.9,
    imageUrl:
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80",
    specifications: {
      Resolution: "3840 × 2160",
      Refresh: "144Hz",
      Ports: "HDMI, DP, USB-C",
    },
    createdAt: "2025-04-20",
  },
  {
    id: "8",
    title: "Yoga Mat Pro",
    shortDescription: "Extra grip and cushioning for any practice.",
    fullDescription:
      "Dual-layer construction prevents slipping on hardwood and provides joint support during floor work. Includes carrying strap.",
    price: 68,
    category: "Sports",
    rating: 4.6,
    imageUrl:
      "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&q=80",
    specifications: {
      Thickness: "6mm",
      Length: "183cm",
      Material: "TPE, latex-free",
    },
    createdAt: "2025-05-01",
  },
  {
    id: "9",
    title: "Portable Bluetooth Speaker",
    shortDescription: "Room-filling sound in a compact, water-resistant body.",
    fullDescription:
      "Pair two units for stereo, enjoy 12 hours of playback, and take it poolside with IPX7 protection. USB-C charging and a built-in microphone for calls.",
    price: 79,
    category: "Electronics",
    rating: 4.5,
    imageUrl:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80",
    specifications: {
      Battery: "12 hours",
      Water: "IPX7",
      Connectivity: "Bluetooth 5.0",
    },
    createdAt: "2025-05-12",
  },
];

const STORAGE_KEY = "meridian_goods_custom_products";
const LEGACY_STORAGE_KEY = "remontada_custom_products";

export function getCustomProducts(): Product[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as Product[];
    const legacy = localStorage.getItem(LEGACY_STORAGE_KEY);
    if (!legacy) return [];
    const parsed = JSON.parse(legacy) as Product[];
    localStorage.setItem(STORAGE_KEY, legacy);
    return parsed;
  } catch {
    return [];
  }
}

export function saveCustomProduct(product: Omit<Product, "id" | "custom">): Product {
  const newProduct: Product = {
    ...product,
    id: `custom-${crypto.randomUUID()}`,
    custom: true,
  };
  const existing = getCustomProducts();
  localStorage.setItem(STORAGE_KEY, JSON.stringify([newProduct, ...existing]));
  return newProduct;
}

export function deleteCustomProduct(id: string): void {
  const filtered = getCustomProducts().filter((p) => p.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}

export function getAllProducts(): Product[] {
  return [...getCustomProducts(), ...STATIC_PRODUCTS];
}

export function getProductById(id: string): Product | undefined {
  return getAllProducts().find((p) => p.id === id);
}

export function getRelatedProducts(product: Product, limit = 3): Product[] {
  return getAllProducts()
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, limit);
}

export const CATEGORIES: ProductCategory[] = [
  "Electronics",
  "Fashion",
  "Home",
  "Sports",
  "Accessories",
];
