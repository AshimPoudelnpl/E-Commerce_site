import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { MdAdd, MdDelete, MdEdit, MdExpandLess, MdExpandMore } from "react-icons/md";
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

const emptyForm = { name: "", color: "#000000", parentId: "", status: "Active", image: "" };

const Subcategory = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<Category | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [imgPreview, setImgPreview] = useState("");
  const [saving, setSaving] = useState(false);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await getData("/api/category");
      setCategories(res.data || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCategories(); }, []);

  const parents = categories.filter((c) => !c.parentId);
  const childrenOf = (id: string) => categories.filter((c) => c.parentId === id);

  const toggleExpand = (id: string) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const openAdd = () => {
    setEditItem(null);
    setForm(emptyForm);
    setImgFile(null);
    setImgPreview("");
    setModalOpen(true);
  };

  const openEdit = (cat: Category) => {
    setEditItem(cat);
    setForm({ name: cat.name, color: cat.color || "#000000", parentId: cat.parentId || "", status: cat.status, image: cat.image });
    setImgFile(null);
    setImgPreview(cat.image || "");
    setModalOpen(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImgFile(file);
    setImgPreview(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    if (!form.name.trim()) return;
    setSaving(true);
    try {
      let imageUrl = form.image;

      if (imgFile) {
        const fd = new FormData();
        fd.append("image", imgFile);
        const uploadRes = await postUpload("/api/category/uploadImages", fd);
        imageUrl = uploadRes.image || imageUrl;
      }

      const parent = categories.find((c) => c._id === form.parentId);
      const payload: Record<string, unknown> = {
        name: form.name,
        color: form.color,
        status: form.status,
        image: imageUrl,
        parentId: form.parentId || null,
        parentCatName: parent?.name || "",
      };

      if (editItem) {
        const res = await putData(`/api/category/${editItem._id}`, payload);
        console.log("Edit response:", res);
      } else {
        const res = await postData("/api/category/create-category", payload);
        console.log("Create response:", res);
      }

      setModalOpen(false);
      fetchCategories();
    } catch (err) {
      console.error("Save failed:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this category?")) return;
    try {
      const res = await deleteData(`/api/category/${id}`);
      console.log("Delete response:", res);
      fetchCategories();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const renderRow = (cat: Category, isChild = false) => (
    <TableRow key={cat._id} hover>
      <TableCell padding="checkbox"><Checkbox size="small" /></TableCell>
      <TableCell>
        {!isChild && childrenOf(cat._id).length > 0 && (
          <IconButton size="small" onClick={() => toggleExpand(cat._id)}>
            {expanded.has(cat._id) ? <MdExpandLess /> : <MdExpandMore />}
          </IconButton>
        )}
        {isChild && <span className="ml-6 text-gray-400">↳ </span>}
        <img src={cat.image} alt={cat.name} className="inline-block h-10 w-10 rounded object-cover mr-2 align-middle" />
        <span className="font-medium">{cat.name}</span>
      </TableCell>
      <TableCell>
        <span className="inline-block w-5 h-5 rounded-full border" style={{ background: cat.color }} />
      </TableCell>
      <TableCell>{cat.parentCatName || "—"}</TableCell>
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
  );

  return (
    <div className="min-h-screen bg-[#f5f5f5] p-6">
      <div className="mb-4 flex items-center bg-white p-5 rounded-lg justify-between">
        <Typography variant="h6" className="!font-bold !text-gray-800">Category List</Typography>
        <Button variant="contained" startIcon={<MdAdd />} onClick={openAdd}
          className="!bg-blue-600 !px-5 !py-2 !text-sm !font-semibold !shadow-none hover:!bg-blue-700">
          Add Category
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
                <TableCell className="!bg-white !font-bold">NAME</TableCell>
                <TableCell className="!bg-white !font-bold">COLOR</TableCell>
                <TableCell className="!bg-white !font-bold">PARENT</TableCell>
                <TableCell className="!bg-white !font-bold">STATUS</TableCell>
                <TableCell className="!bg-white !font-bold" align="center">ACTION</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {parents.map((cat) => (
                <React.Fragment key={cat._id}>
                  {renderRow(cat)}
                  {expanded.has(cat._id) && childrenOf(cat._id).map((child) => renderRow(child, true))}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Add/Edit Modal */}
      <Dialog open={modalOpen} onClose={() => setModalOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editItem ? "Edit Category" : "Add Category"}</DialogTitle>
        <DialogContent className="!space-y-4 !pt-4">
          {/* Image Upload */}
          <div className="flex items-center gap-4">
            {imgPreview && <img src={imgPreview} alt="preview" className="h-16 w-16 rounded object-cover border" />}
            <Button variant="outlined" component="label" size="small">
              Upload Image
              <input type="file" accept="image/*" hidden onChange={handleImageChange} />
            </Button>
          </div>

          <TextField label="Name" fullWidth size="small" value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })} />

          <div className="flex items-center gap-3">
            <label className="text-sm text-gray-600">Color</label>
            <input type="color" value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })}
              className="h-9 w-12 cursor-pointer rounded border" />
            <TextField size="small" value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })}
              inputProps={{ maxLength: 7 }} className="!w-28" />
          </div>

          <Select fullWidth size="small" value={form.parentId} displayEmpty
            onChange={(e) => setForm({ ...form, parentId: e.target.value })}>
            <MenuItem value="">None (Top-level)</MenuItem>
            {parents.map((p) => <MenuItem key={p._id} value={p._id}>{p.name}</MenuItem>)}
          </Select>

          <Select fullWidth size="small" value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}>
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModalOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSave} disabled={saving}>
            {saving ? <CircularProgress size={18} /> : editItem ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Subcategory;
