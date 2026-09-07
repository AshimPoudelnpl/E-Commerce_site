import AddressModel from "../models/addressModal.js";
import UserModel from "../models/userModal.js";

// Add Address
export async function addAddress(req, res) {
  try {
    const userId = req.userId;
    const {
      fullName,
      phone,
      addressLine,
      city,
      state,
      pincode,
      country,
      isDefault,
    } = req.body;

    if (!fullName || !phone || !addressLine || !city || !state || !pincode) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all required fields" });
    }

    if (isDefault) {
      await AddressModel.updateMany({ userId }, { isDefault: false });
    }

    const address = new AddressModel({
      userId,
      fullName,
      phone,
      addressLine,
      city,
      state,
      pincode,
      country: country || "Nepal",
      isDefault: isDefault || false,
    });
    await address.save();

    await UserModel.findByIdAndUpdate(userId, {
      $push: { address_details: address._id },
    });

    return res.status(201).json({
      success: true,
      message: "Address added successfully",
      data: address,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

// Get All Addresses
export async function getAddresses(req, res) {
  try {
    const userId = req.userId;
    const addresses = await AddressModel.find({ userId }).sort({
      isDefault: -1,
      createdAt: -1,
    });
    return res.status(200).json({ success: true, data: addresses });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

// Update Address
export async function updateAddress(req, res) {
  try {
    const userId = req.userId;
    const { id } = req.params;
    const {
      fullName,
      phone,
      addressLine,
      city,
      state,
      pincode,
      country,
      isDefault,
    } = req.body;

    if (isDefault) {
      await AddressModel.updateMany({ userId }, { isDefault: false });
    }

    const updated = await AddressModel.findOneAndUpdate(
      { _id: id, userId },
      {
        fullName,
        phone,
        addressLine,
        city,
        state,
        pincode,
        country,
        isDefault,
      },
      { new: true },
    );

    if (!updated)
      return res
        .status(404)
        .json({ success: false, message: "Address not found" });

    return res.status(200).json({
      success: true,
      message: "Address updated successfully",
      data: updated,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

// Delete Address
export async function deleteAddress(req, res) {
  try {
    const userId = req.userId;
    const { id } = req.params;

    const deleted = await AddressModel.findOneAndDelete({ _id: id, userId });
    if (!deleted)
      return res
        .status(404)
        .json({ success: false, message: "Address not found" });

    await UserModel.findByIdAndUpdate(userId, {
      $pull: { address_details: deleted._id },
    });

    return res
      .status(200)
      .json({ success: true, message: "Address deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

// Set Default Address
export async function setDefaultAddress(req, res) {
  try {
    const userId = req.userId;
    const { id } = req.params;

    await AddressModel.updateMany({ userId }, { isDefault: false });
    const updated = await AddressModel.findOneAndUpdate(
      { _id: id, userId },
      { isDefault: true },
      { new: true },
    );

    if (!updated)
      return res
        .status(404)
        .json({ success: false, message: "Address not found" });

    return res.status(200).json({
      success: true,
      message: "Default address updated",
      data: updated,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}
