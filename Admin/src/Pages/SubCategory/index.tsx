import React, { useEffect, useState } from "react";
import {
  Box, Button, Checkbox, CircularProgress, IconButton, MenuItem,
  Paper, Select, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Typography,
} from "@mui/material";
import { MdAdd, MdClose, MdCloudUpload, MdDelete, MdEdit } from "react-icons/md";
import { deleteData, getData, postData, postUpload, putData } from "../../utils/api";

interface Category {
  _id: string;
  name: string;
  image: string;
  color: string;
  parentId: string | null;
  parentCatName: string;
  status: string;
}

const emptySubForm = { name: "", parentId: "", status: "Active", image: "", color: "#000000" };
const emptyThirdForm = { name: "", parentId: "", subParentId: "", status: "Active", image: "", color: "#000000" };

const SubCategoryPage = () => {
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  // sub-category form
  const [subForm, setSubForm] = useState(emptySubForm);
  const [subImgFile, setSubImgFile] = useState<File | null>(null);
  const [subImgPreview, setSubImgPreview] = useState("");
  const [subSaving, setSubSaving] = useState(false);

  // third-level form
  const [thirdForm, setThirdForm] = useState(emptyThirdForm);
  const [thirdImgFile, setThirdImgFile] = useState<File | null>(null);
  const [thirdImgPreview, setThirdImgPreview] = useState("");
  const [thirdSaving, setThirdSaving] = useState(false);

  // edit state
  const [editItem, setEditItem] = useState<Category | null>(null);
  const [editMode, setEditMode] = useState<"sub" | "third" | null>(null);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await getData("/api/category");
      const raw: any[] = res.data || [];
      const data: Category[] = raw.map((c) => ({
        ...c,
        parentId: c.parentId?._id ?? c.parentId ?? null,
      }));
      setAllCategories(data);
      setSubCategories(data.filter((c) => c.parentId));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCategories(); }, []);

  const level1 = allCategories.filter((c) => !c.parentId);
  const level2 = allCategories.filter((c) => c.parentId && level1.some((p) => p._id === c.parentId));
  const level3 = allCategories.filter((c) => c.parentId && level2.some((p) => p._id === c.parentId));

  // helper: build breadcrumb string for a category
  const getBreadcrumb = (cat: Category) => {
    if (level3.some((t) => t._id === cat._id)) {
      const sub = level2.find((s) => s._id === cat.parentId);
      const root = level1.find((r) => r._id === sub?.parentId);
      return `${root?.name ?? ""} → ${sub?.name ?? ""} → ${cat.name}`;
    }
    const root = level1.find((r) => r._id === cat.parentId);
    return `${root?.name ?? ""} → ${cat.name}`;
  };

  const getLevelLabel = (cat: Category) =>
    level3.some((t) => t._id === cat._id) ? "3rd Level" : "Sub";

  // sub-categories filtered by selected parent in third form
  const filteredSubs = level2.filter((s) => s.parentId === thirdForm.parentId);

  const openAddModal = () => {
    setEditItem(null);
    setEditMode(null);
    setSubForm(emptySubForm);
    setSubImgFile(null);
    setSubImgPreview("");
    setThirdForm(emptyThirdForm);
    setThirdImgFile(null);
    setThirdImgPreview("");
    setModalOpen(true);
  };

  const openEdit = (cat: Category) => {
    const isThird = level2.some((s) => s._id === cat.parentId);
    setEditItem(cat);
    setEditMode(isThird ? "third" : "sub");
    if (isThird) {
      const sub = level2.find((s) => s._id === cat.parentId);
      setThirdForm({ name: cat.name, parentId: sub?.parentId || "", subParentId: cat.parentId || "", status: cat.status, image: cat.image, color: cat.color || "#000000" });
      setThirdImgPreview(cat.image || "");
    } else {
      setSubForm({ name: cat.name, parentId: cat.parentId || "", status: cat.status, image: cat.image, color: cat.color || "#000000" });
      setSubImgPreview(cat.image || "");
    }
    setModalOpen(true);
  };

  const uploadImage = async (file: File) => {
    const fd = new FormData();
    fd.append("image", file);
    const res = await postUpload("/api/category/uploadImages", fd);
    return res.image || "";
  };

  const handleSubSave = async () => {
    if (!subForm.name.trim() || !subForm.parentId) return;
    setSubSaving(true);
    try {
      let imageUrl = subForm.image;
      if (subImgFile) imageUrl = await uploadImage(subImgFile);
      const parent = level1.find((p) => p._id === subForm.parentId);
      const payload: Record<string, unknown> = {
        name: subForm.name, color: subForm.color, status: subForm.status,
        image: imageUrl, parentId: subForm.parentId, parentCatName: parent?.name || "",
      };
      if (editItem && editMode === "sub") {
        await putData(`/api/category/${editItem._id}`, payload);
      } else {
        await postData("/api/category/create-category", payload);
      }
      setModalOpen(false);
      fetchCategories();
    } catch (err) { console.error(err); }
    finally { setSubSaving(false); }
  };

  const handleThirdSave = async () => {
    if (!thirdForm.name.trim() || !thirdForm.subParentId) return;
    setThirdSaving(true);
    try {
      let imageUrl = thirdForm.image;
      if (thirdImgFile) imageUrl = await uploadImage(thirdImgFile);
      const sub = level2.find((s) => s._id === thirdForm.subParentId);
      const payload: Record<string, unknown> = {
        name: thirdForm.name, color: thirdForm.color, status: thirdForm.status,
        image: imageUrl, parentId: thirdForm.subParentId, parentCatName: sub?.name || "",
      };
      if (editItem && editMode === "third") {
        await putData(`/api/category/${editItem._id}`, payload);
      } else {
        await postData("/api/category/create-category", payload);
      }
      setModalOpen(false);
      fetchCategories();
    } catch (err) { console.error(err); }
    finally { setThirdSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this category?")) return;
    try {
      await deleteData(`/api/category/${id}`);
      fetchCategories();
    } catch (err) { console.error(err); }
  };

  const inputCls = "w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100";
  const labelCls = "mb-1 block text-xs font-medium text-gray-500";

  const ImageUploadField = ({
    preview, onChange,
  }: { preview: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => (
    <div className="flex items-center gap-3 mb-1">
      {preview && <img src={preview} alt="preview" className="h-10 w-10 rounded object-cover border" />}
      <label className="cursor-pointer rounded-md border border-dashed border-gray-300 bg-gray-50 px-3 py-1.5 text-xs text-gray-500 hover:border-blue-400 hover:text-blue-500 transition-colors">
        Upload Image
        <input type="file" accept="image/*" hidden onChange={onChange} />
      </label>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f5f5f5] p-6">
      <div className="mb-4 flex items-center bg-white p-5 rounded-lg justify-between">
        <Typography variant="h6" className="!font-bold !text-gray-800">Sub Category List</Typography>
        <Button variant="contained" startIcon={<MdAdd />} onClick={openAddModal}
          className="!bg-blue-600 !px-5 !py-2 !text-sm !font-semibold !shadow-none hover:!bg-blue-700">
          Add Sub Category
        </Button>
      </div>

      {loading ? (
        <Box className="flex justify-center py-16"><CircularProgress /></Box>
      ) : (
        <TableContainer component={Paper} className="!rounded-lg !shadow-sm">
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell className="!bg-white" padding="checkbox"><Checkbox size="small" /></TableCell>
                <TableCell className="!bg-white !font-bold">IMAGE</TableCell>
                <TableCell className="!bg-white !font-bold">NAME</TableCell>
                <TableCell className="!bg-white !font-bold">LEVEL</TableCell>
                <TableCell className="!bg-white !font-bold">BREADCRUMB</TableCell>
                <TableCell className="!bg-white !font-bold">COLOR</TableCell>
                <TableCell className="!bg-white !font-bold">STATUS</TableCell>
                <TableCell className="!bg-white !font-bold" align="center">ACTION</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {subCategories.map((cat) => (
                <TableRow key={cat._id} hover>
                  <TableCell padding="checkbox"><Checkbox size="small" /></TableCell>
                  <TableCell>
                    <img src={cat.image} alt={cat.name} className="h-12 w-12 rounded object-cover" />
                  </TableCell>
                  <TableCell className="!font-medium">{cat.name}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                      getLevelLabel(cat) === "3rd Level"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-blue-50 text-blue-700"
                    }`}>
                      {getLevelLabel(cat)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-xs text-gray-600">{getBreadcrumb(cat)}</span>
                  </TableCell>
                  <TableCell>
                    <span className="inline-flex items-center gap-2">
                      <span className="inline-block w-5 h-5 rounded-full border" style={{ background: cat.color }} />
                      <span className="text-xs text-gray-500">{cat.color}</span>
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-0.5 rounded text-xs font-semibold ${cat.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                      {cat.status}
                    </span>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton size="small" onClick={() => openEdit(cat)}><MdEdit /></IconButton>
                    <IconButton size="small" className="hover:!text-red-500" onClick={() => handleDelete(cat._id)}><MdDelete /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* ── Modal ── */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-3xl rounded-xl overflow-hidden shadow-2xl bg-[#f8f9fa]">

            {/* Header */}
            <div className="flex items-center gap-3 border-b border-gray-200 bg-[#f1f3f4] px-5 py-3.5">
              <button onClick={() => setModalOpen(false)}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-gray-500 shadow-sm hover:text-red-500 transition-colors">
                <MdClose size={16} />
              </button>
              <h2 className="text-sm font-semibold text-gray-700">
                {editItem ? "Edit Sub Category" : "Add New Sub Category"}
              </h2>
            </div>

            {/* Body — two columns */}
            <div className="grid grid-cols-2 gap-5 p-6">

              {/* ── Left: Add Sub Category ── */}
              <div className="rounded-lg bg-white p-5 shadow-sm border border-gray-100">
                <p className="mb-4 text-sm font-bold text-gray-800">Add Sub Category</p>

                <ImageUploadField
                  preview={subImgPreview}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    setSubImgFile(file);
                    setSubImgPreview(URL.createObjectURL(file));
                  }}
                />

                <div className="mt-3 grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelCls}>Product Category</label>
                    <select
                      className={inputCls}
                      value={subForm.parentId}
                      onChange={(e) => setSubForm({ ...subForm, parentId: e.target.value })}
                    >
                      <option value="">Select...</option>
                      {level1.map((p) => <option key={p._id} value={p._id}>{p.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>Sub Category Name</label>
                    <input
                      className={inputCls}
                      placeholder="Enter name"
                      value={subForm.name}
                      onChange={(e) => setSubForm({ ...subForm, name: e.target.value })}
                    />
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelCls}>Color</label>
                    <div className="flex items-center gap-2">
                      <input type="color" value={subForm.color}
                        onChange={(e) => setSubForm({ ...subForm, color: e.target.value })}
                        className="h-9 w-10 cursor-pointer rounded border border-gray-200" />
                      <input className={inputCls} value={subForm.color} maxLength={7}
                        onChange={(e) => setSubForm({ ...subForm, color: e.target.value })} />
                    </div>
                  </div>
                  <div>
                    <label className={labelCls}>Status</label>
                    <select className={inputCls} value={subForm.status}
                      onChange={(e) => setSubForm({ ...subForm, status: e.target.value })}>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={handleSubSave}
                  disabled={subSaving || !subForm.parentId || !subForm.name.trim()}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-md bg-blue-600 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-blue-700 disabled:opacity-50 transition-colors"
                >
                  {subSaving ? <CircularProgress size={14} sx={{ color: "white" }} /> : <><MdCloudUpload size={16} /> Publish and View</>}
                </button>
              </div>

              {/* ── Right: Add Third Level Category ── */}
              <div className="rounded-lg bg-white p-5 shadow-sm border border-gray-100">
                <p className="mb-4 text-sm font-bold text-gray-800">Add Third Level Category</p>

                <ImageUploadField
                  preview={thirdImgPreview}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    setThirdImgFile(file);
                    setThirdImgPreview(URL.createObjectURL(file));
                  }}
                />

                <div className="mt-3 grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelCls}>Product Category</label>
                    <select
                      className={inputCls}
                      value={thirdForm.parentId}
                      onChange={(e) => setThirdForm({ ...thirdForm, parentId: e.target.value, subParentId: "" })}
                    >
                      <option value="">Select...</option>
                      {level1.map((p) => <option key={p._id} value={p._id}>{p.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>Sub Category</label>
                    <select
                      className={inputCls}
                      value={thirdForm.subParentId}
                      onChange={(e) => setThirdForm({ ...thirdForm, subParentId: e.target.value })}
                      disabled={!thirdForm.parentId}
                    >
                      <option value="">Select...</option>
                      {filteredSubs.map((s) => <option key={s._id} value={s._id}>{s.name}</option>)}
                    </select>
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelCls}>Third Level Name</label>
                    <input
                      className={inputCls}
                      placeholder="Enter name"
                      value={thirdForm.name}
                      onChange={(e) => setThirdForm({ ...thirdForm, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Status</label>
                    <select className={inputCls} value={thirdForm.status}
                      onChange={(e) => setThirdForm({ ...thirdForm, status: e.target.value })}>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelCls}>Color</label>
                    <div className="flex items-center gap-2">
                      <input type="color" value={thirdForm.color}
                        onChange={(e) => setThirdForm({ ...thirdForm, color: e.target.value })}
                        className="h-9 w-10 cursor-pointer rounded border border-gray-200" />
                      <input className={inputCls} value={thirdForm.color} maxLength={7}
                        onChange={(e) => setThirdForm({ ...thirdForm, color: e.target.value })} />
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleThirdSave}
                  disabled={thirdSaving || !thirdForm.subParentId || !thirdForm.name.trim()}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-md bg-blue-600 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-blue-700 disabled:opacity-50 transition-colors"
                >
                  {thirdSaving ? <CircularProgress size={14} sx={{ color: "white" }} /> : <><MdCloudUpload size={16} /> Publish and View</>}
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubCategoryPage;
