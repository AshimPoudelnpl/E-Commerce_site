import { useState } from "react";
import "./style.css";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Slider from "@mui/material/Slider";
import Rating from "@mui/material/Rating";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { Collapse } from "react-collapse";

type SidebarProps = {
  onFilterChange?: (filters: {
    categories: string[];
    rating: number | null;
    priceRange: number[];
  }) => void;
};

const categories = [
  "Fashion",
  "Electronics",
  "Home & Kitchen",
  "Beauty",
  "Bags",
  "Shoes",
  "Sandals",
  "Jewellery",
];

function Sidebar({ onFilterChange }: SidebarProps) {
  const [open, setOpen] = useState({
    category: true,
    rating: true,
    price: true,
  });
  const [priceRange, setPriceRange] = useState<number[]>([100, 5000]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const emit = (
    nextCategories = selectedCategories,
    nextRating = selectedRating,
    nextPriceRange = priceRange,
  ) => {
    onFilterChange?.({
      categories: nextCategories,
      rating: nextRating,
      priceRange: nextPriceRange,
    });
  };

  const toggleCategory = (category: string) => {
    const next = selectedCategories.includes(category)
      ? selectedCategories.filter((value) => value !== category)
      : [...selectedCategories, category];
    setSelectedCategories(next);
    emit(next);
  };

  const toggleSection = (section: keyof typeof open) =>
    setOpen((current) => ({ ...current, [section]: !current[section] }));

  return (
    <aside className="sidebar py-5">
      <div className="box">
        <h3 className="mb-3 text-[16px] font-[600] flex items-center justify-between">
          Shop by Category
          <Button
            aria-label="Toggle category filter"
            className="w-[30px] h-[30px] min-w-[30px] rounded-full"
            onClick={() => toggleSection("category")}
          >
            {open.category ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </Button>
        </h3>
        <Collapse isOpened={open.category}>
          <div className="scroll px-2">
            {categories.map((category) => (
              <FormControlLabel
                key={category}
                control={
                  <Checkbox
                    checked={selectedCategories.includes(category)}
                    onChange={() => toggleCategory(category)}
                  />
                }
                label={category}
                className="w-full"
              />
            ))}
          </div>
        </Collapse>
      </div>

      <div className="box">
        <h3 className="mb-3 text-[16px] font-[600] flex items-center justify-between">
          Filter by Rating
          <Button
            aria-label="Toggle rating filter"
            className="w-[30px] h-[30px] min-w-[30px] rounded-full"
            onClick={() => toggleSection("rating")}
          >
            {open.rating ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </Button>
        </h3>
        <Collapse isOpened={open.rating}>
          <div className="ratingFilter">
            {[5, 4, 3, 2, 1].map((rating) => (
              <button
                type="button"
                key={rating}
                className={`ratingRow ${selectedRating === rating ? "selected" : ""}`}
                onClick={() => {
                  const next = selectedRating === rating ? null : rating;
                  setSelectedRating(next);
                  emit(selectedCategories, next);
                }}
              >
                <Rating value={rating} readOnly size="small" />
              </button>
            ))}
          </div>
        </Collapse>
      </div>

      <div className="box mt-3">
        <h3 className="w-full mb-3 text-[16px] font-[600] flex items-center justify-between">
          Filter by Price
          <Button
            aria-label="Toggle price filter"
            className="w-[30px] h-[30px] min-w-[30px] rounded-full"
            onClick={() => toggleSection("price")}
          >
            {open.price ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </Button>
        </h3>
        <Collapse isOpened={open.price}>
          <div className="px-1">
            <Slider
              value={priceRange}
              onChange={(_event, value) => {
                const next = value as number[];
                setPriceRange(next);
                emit(selectedCategories, selectedRating, next);
              }}
              min={100}
              max={5000}
              step={100}
              valueLabelDisplay="off"
              sx={{ color: "#ff6347" }}
            />
            <div className="flex pt-2 pb-2 priceRange text-[13px]">
              <span>
                From: <strong>Rs: {priceRange[0]}</strong>
              </span>
              <span className="ml-auto">
                To: <strong>Rs: {priceRange[1]}</strong>
              </span>
            </div>
          </div>
        </Collapse>
      </div>
    </aside>
  );
}

export default Sidebar;
