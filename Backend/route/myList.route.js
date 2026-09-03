import { Router } from "express";

import {
  addToMyListController,
  getMyListController,
  removeFromMyListController,
  updateMyListItemController,
} from "../controllers/myList.controller.js";


import auth from "../middleware/auth.js";

const myListRouter = Router();

// Add product to My List
myListRouter.post("/add", auth, addToMyListController);

// Get user's My List
myListRouter.get("/", auth, getMyListController);

// Remove product from My List
myListRouter.delete("/remove", auth, removeFromMyListController);

// Update product in My List
myListRouter.put("/update/:productId", auth, updateMyListItemController);

export default myListRouter;
