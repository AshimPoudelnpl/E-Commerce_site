import CategoryModel from "../models/categoryModal.js";
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

// Category Image(s) Upload Controller
export async function uploadImage(req, res) {
  const files = req.files || (req.file ? [req.file] : []);

  try {
    if (!files || files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please select image(s) to upload",
      });
    }

    const uploadedImages = [];

    for (const file of files) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "category",
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
      message: "Image(s) uploaded successfully",
      image: uploadedImages[0]?.url,
      images: uploadedImages.map((img) => img.url),
      data: uploadedImages,
    });
  } catch (error) {
    console.error("Category Image Upload Error:", error);

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
      message: "Error uploading image",
      error: error.message,
    });
  }
}

// Create Category Controller
export async function createCategory(request, response) {
  try {
    const { name, image, images, color, parentId, parentCatName, status } =
      request.body;

    if (!name) {
      return response.status(400).json({
        message: "Category name is required",
        error: true,
        success: false,
      });
    }

    const checkCategory = await CategoryModel.findOne({ name });
    if (checkCategory) {
      return response.status(400).json({
        message: "Category already exists with this name",
        error: true,
        success: false,
      });
    }

    const imagesArr = Array.isArray(images) ? images : image ? [image] : [];
    const primaryImage = image || (imagesArr.length > 0 ? imagesArr[0] : "");

    const category = new CategoryModel({
      name,
      image: primaryImage,
      images: imagesArr,
      color: color || "",
      parentId: parentId || null,
      parentCatName: parentCatName || "",
      status: status || "Active",
    });

    const savedCategory = await category.save();

    return response.status(201).json({
      message: "Category created successfully",
      error: false,
      success: true,
      data: savedCategory,
    });
  } catch (error) {
    console.error("Create Category Error:", error);
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

//get cstegory
export async function getAllCategories(request, response) {
  try {
    const categories = await CategoryModel.find({ status: "Active" })
      .populate("parentId", "name")
      .sort({ createdAt: -1 });

    return response.status(200).json({
      message: "All categories retrieved successfully",
      error: false,
      success: true,
      data: categories,
    });
  } catch (error) {
    console.error("Get All Categories Error:", error);
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

// Get Categories Count Controller
export async function getCategoriesCount(request, response) {
  try {
    const categoryCount = await CategoryModel.countDocuments({
      $or: [{ parentId: undefined }, { parentId: null }],
    });

    if (categoryCount === undefined || categoryCount === null) {
      return response.status(500).json({
        success: false,
        error: true,
      });
    } else {
      return response.send({
        categoryCount: categoryCount,
      });
    }
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

//get Sub-categories count
export async function getSubCategoriesCount(request, response) {
  try {
    const subCategoryCount = await CategoryModel.countDocuments({
      parentId: { $exists: true },
    });

    if (subCategoryCount === undefined || subCategoryCount === null) {
      return response.status(500).json({
        success: false,
        error: true,
      });
    } else {
      return response.send({
        subCategoryCount: subCategoryCount,
      });
    }
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

// Get single category by ID
export async function getCategory(request, response) {
  try {
    const category = await CategoryModel.findById(request.params.id).populate(
      "parentId",
      "name",
    );

    if (!category) {
      return response.status(404).json({
        message: "The category with the given ID was not found.",
        error: true,
        success: false,
      });
    }

    return response.status(200).json({
      message: "Category retrieved successfully",
      error: false,
      success: true,
      data: category,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
export async function removeImageFromCloudinary(req, res) {
  try {
    const imgUrl =
      req.query?.imgUrl ||
      req.query?.img ||
      req.query?.imageUrl ||
      req.body?.imgUrl ||
      req.body?.img ||
      req.body?.imageUrl;

    if (!imgUrl) {
      return res.status(400).json({
        success: false,
        message: "Image URL is required (provide via ?imgUrl=... or ?img=...)",
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

    if (req.userId) {
      await UserModel.findOneAndUpdate(
        { _id: req.userId, avatar: imgUrl },
        { avatar: "" },
      );
    }

    return res.status(200).json({
      success: true,
      message: "Image deleted successfully from Cloudinary",
      publicId,
      result,
    });
  } catch (error) {
    console.error("Remove Image Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Error deleting image from Cloudinary",
    });
  }
}
//delete Category
export async function deleteCategory(request, response) {
  try {
    const category = await CategoryModel.findByIdAndDelete(request.params.id);

    if (!category) {
      return response.status(404).json({
        message: "The category with the given ID was not found.",
        error: true,
        success: false,
      });
    }

    return response.status(200).json({
      message: "Category deleted successfully",
      error: false,
      success: true,
      data: category,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
//update category
export async function updateCategory(request, response) {
  try {
    const { name, image, images, color, parentId, parentCatName, status } =
      request.body;

    const category = await CategoryModel.findById(request.params.id);

    if (!category) {
      return response.status(404).json({
        message: "The category with the given ID was not found.",
        error: true,
        success: false,
      });
    }

    if (name) category.name = name;
    if (color) category.color = color;
    if (parentId) category.parentId = parentId;
    if (parentCatName) category.parentCatName = parentCatName;
    if (status) category.status = status;

    if (image || images) {
      const imagesArr = Array.isArray(images) ? images : image ? [image] : [];
      category.image = image || (imagesArr.length > 0 ? imagesArr[0] : "");
      category.images = imagesArr;
    }

    const updatedCategory = await category.save();

    return response.status(200).json({
      message: "Category updated successfully",
      error: false,
      success: true,
      data: updatedCategory,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
