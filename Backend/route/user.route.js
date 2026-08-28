import { Router } from "express";
import {
  registerUserController,
  verifyEmailController,
  loginUserController,
  logoutController,
  refreshTokenController,
  userDetailsController,
  useAvatorController,
  removeImageFromCloudinary,
} from "../controllers/user.controller.js";
import auth from "../middleware/auth.js";
import upload from "../middleware/multer.js";

const userRouter = Router();

// Public routes
userRouter.post("/register", registerUserController);
userRouter.post("/verify-email", verifyEmailController);
userRouter.post("/login", loginUserController);
userRouter.post("/refresh-token", refreshTokenController);

// Protected routes
userRouter.get("/logout", auth, logoutController);
userRouter.get("/user-details", auth, userDetailsController);
userRouter.put(
  "/userAvatar",
  auth,
  upload.single("avatar"),
  useAvatorController,
);
userRouter.delete(
  "/deleteImage",
  auth,
  removeImageFromCloudinary,
);

export default userRouter;
