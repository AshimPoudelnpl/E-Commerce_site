import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import ConnectDB from "./Config/connectDb.js";
import userRouter from "./route/user.route.js";
import categoryRouter from "./route/category.route.js";
import productRouter from "./route/product.route.js";
import cartRouter from "./route/cart.route.js";
import myListRouter from "./route/myList.route.js";
import addressRouter from "./route/address.route.js";
import productSpecsRouter from "./route/productSpecs.route.js";

const app = express();
app.use(
  cors({
    credentials: true,
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5175",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  }),
);

app.get("/", (req, res) => {
  res.json({
    message: "Server is Running " + process.env.PORT,
  });
});
app.use("/api/user", userRouter);
app.use("/api/category", categoryRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/mylist", myListRouter);
app.use("/api/address", addressRouter);
app.use("/api/productSpecs", productSpecsRouter);

ConnectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server is Running in ${process.env.PORT}`);
  });
});
