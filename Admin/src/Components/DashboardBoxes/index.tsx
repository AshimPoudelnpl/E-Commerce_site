import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";
import { AiTwotoneGift } from "react-icons/ai";
import { IoStatsChartSharp } from "react-icons/io5";
import { PiChartPieSliceFill } from "react-icons/pi";
import { FaLandmark, FaPlus } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import shopIllustration from "../../assets/shopillusration.avif";
import tShirtImage from "../../assets/4284_plain_t-shirt_2048x2048_85d.webp";
import { Button } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FiEdit2 } from "react-icons/fi";
import { FaRegEye, FaTrash } from "react-icons/fa";
import Badge from "../Badge";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";

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

const items = [
  {
    title: "New Orders",
    value: "1,390",
    icon: <AiTwotoneGift />,
    color: "#3872fa",
    bg: "#eaf0ff",
  },
  {
    title: "Sales",
    value: "$57,890",
    icon: <PiChartPieSliceFill />,
    color: "#1eae5f",
    bg: "#e7f8ee",
  },
  {
    title: "Revenue",
    value: "$12,390",
    icon: <FaLandmark />,
    color: "#7c3aed",
    bg: "#f2ebfe",
  },
  {
    title: "Total Products",
    value: "1,390",
    icon: <FaUserCircle />,
    color: "#7c3aed",
    bg: "#f2ebfe",
  },
];

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

const mockOrders = [
  {
    id: "#20241",
    paymentId: "PAY001",
    name: "John Doe",
    phone: "+1 234-567-8900",
    address: "123 Main Street\nNew York, NY 10001",
    status: "Delivered",
    products: [
      {
        productId: "PROD001",
        title: "VNEED Women Embroidered Rayon Kurta Pant Set",
        image: tShirtImage,
        quantity: 1,
        price: 58,
      },
    ],
  },
  {
    id: "#20242",
    paymentId: "PAY002",
    name: "Jane Smith",
    phone: "+1 234-567-8901",
    address: "456 Oak Avenue\nLos Angeles, CA 90001",
    status: "Pending",
    products: [
      {
        productId: "PROD002",
        title: "Premium Cotton T-Shirt",
        image: tShirtImage,
        quantity: 2,
        price: 35,
      },
    ],
  },
  {
    id: "#20243",
    paymentId: "PAY003",
    name: "Bob Johnson",
    phone: "+1 234-567-8902",
    address: "789 Pine Road\nChicago, IL 60601",
    status: "Processing",
    products: [
      {
        productId: "PROD003",
        title: "Casual Wear T-Shirt",
        image: tShirtImage,
        quantity: 1,
        price: 40,
      },
    ],
  },
];

