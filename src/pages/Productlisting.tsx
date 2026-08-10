import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import type { SelectChangeEvent } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import ReorderIcon from "@mui/icons-material/Reorder";
import GridViewIcon from "@mui/icons-material/GridView";
import ProductItems from "../components/ProductItems";
import { products, type Product } from "../types/product";
import Pagination from "@mui/material/Pagination";

function Productlisting() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("sales-desc");

  const handleSortChange = (event: SelectChangeEvent) => {
    setSortBy(event.target.value);
  };

  return (
    <section className="py-8">
      <div className="container">
        <div role="presentation" className="mb-4">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              Home
            </Link>
            <Typography sx={{ color: "text.primary" }}>Products</Typography>
          </Breadcrumbs>
        </div>
        <div className="bg-white p-3">
          <div className="container flex gap-3">
            <div className="sidebarWrapper w-[20%] h-full">
              <Sidebar />
            </div>
            <div className="rightContent w-[80%]">
              {/* Toolbar */}
              <div className="topStrip bg-[#f1f1f1] p-3 rounded-md flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Button
                    className={`!min-w-[35px] !w-[35px] !h-[35px] !rounded-md ${
                      viewMode === "list"
                        ? "!bg-white !text-black !shadow-sm"
                        : "!text-gray-600"
                    }`}
                    onClick={() => setViewMode("list")}
                  >
                    <ReorderIcon className="!text-[20px]" />
                  </Button>
                  <Button
                    className={`!min-w-[35px] !w-[35px] !h-[35px] !rounded-md ${
                      viewMode === "grid"
                        ? "!bg-white !text-black !shadow-sm"
                        : "!text-gray-600"
                    }`}
                    onClick={() => setViewMode("grid")}
                  >
                    <GridViewIcon className="!text-[18px]" />
                  </Button>
                  <span className="text-[14px] text-gray-700">
                    There are {products.length} products.
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[14px] text-gray-700 whitespace-nowrap">
                    Sort By
                  </span>
                  <Select
                    value={sortBy}
                    onChange={handleSortChange}
                    size="small"
                    className="!bg-white"
                    sx={{
                      minWidth: 220,
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#e5e7eb",
                      },
                      fontSize: "14px",
                      fontWeight: 600,
                    }}
                  >
                    <MenuItem value="sales-desc">
                      Sales, Highest To Lowest
                    </MenuItem>
                    <MenuItem value="sales-asc">
                      Sales, Lowest To Highest
                    </MenuItem>
                    <MenuItem value="price-desc">Price, High To Low</MenuItem>
                    <MenuItem value="price-asc">Price, Low To High</MenuItem>
                    <MenuItem value="newest">Newest First</MenuItem>
                  </Select>
                </div>
              </div>

              {/* Product grid/list */}
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
                    : "flex flex-col gap-4"
                }
              >
                {products.map((product: Product) => (
                  <ProductItems key={product.id} {...product} view={viewMode} />
                ))}
              </div>
              <div className="paginationWrapper mt-8 flex items-center justify-center">

                <Pagination count={10} color="standard" />

              </div>

            </div>
          </div>
        </div>
       
      </div>
    </section>
  );
}

export default Productlisting;
