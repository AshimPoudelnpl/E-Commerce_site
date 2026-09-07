import React, { useEffect, useState } from "react";
import { Button, CircularProgress, Skeleton } from "@mui/material";
import TablePagination from "@mui/material/TablePagination";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Select, { type SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { FaPlus } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import { FaRegEye, FaTrash } from "react-icons/fa";
import tShirtImage from "../../assets/4284_plain_t-shirt_2048x2048_85d.webp";
import SearchBar from "../../Components/SearchBox";
import { Link } from "react-router-dom";
import { getData } from "../../utils/api";

interface CatItem {
  _id: string;
  name: string;
  parentId: string | null;
}

type Product = {
  _id: string;
  title: string;
  tag: string;
  image: string;
  images: string[];
  category: string;
  subCategory: string;
  thirdCatName: string;
  oldPrice: number;
  newPrice: number;
  countInStock: number;
  rams: string;
  size: string;
  weight: string;
  brand: string;
  rating: number;
  isFeatured: boolean;
  sales: number;
  salesPercent: number;
  checked: boolean;
};

const COLS = [
  { label: "Product", minWidth: 260 },
  { label: "Category", minWidth: 110 },
  { label: "Sub Category", minWidth: 110 },
  { label: "3rd Level", minWidth: 110 },
  { label: "Brand", minWidth: 90 },
  { label: "RAMS", minWidth: 80 },
  { label: "Size", minWidth: 80 },
  { label: "Weight", minWidth: 80 },
  { label: "Stock", minWidth: 70, align: "center" as const },
  { label: "Price", minWidth: 100, align: "right" as const },
  { label: "Rating", minWidth: 70, align: "center" as const },
  { label: "Featured", minWidth: 80, align: "center" as const },
  { label: "Action", minWidth: 110, align: "right" as const },
];

const Products = () => {
  const [productData, setProductData] = useState<Product[]>([]);
  const [sortedIds, setSortedIds] = useState<string[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [allCats, setAllCats] = useState<CatItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSubCategory, setSelectedSubCategory] = useState("All");
  const [selectedThirdCategory, setSelectedThirdCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const getProducts = async () => {
    setProductsLoading(true);
    try {
      const res = await getData("/api/product/getAllProducts");
      if (res?.error === false) {
        const arr: Product[] = (res?.products || []).map((p: any) => ({
          _id: p._id,
          title: p.name,
          tag: p.catName || "",
          images: p.images || [],
          image: p.images?.[0] || "",
          category: p.catName || "",
          subCategory: p.subCatName || "",
          thirdCatName: p.thirdCatName || "",
          oldPrice: p.oldPrice || 0,
          newPrice: p.price || 0,
          countInStock: p.countInStock || 0,
          rams: p.rams || "—",
          size: p.size || "—",
          weight: p.weight || "—",
          brand: p.brand || "—",
          rating: p.rating || 0,
          isFeatured: p.isFeatured || false,
          sales: p.sales || 0,
          salesPercent: p.salesPercent || 0,
          checked: false,
        }));
        setProductData(arr);
      }
    } catch (err) {
      console.error("Failed to fetch products:", err);
    } finally {
      setProductsLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
    getData("/api/category").then((res) => {
      const raw: any[] = res.data || [];
      setAllCats(raw.map((c) => ({
        _id: c._id,
        name: c.name,
        parentId: c.parentId?._id ?? c.parentId ?? null,
      })));
    }).catch(() => {});
  }, []);

  const level1 = allCats.filter((c) => !c.parentId);
  const level2 = allCats.filter((c) => c.parentId && level1.some((p) => p._id === c.parentId));
  const level3 = allCats.filter((c) => c.parentId && level2.some((p) => p._id === c.parentId));

  const filteredLevel2 = selectedCategory === "All"
    ? level2 : level2.filter((s) => s.parentId === selectedCategory);

  const filteredLevel3 = selectedSubCategory !== "All"
    ? level3.filter((t) => t.parentId === selectedSubCategory)
    : selectedCategory !== "All"
      ? level3.filter((t) => filteredLevel2.some((s) => s._id === t.parentId))
      : level3;

  const handleCheckboxChange = (_e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const updated = productData.map((item) =>
      item._id === id ? { ...item, checked: !item.checked } : item
    );
    setProductData(updated);
    setSortedIds(updated.filter((i) => i.checked).map((i) => i._id).sort((a, b) => a.localeCompare(b)));
  };

  const toggleSelectAll = () => {
    const allChecked = paginatedProducts.every((p) => p.checked);
    const updated = productData.map((item) =>
      paginatedProducts.some((p) => p._id === item._id) ? { ...item, checked: !allChecked } : item
    );
    setProductData(updated);
    setSortedIds(updated.filter((i) => i.checked).map((i) => i._id).sort((a, b) => a.localeCompare(b)));
  };

  const handleCategoryChange = (e: SelectChangeEvent) => {
    setSelectedCategory(e.target.value);
    setSelectedSubCategory("All");
    setSelectedThirdCategory("All");
    setPage(0);
  };

  const handleSubCategoryChange = (e: SelectChangeEvent) => {
    setSelectedSubCategory(e.target.value);
    setSelectedThirdCategory("All");
    setPage(0);
  };

  const handleThirdCategoryChange = (e: SelectChangeEvent) => {
    setSelectedThirdCategory(e.target.value);
    setPage(0);
  };

  const filteredProducts = productData.filter((p) => {
    const q = searchTerm.toLowerCase();
    const matchesSearch = !q ||
      p.title.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.subCategory.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.rams.toLowerCase().includes(q) ||
      p.size.toLowerCase().includes(q) ||
      p.weight.toLowerCase().includes(q);

    const matchesCat = selectedCategory === "All" ||
      level1.find((c) => c._id === selectedCategory)?.name === p.category;
    const matchesSub = selectedSubCategory === "All" ||
      level2.find((c) => c._id === selectedSubCategory)?.name === p.subCategory;
    const matchesThird = selectedThirdCategory === "All" ||
      level3.find((c) => c._id === selectedThirdCategory)?.name === p.thirdCatName;

    return matchesSearch && matchesCat && matchesSub && matchesThird;
  });

  const paginatedProducts = filteredProducts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  const allSelectedOnPage = paginatedProducts.length > 0 && paginatedProducts.every((p) => p.checked);

  return (
    <div>
      <div className="bg-white rounded-md border border-[rgba(0,0,0,0.1)] p-5 mb-5">

        {/* Header */}
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <h2 className="text-[20px] font-bold text-gray-900">Products</h2>
          <div className="flex items-center gap-3">
            <Button className="!bg-[#1eae5f] !capitalize !text-white !px-5 !py-2 !rounded-md hover:!bg-[#189951]">
              Export
            </Button>
            <Link to="/products/upload">
              <Button className="!bg-[#3872fa] !capitalize !text-white !px-5 !py-2 !rounded-md hover:!bg-[#2d5fd6]">
                <FaPlus className="mr-1 text-[13px]" /> Add Product
              </Button>
            </Link>
          </div>
        </div>

        {/* Filters + Search */}
        <div className="flex flex-wrap gap-4 items-end justify-between mb-4">
          <div className="flex flex-wrap gap-4 items-end">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Category</label>
              <FormControl size="small" className="!w-[160px]">
                <Select value={selectedCategory} onChange={handleCategoryChange} className="!bg-white">
                  <MenuItem value="All">All</MenuItem>
                  {level1.map((c) => <MenuItem key={c._id} value={c._id}>{c.name}</MenuItem>)}
                </Select>
              </FormControl>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Sub-Category</label>
              <FormControl size="small" className="!w-[160px]">
                <Select value={selectedSubCategory} onChange={handleSubCategoryChange} className="!bg-white"
                  disabled={selectedCategory !== "All" && filteredLevel2.length === 0}>
                  <MenuItem value="All">All</MenuItem>
                  {filteredLevel2.map((c) => <MenuItem key={c._id} value={c._id}>{c.name}</MenuItem>)}
                </Select>
              </FormControl>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Third-Level</label>
              <FormControl size="small" className="!w-[160px]">
                <Select value={selectedThirdCategory} onChange={handleThirdCategoryChange} className="!bg-white"
                  disabled={selectedSubCategory !== "All" && filteredLevel3.length === 0}>
                  <MenuItem value="All">All</MenuItem>
                  {filteredLevel3.map((c) => <MenuItem key={c._id} value={c._id}>{c.name}</MenuItem>)}
                </Select>
              </FormControl>
            </div>
          </div>

          {/* Search */}
          <SearchBar
            value={searchTerm}
            onChange={(v) => { setSearchTerm(v); setPage(0); }}
            placeholder="Search products..."
            className="!w-[240px]"
          />
        </div>

        {sortedIds.length > 0 && (
          <p className="text-xs text-blue-600 font-medium mb-2">{sortedIds.length} product(s) selected</p>
        )}

        <TableContainer component={Paper} sx={{ maxHeight: 520, boxShadow: "none", border: "1px solid rgba(0,0,0,0.08)" }}>
          <Table stickyHeader size="small" aria-label="products table">
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox" className="!bg-gray-50">
                  <Checkbox size="small" checked={allSelectedOnPage}
                    indeterminate={sortedIds.length > 0 && !allSelectedOnPage}
                    onChange={toggleSelectAll} />
                </TableCell>
                {COLS.map((col) => (
                  <TableCell key={col.label} align={col.align} style={{ minWidth: col.minWidth }}
                    className="!bg-gray-50 !font-bold !text-gray-700 !text-xs !uppercase !tracking-wide">
                    {col.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {productsLoading ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell padding="checkbox"><Skeleton variant="rectangular" width={18} height={18} /></TableCell>
                    {COLS.map((col) => (
                      <TableCell key={col.label}>
                        <Skeleton variant="text" width={col.minWidth - 20} height={20} />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : paginatedProducts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={COLS.length + 1} align="center">
                    <span className="text-gray-400 py-8 block text-sm">No products found.</span>
                  </TableCell>
                </TableRow>
              ) : (
                paginatedProducts.map((product) => (
                  <TableRow hover key={product._id} selected={product.checked}>
                    <TableCell padding="checkbox">
                      <Checkbox size="small" checked={product.checked}
                        onChange={(e) => handleCheckboxChange(e, product._id)} />
                    </TableCell>

                    {/* Product */}
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <img src={product.image || tShirtImage} alt={product.title}
                          className="w-10 h-10 rounded-md object-cover border flex-shrink-0" />
                        <div>
                          <p className="text-gray-800 font-medium text-[13px] leading-snug max-w-[220px] line-clamp-2">
                            {product.title}
                          </p>
                          <span className="text-gray-400 text-[11px]">{product.tag}</span>
                        </div>
                      </div>
                    </TableCell>

                    {/* Category */}
                    <TableCell>
                      <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-xs font-medium">
                        {product.category || "—"}
                      </span>
                    </TableCell>

                    {/* Sub Category */}
                    <TableCell>
                      <span className="px-2 py-0.5 rounded bg-purple-50 text-purple-700 text-xs font-medium">
                        {product.subCategory || "—"}
                      </span>
                    </TableCell>

                    {/* 3rd Level */}
                    <TableCell>
                      <span className="text-xs text-gray-600">{product.thirdCatName || "—"}</span>
                    </TableCell>

                    {/* Brand */}
                    <TableCell><span className="text-xs text-gray-700">{product.brand}</span></TableCell>

                    {/* RAMS */}
                    <TableCell>
                      <span className="px-1.5 py-0.5 rounded bg-gray-100 text-gray-600 text-xs">{product.rams}</span>
                    </TableCell>

                    {/* Size */}
                    <TableCell>
                      <span className="px-1.5 py-0.5 rounded bg-gray-100 text-gray-600 text-xs">{product.size}</span>
                    </TableCell>

                    {/* Weight */}
                    <TableCell>
                      <span className="text-xs text-gray-600">{product.weight}</span>
                    </TableCell>

                    {/* Stock */}
                    <TableCell align="center">
                      <span className={`px-2 py-0.5 rounded text-xs font-semibold ${product.countInStock > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                        {product.countInStock > 0 ? product.countInStock : "Out"}
                      </span>
                    </TableCell>

                    {/* Price */}
                    <TableCell align="right">
                      <div className="flex flex-col items-end">
                        {product.oldPrice > product.newPrice && (
                          <span className="text-gray-400 line-through text-[11px]">${product.oldPrice.toFixed(2)}</span>
                        )}
                        <span className="text-[#3872fa] font-semibold text-[13px]">${product.newPrice.toFixed(2)}</span>
                      </div>
                    </TableCell>

                    {/* Rating */}
                    <TableCell align="center">
                      <span className="text-xs font-medium text-amber-600">★ {product.rating.toFixed(1)}</span>
                    </TableCell>

                    {/* Featured */}
                    <TableCell align="center">
                      <span className={`px-2 py-0.5 rounded text-xs font-semibold ${product.isFeatured ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                        {product.isFeatured ? "Yes" : "No"}
                      </span>
                    </TableCell>

                    {/* Action */}
                    <TableCell align="right">
                      <div className="flex items-center justify-end gap-0.5">
                        <IconButton size="small" title="Edit" className="!text-gray-500 hover:!text-[#3872fa]">
                          <FiEdit2 size={14} />
                        </IconButton>
                        <IconButton size="small" title="View" className="!text-gray-500 hover:!text-[#3872fa]">
                          <FaRegEye size={14} />
                        </IconButton>
                        <IconButton size="small" title="Delete" className="!text-gray-500 hover:!text-red-600">
                          <FaTrash size={14} />
                        </IconButton>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination component="div" count={filteredProducts.length} page={page}
          onPageChange={(_e, p) => setPage(p)} rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }}
          rowsPerPageOptions={[5, 10, 25]} className="!mt-2 !border-t !border-gray-100" />
      </div>
    </div>
  );
};

export default Products;
