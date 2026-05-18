import type { IconType } from "../components/ClothingIcon";

export type { IconType };
export type Category = "Tops" | "Bottoms" | "Shoes" | "Accessories";

export interface ClothingItem {
  id: string;
  name: string;
  brand: string;
  category: Category;
  icon: IconType;
  price: number;
  dateBought: string;
  timesWorn: number;
  color: string;
}

export const closetItems: ClothingItem[] = [
  {
    id: "1",
    name: "Cream Oversized Blazer",
    brand: "Aritzia",
    category: "Tops",
    icon: "blazer",
    price: 128,
    dateBought: "2024-08-15",
    timesWorn: 18,
    color: "#C4A882",
  },
  {
    id: "2",
    name: "Vintage Graphic Tee",
    brand: "Urban Outfitters",
    category: "Tops",
    icon: "tshirt",
    price: 34,
    dateBought: "2024-09-01",
    timesWorn: 41,
    color: "#8FAF88",
  },
  {
    id: "3",
    name: "Linen Cargo Pants",
    brand: "Zara",
    category: "Bottoms",
    icon: "pants",
    price: 59,
    dateBought: "2024-07-20",
    timesWorn: 24,
    color: "#C4A878",
  },
  {
    id: "4",
    name: "Pleat Mini Skirt",
    brand: "Princess Polly",
    category: "Bottoms",
    icon: "skirt",
    price: 55,
    dateBought: "2024-10-05",
    timesWorn: 11,
    color: "#F0B8C8",
  },
  {
    id: "5",
    name: "Chunky Lug Sole Boots",
    brand: "Steve Madden",
    category: "Shoes",
    icon: "boots",
    price: 139,
    dateBought: "2024-08-30",
    timesWorn: 29,
    color: "#4A3728",
  },
  {
    id: "6",
    name: "Air Force 1s",
    brand: "Nike",
    category: "Shoes",
    icon: "sneakers",
    price: 110,
    dateBought: "2024-06-12",
    timesWorn: 67,
    color: "#D0CFC9",
  },
  {
    id: "7",
    name: "Layered Gold Necklace",
    brand: "Mejuri",
    category: "Accessories",
    icon: "necklace",
    price: 68,
    dateBought: "2024-09-18",
    timesWorn: 52,
    color: "#D4AF37",
  },
  {
    id: "8",
    name: "Crop Hoodie",
    brand: "Free People",
    category: "Tops",
    icon: "tank",
    price: 38,
    dateBought: "2024-11-01",
    timesWorn: 19,
    color: "#F2B4B8",
  },
  {
    id: "9",
    name: "Denim Jacket",
    brand: "Levi's",
    category: "Tops",
    icon: "blazer",
    price: 88,
    dateBought: "2024-05-10",
    timesWorn: 58,
    color: "#8BB4D4",
  },
  {
    id: "10",
    name: "Mini Shoulder Bag",
    brand: "Coach",
    category: "Accessories",
    icon: "bag",
    price: 195,
    dateBought: "2024-07-04",
    timesWorn: 44,
    color: "#8B6B45",
  },
  {
    id: "11",
    name: "Knit Sweater",
    brand: "Brandy Melville",
    category: "Tops",
    icon: "cardigan",
    price: 45,
    dateBought: "2024-10-20",
    timesWorn: 16,
    color: "#B8A8CC",
  },
  {
    id: "12",
    name: "Leather Strappy Sandals",
    brand: "Sam Edelman",
    category: "Shoes",
    icon: "sandals",
    price: 115,
    dateBought: "2024-06-01",
    timesWorn: 33,
    color: "#A07850",
  },
];

export function costPerWear(item: ClothingItem): number {
  if (item.timesWorn === 0) return item.price;
  return Math.round((item.price / item.timesWorn) * 100) / 100;
}

export function avgCostPerWear(): number {
  const total = closetItems.reduce((sum, item) => sum + costPerWear(item), 0);
  return Math.round((total / closetItems.length) * 100) / 100;
}

export function moneySaved(): number {
  const totalSpent = closetItems.reduce((sum, item) => sum + item.price, 0);
  return Math.max(0, closetItems.length * 45 - totalSpent);
}

export function avgWears(items?: ClothingItem[]): number {
  const list = items ?? closetItems;
  if (list.length === 0) return 0;
  return Math.round(list.reduce((sum, item) => sum + item.timesWorn, 0) / list.length);
}

export const savedOutfits = [
  { id: "o1", name: "Campus Casual", items: ["1", "9", "5"] },
  { id: "o2", name: "Weekend Brunch", items: ["8", "4", "12"] },
  { id: "o3", name: "Library Chic",   items: ["11", "3", "6"] },
];

export interface ShopRec {
  id: string;
  name: string;
  price: number;
  reason: string;
  color: string;
  icon: IconType;
}

export const shopRecs: ShopRec[] = [
  {
    id: "r1",
    name: "Classic Trench Coat",
    price: 148,
    reason: "No outerwear in your closet — pairs with 9 of your items.",
    color: "#B8956A",
    icon: "trench",
  },
  {
    id: "r2",
    name: "Satin Slip Dress",
    price: 72,
    reason: "Zero dresses in your rotation. High cost-per-wear potential.",
    color: "#C4B4DC",
    icon: "dress",
  },
  {
    id: "r3",
    name: "White Linen Button-Down",
    price: 58,
    reason: "A layering piece that works under your blazer or knotted alone.",
    color: "#E8E0D5",
    icon: "tshirt",
  },
  {
    id: "r4",
    name: "Brown Leather Belt",
    price: 42,
    reason: "Adds structure to your wide-leg pants and pleated skirt.",
    color: "#7A4A28",
    icon: "belt",
  },
  {
    id: "r5",
    name: "Gold Hoop Earrings",
    price: 28,
    reason: "Pairs with your layered necklace — completes any look instantly.",
    color: "#D4AF37",
    icon: "hoops",
  },
  {
    id: "r6",
    name: "Blush Ballet Flats",
    price: 95,
    reason: "Trending now. Fills the gap between your boots and sandals.",
    color: "#E8C5C5",
    icon: "flats",
  },
];
