import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";

export type NewProduct = {
  name: string;
  category: string;
  subCategory: string;
  price: string;
  oldPrice: string;
  isFeatured: string;
  stock: string;
  brand: string;
  discount: string;
  rams: string;
  weight: string;
  size: string;
  rating: string;
  images: File[];
};

const initialForm: NewProduct = {
  name: "",
  category: "",
  subCategory: "",
  price: "",
  oldPrice: "",
  isFeatured: "",
  stock: "",
  brand: "",
  discount: "",
  rams: "",
  weight: "",
  size: "",
  rating: "",
  images: [],
};

const AddProduct = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState<NewProduct>(initialForm);

  // Multiple image previews
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const handleChange =
    (field: keyof NewProduct) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  // Multiple image upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    if (files.length === 0) {
      return;
    }

    // Store multiple files
    setForm((prev) => ({
      ...prev,
      images: files,
    }));

    // Create previews
    const previewUrls = files.map((file) => URL.createObjectURL(file));

    setImagePreviews(previewUrls);
  };

  const handleClose = () => {
    setForm(initialForm);
    setImagePreviews([]);

    navigate("/products");
  };

  const handleSave = () => {
    if (!form.name.trim()) {
      return;
    }

    console.log("New Product:", form);
    console.log("Images:", form.images);

    setForm(initialForm);
    setImagePreviews([]);

    navigate("/products");
  };

  return (
    <div className="space-y-5">
      {/* Page Header */}
      <div>
        <Typography className="!text-[24px] !font-bold !text-gray-900">
          Add Product
        </Typography>

        <Typography className="!mt-1 !text-sm !text-gray-500">
          Create a new product listing for your catalog.
        </Typography>
      </div>

      {/* Product Details */}
      <div className="rounded-md border border-gray-200 bg-white">
        {/* Header */}
        <div className="border-b border-gray-200 px-6 py-4">
          <Typography className="!text-[18px] !font-semibold !text-gray-800">
            Product Details
          </Typography>

          <Typography className="!mt-1 !text-sm !text-gray-500">
            Enter the information about your product.
          </Typography>
        </div>

        {/* Form */}
        <div className="p-6">
          {/* Product Information */}
          <div className="mb-8">
            <Typography className="!mb-4 !text-[15px] !font-semibold !text-gray-800">
              Product Information
            </Typography>

            <div className="grid gap-5 md:grid-cols-2">
              <TextField
                label="Product Name"
                placeholder="Enter product name"
                value={form.name}
                onChange={handleChange("name")}
                size="small"
                fullWidth
              />

              <TextField
                select
                label="Product Category"
                value={form.category}
                onChange={handleChange("category")}
                size="small"
                fullWidth
              >
                <MenuItem value="electronics">Electronics</MenuItem>

                <MenuItem value="clothing">Clothing</MenuItem>

                <MenuItem value="shoes">Shoes</MenuItem>

                <MenuItem value="accessories">Accessories</MenuItem>
              </TextField>

              <TextField
                label="Product Sub Category"
                placeholder="Enter sub category"
                value={form.subCategory}
                onChange={handleChange("subCategory")}
                size="small"
                fullWidth
              />

              <TextField
                label="Product Brand"
                placeholder="Enter brand"
                value={form.brand}
                onChange={handleChange("brand")}
                size="small"
                fullWidth
              />
            </div>
          </div>

          {/* Pricing & Inventory */}
          <div className="mb-8">
            <Typography className="!mb-4 !text-[15px] !font-semibold !text-gray-800">
              Pricing & Inventory
            </Typography>

            <div className="grid gap-5 md:grid-cols-3">
              <TextField
                label="Product Price"
                placeholder="0.00"
                type="number"
                value={form.price}
                onChange={handleChange("price")}
                size="small"
                fullWidth
                slotProps={{
                  htmlInput: {
                    min: 0,
                    step: "0.01",
                  },
                }}
              />

              <TextField
                label="Product Old Price"
                placeholder="0.00"
                type="number"
                value={form.oldPrice}
                onChange={handleChange("oldPrice")}
                size="small"
                fullWidth
                slotProps={{
                  htmlInput: {
                    min: 0,
                    step: "0.01",
                  },
                }}
              />

              <TextField
                label="Product Discount"
                placeholder="0"
                type="number"
                value={form.discount}
                onChange={handleChange("discount")}
                size="small"
                fullWidth
                slotProps={{
                  htmlInput: {
                    min: 0,
                    max: 100,
                  },
                }}
              />

              <TextField
                label="Product Stock"
                placeholder="0"
                type="number"
                value={form.stock}
                onChange={handleChange("stock")}
                size="small"
                fullWidth
                slotProps={{
                  htmlInput: {
                    min: 0,
                  },
                }}
              />

              <TextField
                label="Product Rating"
                placeholder="0 - 5"
                type="number"
                value={form.rating}
                onChange={handleChange("rating")}
                size="small"
                fullWidth
                slotProps={{
                  htmlInput: {
                    min: 0,
                    max: 5,
                    step: "0.1",
                  },
                }}
              />

              <TextField
                select
                label="Is Featured?"
                value={form.isFeatured}
                onChange={handleChange("isFeatured")}
                size="small"
                fullWidth
              >
                <MenuItem value="true">Yes</MenuItem>

                <MenuItem value="false">No</MenuItem>
              </TextField>
            </div>
          </div>

          {/* Product Specifications */}
          <div className="mb-8">
            <Typography className="!mb-4 !text-[15px] !font-semibold !text-gray-800">
              Product Specifications
            </Typography>

            <div className="grid gap-5 md:grid-cols-3">
              <TextField
                label="Product RAMS"
                placeholder="e.g. 8GB"
                value={form.rams}
                onChange={handleChange("rams")}
                size="small"
                fullWidth
              />

              <TextField
                label="Product Weight"
                placeholder="e.g. 1.5 kg"
                value={form.weight}
                onChange={handleChange("weight")}
                size="small"
                fullWidth
              />

              <TextField
                label="Product Size"
                placeholder="e.g. M, L, XL"
                value={form.size}
                onChange={handleChange("size")}
                size="small"
                fullWidth
              />
            </div>
          </div>

          {/* Media & Images */}
          <div>
            <Typography className="!mb-4 !text-[15px] !font-semibold !text-gray-800">
              Media & Images
            </Typography>

            <div className="rounded-md border border-dashed border-gray-300 p-6">
              <Typography className="!mb-3 !text-sm !font-medium !text-gray-700">
                Image Upload
              </Typography>

              {/* Multiple File Input */}
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="block w-full cursor-pointer rounded-md border border-gray-300 bg-white text-sm text-gray-600 file:mr-4 file:cursor-pointer file:border-0 file:bg-gray-100 file:px-4 file:py-2 file:text-sm file:font-medium hover:file:bg-gray-200"
              />

              {/* Multiple Image Preview */}
              {imagePreviews.length > 0 && (
                <div className="mt-6">
                  <Typography className="!mb-3 !text-sm !font-medium !text-gray-700">
                    Image Preview ({imagePreviews.length})
                  </Typography>

                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    {imagePreviews.map((preview, index) => (
                      <div
                        key={preview}
                        className="group relative h-[160px] overflow-hidden rounded-md border border-gray-200 bg-gray-50"
                      >
                        <img
                          src={preview}
                          alt={`Product preview ${index + 1}`}
                          className="h-full w-full object-contain"
                        />

                        {/* Image Number */}
                        <span className="absolute left-2 top-2 rounded bg-black/60 px-2 py-1 text-xs text-white">
                          {index + 1}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Selected Files */}
                  <div className="mt-4">
                    {form.images.map((file, index) => (
                      <Typography
                        key={`${file.name}-${index}`}
                        className="!text-xs !text-gray-500"
                      >
                        {index + 1}. {file.name}
                      </Typography>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t border-gray-200 px-6 py-4">
          <Button
            onClick={handleClose}
            className="!rounded-md !border !border-gray-300 !px-5 !capitalize !text-gray-700 hover:!bg-gray-50"
          >
            Cancel
          </Button>

          <Button
            onClick={handleSave}
            variant="contained"
            className="!rounded-md !bg-blue-600 !px-5 !capitalize !shadow-none hover:!bg-blue-500"
          >
            Save Product
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
