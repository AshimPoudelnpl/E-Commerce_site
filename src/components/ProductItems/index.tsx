import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { MdZoomOutMap } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { IoGitCompareOutline } from "react-icons/io5";

interface ProductItemsProps {
  id?: number;
  img?: string;
  img2?: string;
  name?: string;
  description?: string;
  price?: number;
  oldPrice?: number;
  rating?: number;
}

function ProductItems({
  id = 1,
  img,
  img2,
  name = "Product Name",
  description,
  price = 499,
  oldPrice = 999,
  rating = 4,
}: ProductItemsProps) {
  const discount = Math.round(((oldPrice - price) / oldPrice) * 100);

  return (
    <Link
      to={`/product/${id}`}
      className="productItems group block border border-[#e5e7eb] rounded-md overflow-hidden bg-white hover:shadow-md transition-all relative"
    >
      <div className="imgWrapper overflow-hidden relative">
        <img
          src={img}
          alt={name}
          className="w-full h-[200px] object-cover transition-all duration-500 absolute top-0 left-0 group-hover:opacity-0"
        />
        <img
          src={img2 ?? img}
          alt={name}
          className="w-full h-[200px] object-cover transition-all duration-500 opacity-0 group-hover:opacity-100"
        />

        <span className="discount flex items-center absolute top-[10px] left-[10px] z-50 bg-green-600 text-white text-[12px] font-bold px-2 py-1 rounded-md">
          -{discount}%
        </span>

        <div className="actions absolute top-[15px] right-[5px] z-50 flex items-center gap-2 flex-col w-[50px]">
          <Button
            className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-white text-black hover:!bg-green-600 hover:!text-white !shadow-md"
            onClick={(e) => e.preventDefault()}
          >
            <MdZoomOutMap className="text-[18px]" />
          </Button>
          <Button
            className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-white text-black hover:!bg-green-600 hover:!text-white !shadow-md"
            onClick={(e) => e.preventDefault()}
          >
            <IoGitCompareOutline className="text-[18px]" />
          </Button>
          <Button
            className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-white text-black hover:!bg-green-600 hover:!text-white !shadow-md"
            onClick={(e) => e.preventDefault()}
          >
            <FaRegHeart className="text-[18px]" />
          </Button>
        </div>
      </div>

      <div className="p-3">
        <h4 className="text-[14px] font-[500] text-[#1f2937] truncate">
          {name}
        </h4>
        {description && (
          <p className="text-[12px] text-gray-500 mt-1 line-clamp-2">
            {description}
          </p>
        )}
        <div className="flex items-center gap-2 mt-1">
          <span className="text-[15px] font-bold text-[#166534]">
            RS {price}
          </span>
          <span className="text-[13px] line-through text-gray-400">
            RS {oldPrice}
          </span>
        </div>
        <div className="flex items-center gap-1 mt-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className={`text-[14px] ${i < rating ? "text-yellow-400" : "text-gray-300"}`}
            >
              ★
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

export default ProductItems;
