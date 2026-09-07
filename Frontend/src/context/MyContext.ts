import { createContext } from "react";
import type { Product } from "../types/product";
import type { Category } from "../types/category";

export interface CartItem {
  id: string;
  productId: number;
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
  price: number;
}

export interface UserType {
  uid?: string;
  _id?: string;
  id?: string;
  name: string;
  email: string;
  mobile?: string;
  avatar?: string;
  phone?: string;
  [key: string]: any;
}

export interface MyContextType {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, size?: string, color?: string) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQty: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: number) => boolean;
  compareList: Product[];
  toggleCompare: (product: Product) => void;
  isInCompare: (productId: number) => boolean;
  activeModalProduct: Product | null;
  setActiveModalProduct: (p: Product | null) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  openProductDetailsModal: boolean;
  setOpenProductDetailsModal: React.Dispatch<React.SetStateAction<boolean>>;
  openCartPanel: boolean;
  setCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toggleCartPannel: (newOpen: boolean) => void;
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
  user: UserType | null;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
  userData: unknown;
  setUserData: React.Dispatch<React.SetStateAction<unknown>>;
  alertBox: ({ msg, type }: { msg: string; type: string }) => void;
  success: (msg: string) => void;
  error: (msg: string) => void;
  apiUrl: string;
  catData: unknown[];
  isCartSyncing?: boolean;
}

export const MyContext = createContext<MyContextType>({} as MyContextType);
