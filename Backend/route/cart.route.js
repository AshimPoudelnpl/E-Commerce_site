import { Router } from "express";
import auth from "../middleware/auth.js";
import {
  addToCartItemController,
  getCartItemsController,
  removeCartItemController,
  updateCartItemController,
} from "../controllers/cart.controller.js";

const cartRouter = Router();

// Add item to cart
cartRouter.post("/add-to-cart", auth, addToCartItemController);

// Get cart items
cartRouter.get("/items", auth, getCartItemsController);
cartRouter.put("/update/:cartItemId", auth, updateCartItemController);
cartRouter.delete("/remove/:cartItemId", auth, removeCartItemController);

export default cartRouter;
