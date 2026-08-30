import { Router } from "express";
import auth from "../middleware/auth.js";
import upload from "../middleware/multer.js";
import {
  uploadImage,
  createCategory,
  getAllCategories,
  getCategoriesCount,
  getSubCategoriesCount,
  getCategory,
  removeImageFromCloudinary,
  deleteCategory,
  updateCategory,
} from "../controllers/category.controller.js";

const categoryRouter = Router();

// Upload image(s) for category
categoryRouter.post("/uploadImages", auth, upload.array("image"), uploadImage);

// Create Category
categoryRouter.post("/create-category", auth, createCategory);

// Get routes (Specific named paths first, wildcard /:id at the end)
categoryRouter.get("/", getAllCategories);
categoryRouter.get("/get/count", auth, getCategoriesCount);
categoryRouter.get("/sub-category-count", auth, getSubCategoriesCount);
categoryRouter.get("/:id", getCategory);
categoryRouter.delete("/deleteImage", removeImageFromCloudinary);
categoryRouter.delete("/:id", auth, deleteCategory);
categoryRouter.put("/:id", auth, updateCategory);

export default categoryRouter;
