import mongoose from "mongoose";

const productSizeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Size value is required"],
      trim: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const ProductSize = mongoose.model("ProductSize", productSizeSchema);

export default ProductSize;
