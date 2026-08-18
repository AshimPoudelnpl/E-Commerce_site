import React, { useState } from "react";
import { Button } from "@mui/material";
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

type Product = {
  id: string;
  title: string;
  tag: string;
  image: string;
  category: string;
  subCategory: string;
  oldPrice: number;
  newPrice: number;
  sales: number;
  salesPercent: number;
};

const mockProducts: Product[] = [
  {
    id: "PROD001",
    title: "VNEED Women Embroidered Rayon Kurta Pant Set | Kurta set for Women",
    tag: "Fashion",
    image: tShirtImage,
    category: "Fashion",
    subCategory: "Women",
    oldPrice: 89.0,
    newPrice: 58.0,
    sales: 234,
    salesPercent: 65,
  },
  {
    id: "PROD002",
    title: "Premium Cotton T-Shirt | Comfortable & Durable",
    tag: "Clothing",
    image: tShirtImage,
    category: "Clothing",
    subCategory: "Men",
    oldPrice: 45.0,
    newPrice: 35.0,
    sales: 156,
    salesPercent: 48,
  },
  {
    id: "PROD003",
    title: "Casual Wear T-Shirt | Premium Quality",
    tag: "Apparel",
    image: tShirtImage,
    category: "Apparel",
    subCategory: "Unisex",
    oldPrice: 50.0,
    newPrice: 40.0,
    sales: 189,
    salesPercent: 72,
  },
];

// Column definitions for the products MUI table.
// (Product column renders custom image+title+tag markup, handled separately in the row.)
const columns: {
  id: "product" | "category" | "subCategory" | "price" | "sales";
  label: string;
  minWidth: number;
  align?: "left" | "center" | "right";
}[] = [
  { id: "product", label: "Product", minWidth: 260 },
  { id: "category", label: "Category", minWidth: 120 },
  { id: "subCategory", label: "Sub Category", minWidth: 120 },
  { id: "price", label: "Price", minWidth: 100, align: "right" },
  { id: "sales", label: "Sales", minWidth: 140, align: "right" },
];

