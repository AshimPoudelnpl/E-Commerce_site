import CartProductModel from "../models/cartProductModal.js";
import UserModel from "../models/userModal.js";
import ProductModel from "../models/productModal.js";

// Add Item to Cart Controller
export const addToCartItemController = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.userId || req.user?._id;

    if (!userId) {
      return res.status(401).json({
        message: "Please login to add items to cart",
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

    // Check if product exists in database
    const checkProduct = await ProductModel.findById(productId);
    if (!checkProduct) {
      return res.status(404).json({
        message: "Product not found",
        error: true,
        success: false,
      });
    }

    // Check if item already exists in user's cart
    const checkCartItem = await CartProductModel.findOne({
      userId: userId,
      productId: productId,
    });

    if (checkCartItem) {
      return res.status(400).json({
        message: "Item already in cart",
        error: true,
        success: false,
      });
    }

    const cartItem = new CartProductModel({
      quantity: Number(quantity) || 1,
      userId: userId,
      productId: productId,
    });

    const savedCartItem = await cartItem.save();

    const populatedCartItem = await CartProductModel.findById(
      savedCartItem._id,
    ).populate("productId");

    return res.status(200).json({
      message: "Item added to cart successfully",
      error: false,
      success: true,
      data: populatedCartItem,
    });
  } catch (error) {
    console.error("Add to Cart Error:", error);
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const getCartItemsController = async (req, res) => {
  try {
    const userId = req.userId || req.user?._id;

    if (!userId) {
      return res.status(401).json({
        message: "Please login to view cart items",
        error: true,
        success: false,
      });
    }

    const cartItems = await CartProductModel.find({ userId: userId }).populate(
      "productId",
    );

    return res.status(200).json({
      message: "Cart items fetched successfully",
      error: false,
      success: true,
      data: cartItems,
    });
  } catch (error) {
    console.error("Get Cart Items Error:", error);
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
export const updateCartItemController = async (req, res) => {
  try {
    const { cartItemId, quantity } = req.body;
    const userId = req.userId || req.user?._id;

    if (!userId) {
      return res.status(401).json({
        message: "Please login to update cart items",
        error: true,
        success: false,
      });
    }

    if (!cartItemId) {
      return res.status(400).json({
        message: "Cart Item ID is required",
        error: true,
        success: false,
      });
    }

    // Check if the cart item exists and belongs to the user
    const cartItem = await CartProductModel.findOne({
      _id: cartItemId,
      userId: userId,
    });
    if (!cartItem) {
      return res.status(404).json({
        message: "Cart item not found",
        error: true,
        success: false,
      });
    }

    // Update the quantity of the cart item
    cartItem.quantity = Number(quantity) || cartItem.quantity;
    const updatedCartItem = await cartItem.save();

    const populatedCartItem = await CartProductModel.findById(
      updatedCartItem._id,
    ).populate("productId");

    return res.status(200).json({
      message: "Cart item updated successfully",
      error: false,
      success: true,
      data: populatedCartItem,
    });
  } catch (error) {
    console.error("Update Cart Item Error:", error);
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
export const removeCartItemController = async (req, res) => {
  try {
    const { cartItemId } = req.body;
    const userId = req.userId || req.user?._id;

    if (!userId) {
      return res.status(401).json({
        message: "Please login to remove cart items",
        error: true,
        success: false,
      });
    }

    if (!cartItemId) {
      return res.status(400).json({
        message: "Cart Item ID is required",
        error: true,
        success: false,
      });
    }

    // Check if the cart item exists and belongs to the user
    const cartItem = await CartProductModel.findOne({
      _id: cartItemId,
      userId: userId,
    });
    if (!cartItem) {
      return res.status(404).json({
        message: "Cart item not found",
        error: true,
        success: false,
      });
    }

    // Remove the cart item
    await CartProductModel.deleteOne({ _id: cartItemId });

    return res.status(200).json({
      message: "Cart item removed successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    console.error("Remove Cart Item Error:", error);
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