const salesChartData = [
  { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
  { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
  { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
  { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
  { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
  { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
  { name: "Page G", uv: 3490, pv: 4300, amt: 2100 },
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

const DashBoardBoxes = () => {
  const userName = "Cameron";
  const [isOpenOrderedProduct, setIsOpenOrderedProduct] = useState<
    number | null
  >(null);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const itemsPerPage = 5;

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const toggleOrderedProduct = (index: number) => {
    setIsOpenOrderedProduct(isOpenOrderedProduct === index ? null : index);
  };

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

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1); // reset to first page whenever the filter changes
  };

  // Derive the unique list of sub-categories from the data so the dropdown
  // stays in sync if mockProducts changes.
  const subCategoryOptions = Array.from(
    new Set(mockProducts.map((p) => p.subCategory)),
  );

  const filteredProducts =
    selectedCategory === "All"
      ? mockProducts
      : mockProducts.filter((p) => p.subCategory === selectedCategory);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  const allSelectedOnPage =
    paginatedProducts.length > 0 &&
    paginatedProducts.every((p) => selectedProducts.includes(p.id));

  return (
    <div>
      {/* Greeting bar */}
      <div className="bg-white py-2 rounded-md border border-[rgba(0,0,0,0.1)] p-5 mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-[35px] font-medium text-gray-800">
            {getGreeting()}, {userName}
          </h2>

          <p className="text-gray-500 mt-2">
            Here's what's happening on your store today. See the statistics at
            once.
          </p>
          <br />
          <Button className="btn-blue !capitalize">
            <FaPlus /> Add Product
          </Button>
        </div>

        <img
          src={shopIllustration}
          alt="Shop illustration"
          className="w-[200px]"
        />
      </div>

      {/* Stats slider */}
      <div className="relative mb-5">
        <Swiper
          navigation={{
            nextEl: ".dashboard-next",
            prevEl: ".dashboard-prev",
          }}
          modules={[Navigation]}
          className="dashboardBoxesSlider"
          slidesPerView={1}
          spaceBetween={16}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 16 },
            1024: { slidesPerView: 4, spaceBetween: 20 },
          }}
        >
          {items.map((it, idx) => (
            <SwiperSlide key={idx}>
              <div className="box bg-white p-5 cursor-pointer hover:bg-white rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-3">
                <div
                  className="w-10 h-10 flex items-center justify-center rounded-md flex-shrink-0 text-[20px]"
                  style={{ backgroundColor: it.bg, color: it.color }}
                >
                  {it.icon}
                </div>

                <div className="info flex-1">
                  <h3 className="text-[13px] text-gray-500">{it.title}</h3>
                  <b className="text-[16px]">{it.value}</b>
                </div>

                <IoStatsChartSharp
                  className="text-[26px] flex-shrink-0"
                  style={{ color: it.color }}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <button className="dashboard-prev absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 hover:bg-gray-100">
          <IoChevronBack className="text-[20px]" />
        </button>
        <button className="dashboard-next absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 hover:bg-gray-100">
          <IoChevronForward className="text-[20px]" />
        </button>
      </div>

      {/* Products (single, unified MUI table — replaces the old duplicate plain-table + placeholder-MUI-table pair) */}
      <div className="bg-white rounded-md border border-[rgba(0,0,0,0.1)] p-5 mb-5">
        {/* Header: title + Export/Add Product actions */}
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <h2 className="text-[20px] font-bold text-gray-900">
            Products{" "}
            <span className="text-gray-400 font-normal text-[14px]">
              (Tailwind Css Table)
            </span>
          </h2>

          <div className="flex items-center gap-3">
            <Button
              onClick={handleExport}
              className="!bg-[#1eae5f] !capitalize !text-white !px-5 !py-2 !rounded-md hover:!bg-[#189951]"
            >
              Export
            </Button>
            <Button className="!bg-[#3872fa] !capitalize !text-white !px-5 !py-2 !rounded-md hover:!bg-[#2d5fd6]">
              <FaPlus className="mr-1 text-[13px]" /> Add Product
            </Button>
          </div>
        </div>

        {/* Category filter */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category By
          </label>
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="w-[200px] border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="All">All</option>
            {subCategoryOptions.map((sub) => (
              <option key={sub} value={sub}>
                {sub}
              </option>
            ))}
          </select>
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
                      <div className="flex items-center justify-end gap-3">
                        <button
                          className="text-gray-500 hover:text-[#3872fa] transition-colors"
                          title="Edit"
                        >
                          <FiEdit2 className="text-[16px]" />
                        </button>
                        <button
                          className="text-gray-500 hover:text-[#3872fa] transition-colors"
                          title="View"
                        >
                          <FaRegEye className="text-[16px]" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="text-gray-500 hover:text-red-600 transition-colors"
                          title="Delete"
                        >
                          <FaTrash className="text-[16px]" />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <div className="mt-6 px-4">
          <div className="text-sm text-gray-600 mb-4">
            {filteredProducts.length === 0
              ? "No products to show"
              : `Showing ${startIndex + 1} to ${Math.min(
                  endIndex,
                  filteredProducts.length,
                )} of ${filteredProducts.length} products`}
          </div>
          <Stack spacing={2}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(event, value) => setCurrentPage(value)}
              color="primary"
              size="medium"
            />
          </Stack>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-md border border-[rgba(0,0,0,0.1)] p-5">
        <h2 className="text-[18px] font-medium text-gray-800 mb-4">
          Recent Orders
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-600">
            <thead className="bg-gray-50 text-[12px] font-bold uppercase text-gray-700">
              <tr>
                <th className="w-[50px] px-4 py-4"></th>
                <th className="px-4 py-4">ORDER ID</th>
                <th className="px-4 py-4">PAYMENT ID</th>
                <th className="px-4 py-4">NAME</th>
                <th className="px-4 py-4">PHONE NUMBER</th>
                <th className="px-4 py-4">ADDRESS</th>
                <th className="px-4 py-4">STATUS</th>
              </tr>
            </thead>

            <tbody>
              {mockOrders.map((order, index) => (
                <React.Fragment key={order.id}>
                  {/* Main Order Row */}
                  <tr className="border-b hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-4">
                      <button
                        onClick={() => toggleOrderedProduct(index)}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
                      >
                        {isOpenOrderedProduct === index ? (
                          <IoIosArrowUp className="text-lg" />
                        ) : (
                          <IoIosArrowDown className="text-lg" />
                        )}
                      </button>
                    </td>
                    <td className="px-4 py-4 font-medium text-[#e58f82]">
                      {order.id}
                    </td>
                    <td className="px-4 py-4 font-medium text-[#e58f82]">
                      {order.paymentId}
                    </td>
                    <td className="px-4 py-4 font-medium text-gray-700 uppercase">
                      {order.name}
                    </td>
                    <td className="px-4 py-4 text-gray-600">{order.phone}</td>
                    <td className="px-4 py-4 text-gray-600 whitespace-pre-line">
                      {order.address}
                    </td>
                    <td className="px-4 py-4">
                      <Badge status={order.status} />
                    </td>
                  </tr>

                  {/* Collapsible Product Details Row */}
                  {isOpenOrderedProduct === index && (
                    <tr>
                      <td colSpan={7} className="p-0 border-b bg-gray-50/50">
                        <div className="py-3 px-6">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="bg-gray-100/60 text-[11px] font-bold uppercase text-gray-600">
                                <th className="px-4 py-3 text-left">
                                  PRODUCT ID
                                </th>
                                <th className="px-4 py-3 text-left">
                                  PRODUCT TITLE
                                </th>
                                <th className="px-4 py-3 text-center">IMAGE</th>
                                <th className="px-4 py-3 text-center">
                                  QUANTITY
                                </th>
                                <th className="px-4 py-3 text-right">PRICE</th>
                              </tr>
                            </thead>
                            <tbody>
                              {order.products.map((product, pIdx) => (
                                <tr
                                  key={pIdx}
                                  className="border-b border-gray-100 last:border-0"
                                >
                                  <td className="px-4 py-3 font-medium text-[#e58f82]">
                                    {product.productId}
                                  </td>
                                  <td className="px-4 py-3 text-gray-700">
                                    {product.title}
                                  </td>
                                  <td className="px-4 py-3 text-center">
                                    <img
                                      src={product.image}
                                      alt={product.title}
                                      className="w-10 h-10 object-cover rounded-md mx-auto border"
                                    />
                                  </td>
                                  <td className="px-4 py-3 text-center font-medium text-gray-700">
                                    {product.quantity}
                                  </td>
                                  <td className="px-4 py-3 text-right font-semibold text-gray-900">
                                    Rs. {product.price.toLocaleString()}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Sales Analytics */}
      <div className="bg-white rounded-md border border-[rgba(0,0,0,0.1)] p-5 mt-5">
        <h2 className="text-[18px] font-medium text-gray-800 mb-4">
          Sales Analytics
        </h2>

        <style>{`
          .recharts-wrapper:focus,
          .recharts-wrapper *:focus,
          .recharts-surface:focus {
            outline: none !important;
          }
        `}</style>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart
            data={salesChartData}
            margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="name" stroke="#9ca3af" axisLine={false} tickLine={false} />
            <YAxis stroke="#9ca3af" axisLine={false} tickLine={false} />
            <Tooltip
              cursor={{ stroke: "#e5e7eb" }}
              contentStyle={{
                backgroundColor: "#ffffff",
                borderColor: "#e5e7eb",
                borderRadius: 8,
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="pv"
              stroke="#3872fa"
              dot={{ fill: "#ffffff" }}
              activeDot={{ r: 8, stroke: "#ffffff" }}
            />
            <Line
              type="monotone"
              dataKey="uv"
              stroke="#1eae5f"
              dot={{ fill: "#ffffff" }}
              activeDot={{ stroke: "#ffffff" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashBoardBoxes;