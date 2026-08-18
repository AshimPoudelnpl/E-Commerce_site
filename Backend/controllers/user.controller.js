import UserModel from "../models/userModal.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import sendEmailFun from "../Config/sendEmail.js";
import VerificationEmail from "../utils/verifyEmailTemplate.js";

export async function registerUserController(req, res) {
  try {
    // Get data from request body
    const { name, email, password } = req.body;

    // Check required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide all the fields",
      });
    }

    // Check if user already exists
    const user = await UserModel.findOne({ email });

    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    // Generate 6 digit OTP
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Generate salt
    const salt = await bcryptjs.genSalt(10);

    // Hash password
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Create new user
    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
      otp: verifyCode,
      otpExpires: new Date(Date.now() + 10 * 60 * 1000),
    });

    // Save user to MongoDB
    await newUser.save();

    // Create verification email
    const emailHtml = VerificationEmail(name, verifyCode);

    // Send email
    const verifyEmail = await sendEmailFun(
      email,
      "Verify Your Email - Ecommerce App",
      `Hello ${name}, your verification code is ${verifyCode}`,
      emailHtml,
    );

    // Check email
    if (!verifyEmail) {
      return res.status(500).json({
        success: false,
        message:
          "User registered successfully, but verification email could not be sent.",
      });
    }

    // Generate JWT
    const token = jwt.sign(
      {
        id: newUser._id,
        email: newUser.email,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1d",
      },
    );

    // Response
    return res.status(201).json({
      success: true,
      message: "User registered successfully. Please verify your email.",
      token,
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
