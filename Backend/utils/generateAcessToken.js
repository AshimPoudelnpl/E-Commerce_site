import jwt from "jsonwebtoken";

const generateAccessToken = async (userId) => {
  const token = jwt.sign(
    { id: userId },
    process.env.SECRET_KEY_ACCESS_TOKEN ||
      process.env.JSON_WEB_TOKEN_SECREAT_KEY,
    { expiresIn: "5h" },
  );

  return token;
};

export default generateAccessToken;
