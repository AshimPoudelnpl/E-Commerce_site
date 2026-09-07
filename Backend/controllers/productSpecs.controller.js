import ProductRam from "../models/productRam.js";
import ProductSize from "../models/productSize.js";
import ProductWeight from "../models/productWeight.js";

// ─── helpers ────────────────────────────────────────────────────────────────

const handleError = (res, error, msg = "Server error") =>
  res.status(500).json({ success: false, message: msg, error: error.message });

// ════════════════════════════════════════════════════════════════════════════
//  PRODUCT RAM
// ════════════════════════════════════════════════════════════════════════════

export async function createProductRam(req, res) {
  try {
    const { name } = req.body;
    if (!name?.trim())
      return res.status(400).json({ success: false, message: "RAM name is required" });

    const exists = await ProductRam.findOne({ name: name.trim() });
    if (exists)
      return res.status(409).json({ success: false, message: "RAM value already exists" });

    const ram = await ProductRam.create({ name: name.trim() });
    return res.status(201).json({ success: true, message: "RAM created", data: ram });
  } catch (error) {
    return handleError(res, error, "Error creating RAM");
  }
}

export async function getAllProductRams(req, res) {
  try {
    const rams = await ProductRam.find().sort({ name: 1 });
    return res.status(200).json({ success: true, data: rams });
  } catch (error) {
    return handleError(res, error, "Error fetching RAMs");
  }
}

export async function updateProductRam(req, res) {
  try {
    const { id } = req.params;
    const { name } = req.body;
    if (!name?.trim())
      return res.status(400).json({ success: false, message: "RAM name is required" });

    const updated = await ProductRam.findByIdAndUpdate(
      id,
      { name: name.trim() },
      { new: true, runValidators: true }
    );
    if (!updated)
      return res.status(404).json({ success: false, message: "RAM not found" });

    return res.status(200).json({ success: true, message: "RAM updated", data: updated });
  } catch (error) {
    return handleError(res, error, "Error updating RAM");
  }
}

export async function deleteProductRam(req, res) {
  try {
    const deleted = await ProductRam.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ success: false, message: "RAM not found" });

    return res.status(200).json({ success: true, message: "RAM deleted" });
  } catch (error) {
    return handleError(res, error, "Error deleting RAM");
  }
}

// ════════════════════════════════════════════════════════════════════════════
//  PRODUCT SIZE
// ════════════════════════════════════════════════════════════════════════════

export async function createProductSize(req, res) {
  try {
    const { name } = req.body;
    if (!name?.trim())
      return res.status(400).json({ success: false, message: "Size name is required" });

    const exists = await ProductSize.findOne({ name: name.trim() });
    if (exists)
      return res.status(409).json({ success: false, message: "Size value already exists" });

    const size = await ProductSize.create({ name: name.trim() });
    return res.status(201).json({ success: true, message: "Size created", data: size });
  } catch (error) {
    return handleError(res, error, "Error creating size");
  }
}

export async function getAllProductSizes(req, res) {
  try {
    const sizes = await ProductSize.find().sort({ name: 1 });
    return res.status(200).json({ success: true, data: sizes });
  } catch (error) {
    return handleError(res, error, "Error fetching sizes");
  }
}

export async function updateProductSize(req, res) {
  try {
    const { id } = req.params;
    const { name } = req.body;
    if (!name?.trim())
      return res.status(400).json({ success: false, message: "Size name is required" });

    const updated = await ProductSize.findByIdAndUpdate(
      id,
      { name: name.trim() },
      { new: true, runValidators: true }
    );
    if (!updated)
      return res.status(404).json({ success: false, message: "Size not found" });

    return res.status(200).json({ success: true, message: "Size updated", data: updated });
  } catch (error) {
    return handleError(res, error, "Error updating size");
  }
}

export async function deleteProductSize(req, res) {
  try {
    const deleted = await ProductSize.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ success: false, message: "Size not found" });

    return res.status(200).json({ success: true, message: "Size deleted" });
  } catch (error) {
    return handleError(res, error, "Error deleting size");
  }
}

// ════════════════════════════════════════════════════════════════════════════
//  PRODUCT WEIGHT
// ════════════════════════════════════════════════════════════════════════════

export async function createProductWeight(req, res) {
  try {
    const { name } = req.body;
    if (!name?.trim())
      return res.status(400).json({ success: false, message: "Weight name is required" });

    const exists = await ProductWeight.findOne({ name: name.trim() });
    if (exists)
      return res.status(409).json({ success: false, message: "Weight value already exists" });

    const weight = await ProductWeight.create({ name: name.trim() });
    return res.status(201).json({ success: true, message: "Weight created", data: weight });
  } catch (error) {
    return handleError(res, error, "Error creating weight");
  }
}

export async function getAllProductWeights(req, res) {
  try {
    const weights = await ProductWeight.find().sort({ name: 1 });
    return res.status(200).json({ success: true, data: weights });
  } catch (error) {
    return handleError(res, error, "Error fetching weights");
  }
}

export async function updateProductWeight(req, res) {
  try {
    const { id } = req.params;
    const { name } = req.body;
    if (!name?.trim())
      return res.status(400).json({ success: false, message: "Weight name is required" });

    const updated = await ProductWeight.findByIdAndUpdate(
      id,
      { name: name.trim() },
      { new: true, runValidators: true }
    );
    if (!updated)
      return res.status(404).json({ success: false, message: "Weight not found" });

    return res.status(200).json({ success: true, message: "Weight updated", data: updated });
  } catch (error) {
    return handleError(res, error, "Error updating weight");
  }
}

export async function deleteProductWeight(req, res) {
  try {
    const deleted = await ProductWeight.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ success: false, message: "Weight not found" });

    return res.status(200).json({ success: true, message: "Weight deleted" });
  } catch (error) {
    return handleError(res, error, "Error deleting weight");
  }
}
