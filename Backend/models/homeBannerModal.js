import mongoose from "mongoose";

const homeBannerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide banner title"],
      trim: true,
    },
    subtitle: {
      type: String,
      default: "",
      trim: true,
    },
    eyebrow: {
      type: String,
      default: "Exclusive Offer",
      trim: true,
    },
    price: {
      type: String,
      default: "",
      trim: true,
    },
    buttonText: {
      type: String,
      default: "SHOP NOW",
      trim: true,
    },
    link: {
      type: String,
      default: "/products",
      trim: true,
    },
    image: {
      type: String,
      required: [true, "Please provide banner image URL"],
      trim: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const HomeBannerModel = mongoose.model("HomeBanner", homeBannerSchema);
export default HomeBannerModel;
