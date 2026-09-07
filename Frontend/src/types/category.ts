export interface Category {
  _id: string;
  id?: string | number;
  name: string;
  slug: string;
  parentId?: string | { _id: string } | null;
  parentCatName?: string;
  image?: string;
  color?: string;
  icon?: string;
  subCategories?: SubCategory[];
}

export interface SubCategory {
  _id: string;
  id?: string | number;
  name: string;
  slug: string;
  parentId: string;
  thirdCategories?: string[];
}

export const initialCategories: Category[] = [
  {
    _id: "cat_fashion",
    name: "Fashion",
    slug: "fashion",
    icon: "👗",
    color: "#ff5252",
    subCategories: [
      { _id: "sub_men", name: "Men", slug: "men", parentId: "cat_fashion", thirdCategories: ["Casual Shirts", "T-Shirts", "Jeans", "Trousers"] },
      { _id: "sub_women", name: "Women", slug: "women", parentId: "cat_fashion", thirdCategories: ["Tops & Tunics", "Kurta Sets", "Dresses", "Lehengas"] },
      { _id: "sub_kids", name: "Kids", slug: "kids", parentId: "cat_fashion", thirdCategories: ["Boys Clothing", "Girls Clothing", "Ethnic Wear"] },
    ],
  },
  {
    _id: "cat_electronics",
    name: "Electronics",
    slug: "electronics",
    icon: "🎧",
    color: "#3b82f6",
    subCategories: [
      { _id: "sub_mobiles", name: "Smartphones", slug: "smartphones", parentId: "cat_electronics", thirdCategories: ["Flagship Phones", "5G Mobiles", "Budget Phones"] },
      { _id: "sub_audio", name: "Audio & Headphones", slug: "audio", parentId: "cat_electronics", thirdCategories: ["Wireless Headphones", "TWS Earbuds", "Bluetooth Speakers"] },
      { _id: "sub_wearables", name: "Smart Wearables", slug: "wearables", parentId: "cat_electronics", thirdCategories: ["Smartwatches", "Fitness Bands"] },
    ],
  },
  {
    _id: "cat_home_kitchen",
    name: "Home & Kitchen",
    slug: "home-kitchen",
    icon: "🍳",
    color: "#10b981",
    subCategories: [
      { _id: "sub_storage", name: "Storage & Containers", slug: "storage", parentId: "cat_home_kitchen", thirdCategories: ["Kitchen Jars", "Airtight Containers", "Racks"] },
      { _id: "sub_decor", name: "Home Decor", slug: "decor", parentId: "cat_home_kitchen", thirdCategories: ["Vases", "Wall Art", "Lamps"] },
      { _id: "sub_cookware", name: "Cookware", slug: "cookware", parentId: "cat_home_kitchen", thirdCategories: ["Pans", "Pots", "Cookware Sets"] },
    ],
  },
  {
    _id: "cat_beauty",
    name: "Beauty",
    slug: "beauty",
    icon: "💄",
    color: "#ec4899",
    subCategories: [
      { _id: "sub_skincare", name: "Skincare", slug: "skincare", parentId: "cat_beauty", thirdCategories: ["Moisturizers", "Face Creams", "Serums"] },
      { _id: "sub_makeup", name: "Makeup", slug: "makeup", parentId: "cat_beauty", thirdCategories: ["Foundations", "Lipsticks", "Eye Makeup"] },
      { _id: "sub_bath", name: "Bath & Body", slug: "bath-body", parentId: "cat_beauty", thirdCategories: ["Shower Gels", "Body Lotions", "Massage Creams"] },
    ],
  },
  {
    _id: "cat_bags",
    name: "Bags",
    slug: "bags",
    icon: "👜",
    color: "#f59e0b",
    subCategories: [
      { _id: "sub_handbags", name: "Handbags", slug: "handbags", parentId: "cat_bags", thirdCategories: ["PU Handbags", "Tote Bags", "Clutches"] },
      { _id: "sub_backpacks", name: "Backpacks", slug: "backpacks", parentId: "cat_bags", thirdCategories: ["School Bags", "Laptop Backpacks", "Travel Bags"] },
      { _id: "sub_satchels", name: "Satchels", slug: "satchels", parentId: "cat_bags", thirdCategories: ["Dome Satchels", "Sling Bags"] },
    ],
  },
  {
    _id: "cat_shoes",
    name: "Shoes",
    slug: "shoes",
    icon: "👟",
    color: "#8b5cf6",
    subCategories: [
      { _id: "sub_sneakers", name: "Sneakers", slug: "sneakers", parentId: "cat_shoes", thirdCategories: ["Casual Sneakers", "Suede Sneakers", "White Sneakers"] },
      { _id: "sub_sports_shoes", name: "Sports Shoes", slug: "sports-shoes", parentId: "cat_shoes", thirdCategories: ["Running Shoes", "Gym Shoes", "Kids Sports Shoes"] },
    ],
  },
  {
    _id: "cat_sandals",
    name: "Sandals",
    slug: "sandals",
    icon: "🩴",
    color: "#06b6d4",
    subCategories: [
      { _id: "sub_flipflops", name: "Flip Flops", slug: "flip-flops", parentId: "cat_sandals", thirdCategories: ["Daily Wear", "Ortho Slippers", "Slides"] },
      { _id: "sub_casual_sandals", name: "Casual Sandals", slug: "casual-sandals", parentId: "cat_sandals", thirdCategories: ["Women Flat Sandals", "Strappy Sandals"] },
    ],
  },
  {
    _id: "cat_jewellery",
    name: "Jewellery",
    slug: "jewellery",
    icon: "💍",
    color: "#eab308",
    subCategories: [
      { _id: "sub_earrings", name: "Earrings", slug: "earrings", parentId: "cat_jewellery", thirdCategories: ["Kundan Earrings", "Stud Earrings", "Drop Earrings"] },
      { _id: "sub_rings", name: "Rings", slug: "rings", parentId: "cat_jewellery", thirdCategories: ["Silver Rings", "Gold Plated Rings", "Floral Rings"] },
      { _id: "sub_necklaces", name: "Necklaces", slug: "necklaces", parentId: "cat_jewellery", thirdCategories: ["Pendant Sets", "Chokers"] },
    ],
  },
];