const Products = () => {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [page, setPage] = useState(0); // zero-based, matches MUI TablePagination
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const toggleProductSelect = (id: string) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id],
    );
  };

  const toggleSelectAll = () => {
    if (selectedProducts.length === paginatedProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(paginatedProducts.map((p) => p.id));
    }
  };

  const handleDeleteProduct = (id: string) => {
    alert(`Delete product: ${id}`);
    // Add your delete logic here
  };

  const handleExport = () => {
    alert("Exporting products...");
    // Add your export logic here (e.g. CSV generation)
  };

  const handleCategoryChange = (e: SelectChangeEvent) => {
    setSelectedCategory(e.target.value);
    setPage(0); // reset to first page whenever the filter changes
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  // Derive the unique list of sub-categories from the data so the dropdown
  // stays in sync if mockProducts changes.
  const subCategoryOptions = Array.from(
    new Set(mockProducts.map((p) => p.subCategory)),
  );

  const filteredProducts = mockProducts.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" || product.subCategory === selectedCategory;
    const matchesSearch =
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.subCategory.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  const allSelectedOnPage =
    paginatedProducts.length > 0 &&
    paginatedProducts.every((p) => selectedProducts.includes(p.id));

  return (
    <div>
      {/* Products (single, unified MUI table) */}
      <div className="bg-white rounded-md border border-[rgba(0,0,0,0.1)] p-5 mb-5">
        {/* Header: title + Export/Add Product actions */}
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <h2 className="text-[20px] font-bold text-gray-900">
            Products{" "}
            <span className="text-gray-400 font-normal text-[14px]">
              (Material Ui Table)
            </span>
          </h2>

          <div className="flex items-center gap-3">
            <Button
              onClick={handleExport}
              className="!bg-[#1eae5f] !capitalize !text-white !px-5 !py-2 !rounded-md hover:!bg-[#189951]"
            >
              Export
            </Button>
            <Link to={'/products/upload'}>
            <Button className="!bg-[#3872fa] !capitalize !text-white !px-5 !py-2 !rounded-md hover:!bg-[#2d5fd6]">
              <FaPlus className="mr-1 text-[13px]" /> Add Product
            </Button>
            </Link>
          </div>
        </div>

        {/* Category filter */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category By
          </label>
          <div className="flex justify-between">
            <FormControl size="small" className=" !w-[200px]">
              <Select
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="!bg-white"
              >
                <MenuItem value="All">All</MenuItem>
                {subCategoryOptions.map((sub) => (
                  <MenuItem key={sub} value={sub}>
                    {sub}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <SearchBar
              value={searchTerm}
              onChange={(value) => {
                setSearchTerm(value);
                setPage(0);
              }}
              placeholder="Search products"
            />
          </div>
        </div>

        <TableContainer
          component={Paper}
          sx={{
            maxHeight: 440,
            boxShadow: "none",
            border: "1px solid rgba(0,0,0,0.1)",
          }}
        >
          <Table stickyHeader aria-label="products table">
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    size="small"
                    checked={allSelectedOnPage}
                    indeterminate={
                      selectedProducts.length > 0 && !allSelectedOnPage
                    }
                    onChange={toggleSelectAll}
                  />
                </TableCell>

                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}

                <TableCell align="right" style={{ minWidth: 120 }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {paginatedProducts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columns.length + 2} align="center">
                    <span className="text-gray-400 py-6 block">
                      No products found for this category.
                    </span>
                  </TableCell>
                </TableRow>
              ) : (
                paginatedProducts.map((product) => (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={product.id}
                    selected={selectedProducts.includes(product.id)}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        size="small"
                        checked={selectedProducts.includes(product.id)}
                        onChange={() => toggleProductSelect(product.id)}
                      />
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-3">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-12 h-12 rounded-md object-cover border flex-shrink-0"
                        />
                        <div>
                          <p className="text-gray-800 font-medium leading-snug max-w-[280px]">
                            {product.title}
                          </p>
                          <span className="text-gray-400 text-[13px]">
                            {product.tag}
                          </span>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>{product.category}</TableCell>

                    <TableCell>{product.subCategory}</TableCell>

                    <TableCell align="right">
                      <div className="flex flex-col items-end">
                        {product.oldPrice !== product.newPrice && (
                          <span className="text-gray-400 line-through text-[13px]">
                            ${product.oldPrice.toFixed(2)}
                          </span>
                        )}
                        <span className="text-[#3872fa] font-semibold">
                          ${product.newPrice.toFixed(2)}
                        </span>
                      </div>
                    </TableCell>

                    <TableCell align="right">
                      <div className="w-[130px] ml-auto">
                        <span className="text-gray-700 font-medium text-[13px]">
                          {product.sales} sale
                        </span>
                        <div className="w-full h-1.5 bg-gray-200 rounded-full mt-1 overflow-hidden">
                          <div
                            className="h-full bg-orange-400 rounded-full"
                            style={{ width: `${product.salesPercent}%` }}
                          />
                        </div>
                      </div>
                    </TableCell>

                    <TableCell align="right">
                      <div className="flex items-center justify-end gap-1">
                        <IconButton
                          size="small"
                          title="Edit"
                          className="!text-gray-500 hover:!text-[#3872fa]"
                        >
                          <FiEdit2 className="text-[16px]" />
                        </IconButton>
                        <IconButton
                          size="small"
                          title="View"
                          className="!text-gray-500 hover:!text-[#3872fa]"
                        >
                          <FaRegEye className="text-[16px]" />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleDeleteProduct(product.id)}
                          title="Delete"
                          className="!text-gray-500 hover:!text-red-600"
                        >
                          <FaTrash className="text-[16px]" />
                        </IconButton>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <TablePagination
          component="div"
          count={filteredProducts.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
          className="!mt-2 !border-t !border-gray-100"
        />
      </div>
    </div>
  );
};

export default Products;
``;
