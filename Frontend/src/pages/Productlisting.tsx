import React, { useState, useMemo, useEffect, useContext } from "react";
import { useParams, useLocation, Link as RouterLink, useNavigate } from "react-router-dom";
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
import FilterListIcon from "@mui/icons-material/FilterList";
import Drawer from "@mui/material/Drawer";
import Pagination from "@mui/material/Pagination";
import Chip from "@mui/material/Chip";

import ProductItems from "../components/ProductItems";
import { MyContext } from "../context/MyContext";
import type { Product } from "../types/product";

function Productlisting() {
  const { categorySlug, subCategorySlug, subCategory } = useParams<{
    categorySlug?: string;
    subCategorySlug?: string;
    subCategory?: string;
  }>();

  const location = useLocation();
  const navigate = useNavigate();
  const context = useContext(MyContext);
  const allProducts: Product[] = useMemo(() => context.products || [], [context.products]);

  // Parse search query from URL ?search=...
  const queryParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const urlSearchTerm = queryParams.get("search") || "";

  // Determine current active category from pathname or params
  const currentPathCategory = useMemo(() => {
    if (categorySlug) return categorySlug.toLowerCase();
    const cleanPath = location.pathname.replace(/^\//, "").split("/")[0].toLowerCase();
    const known = [
      "fashion",
      "electronics",
      "home-kitchen",
      "beauty",
      "bags",
      "shoes",
      "footwear",
      "sandals",
      "jewellery",
      "groceries",
      "wellness",
    ];
    if (known.includes(cleanPath)) return cleanPath === "footwear" ? "shoes" : cleanPath;
    return "";
  }, [categorySlug, location.pathname]);

  const activeSubCategory = subCategorySlug || subCategory || "";

  // Filter States
  const [selectedCategories, setSelectedCategories] = useState<string[]>(() =>
    currentPathCategory ? [currentPathCategory] : []
  );
  const [priceRange, setPriceRange] = useState<number[]>([100, 90000]);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("sales-desc");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [page, setPage] = useState<number>(1);
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);
  const itemsPerPage = 12;

  // Sync category filter with route changes
  useEffect(() => {
    if (currentPathCategory) {
      setSelectedCategories([currentPathCategory]);
    } else if (location.pathname === "/products" || location.pathname === "/productlisting") {
      // allow empty if coming to all products
    }
    setPage(1);
  }, [currentPathCategory, location.pathname]);

  // Compute category counts dynamically
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const p of allProducts) {
      const slug = p.categorySlug || p.category.toLowerCase().replace(/\s+/g, "-");
      counts[slug] = (counts[slug] || 0) + 1;
    }
    return counts;
  }, [allProducts]);

  // Compute available brands
  const availableBrands = useMemo(() => {
    const brandSet = new Set<string>();
    for (const p of allProducts) {
      if (p.brand) brandSet.add(p.brand);
    }
    return Array.from(brandSet).sort();
  }, [allProducts]);

  const handleCategoryToggle = (slug: string) => {
    setSelectedCategories((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
    setPage(1);
  };

  const handleResetFilters = () => {
    setSelectedCategories([]);
    setPriceRange([100, 90000]);
    setInStockOnly(false);
    setSelectedRating(null);
    setSelectedBrand("");
    setPage(1);
    if (urlSearchTerm) {
      navigate("/products");
    }
  };

  // Filter & Sort Products
  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    // Search filter
    if (urlSearchTerm.trim()) {
      const q = urlSearchTerm.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand?.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.subCategory?.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (selectedCategories.length > 0) {
      result = result.filter((p) => {
        const pSlug = p.categorySlug?.toLowerCase() || p.category.toLowerCase().replace(/\s+/g, "-");
        return selectedCategories.includes(pSlug);
      });
    }

    // Subcategory filter (if URL specifies a subcategory)
    if (activeSubCategory) {
      const subNorm = activeSubCategory.toLowerCase();
      result = result.filter(
        (p) =>
          p.subCategorySlug?.toLowerCase() === subNorm ||
          p.subCategory?.toLowerCase().replace(/\s+/g, "-") === subNorm
      );
    }

    // Price range
    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Stock
    if (inStockOnly) {
      result = result.filter((p) => p.countInStock > 0);
    }

    // Rating
    if (selectedRating !== null) {
      result = result.filter((p) => p.rating >= selectedRating);
    }

    // Brand
    if (selectedBrand) {
      result = result.filter((p) => p.brand === selectedBrand);
    }

    // Sorting
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating-desc":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "sales-asc":
        result.sort((a, b) => (a.sales || 0) - (b.sales || 0));
        break;
      case "newest":
        result.sort((a, b) => b.id - a.id);
        break;
      case "sales-desc":
      default:
        result.sort((a, b) => (b.sales || 0) - (a.sales || 0));
        break;
    }

    return result;
  }, [
    allProducts,
    urlSearchTerm,
    selectedCategories,
    activeSubCategory,
    priceRange,
    inStockOnly,
    selectedRating,
    selectedBrand,
    sortBy,
  ]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, page, itemsPerPage]);

  const handleSortChange = (event: SelectChangeEvent) => {
    setSortBy(event.target.value);
    setPage(1);
  };

  // Human category title
  const currentCategoryTitle = useMemo(() => {
    if (selectedCategories.length === 1) {
      const match = context.categories?.find((c) => c.slug === selectedCategories[0]);
      return match ? match.name : selectedCategories[0].toUpperCase();
    }
    if (selectedCategories.length > 1) {
      return `${selectedCategories.length} Categories Selected`;
    }
    if (urlSearchTerm) {
      return `Search: "${urlSearchTerm}"`;
    }
    return "All Products";
  }, [selectedCategories, context.categories, urlSearchTerm]);

  return (
    <section className="py-6 bg-[#fbfbfb] min-h-[80vh]">
      <div className="container">
        {/* Breadcrumbs */}
        <div role="presentation" className="mb-4">
          <Breadcrumbs aria-label="breadcrumb">
            <Link component={RouterLink} underline="hover" color="inherit" to="/">
              Home
            </Link>
            <Link component={RouterLink} underline="hover" color="inherit" to="/products">
              Products
            </Link>
            {selectedCategories.length === 1 && (
              <Typography sx={{ color: "text.primary", textTransform: "capitalize" }}>
                {currentCategoryTitle}
              </Typography>
            )}
            {activeSubCategory && (
              <Typography sx={{ color: "text.primary", textTransform: "capitalize" }}>
                {activeSubCategory}
              </Typography>
            )}
          </Breadcrumbs>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Desktop Sidebar */}
          <div className="sidebarWrapper hidden lg:block w-[260px] flex-shrink-0 bg-white p-4 rounded-xl border border-gray-200 shadow-xs sticky top-20">
            <Sidebar
              selectedCategories={selectedCategories}
              onCategoryToggle={handleCategoryToggle}
              priceRange={priceRange}
              onPriceChange={setPriceRange}
              selectedRating={selectedRating}
              onRatingSelect={setSelectedRating}
              inStockOnly={inStockOnly}
              onInStockToggle={() => setInStockOnly(!inStockOnly)}
              selectedBrand={selectedBrand}
              onBrandSelect={setSelectedBrand}
              onResetAll={handleResetFilters}
              categoryCounts={categoryCounts}
              brands={availableBrands}
            />
          </div>

          {/* Mobile Filter Drawer */}
          <Drawer
            anchor="left"
            open={mobileFilterOpen}
            onClose={() => setMobileFilterOpen(false)}
          >
            <div className="w-[280px] p-5 h-full overflow-y-auto">
              <div className="flex items-center justify-between border-b pb-3 mb-3">
                <h3 className="font-bold text-gray-800 text-lg">Filters</h3>
                <button
                  type="button"
                  onClick={() => setMobileFilterOpen(false)}
                  className="text-gray-500 hover:text-black font-semibold text-sm"
                >
                  Close
                </button>
              </div>
              <Sidebar
                selectedCategories={selectedCategories}
                onCategoryToggle={handleCategoryToggle}
                priceRange={priceRange}
                onPriceChange={setPriceRange}
                selectedRating={selectedRating}
                onRatingSelect={setSelectedRating}
                inStockOnly={inStockOnly}
                onInStockToggle={() => setInStockOnly(!inStockOnly)}
                selectedBrand={selectedBrand}
                onBrandSelect={setSelectedBrand}
                onResetAll={handleResetFilters}
                categoryCounts={categoryCounts}
                brands={availableBrands}
              />
            </div>
          </Drawer>

          {/* Main Content */}
          <div className="rightContent flex-1 w-full">
            {/* Top Toolbar */}
            <div className="bg-white p-3 sm:p-4 rounded-xl border border-gray-200 shadow-xs flex flex-wrap items-center justify-between gap-3 mb-5">
              <div className="flex items-center gap-3">
                {/* Mobile Filter Trigger */}
                <Button
                  onClick={() => setMobileFilterOpen(true)}
                  startIcon={<FilterListIcon />}
                  className="lg:!hidden !bg-gray-100 !text-gray-700 !capitalize !text-xs !py-1.5"
                >
                  Filters
                </Button>

                <div className="hidden sm:flex items-center gap-1 border border-gray-200 rounded-lg p-0.5 bg-gray-50">
                  <Button
                    className={`!min-w-[32px] !w-[32px] !h-[32px] !rounded-md ${
                      viewMode === "grid"
                        ? "!bg-white !text-black !shadow-xs"
                        : "!text-gray-400 hover:!text-gray-600"
                    }`}
                    onClick={() => setViewMode("grid")}
                    title="Grid View"
                  >
                    <GridViewIcon className="!text-[18px]" />
                  </Button>
                  <Button
                    className={`!min-w-[32px] !w-[32px] !h-[32px] !rounded-md ${
                      viewMode === "list"
                        ? "!bg-white !text-black !shadow-xs"
                        : "!text-gray-400 hover:!text-gray-600"
                    }`}
                    onClick={() => setViewMode("list")}
                    title="List View"
                  >
                    <ReorderIcon className="!text-[18px]" />
                  </Button>
                </div>

                <span className="text-xs sm:text-sm text-gray-500 font-medium">
                  Showing <strong className="text-gray-900">{filteredProducts.length}</strong> products
                </span>
              </div>

              {/* Sort By Dropdown */}
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm text-gray-500 font-medium whitespace-nowrap">
                  Sort By:
                </span>
                <Select
                  value={sortBy}
                  onChange={handleSortChange}
                  size="small"
                  className="!bg-white !rounded-lg"
                  sx={{
                    minWidth: { xs: 150, sm: 200 },
                    fontSize: "13px",
                    fontWeight: 500,
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#e5e7eb",
                    },
                  }}
                >
                  <MenuItem value="sales-desc">Sales: High to Low</MenuItem>
                  <MenuItem value="price-asc">Price: Low to High</MenuItem>
                  <MenuItem value="price-desc">Price: High to Low</MenuItem>
                  <MenuItem value="rating-desc">Highest Rated</MenuItem>
                  <MenuItem value="newest">Newest First</MenuItem>
                </Select>
              </div>
            </div>

            {/* Active Filter Chips */}
            {(selectedCategories.length > 0 || selectedBrand || selectedRating !== null || inStockOnly || urlSearchTerm) && (
              <div className="flex items-center gap-2 flex-wrap mb-4 px-1">
                <span className="text-xs text-gray-500 font-medium">Filtered by:</span>
                {urlSearchTerm && (
                  <Chip
                    label={`Search: "${urlSearchTerm}"`}
                    size="small"
                    onDelete={() => navigate("/products")}
                    className="!bg-gray-200 !text-xs"
                  />
                )}
                {selectedCategories.map((c) => (
                  <Chip
                    key={c}
                    label={`Category: ${c}`}
                    size="small"
                    onDelete={() => handleCategoryToggle(c)}
                    className="!bg-red-50 !text-[#ff5252] !font-medium !text-xs !border !border-red-200"
                  />
                ))}
                {selectedBrand && (
                  <Chip
                    label={`Brand: ${selectedBrand}`}
                    size="small"
                    onDelete={() => setSelectedBrand("")}
                    className="!bg-blue-50 !text-blue-600 !font-medium !text-xs"
                  />
                )}
                {selectedRating !== null && (
                  <Chip
                    label={`Rating: ${selectedRating}★ & Up`}
                    size="small"
                    onDelete={() => setSelectedRating(null)}
                    className="!bg-amber-50 !text-amber-700 !font-medium !text-xs"
                  />
                )}
                {inStockOnly && (
                  <Chip
                    label="In Stock"
                    size="small"
                    onDelete={() => setInStockOnly(false)}
                    className="!bg-green-50 !text-green-700 !font-medium !text-xs"
                  />
                )}
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="text-xs text-[#ff5252] font-semibold hover:underline ml-1 cursor-pointer"
                >
                  Reset all
                </button>
              </div>
            )}

            {/* Products Display */}
            {paginatedProducts.length === 0 ? (
              <div className="bg-white rounded-xl border border-gray-200 p-12 text-center my-6">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4 text-gray-400 text-2xl">
                  🔍
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-1">No products found</h3>
                <p className="text-sm text-gray-500 mb-5 max-w-md mx-auto">
                  We couldn't find any products matching your current filters. Try changing or clearing your filters to see more results.
                </p>
                <Button
                  onClick={handleResetFilters}
                  variant="contained"
                  className="!bg-[#ff5252] hover:!bg-[#e04545] !text-white !capitalize !px-6 !rounded-lg"
                >
                  Clear All Filters
                </Button>
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                {paginatedProducts.map((product) => (
                  <div key={product.id} className="h-full">
                    <ProductItems {...product} view="grid" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {paginatedProducts.map((product) => (
                  <ProductItems key={product.id} {...product} view="list" />
                ))}
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-8 pt-4 border-t border-gray-200">
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={(_e, p) => {
                    setPage(p);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  color="primary"
                  sx={{
                    "& .Mui-selected": {
                      backgroundColor: "#ff5252 !important",
                      color: "white",
                    },
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Productlisting;
