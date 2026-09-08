import { createContext } from "react";
import type { Product } from "../types/product";

export interface CartItem extends Product {
  quantity: number;
  cartItemId?: string;
  serverProductId?: string;
}

export interface ShopContextValue {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  updateCartQuantity: (productId: number, quantity: number) => void;
  removeFromCart: (productId: number) => void;
}

export const MyContext = createContext<ShopContextValue & Record<string, any>>({
  cartItems: [],
  addToCart: () => undefined,
  updateCartQuantity: () => undefined,
  removeFromCart: () => undefined,
});
