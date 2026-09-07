import { Router } from "express";
import auth from "../middleware/auth.js";
import {
  createProductRam, getAllProductRams, updateProductRam, deleteProductRam,
  createProductSize, getAllProductSizes, updateProductSize, deleteProductSize,
  createProductWeight, getAllProductWeights, updateProductWeight, deleteProductWeight,
} from "../controllers/productSpecs.controller.js";

const productSpecsRouter = Router();

// ── RAM ──────────────────────────────────────────────────────────────────────
productSpecsRouter.post("/ram",          auth, createProductRam);
productSpecsRouter.get("/ram",                 getAllProductRams);
productSpecsRouter.put("/ram/:id",       auth, updateProductRam);
productSpecsRouter.delete("/ram/:id",    auth, deleteProductRam);

// ── SIZE ─────────────────────────────────────────────────────────────────────
productSpecsRouter.post("/size",         auth, createProductSize);
productSpecsRouter.get("/size",                getAllProductSizes);
productSpecsRouter.put("/size/:id",      auth, updateProductSize);
productSpecsRouter.delete("/size/:id",   auth, deleteProductSize);

// ── WEIGHT ───────────────────────────────────────────────────────────────────
productSpecsRouter.post("/weight",       auth, createProductWeight);
productSpecsRouter.get("/weight",              getAllProductWeights);
productSpecsRouter.put("/weight/:id",    auth, updateProductWeight);
productSpecsRouter.delete("/weight/:id", auth, deleteProductWeight);

export default productSpecsRouter;
