import { MyListModel } from "../models/myListModal.js";

export const addToMyListController = async (req, res) => {
  try {
    const { productId, name, image, price, rating, brand, discount } = req.body;
    const userId = req.userId || req.user?._id;

    if (!userId) {
      return res.status(401).json({
        message: "Please login to add items to my list",
        error: true,
        success: false,
      });
    }

    if (!productId) {
      return res.status(400).json({
        message: "Product ID is required",
        error: true,
        success: false,
      });
    }

    // Check if item already exists in user's my list
    const checkMyListItem = await MyListModel.findOne({
      userId: userId,
      productId: productId,
    });

    if (checkMyListItem) {
      return res.status(400).json({
        message: "Item already in my list",
        error: true,
        success: false,
      });
    }

    const myListItem = new MyListModel({
      productId,
      userId,
      name,
      image,
      price,
      rating,
      brand,
      discount,
    });

    const savedMyListItem = await myListItem.save();

    return res.status(201).json({
      message: "Item added to my list successfully",
      error: false,
      success: true,
      data: savedMyListItem,
    });
  } catch (error) {
    console.error("Add to My List Error:", error);
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const getMyListController = async (req, res) => {
  try {
    const userId = req.userId || req.user?._id;

    if (!userId) {
      return res.status(401).json({
        message: "Please login to view my list items",
        error: true,
        success: false,
      });
    }

    const myListItems = await MyListModel.find({ userId: userId });

    return res.status(200).json({
      message: "My list items fetched successfully",
      error: false,
      success: true,
      data: myListItems,
    });
  } catch (error) {
    console.error("Get My List Error:", error);
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    }); 
  }
};
export const removeFromMyListController = async (req, res) => {
  try {
    const userId = req.userId || req.user?._id;
    const { productId } = req.body;

    if (!userId) {
      return res.status(401).json({
        message: "Please login to remove items from my list",
        error: true,
        success: false,
      });
    }

    const removedItem = await MyListModel.findOneAndDelete({
      userId: userId,
      productId: productId,
    });

    if (!removedItem) {
      return res.status(404).json({
        message: "Item not found in my list",
        error: true,
        success: false,
      });
    }

    return res.status(200).json({
      message: "Item removed from my list successfully",
      error: false,
      success: true,
      data: removedItem,
    });
  } catch (error) {
    console.error("Remove from My List Error:", error);
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
export const updateMyListItemController = async (req, res) => {
  try {
    const userId = req.userId || req.user?._id;
    const { productId } = req.body;
    const { name, image, price, rating, brand, discount } = req.body;

    if (!userId) {
      return res.status(401).json({
        message: "Please login to update items in my list",
        error: true,
        success: false,
      });
    }

    const updatedItem = await MyListModel.findOneAndUpdate(
      { userId: userId, productId: productId },
      { name, image, price, rating, brand, discount },
      { new: true },
    );

    if (!updatedItem) {
      return res.status(404).json({
        message: "Item not found in my list",
        error: true,
        success: false,
      });
    }

    return res.status(200).json({
      message: "Item updated in my list successfully",
      error: false,
      success: true,
      data: updatedItem,
    });
  } catch (error) {
    console.error("Update My List Item Error:", error);
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
