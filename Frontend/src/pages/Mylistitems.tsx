import React from "react";
import { Link } from "react-router-dom";
import { IoCloseSharp } from "react-icons/io5";
import Rating from "@mui/material/Rating";
import { Button } from "@mui/material";
import type { Product } from "../types/product";

interface MylistitemsProps {
  product: Product;
  onRemove: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

function Mylistitems({ product, onRemove, onAddToCart }: MylistitemsProps) {
  const discount =
    product.oldPrice > product.price
      ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
      : 0;

  return (
    <div className="w-full bg-white border-b border-gray-200 p-4 sm:p-5 relative last:border-b-0">
      {/* Close / Remove Button */}
      <button
        type="button"
        onClick={() => onRemove(product)}
        className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors p-1"
        aria-label="Remove item"
      >
        <IoCloseSharp className="text-[20px]" />
      </button>

      <div className="flex items-start gap-4">
        {/* Product Image */}
        <div className="w-[90px] sm:w-[100px] h-[100px] sm:h-[120px] flex-shrink-0 rounded-md overflow-hidden border border-gray-100 bg-gray-50">
          <Link to={`/product/${product.id}`}>
            <img
              src={product.img}
              alt={product.name}
              className="w-full h-full object-cover hover:scale-105 transition-transform"
            />
          </Link>
        </div>

        {/* Product Details */}
        <div className="flex-1 pr-6">
          {product.brand && (
            <span className="text-[12px] text-gray-400 block mb-0.5 font-medium">
              {product.brand}
            </span>
          )}

          <h3 className="text-[14px] sm:text-[15px] font-semibold text-gray-800 mb-1 leading-snug">
            <Link
              to={`/product/${product.id}`}
              className="hover:text-[#ff5252] transition"
            >
              {product.name}
            </Link>
          </h3>

          <div className="mb-2">
            <Rating
              value={product.rating || 4}
              precision={0.5}
              readOnly
              size="small"
              sx={{ fontSize: "14px", color: "#f59e0b" }}
            />
          </div>

          <div className="flex items-center gap-3 mb-3">
            <span className="text-[15px] font-bold text-gray-900">
              Rs {product.price.toFixed(2)}
            </span>

            {product.oldPrice > product.price && (
              <span className="text-[13px] text-gray-400 line-through">
                Rs {product.oldPrice.toFixed(2)}
              </span>
            )}

            {discount > 0 && (
              <span className="text-[12px] font-semibold text-[#ff5252]">
                {discount}% OFF
              </span>
            )}
          </div>

          <Button
            onClick={() => onAddToCart(product)}
            className="!bg-[#ff5252] hover:!bg-[#e04545] !text-white !text-[12px] !font-semibold !px-4 !py-1.5 !rounded-md !capitalize shadow-xs"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Mylistitems;
