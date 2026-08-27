import jwt from "jsonwebtoken";
import UserModel from "../models/userModal.js";

const generateRefreshToken = async (userId) => {
  const token = jwt.sign(
    { id: userId },
    process.env.SECRET_KEY_REFRESH_TOKEN ||
      process.env.JSON_WEB_TOKEN_SECREAT_KEY,
    { expiresIn: "7d" },
  );

  await UserModel.updateOne({ _id: userId }, { refresh_token: token });

  return token;
};

export default generateRefreshToken;
