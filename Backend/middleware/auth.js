import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const token =
      req.cookies.accessToken || req.headers?.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Please login to continue",
      });
    }

    const decode = jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN);

    if (!decode) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access",
      });
    }

    req.userId = decode.id;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message || "Invalid or expired token",
    });
  }
};

export default auth;
