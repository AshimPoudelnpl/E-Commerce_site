import UserModel from "../models/userModal.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import sendEmailFun from "../Config/sendEmail.js";
import VerificationEmail from "../utils/verifyEmailTemplate.js";
import generateAccessToken from "../utils/generateAcessToken.js";
import generateRefreshToken from "../utils/generateRefreshToken.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// Register User Controller
export async function registerUserController(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide all the fields",
      });
    }

    const user = await UserModel.findOne({ email });

    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
      otp: verifyCode,
      otpExpires: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
    });

    await newUser.save();

    const emailHtml = VerificationEmail(name, verifyCode);

    const verifyEmail = await sendEmailFun(
      email,
      "Verify Your Email - Ecommerce App",
      `Hello ${name}, your verification code is ${verifyCode}`,
      emailHtml,
    );

    if (!verifyEmail) {
      return res.status(500).json({
        success: false,
        message:
          "User registered successfully, but verification email could not be sent.",
      });
    }

    return res.status(201).json({
      success: true,
      message: "User registered successfully. Please verify your email.",
    });
  } catch (error) {
    console.error("Register Error:", error);
    return res.status(500).json({
      success: false,
      message: "Error while registering the user",
      error: error.message,
    });
  }
}

// Verify Email Controller
export async function verifyEmailController(req, res) {
  try {
    const { code, email } = req.body;

    if (!code) {
      return res.status(400).json({
        success: false,
        message: "Please provide the verification code",
      });
    }

    const query = email ? { email, otp: code } : { otp: code };
    const user = await UserModel.findOne(query);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid verification code",
      });
    }

    const currentTime = new Date();
    if (user.otpExpires && user.otpExpires < currentTime) {
      return res.status(400).json({
        success: false,
        message: "Verification code has expired. Please request a new one.",
      });
    }

    user.verify_email = true;
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (error) {
    console.error("Verify Email Error:", error);
    return res.status(500).json({
      success: false,
      message: "Error while verifying email",
      error: error.message,
    });
  }
}

// Login Controller
export async function loginUserController(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found with this email",
      });
    }

    if (user.status !== "Active") {
      return res.status(400).json({
        success: false,
        message:
          "Your account is inactive or suspended. Please contact support.",
      });
    }

    const isMatch = await bcryptjs.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const accessToken = await generateAccessToken(user._id);
    const refreshToken = await generateRefreshToken(user._id);

    user.last_login_date = new Date();
    await user.save();

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
    };

    res.cookie("accessToken", accessToken, cookieOptions);
    res.cookie("refreshToken", refreshToken, cookieOptions);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        mobile: user.mobile,
        verify_email: user.verify_email,
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({
      success: false,
      message: "Error while logging in",
      error: error.message,
    });
  }
}

// Logout Controller
export async function logoutController(req, res) {
  try {
    const userId = req.userId;

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
    };

    res.clearCookie("accessToken", cookieOptions);
    res.clearCookie("refreshToken", cookieOptions);

    if (userId) {
      await UserModel.findByIdAndUpdate(userId, {
        refresh_token: "",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Logout Error:", error);
    return res.status(500).json({
      success: false,
      message: "Error while logging out",
      error: error.message,
    });
  }
}

// Refresh Token Controller
export async function refreshTokenController(req, res) {
  try {
    const refreshToken =
      req.cookies.refreshToken ||
      req.headers?.authorization?.split(" ")[1] ||
      req.body.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "No refresh token provided",
      });
    }

    const decode = jwt.verify(
      refreshToken,
      process.env.SECRET_KEY_REFRESH_TOKEN ||
        process.env.JSON_WEB_TOKEN_SECREAT_KEY,
    );

    if (!decode) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired refresh token",
      });
    }

    const user = await UserModel.findById(decode.id);
    if (!user || user.refresh_token !== refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Invalid refresh token",
      });
    }

    const newAccessToken = await generateAccessToken(user._id);

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
    };

    res.cookie("accessToken", newAccessToken, cookieOptions);

    return res.status(200).json({
      success: true,
      message: "New access token generated successfully",
      accessToken: newAccessToken,
    });
  } catch (error) {
    console.error("Refresh Token Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Error while refreshing token",
    });
  }
}

// User Details Controller
export async function userDetailsController(req, res) {
  try {
    const userId = req.userId;
    const user = await UserModel.findById(userId).select(
      "-password -refresh_token -otp -otpExpires",
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("User Details Error:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching user details",
      error: error.message,
    });
  }
}

// Image / Avatar Upload Controller
export async function useAvatorController(req, res) {
  try {
    const userId = req.userId;
    const file = req.file || (req.files && req.files[0]);

    if (!file) {
      return res.status(400).json({
        success: false,
        message: "Please select an image to upload",
      });
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "avatars",
    });

    // Remove local file
    if (fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }

    // Clean up any other files if array was sent
    if (req.files && req.files.length > 1) {
      for (let i = 1; i < req.files.length; i++) {
        if (fs.existsSync(req.files[i].path)) {
          fs.unlinkSync(req.files[i].path);
        }
      }
    }

    // Update user avatar in database
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { avatar: result.secure_url },
      { new: true },
    ).select("-password -refresh_token -otp -otpExpires");

    return res.status(200).json({
      success: true,
      _id: userId,
      message: "Avatar uploaded successfully",
      avatar: result.secure_url,
      data: updatedUser,
    });
  } catch (error) {
    console.error("Avatar Upload Error:", error);

    // Clean up any remaining temp files on error
    const file = req.file || (req.files && req.files[0]);
    if (file && fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }

    return res.status(500).json({
      success: false,
      message: "Error uploading avatar",
      error: error.message,
    });
  }
}

// Remove Image From Cloudinary Controller
export async function removeImageFromCloudinary(req, res) {
  try {
    const imgUrl =
      req.query?.imgUrl 

    if (!imgUrl) {
      return res.status(400).json({
        success: false,
        message: "Image URL is required (provide via ?imgUrl=... or ?img=...)",
      });
    }

    // Extract public_id safely
    let publicId = "";
    if (imgUrl.includes("/upload/")) {
      const pathAfterUpload = imgUrl.split("/upload/")[1];
      const withoutVersion = pathAfterUpload.replace(/^v\d+\//, "");
      publicId = withoutVersion.substring(0, withoutVersion.lastIndexOf("."));
    } else {
      publicId = imgUrl;
    }

    if (!publicId) {
      return res.status(400).json({
        success: false,
        message: "Could not extract public ID from image URL",
      });
    }

    const result = await cloudinary.uploader.destroy(publicId);

    // If user is authenticated and avatar matches this image, clear avatar in DB
    if (req.userId) {
      await UserModel.findOneAndUpdate(
        { _id: req.userId, avatar: imgUrl },
        { avatar: "" },
      );
    }

    return res.status(200).json({
      success: true,
      message: "Image deleted successfully from Cloudinary",
      publicId,
      result,
    });
  } catch (error) {
    console.error("Remove Image Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Error deleting image from Cloudinary",
    });
  }
}

export async function UpdateUserDetails(req,res){
  try {
    const userId = req.userId;
    const {name,email,mobile,password}=req.body;

    const userExists=await UserModel.findById(userId)
    if(!userExists){
      return res.status(404).json({
        success:false,
        message:"User cannot updated"
      })
    }
    
  } catch (error) {
    
  }
}
