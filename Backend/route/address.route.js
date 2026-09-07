import { Router } from "express";
import { addAddress, getAddresses, updateAddress, deleteAddress, setDefaultAddress } from "../controllers/address.controller.js";
import auth from "../middleware/auth.js";

const addressRouter = Router();

addressRouter.post("/add", auth, addAddress);
addressRouter.get("/", auth, getAddresses);
addressRouter.put("/:id", auth, updateAddress);
addressRouter.delete("/:id", auth, deleteAddress);
addressRouter.put("/:id/set-default", auth, setDefaultAddress);

export default addressRouter;
