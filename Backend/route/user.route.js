import { Router } from "express";
import {
  registerUserController,
  verifyEmailController,
  loginController,
  logoutController,
  uploadAvatar,
  updateUserDetails,
  forgotPasswordController,
  verifyForgotPasswordOtp,
  resetpassword,
  refreshToken,
  userDetails,
  listUsersController,
} from "../controllers/user.controller.js";
import auth from "../middleware/auth.js";
import upload from "../middleware/multer.js";

const userRouter = Router();

userRouter.post("/register", registerUserController);
userRouter.post("/verify-email", verifyEmailController);
userRouter.post("/login", loginController);
userRouter.get("/logout", auth, logoutController);
userRouter.put("/upload-avatar", auth, upload.single("avatar"), uploadAvatar);
userRouter.put("/update-user", auth, updateUserDetails);
userRouter.post("/forgot-password", forgotPasswordController);
userRouter.put("/forgot-password", forgotPasswordController);
userRouter.post("/verify-forgot-password-otp", verifyForgotPasswordOtp);
userRouter.put("/verify-forgot-password-otp", verifyForgotPasswordOtp);
userRouter.post("/reset-password", resetpassword);
userRouter.put("/reset-password", resetpassword);
userRouter.post("/refresh-token", refreshToken);
userRouter.get("/user-details", auth, userDetails);
userRouter.get("/users", auth, listUsersController);

export default userRouter;
