import mongoose from "mongoose";

const productRamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "RAM value is required"],
      trim: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const ProductRam = mongoose.model("ProductRam", productRamSchema);

export default ProductRam;
