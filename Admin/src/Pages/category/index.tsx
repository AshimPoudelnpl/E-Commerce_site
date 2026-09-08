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
import { MdAdd, MdDelete, MdEdit } from "react-icons/md";
import {
  deleteData,
  getData,
  postData,
  postUpload,
  putData,
} from "../../utils/api";

interface Category {
  _id: string;
  name: string;
  image: string;
  color: string;
  status: string;
}

const emptyForm = { name: "", color: "#000000", status: "Active", image: "" };

const CategoryPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
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
      // only parent categories
      setCategories((res.data || []).filter((c: any) => !c.parentId));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const openAdd = () => {
    setEditItem(null);
    setForm(emptyForm);
    setImgFile(null);
    setImgPreview("");
    setModalOpen(true);
  };

  const openEdit = (cat: Category) => {
    setEditItem(cat);
    setForm({
      name: cat.name,
      color: cat.color || "#000000",
      status: cat.status,
      image: cat.image,
    });
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

      const payload: Record<string, unknown> = {
        name: form.name,
        color: form.color,
        status: form.status,
        image: imageUrl,
        parentId: null,
        parentCatName: "",
      };

      if (editItem) {
        await putData(`/api/category/${editItem._id}`, payload);
      } else {
        await postData("/api/category/create-category", payload);
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
    if (
      !confirm(
        "Delete this category? All its sub-categories will also be deleted.",
      )
    )
      return;
    try {
      await deleteData(`/api/category/${id}`);
      fetchCategories();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] p-6">
      <div className="mb-4 flex items-center bg-white p-5 rounded-lg justify-between">
        <Typography variant="h6" className="!font-bold !text-gray-800">
          Category List
        </Typography>
        <Button
          variant="contained"
          startIcon={<MdAdd />}
          onClick={openAdd}
          className="!bg-blue-600 !px-5 !py-2 !text-sm !font-semibold !shadow-none hover:!bg-blue-700"
        >
          Add Category
        </Button>
      </div>

      {loading ? (
        <Box className="flex justify-center py-16">
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper} className="!rounded-lg !shadow-sm">
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell className="!bg-white" padding="checkbox">
                  <Checkbox size="small" />
                </TableCell>
                <TableCell className="!bg-white !font-bold">IMAGE</TableCell>
                <TableCell className="!bg-white !font-bold">NAME</TableCell>
                <TableCell className="!bg-white !font-bold">COLOR</TableCell>
                <TableCell className="!bg-white !font-bold">STATUS</TableCell>
                <TableCell className="!bg-white !font-bold" align="center">
                  ACTION
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map((cat) => (
                <TableRow key={cat._id} hover>
                  <TableCell padding="checkbox">
                    <Checkbox size="small" />
                  </TableCell>
                  <TableCell>
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="h-12 w-12 rounded object-cover"
                    />
                  </TableCell>
                  <TableCell className="!font-medium">{cat.name}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center gap-2">
                      <span
                        className="inline-block w-5 h-5 rounded-full border"
                        style={{ background: cat.color }}
                      />
                      <span className="text-xs text-gray-500">{cat.color}</span>
                    </span>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-semibold ${cat.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}
                    >
                      {cat.status}
                    </span>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton size="small" onClick={() => openEdit(cat)}>
                      <MdEdit />
                    </IconButton>
                    <IconButton
                      size="small"
                      className="hover:!text-red-500"
                      onClick={() => handleDelete(cat._id)}
                    >
                      <MdDelete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Dialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>{editItem ? "Edit Category" : "Add Category"}</DialogTitle>
        <DialogContent className="!space-y-4 !pt-4">
          <div className="flex items-center gap-4">
            {imgPreview && (
              <img
                src={imgPreview}
                alt="preview"
                className="h-16 w-16 rounded object-cover border"
              />
            )}
            <Button variant="outlined" component="label" size="small">
              Upload Image
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleImageChange}
              />
            </Button>
          </div>

          <TextField
            label="Name"
            fullWidth
            size="small"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <div className="flex items-center gap-3">
            <label className="text-sm text-gray-600">Color</label>
            <input
              type="color"
              value={form.color}
              onChange={(e) => setForm({ ...form, color: e.target.value })}
              className="h-9 w-12 cursor-pointer rounded border"
            />
            <TextField
              size="small"
              value={form.color}
              onChange={(e) => setForm({ ...form, color: e.target.value })}
              slotProps={{ htmlInput: { maxLength: 7 } }}
              className="!w-28"
            />
          </div>

          <Select
            fullWidth
            size="small"
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          >
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModalOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSave} disabled={saving}>
            {saving ? (
              <CircularProgress size={18} />
            ) : editItem ? (
              "Update"
            ) : (
              "Create"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CategoryPage;
