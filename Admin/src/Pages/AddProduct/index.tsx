import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import CircularProgress from "@mui/material/CircularProgress";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useNavigate } from "react-router-dom";
import { getData, postData, postUpload } from "../../utils/api";
import { MdClose } from "react-icons/md";

interface CatItem { _id: string; name: string; parentId: string | null; }
interface SpecItem { _id: string; name: string; }

const initialForm = {
  name: "", description: "", brand: "", location: "",
  category: "", subCategory: "", thirdCategory: "",
  price: "", oldPrice: "", discount: "", stock: "", rating: "",
  isFeatured: "false",
  productram: [] as string[],
  size: [] as string[],
  productWeight: [] as string[],
  images: [] as File[],
};

const AddProduct = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [uploadedImgUrls, setUploadedImgUrls] = useState<string[]>([]);
  const [imgUploading, setImgUploading] = useState(false);

  // category cascade
  const [allCats, setAllCats] = useState<CatItem[]>([]);
  // specs from API
  const [ramOptions, setRamOptions] = useState<SpecItem[]>([]);
  const [sizeOptions, setSizeOptions] = useState<SpecItem[]>([]);
  const [weightOptions, setWeightOptions] = useState<SpecItem[]>([]);

  useEffect(() => {
    getData("/api/category").then((res) => {
      const raw: any[] = res.data || [];
      setAllCats(raw.map((c) => ({ _id: c._id, name: c.name, parentId: c.parentId?._id ?? c.parentId ?? null })));
    }).catch(() => {});

    getData("/api/productSpecs/ram").then((res) => setRamOptions(res.data || [])).catch(() => {});
    getData("/api/productSpecs/size").then((res) => setSizeOptions(res.data || [])).catch(() => {});
    getData("/api/productSpecs/weight").then((res) => setWeightOptions(res.data || [])).catch(() => {});
  }, []);

  const level1 = allCats.filter((c) => !c.parentId);
  const level2 = allCats.filter((c) => c.parentId && level1.some((p) => p._id === c.parentId));
  const level3 = allCats.filter((c) => c.parentId && level2.some((p) => p._id === c.parentId));
  const filteredLevel2 = form.category ? level2.filter((s) => s.parentId === form.category) : level2;
  const filteredLevel3 = form.subCategory ? level3.filter((t) => t.parentId === form.subCategory) : [];

  const set = (field: string, value: any) => setForm((p) => ({ ...p, [field]: value }));

  const toggleSpec = (field: "productram" | "size" | "productWeight", val: string) => {
    setForm((p) => {
      const arr = p[field] as string[];
      return { ...p, [field]: arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val] };
    });
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setForm((p) => ({ ...p, images: files }));
    setImagePreviews(files.map((f) => URL.createObjectURL(f)));

    // upload immediately to get URLs
    setImgUploading(true);
    try {
      const fd = new FormData();
      files.forEach((f) => fd.append("images", f));
      const res = await postUpload("/api/product/uploadImages", fd);
      setUploadedImgUrls(res.images || (res.image ? [res.image] : []));
    } catch (err) {
      console.error("Image upload failed:", err);
    } finally {
      setImgUploading(false);
    }
  };

  const removeImage = (index: number) => {
    setImagePreviews((p) => p.filter((_, i) => i !== index));
    setUploadedImgUrls((p) => p.filter((_, i) => i !== index));
    setForm((p) => ({ ...p, images: p.images.filter((_, i) => i !== index) }));
  };

  const handleSave = async () => {
    if (!form.name.trim() || !form.price || !form.category) return;
    setSaving(true);
    try {
      const catItem = level1.find((c) => c._id === form.category);
      const subItem = level2.find((c) => c._id === form.subCategory);
      const thirdItem = level3.find((c) => c._id === form.thirdCategory);

      const payload = {
        name: form.name,
        description: form.description,
        brand: form.brand,
        location: form.location,
        price: Number(form.price),
        oldprice: Number(form.oldPrice) || 0,
        discount: Number(form.discount) || 0,
        countInstock: Number(form.stock) || 0,
        rating: Number(form.rating) || 0,
        isFeatured: form.isFeatured === "true",
        catId: form.category || null,
        catName: catItem?.name || "",
        subcatId: form.subCategory || null,
        subcat: subItem?.name || "",
        subcatName: subItem?.name || "",
        thirdcatsubid: form.thirdCategory || null,
        thirdsubCat: thirdItem?.name || "",
        thirdsubcatName: thirdItem?.name || "",
        category: form.category || null,
        images: uploadedImgUrls,
        productram: form.productram,
        size: form.size,
        productWeight: form.productWeight,
      };

      await postData("/api/product/create", payload as any);
      navigate("/products");
    } catch (err) {
      console.error("Save failed:", err);
    } finally {
      setSaving(false);
    }
  };

  const sectionTitle = (title: string) => (
    <Typography className="!mb-4 !text-[15px] !font-semibold !text-gray-800 !border-b !border-gray-100 !pb-2">
      {title}
    </Typography>
  );

  const MultiSelect = ({
    label, options, selected, field,
  }: { label: string; options: SpecItem[]; selected: string[]; field: "productram" | "size" | "productWeight" }) => (
    <div>
      <p className="text-sm font-medium text-gray-700 mb-2">{label}</p>
      {options.length === 0 ? (
        <p className="text-xs text-gray-400 italic">No {label.toLowerCase()} options found. Add them from the specs panel.</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {options.map((opt) => (
            <button
              key={opt._id}
              type="button"
              onClick={() => toggleSpec(field, opt.name)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                selected.includes(opt.name)
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-600 border-gray-300 hover:border-blue-400"
              }`}
            >
              {opt.name}
            </button>
          ))}
        </div>
      )}
      {selected.length > 0 && (
        <p className="mt-2 text-xs text-blue-600">Selected: {selected.join(", ")}</p>
      )}
    </div>
  );

  return (
    <div className="space-y-5">
      <div>
        <Typography className="!text-[24px] !font-bold !text-gray-900">Add Product</Typography>
        <Typography className="!mt-1 !text-sm !text-gray-500">Create a new product listing for your catalog.</Typography>
      </div>

      <div className="rounded-md border border-gray-200 bg-white">
        <div className="border-b border-gray-200 px-6 py-4">
          <Typography className="!text-[18px] !font-semibold !text-gray-800">Product Details</Typography>
          <Typography className="!mt-1 !text-sm !text-gray-500">Fill in all required fields marked with *</Typography>
        </div>

        <div className="p-6 space-y-8">

          {/* ── Product Information ── */}
          <div>
            {sectionTitle("Product Information")}
            <div className="grid gap-5 md:grid-cols-2">
              <TextField label="Product Name *" placeholder="Enter product name" value={form.name}
                onChange={(e) => set("name", e.target.value)} size="small" fullWidth />

              <TextField label="Brand" placeholder="e.g. Nike, Apple" value={form.brand}
                onChange={(e) => set("brand", e.target.value)} size="small" fullWidth />

              <TextField label="Description" placeholder="Product description" value={form.description}
                onChange={(e) => set("description", e.target.value)} size="small" fullWidth multiline rows={3}
                className="md:col-span-2" />

              <TextField label="Location" placeholder="e.g. Warehouse A" value={form.location}
                onChange={(e) => set("location", e.target.value)} size="small" fullWidth />
            </div>
          </div>

          {/* ── Category Cascade ── */}
          <div>
            {sectionTitle("Category")}
            <div className="grid gap-5 md:grid-cols-3">
              <TextField select label="Category *" value={form.category} size="small" fullWidth
                onChange={(e) => setForm((p) => ({ ...p, category: e.target.value, subCategory: "", thirdCategory: "" }))}>
                <MenuItem value="">Select Category</MenuItem>
                {level1.map((c) => <MenuItem key={c._id} value={c._id}>{c.name}</MenuItem>)}
              </TextField>

              <TextField select label="Sub Category" value={form.subCategory} size="small" fullWidth
                disabled={!form.category}
                onChange={(e) => setForm((p) => ({ ...p, subCategory: e.target.value, thirdCategory: "" }))}>
                <MenuItem value="">Select Sub Category</MenuItem>
                {filteredLevel2.map((c) => <MenuItem key={c._id} value={c._id}>{c.name}</MenuItem>)}
              </TextField>

              <TextField select label="Third Level Category" value={form.thirdCategory} size="small" fullWidth
                disabled={!form.subCategory || filteredLevel3.length === 0}
                onChange={(e) => set("thirdCategory", e.target.value)}>
                <MenuItem value="">Select Third Level</MenuItem>
                {filteredLevel3.map((c) => <MenuItem key={c._id} value={c._id}>{c.name}</MenuItem>)}
              </TextField>
            </div>
          </div>

          {/* ── Pricing & Inventory ── */}
          <div>
            {sectionTitle("Pricing & Inventory")}
            <div className="grid gap-5 md:grid-cols-3">
              <TextField label="Price *" placeholder="0.00" type="number" value={form.price}
                onChange={(e) => set("price", e.target.value)} size="small" fullWidth
                slotProps={{ htmlInput: { min: 0, step: "0.01" } }} />

              <TextField label="Old Price" placeholder="0.00" type="number" value={form.oldPrice}
                onChange={(e) => set("oldPrice", e.target.value)} size="small" fullWidth
                slotProps={{ htmlInput: { min: 0, step: "0.01" } }} />

              <TextField label="Discount (%)" placeholder="0" type="number" value={form.discount}
                onChange={(e) => set("discount", e.target.value)} size="small" fullWidth
                slotProps={{ htmlInput: { min: 0, max: 100 } }} />

              <TextField label="Stock" placeholder="0" type="number" value={form.stock}
                onChange={(e) => set("stock", e.target.value)} size="small" fullWidth
                slotProps={{ htmlInput: { min: 0 } }} />

              <TextField label="Rating" placeholder="0 - 5" type="number" value={form.rating}
                onChange={(e) => set("rating", e.target.value)} size="small" fullWidth
                slotProps={{ htmlInput: { min: 0, max: 5, step: "0.1" } }} />

              <TextField select label="Is Featured?" value={form.isFeatured}
                onChange={(e) => set("isFeatured", e.target.value)} size="small" fullWidth>
                <MenuItem value="true">Yes</MenuItem>
                <MenuItem value="false">No</MenuItem>
              </TextField>
            </div>
          </div>

          {/* ── Product Specifications ── */}
          <div>
            {sectionTitle("Product Specifications")}
            <div className="grid gap-6 md:grid-cols-3">
              <MultiSelect label="RAM Options" options={ramOptions} selected={form.productram} field="productram" />
              <MultiSelect label="Size Options" options={sizeOptions} selected={form.size} field="size" />
              <MultiSelect label="Weight Options" options={weightOptions} selected={form.productWeight} field="productWeight" />
            </div>
          </div>

          {/* ── Media & Images ── */}
          <div>
            {sectionTitle("Media & Images")}
            <div className="rounded-md border border-dashed border-gray-300 p-6">
              <div className="flex items-center gap-4 mb-4">
                <label className="cursor-pointer rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-colors">
                  {imgUploading ? "Uploading..." : "Choose Images"}
                  <input type="file" accept="image/*" multiple hidden onChange={handleImageChange} disabled={imgUploading} />
                </label>
                {imgUploading && <CircularProgress size={18} />}
                {uploadedImgUrls.length > 0 && (
                  <span className="text-xs text-green-600 font-medium">✓ {uploadedImgUrls.length} image(s) uploaded</span>
                )}
              </div>

              {imagePreviews.length > 0 && (
                <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
                  {imagePreviews.map((preview, index) => (
                    <div key={preview} className="relative h-[120px] overflow-hidden rounded-md border border-gray-200 bg-gray-50 group">
                      <img src={preview} alt={`preview ${index + 1}`} className="h-full w-full object-cover" />
                      <span className="absolute left-1.5 top-1.5 rounded bg-black/60 px-1.5 py-0.5 text-[10px] text-white">{index + 1}</span>
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute right-1 top-1 hidden group-hover:flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white"
                      >
                        <MdClose size={11} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t border-gray-200 px-6 py-4">
          <Button onClick={() => navigate("/products")}
            className="!rounded-md !border !border-gray-300 !px-5 !capitalize !text-gray-700 hover:!bg-gray-50">
            Cancel
          </Button>
          <Button onClick={handleSave} variant="contained" disabled={saving || imgUploading || !form.name.trim() || !form.price || !form.category}
            className="!rounded-md !bg-blue-600 !px-5 !capitalize !shadow-none hover:!bg-blue-500 disabled:!opacity-60">
            {saving ? <CircularProgress size={18} sx={{ color: "white" }} /> : "Save Product"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
