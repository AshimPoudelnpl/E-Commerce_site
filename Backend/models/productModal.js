import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide product name"],
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    images: [
      {
        type: String,
      },
    ],

    brand: {
      type: String,
      default: "",
    },

    price: {
      type: Number,
      default: 0,
    },

    oldprice: {
      type: Number,
      default: 0,
    },

    catName: {
      type: String,
      default: "",
    },

    catId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },

    subcat: {
      type: String,
      default: "",
    },

    subcatId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },

    subcatName: {
      type: String,
      default: "",
    },

    thirdsubCat: {
      type: String,
      default: "",
    },

    thirdsubcatName: {
      type: String,
      default: "",
    },

    thirdcatsubid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },

    countInstock: {
      type: Number,
      default: 0,
    },

    rating: {
      type: Number,
      default: 0,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },

    discount: {
      type: Number,
      default: 0,
    },

    productram: [
      {
        type: String,
      },
    ],

    size: [
      {
        type: String,
      },
    ],

    productWeight: [
      {
        type: String,
      },
    ],

    location: {
      type: String,
      default: "",
    },

    datecreated: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

productSchema.index({
  name: "text",
  description: "text",
  brand: "text",
  catName: "text",
});

const ProductModel = mongoose.model("Product", productSchema);

export default ProductModel;