import { Router } from "express";
import auth from "../middleware/auth.js";
import upload from "../middleware/multer.js";
import {
  uploadImage,
  createProduct,
  getAllProducts,
  getAllProductsByCatId,
  getAllProductsByCatName,
  getAllProductsBysubCatId,
  getAllProductsBysubCatName,
  getAllProductsByThirdLavelCat,
  getAllProductsByThirdLavelCatName,
  removeProductImage,
  getAllProductByPrice,
  getAllProductsByRating,
  geAllProductCount,
  getALlFeaturedProducts,
  deleteproduct,
  getALlFeaturedProductCount,
  getProduct,
} from "../controllers/product.controller.js";

const productRouter = Router();

// Upload image(s) for products
productRouter.post("/uploadImages", auth, upload.array("images"), uploadImage);

// Create product
productRouter.post("/create", auth, createProduct);

// Get all products

productRouter.get("/getAllProducts", getAllProducts);

// Get products by Category ID
productRouter.get("/getProductsByCatId/:id", getAllProductsByCatId);

// Get products by Category Name
productRouter.get("/getProductsByCatName", getAllProductsByCatName);

// Get products by Sub-Category ID
productRouter.get("/getProductsBysubCatId/:id", getAllProductsBysubCatId);

// Get products by Sub-Category Name
productRouter.get("/getProductsBysubCatName", getAllProductsBysubCatName);
// Get products by Third Level Category ID
productRouter.get(
  "/getAllProductsByThirdLavelCat/:id",
  getAllProductsByThirdLavelCat,
);

// Get products by Third Level Category Name
productRouter.get(
  "/getAllProductsByThirdLavelCatName",
  getAllProductsByThirdLavelCatName,
);
productRouter.get("/getAllProductByPrice", getAllProductByPrice);
productRouter.get("/getAllProductByRating", getAllProductsByRating);
productRouter.get("/getAllProductCount", geAllProductCount);
productRouter.get("/getAllFeaturedProducts", getALlFeaturedProducts);
productRouter.get("/getAllFeaturedProductCount", getALlFeaturedProductCount);
productRouter.delete("/deleteProduct/:id", deleteproduct);
productRouter.get("/:id", getProduct);

// Delete image from Cloudinary
productRouter.delete("/deleteImage", auth, removeProductImage);

export default productRouter;
