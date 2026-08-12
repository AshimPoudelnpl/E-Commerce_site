import React, { useState } from "react";
import "./style.css";

import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Slider from "@mui/material/Slider";
import Rating from "@mui/material/Rating";

import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { Collapse } from "react-collapse";

function Sidebar() {
  const [isOpenCategoryFilter, setIsOpenCategoryFilter] = useState(true);
  const [isOpenAvailFilter, setIsOpenAvailFilter] = useState(true);
  const [isOpenSizeFilter, setIsOpenSizeFilter] = useState(true);
  const [isOpenRatingFilter, setIsOpenRatingFilter] = useState(true);

  const [priceRange, setPriceRange] = useState<number[]>([100, 1000]);

  const handlePriceChange = (_event: any, newValue: number | number[]) => {
    setPriceRange(newValue as number[]);
  };

  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  return (
    <aside className="sidebar py-5">
      <div className="box">
        <h3 className="mb-3 text-[16px] font-[600] flex items-center justify-between">
          Shop by Category
          <Button
            className="w-[30px] h-[30px] min-w-[30px] rounded-full"
            onClick={() => setIsOpenCategoryFilter(!isOpenCategoryFilter)}
          >
            {isOpenCategoryFilter ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </Button>
        </h3>

        <Collapse isOpened={isOpenCategoryFilter}>
          <div className="scroll px-2">
            <FormControlLabel
              control={<Checkbox />}
              label="Fashion"
              className="w-full"
            />

            <FormControlLabel
              control={<Checkbox />}
              label="Electronics"
              className="w-full"
            />

            <FormControlLabel
              control={<Checkbox />}
              label="Home & Kitchen"
              className="w-full"
            />

            <FormControlLabel
              control={<Checkbox />}
              label="Beauty"
              className="w-full"
            />

            <FormControlLabel
              control={<Checkbox />}
              label="Bags"
              className="w-full"
            />

            <FormControlLabel
              control={<Checkbox />}
              label="Shoes"
              className="w-full"
            />

            <FormControlLabel
              control={<Checkbox />}
              label="Sandals"
              className="w-full"
            />

            <FormControlLabel
              control={<Checkbox />}
              label="Jewellery"
              className="w-full"
            />
          </div>
        </Collapse>
      </div>

      <div className="box">
        <h3 className="mb-3 text-[16px] font-[600] flex items-center justify-between">
          Shop by Availability
          <Button
            className="w-[30px] h-[30px] min-w-[30px] rounded-full"
            onClick={() => setIsOpenAvailFilter(!isOpenAvailFilter)}
          >
            {isOpenAvailFilter ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </Button>
        </h3>

        <Collapse isOpened={isOpenAvailFilter}>
          <div className="scroll px-2">
            <FormControlLabel
              control={<Checkbox />}
              label="In Stock"
              className="w-full"
            />

            <FormControlLabel
              control={<Checkbox />}
              label="Out of Stock"
              className="w-full"
            />
          </div>
        </Collapse>
      </div>

      <div className="box">
        <h3 className="mb-3 text-[16px] font-[600] flex items-center justify-between">
          Shop by Size
          <Button
            className="w-[30px] h-[30px] min-w-[30px] rounded-full"
            onClick={() => setIsOpenSizeFilter(!isOpenSizeFilter)}
          >
            {isOpenSizeFilter ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </Button>
        </h3>

        <Collapse isOpened={isOpenSizeFilter}>
          <div className="scroll px-2">
            <FormControlLabel
              control={<Checkbox />}
              label="Small"
              className="w-full"
            />

            <FormControlLabel
              control={<Checkbox />}
              label="Medium"
              className="w-full"
            />

            <FormControlLabel
              control={<Checkbox />}
              label="Large"
              className="w-full"
            />

            <FormControlLabel
              control={<Checkbox />}
              label="XL"
              className="w-full"
            />
          </div>
        </Collapse>
      </div>

      <div className="box">
        <h3 className="mb-3 text-[16px] font-[600] flex items-center justify-between">
          Filter By Rating
          <Button
            className="w-[30px] h-[30px] min-w-[30px] rounded-full"
            onClick={() => setIsOpenRatingFilter(!isOpenRatingFilter)}
          >
            {isOpenRatingFilter ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </Button>
        </h3>

        <Collapse isOpened={isOpenRatingFilter}>
          <div className="ratingFilter">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div
                key={rating}
                className={`ratingRow ${
                  selectedRating === rating ? "selected" : ""
                }`}
                onClick={() => setSelectedRating(rating)}
              >
                <Rating value={rating} readOnly size="small" />
              </div>
            ))}
          </div>
        </Collapse>
      </div>

      <div className="box mt-3">
        <h3 className="w-full mb-3 text-[16px] font-[600]">Filter By Price</h3>

        <div className="px-1">
          <Slider
            value={priceRange}
            onChange={handlePriceChange}
            min={100}
            max={5000}
            step={100}
            valueLabelDisplay="off"
            sx={{
              color: "#ff6347",
              height: 4,

              "& .MuiSlider-thumb": {
                width: 14,
                height: 14,
                backgroundColor: "#ff6347",
              },

              "& .MuiSlider-track": {
                height: 4,
              },

              "& .MuiSlider-rail": {
                height: 4,
                backgroundColor: "#ddd",
              },
            }}
          />

          <div className="flex pt-2 pb-2 priceRange text-[13px]">
            <span>
              From: <strong className="text-dark">Rs: {priceRange[0]}</strong>
            </span>

            <span className="ml-auto">
              To: <strong className="text-dark">Rs: {priceRange[1]}</strong>
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
