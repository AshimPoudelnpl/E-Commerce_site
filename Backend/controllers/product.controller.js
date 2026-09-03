import ProductModel from "../models/productModal.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// 1. Upload Product Image(s) on Cloudinary
export async function uploadImage(req, res) {
  const files = req.files || (req.file ? [req.file] : []);

  try {
    if (!files || files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please select product image(s) to upload",
      });
    }

    const uploadedImages = [];

    for (const file of files) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "products",
      });

      uploadedImages.push({
        url: result.secure_url,
        publicId: result.public_id,
      });

      // Remove local temp file after upload
      if (fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
      }
    }

    return res.status(200).json({
      success: true,
      message: "Product image(s) uploaded successfully",
      image: uploadedImages[0]?.url,
      images: uploadedImages.map((img) => img.url),
      data: uploadedImages,
    });
  } catch (error) {
    console.error("Product Image Upload Error:", error);

    // Clean up any remaining temp files on error
    if (files && files.length > 0) {
      for (const file of files) {
        if (file?.path && fs.existsSync(file.path)) {
          fs.unlinkSync(file.path);
        }
      }
    }

    return res.status(500).json({
      success: false,
      message: "Error uploading product image",
      error: error.message,
    });
  }
}

// 2. Create Product Controller
export async function createProduct(request, response) {
  try {
    const {
      name,
      description,
      images,
      brand,
      price,
      oldprice,
      catName,
      catId,
      subcat,
      subcatId,
      thirdsubCat,
      thirdsubcatName,
      thirdcatsubid,
      category,
      countInstock,
      rating,
      isFeatured,
      discount,
      productram,
      size,
      productWeight,
      location,
    } = request.body;

    // Validate required fields
    if (!name) {
      return response.status(400).json({
        message: "Product name is required",
        error: true,
        success: false,
      });
    }

    if (price === undefined || price === null || price === "") {
      return response.status(400).json({
        message: "Product price is required",
        error: true,
        success: false,
      });
    }

    // Ensure images array
    const imagesArr = Array.isArray(images) ? images : images ? [images] : [];

    const product = new ProductModel({
      name,
      description: description || "",
      images: imagesArr,
      brand: brand || "",
      price: Number(price) || 0,
      oldprice: Number(oldprice) || 0,
      catName: catName || "",
      catId: catId || null,
      subcat: subcat || "",
      subcatId: subcatId || null,
      thirdsubCat: thirdsubCat || "",
      thirdsubcatName: thirdsubcatName || "",
      thirdcatsubid: thirdcatsubid || null,
      countInstock: Number(countInstock) || 0,
      rating: Number(rating) || 0,
      isFeatured: isFeatured === true || isFeatured === "true",
      discount: Number(discount) || 0,
      productram: Array.isArray(productram)
        ? productram
        : productram
          ? [productram]
          : [],
      size: Array.isArray(size) ? size : size ? [size] : [],
      productWeight: Array.isArray(productWeight)
        ? productWeight
        : productWeight
          ? [productWeight]
          : [],
      location: location || "",
    });

    const savedProduct = await product.save();

    return response.status(201).json({
      message: "Product created successfully",
      error: false,
      success: true,
      data: savedProduct,
    });
  } catch (error) {
    console.error("Create Product Error:", error);
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

// 3. Get All Products Controller
export async function getAllProducts(request, response) {
  try {
    const page = parseInt(request.query.page) || 1;
    const perPage = parseInt(request.query.perPage) || 10;
    const totalPosts = await ProductModel.countDocuments();
    const totalPages = Math.ceil(totalPosts / perPage);

    if (totalPosts > 0 && page > totalPages) {
      return response.status(404).json({
        message: "Page not found",
        success: false,
        error: true,
      });
    }

    const products = await ProductModel.find()
      .populate("category")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });

    return response.status(200).json({
      error: false,
      success: true,
      data: products,
      products: products,
      totalPosts: totalPosts,
      totalPages: totalPages,
      page: page,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

// 4. Get (All) Products by Category ID Controller
export async function getAllProductsByCatId(request, response) {
  try {
    const catId = request.params.id || request.query.id || request.query.catId;

    if (!catId) {
      return response.status(400).json({
        message: "Category ID is required",
        error: true,
        success: false,
      });
    }

    const page = parseInt(request.query.page) || 1;
    const perPage = parseInt(request.query.perPage) || 10;

    const filter = {
      $or: [
        { catId: catId },
        { category: catId },
        { subcatId: catId },
        { thirdcatsubid: catId },
      ],
    };

    const totalPosts = await ProductModel.countDocuments(filter);
    const totalPages = Math.ceil(totalPosts / perPage);

    if (totalPosts > 0 && page > totalPages) {
      return response.status(404).json({
        message: "Page not found",
        success: false,
        error: true,
      });
    }

    const products = await ProductModel.find(filter)
      .populate("category")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });

    return response.status(200).json({
      error: false,
      success: true,
      data: products,
      products: products,
      totalPosts: totalPosts,
      totalPages: totalPages || 1,
      page: page,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export const getAllProductsByCatID = getAllProductsByCatId;

// 5. Delete Product Image from Cloudinary
export async function removeProductImage(req, res) {
  try {
    const imgUrl =
      req.query?.imgUrl || req.query?.img || req.body?.imgUrl || req.body?.img;

    if (!imgUrl) {
      return res.status(400).json({
        success: false,
        message: "Image URL is required",
      });
    }

    let publicId = "";
    if (imgUrl.includes("/upload/")) {
      const pathAfterUpload = imgUrl.split("/upload/")[1];
      const withoutVersion = pathAfterUpload.replace(/^v\d+\//, "");
      publicId = withoutVersion.substring(0, withoutVersion.lastIndexOf("."));
    } else {
      publicId = imgUrl;
    }

    if (!publicId) {
      return res.status(400).json({
        success: false,
        message: "Could not extract public ID from image URL",
      });
    }

    const result = await cloudinary.uploader.destroy(publicId);

    return res.status(200).json({
      success: true,
      message: "Product image deleted successfully from Cloudinary",
      publicId,
      result,
    });
  } catch (error) {
    console.error("Remove Product Image Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Error deleting product image from Cloudinary",
    });
  }
}

// 6. Get All Products by Category Name Controller
export async function getAllProductsByCatName(request, response) {
  try {
    const catName =
      request.params.catName || request.query.catName || request.query.name;

    if (!catName) {
      return response.status(400).json({
        message: "Category name is required",
        error: true,
        success: false,
      });
    }

    const page = parseInt(request.query.page) || 1;
    const perPage = parseInt(request.query.perPage) || 10;

    const filter = {
      $or: [
        { catName: { $regex: new RegExp(`^${catName}$`, "i") } },
        { subcatName: { $regex: new RegExp(`^${catName}$`, "i") } },
        { thirdsubcatName: { $regex: new RegExp(`^${catName}$`, "i") } },
      ],
    };

    const totalPosts = await ProductModel.countDocuments(filter);
    const totalPages = Math.ceil(totalPosts / perPage);

    if (totalPosts > 0 && page > totalPages) {
      return response.status(404).json({
        message: "Page not found",
        success: false,
        error: true,
      });
    }

    const products = await ProductModel.find(filter)
      .populate("category")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });

    return response.status(200).json({
      success: true,
      data: products,
      products: products,
      totalPosts: totalPosts,
      totalPages: totalPages || 1,
      page: page,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export const getAllProductsByName = getAllProductsByCatName;

// 7. Get All Products by Sub-Category ID Controller
export async function getAllProductsBysubCatId(request, response) {
  try {
    const subcatId =
      request.params.id ||
      request.params.subcatId ||
      request.query.subcatId ||
      request.query.id;

    if (!subcatId) {
      return response.status(400).json({
        message: "Sub-category ID is required",
        error: true,
        success: false,
      });
    }

    const page = parseInt(request.query.page) || 1;
    const perPage = parseInt(request.query.perPage) || 10;

    const filter = {
      $or: [{ subcatId: subcatId }, { thirdcatsubid: subcatId }],
    };

    const totalPosts = await ProductModel.countDocuments(filter);
    const totalPages = Math.ceil(totalPosts / perPage);

    if (totalPosts > 0 && page > totalPages) {
      return response.status(404).json({
        message: "Page not found",
        success: false,
        error: true,
      });
    }

    const products = await ProductModel.find(filter)
      .populate("category")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });

    return response.status(200).json({
      success: true,
      data: products,
      products: products,
      totalPosts: totalPosts,
      totalPages: totalPages || 1,
      page: page,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export const getAllProductsBySubCatId = getAllProductsBysubCatId;

// 8. Get All Products by Sub-Category Name Controller
export async function getAllProductsBysubCatName(request, response) {
  try {
    const subcatName =
      request.params.subcatName ||
      request.query.subcatName ||
      request.query.name;

    if (!subcatName) {
      return response.status(400).json({
        message: "Sub-category name is required",
        error: true,
        success: false,
      });
    }

    const page = parseInt(request.query.page) || 1;
    const perPage = parseInt(request.query.perPage) || 10;

    const filter = {
      $or: [
        { subcatName: { $regex: new RegExp(`^${subcatName}$`, "i") } },
        { subcat: { $regex: new RegExp(`^${subcatName}$`, "i") } },
        { thirdsubcatName: { $regex: new RegExp(`^${subcatName}$`, "i") } },
        { thirdsubCat: { $regex: new RegExp(`^${subcatName}$`, "i") } },
      ],
    };

    const totalPosts = await ProductModel.countDocuments(filter);
    const totalPages = Math.ceil(totalPosts / perPage);

    if (totalPosts > 0 && page > totalPages) {
      return response.status(404).json({
        message: "Page not found",
        success: false,
        error: true,
      });
    }

    const products = await ProductModel.find(filter)
      .populate("category")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });

    return response.status(200).json({
      success: true,
      data: products,
      products: products,
      totalPosts: totalPosts,
      totalPages: totalPages || 1,
      page: page,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export const getAllProductsBySubCatName = getAllProductsBysubCatName;

// 9. Get All Products by Third Level Category ID Controller
export async function getAllProductsByThirdLavelCat(request, response) {
  try {
    const thirdCatId =
      request.params.id ||
      request.params.thirdCatId ||
      request.query.thirdCatId ||
      request.query.id;

    if (!thirdCatId) {
      return response.status(400).json({
        message: "Third level category ID is required",
        error: true,
        success: false,
      });
    }

    const page = parseInt(request.query.page) || 1;
    const perPage = parseInt(request.query.perPage) || 10;

    const filter = {
      thirdcatsubid: thirdCatId,
    };

    const totalPosts = await ProductModel.countDocuments(filter);
    const totalPages = Math.ceil(totalPosts / perPage);

    if (totalPosts > 0 && page > totalPages) {
      return response.status(404).json({
        message: "Page not found",
        success: false,
        error: true,
      });
    }

    const products = await ProductModel.find(filter)
      .populate("category")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });

    return response.status(200).json({
      success: true,
      data: products,
      products: products,
      totalPosts: totalPosts,
      totalPages: totalPages || 1,
      page: page,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export const getAllProductsByThirdLevelCat = getAllProductsByThirdLavelCat;

// 10. Get All Products by Third Level Category Name Controller
export async function getAllProductsByThirdLavelCatName(request, response) {
  try {
    const thirdCatName =
      request.params.name ||
      request.params.thirdCatName ||
      request.query.thirdCatName ||
      request.query.name;

    if (!thirdCatName) {
      return response.status(400).json({
        message: "Third level category name is required",
        error: true,
        success: false,
      });
    }

    const page = parseInt(request.query.page) || 1;
    const perPage = parseInt(request.query.perPage) || 10;

    const filter = {
      $or: [
        { thirdsubcatName: { $regex: new RegExp(`^${thirdCatName}$`, "i") } },
        { thirdsubCat: { $regex: new RegExp(`^${thirdCatName}$`, "i") } },
      ],
    };

    const totalPosts = await ProductModel.countDocuments(filter);
    const totalPages = Math.ceil(totalPosts / perPage);

    if (totalPosts > 0 && page > totalPages) {
      return response.status(404).json({
        message: "Page not found",
        success: false,
        error: true,
      });
    }

    const products = await ProductModel.find(filter)
      .populate("category")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });

    return response.status(200).json({
      success: true,
      data: products,
      products: products,
      totalPosts: totalPosts,
      totalPages: totalPages || 1,
      page: page,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
// 11. Get All Products by Price Controller
export async function getAllProductByPrice(request, response) {
  try {
    let { minPrice, maxPrice, catId, subcatId, sort } = request.query;

    const page = parseInt(request.query.page) || 1;
    const perPage = parseInt(request.query.perPage) || 10;

    const filter = {};

    if (minPrice !== undefined || maxPrice !== undefined) {
      filter.price = {};
      if (minPrice !== undefined && minPrice !== "") {
        filter.price.$gte = Number(minPrice);
      }
      if (maxPrice !== undefined && maxPrice !== "") {
        filter.price.$lte = Number(maxPrice);
      }
    }

    if (catId) {
      filter.$or = [{ catId: catId }, { category: catId }];
    }

    if (subcatId) {
      filter.subcatId = subcatId;
    }

    let sortOption = { price: 1 };
    if (sort === "desc" || sort === "high-to-low" || sort === "-1") {
      sortOption = { price: -1 };
    } else if (sort === "asc" || sort === "low-to-high" || sort === "1") {
      sortOption = { price: 1 };
    }

    const totalPosts = await ProductModel.countDocuments(filter);
    const totalPages = Math.ceil(totalPosts / perPage);

    if (totalPosts > 0 && page > totalPages) {
      return response.status(404).json({
        message: "Page not found",
        success: false,
        error: true,
      });
    }

    const products = await ProductModel.find(filter)
      .populate("category")
      .sort(sortOption)
      .skip((page - 1) * perPage)
      .limit(perPage);

    return response.status(200).json({
      success: true,
      data: products,
      products: products,
      totalPosts: totalPosts,
      totalPages: totalPages || 1,
      page: page,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export const getAllProductsByPrice = getAllProductByPrice;
export async function getAllProductsByRating(request, response) {
  try {
    let { rating, catId, subcatId, sort } = request.query;

    const page = parseInt(request.query.page) || 1;
    const perPage = parseInt(request.query.perPage) || 10;

    const filter = {};

    if (rating) {
      filter.ratings = { $gte: Number(rating) };
    }

    if (catId) {
      filter.$or = [{ catId: catId }, { category: catId }];
    }

    if (subcatId) {
      filter.subcatId = subcatId;
    }

    let sortOption = { ratings: -1 };
    if (sort === "desc" || sort === "high-to-low" || sort === "-1") {
      sortOption = { ratings: -1 };
    } else if (sort === "asc" || sort === "low-to-high" || sort === "1") {
      sortOption = { ratings: 1 };
    }

    const totalPosts = await ProductModel.countDocuments(filter);
    const totalPages = Math.ceil(totalPosts / perPage);

    if (totalPosts > 0 && page > totalPages) {
      return response.status(404).json({
        message: "Page not found",
        success: false,
        error: true,
      });
    }

    const products = await ProductModel.find(filter)
      .populate("category")
      .sort(sortOption)
      .skip((page - 1) * perPage)
      .limit(perPage);

    return response.status(200).json({
      success: true,
      data: products,
      products: products,
      totalPosts: totalPosts,
      totalPages: totalPages || 1,
      page: page,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
export async function geAllProductCount(req, res) {
  try {
    const totalProducts = await ProductModel.countDocuments();
    return res.status(200).json({
      success: true,
      totalProducts: totalProducts,
    });
  } catch (error) {
    console.error("Error fetching product count:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching product count",
      error: error.message,
    });
  }
}
export async function getALlFeaturedProducts(req, res) {
  try {
    const featuredProducts = await ProductModel.find({ isFeatured: true })
      .populate("category")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: featuredProducts,
    });
  } catch (error) {
    console.error("Error fetching featured products:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching featured products",
      error: error.message,
    });
  }
}
export async function deleteproduct(req, res) {
  try {
    const productId = req.params.id;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    const deletedProduct = await ProductModel.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      data: deletedProduct,
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    return res.status(500).json({
      success: false,
      message: "Error deleting product",
      error: error.message,
    });
  }
}
export async function getALlFeaturedProductCount(req, res) {
  try {
    const featuredProductCount = await ProductModel.countDocuments({
      isFeatured: true,
    });
    return res.status(200).json({
      success: true,
      totalFeaturedProducts: featuredProductCount,
    });
  } catch (error) {
    console.error("Error fetching featured product count:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching featured product count",
      error: error.message,
    });
  }
}
export async function getProduct(req, res) {
  try {
    const productId = req.params.id;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    const product = await ProductModel.findById(productId).populate("category");

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching product",
      error: error.message,
    });
  }
}
