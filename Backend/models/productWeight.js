import mongoose from "mongoose";

const productWeightSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Weight value is required"],
      trim: true,
      unique: true,
    },
  },
  { timestamps: true },
);

const ProductWeight = mongoose.model("ProductWeight", productWeightSchema);

export default ProductWeight;
