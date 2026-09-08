import React, { useState, useContext } from "react";
import "./style.css";

import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Slider from "@mui/material/Slider";
import Rating from "@mui/material/Rating";
import Chip from "@mui/material/Chip";

import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { Collapse } from "react-collapse";
import { MyContext } from "../../context/MyContext";

interface SidebarProps {
  selectedCategories?: string[];
  onCategoryToggle?: (catSlug: string) => void;
  priceRange?: number[];
  onPriceChange?: (val: number[]) => void;
  selectedRating?: number | null;
  onRatingSelect?: (rating: number | null) => void;
  inStockOnly?: boolean;
  onInStockToggle?: () => void;
  selectedBrand?: string;
  onBrandSelect?: (brand: string) => void;
  onResetAll?: () => void;
  categoryCounts?: Record<string, number>;
  brands?: string[];
}

function Sidebar({
  selectedCategories = [],
  onCategoryToggle,
  priceRange = [100, 90000],
  onPriceChange,
  selectedRating = null,
  onRatingSelect,
  inStockOnly = false,
  onInStockToggle,
  selectedBrand = "",
  onBrandSelect,
  onResetAll,
  categoryCounts = {},
  brands = [],
}: SidebarProps) {
  const context = useContext(MyContext);
  const categories = context.categories || [];

  const [isOpenCategoryFilter, setIsOpenCategoryFilter] = useState(true);
  const [isOpenAvailFilter, setIsOpenAvailFilter] = useState(true);
  const [isOpenBrandFilter, setIsOpenBrandFilter] = useState(true);
  const [isOpenRatingFilter, setIsOpenRatingFilter] = useState(true);
  const [isOpenPriceFilter, setIsOpenPriceFilter] = useState(true);

  const handleSliderChange = (_event: any, newValue: number | number[]) => {
    if (onPriceChange) {
      onPriceChange(newValue as number[]);
    }
  };

  const hasActiveFilters =
    selectedCategories.length > 0 ||
    inStockOnly ||
    selectedRating !== null ||
    selectedBrand !== "" ||
    priceRange[0] > 100 ||
    priceRange[1] < 90000;

  return (
    <aside className="sidebar py-2">
      {/* Active Filter Header */}
      {hasActiveFilters && (
        <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-md flex items-center justify-between">
          <span className="text-xs font-semibold text-[#ff5252]">Active Filters</span>
          <button
            type="button"
            onClick={onResetAll}
            className="text-xs text-gray-700 hover:text-red-600 underline font-medium cursor-pointer"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Shop by Category */}
      <div className="box border-b border-gray-100 pb-3 mb-3">
        <h3 className="mb-2 text-[15px] font-[600] text-gray-800 flex items-center justify-between">
          Shop by Category
          <Button
            className="w-[28px] h-[28px] min-w-[28px] !rounded-full !text-gray-500"
            onClick={() => setIsOpenCategoryFilter(!isOpenCategoryFilter)}
          >
            {isOpenCategoryFilter ? <IoIosArrowUp size={16} /> : <IoIosArrowDown size={16} />}
          </Button>
        </h3>

        <Collapse isOpened={isOpenCategoryFilter}>
          <div className="space-y-1 max-h-[260px] overflow-y-auto pr-1">
            {categories.map((cat) => {
              const isChecked = selectedCategories.includes(cat.slug);
              const count = categoryCounts[cat.slug] || 0;
              return (
                <div
                  key={cat.slug}
                  onClick={() => onCategoryToggle?.(cat.slug)}
                  className="flex items-center justify-between hover:bg-gray-50 px-2 py-1 rounded cursor-pointer transition-colors"
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        size="small"
                        checked={isChecked}
                        onChange={() => onCategoryToggle?.(cat.slug)}
                        sx={{
                          color: "#9ca3af",
                          "&.Mui-checked": { color: "#ff5252" },
                          padding: "4px",
                        }}
                      />
                    }
                    label={
                      <span className="text-xs sm:text-sm font-medium text-gray-700">
                        {cat.name}
                      </span>
                    }
                    className="!m-0"
                    onClick={(e) => e.stopPropagation()}
                  />
                  <span className="text-[11px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded font-medium">
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
        </Collapse>
      </div>

      {/* Filter By Price */}
      <div className="box border-b border-gray-100 pb-3 mb-3">
        <h3 className="mb-2 text-[15px] font-[600] text-gray-800 flex items-center justify-between">
          Filter By Price
          <Button
            className="w-[28px] h-[28px] min-w-[28px] !rounded-full !text-gray-500"
            onClick={() => setIsOpenPriceFilter(!isOpenPriceFilter)}
          >
            {isOpenPriceFilter ? <IoIosArrowUp size={16} /> : <IoIosArrowDown size={16} />}
          </Button>
        </h3>

        <Collapse isOpened={isOpenPriceFilter}>
          <div className="px-2 pt-2">
            <Slider
              value={priceRange}
              onChange={handleSliderChange}
              min={100}
              max={90000}
              step={100}
              valueLabelDisplay="auto"
              sx={{
                color: "#ff5252",
                height: 4,
                "& .MuiSlider-thumb": {
                  width: 14,
                  height: 14,
                  backgroundColor: "#ff5252",
                  "&:hover, &.Mui-focusVisible": {
                    boxShadow: "0 0 0 8px rgba(255, 82, 82, 0.16)",
                  },
                },
                "& .MuiSlider-rail": {
                  backgroundColor: "#e5e7eb",
                },
              }}
            />

            <div className="flex items-center justify-between pt-2 text-xs text-gray-600 font-medium">
              <span>Rs {priceRange[0]}</span>
              <span>Rs {priceRange[1]}</span>
            </div>
          </div>
        </Collapse>
      </div>

      {/* Shop by Availability */}
      <div className="box border-b border-gray-100 pb-3 mb-3">
        <h3 className="mb-2 text-[15px] font-[600] text-gray-800 flex items-center justify-between">
          Availability
          <Button
            className="w-[28px] h-[28px] min-w-[28px] !rounded-full !text-gray-500"
            onClick={() => setIsOpenAvailFilter(!isOpenAvailFilter)}
          >
            {isOpenAvailFilter ? <IoIosArrowUp size={16} /> : <IoIosArrowDown size={16} />}
          </Button>
        </h3>

        <Collapse isOpened={isOpenAvailFilter}>
          <div className="px-1">
            <FormControlLabel
              control={
                <Checkbox
                  size="small"
                  checked={inStockOnly}
                  onChange={onInStockToggle}
                  sx={{
                    color: "#9ca3af",
                    "&.Mui-checked": { color: "#ff5252" },
                    padding: "4px",
                  }}
                />
              }
              label={<span className="text-xs sm:text-sm text-gray-700">In Stock Only</span>}
            />
          </div>
        </Collapse>
      </div>

      {/* Filter by Brands */}
      {brands.length > 0 && (
        <div className="box border-b border-gray-100 pb-3 mb-3">
          <h3 className="mb-2 text-[15px] font-[600] text-gray-800 flex items-center justify-between">
            Brand
            <Button
              className="w-[28px] h-[28px] min-w-[28px] !rounded-full !text-gray-500"
              onClick={() => setIsOpenBrandFilter(!isOpenBrandFilter)}
            >
              {isOpenBrandFilter ? <IoIosArrowUp size={16} /> : <IoIosArrowDown size={16} />}
            </Button>
          </h3>

          <Collapse isOpened={isOpenBrandFilter}>
            <div className="space-y-1 max-h-[160px] overflow-y-auto px-1">
              {brands.map((b) => (
                <div
                  key={b}
                  onClick={() => onBrandSelect?.(selectedBrand === b ? "" : b)}
                  className={`px-2 py-1 rounded text-xs cursor-pointer flex items-center justify-between ${
                    selectedBrand === b
                      ? "bg-red-50 text-[#ff5252] font-semibold"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <span>{b}</span>
                  {selectedBrand === b && <span>✓</span>}
                </div>
              ))}
            </div>
          </Collapse>
        </div>
      )}

      {/* Filter By Rating */}
      <div className="box pb-2">
        <h3 className="mb-2 text-[15px] font-[600] text-gray-800 flex items-center justify-between">
          Customer Rating
          <Button
            className="w-[28px] h-[28px] min-w-[28px] !rounded-full !text-gray-500"
            onClick={() => setIsOpenRatingFilter(!isOpenRatingFilter)}
          >
            {isOpenRatingFilter ? <IoIosArrowUp size={16} /> : <IoIosArrowDown size={16} />}
          </Button>
        </h3>

        <Collapse isOpened={isOpenRatingFilter}>
          <div className="space-y-1 px-1">
            {[4, 3, 2, 1].map((rating) => {
              const isSelected = selectedRating === rating;
              return (
                <div
                  key={rating}
                  onClick={() => onRatingSelect?.(isSelected ? null : rating)}
                  className={`flex items-center gap-2 px-2 py-1 rounded cursor-pointer transition-colors ${
                    isSelected ? "bg-amber-50 border border-amber-200" : "hover:bg-gray-50"
                  }`}
                >
                  <Rating value={rating} readOnly size="small" sx={{ fontSize: "14px", color: "#f59e0b" }} />
                  <span className="text-xs text-gray-600 font-medium">& Up</span>
                </div>
              );
            })}
          </div>
        </Collapse>
      </div>
    </aside>
  );
}

export default Sidebar;
