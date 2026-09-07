import React, { useState, useContext } from "react";
import QtyBox from "../QtyBox";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaRegHeart, FaHeart } from "react-icons/fa6";
import { IoGitCompareOutline } from "react-icons/io5";
import { MyContext } from "../../context/MyContext";
import type { Product } from "../../types/product";

interface ProductDetails1Props {
  product?: Product;
}

function ProductDetails1({ product }: ProductDetails1Props) {
  const context = useContext(MyContext);
  const activeProduct = product || context.activeModalProduct;

  const [selectedSize, setSelectedSize] = useState<string>(() => activeProduct?.sizes?.[0] || "M");
  const [selectedColor, setSelectedColor] = useState<string>(() => activeProduct?.colors?.[0] || "");
  const [qty, setQty] = useState<number>(1);

  if (!activeProduct) {
    return <div className="p-4 text-gray-500">No product selected</div>;
  }

  const isFav = context.isInWishlist ? context.isInWishlist(activeProduct.id) : false;
  const isCompared = context.isInCompare ? context.isInCompare(activeProduct.id) : false;

  const handleAddToCart = () => {
    if (context.addToCart) {
      context.addToCart(activeProduct, qty, selectedSize, selectedColor);
    }
  };

  const handleToggleWishlist = () => {
    if (context.toggleWishlist) {
      context.toggleWishlist(activeProduct);
    }
  };

  const handleToggleCompare = () => {
    if (context.toggleCompare) {
      context.toggleCompare(activeProduct);
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-xs uppercase tracking-wider font-semibold text-gray-400">
          {activeProduct.category}
          {activeProduct.subCategory ? ` / ${activeProduct.subCategory}` : ""}
        </span>
      </div>

      <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 leading-snug">
        {activeProduct.name}
      </h1>

      <p className="text-gray-500 text-sm mb-3 flex items-center gap-3 flex-wrap">
        {activeProduct.brand && (
          <span>
            Brand: <b className="text-gray-800">{activeProduct.brand}</b>
          </span>
        )}
        <span className="text-amber-500 font-semibold">
          ★ {activeProduct.rating.toFixed(1)}
        </span>
        <span className="text-gray-400">
          ({activeProduct.reviewsCount || 5} Reviews)
        </span>
      </p>

      <div className="flex items-center gap-3 mb-3 flex-wrap">
        <span className="text-2xl font-bold text-[#ff5252]">
          Rs {activeProduct.price}
        </span>
        {activeProduct.oldPrice > activeProduct.price && (
          <>
            <span className="line-through text-gray-400 text-base">
              Rs {activeProduct.oldPrice}
            </span>
            <span className="bg-red-50 text-red-600 font-semibold text-xs px-2 py-0.5 rounded">
              {Math.round(
                ((activeProduct.oldPrice - activeProduct.price) / activeProduct.oldPrice) * 100
              )}
              % OFF
            </span>
          </>
        )}
        <span className="ml-auto text-xs sm:text-sm">
          Availability:{" "}
          {activeProduct.countInStock > 0 ? (
            <b className="text-green-600 font-semibold">
              In Stock ({activeProduct.countInStock} items)
            </b>
          ) : (
            <b className="text-red-500 font-semibold">Out of Stock</b>
          )}
        </span>
      </div>

      <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-3">
        {activeProduct.description}
      </p>

      {/* Sizes / RAM Options */}
      {activeProduct.sizes && activeProduct.sizes.length > 0 && (
        <div className="mb-4">
          <span className="font-semibold text-xs uppercase tracking-wider text-gray-700 block mb-2">
            Select Size / Variant:
          </span>
          <div className="flex flex-wrap items-center gap-2">
            {activeProduct.sizes.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setSelectedSize(size)}
                className={`border rounded px-3 py-1.5 text-xs sm:text-sm font-medium transition-all ${
                  selectedSize === size
                    ? "border-[#ff5252] bg-red-50 text-[#ff5252] shadow-xs"
                    : "border-gray-200 text-gray-700 hover:border-gray-400"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Colors */}
      {activeProduct.colors && activeProduct.colors.length > 0 && (
        <div className="mb-4">
          <span className="font-semibold text-xs uppercase tracking-wider text-gray-700 block mb-2">
            Color: <span className="text-gray-900 font-bold">{selectedColor || activeProduct.colors[0]}</span>
          </span>
          <div className="flex flex-wrap items-center gap-2">
            {activeProduct.colors.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => setSelectedColor(color)}
                className={`border rounded px-3 py-1 text-xs font-medium transition-all ${
                  selectedColor === color
                    ? "border-[#ff5252] bg-red-50 text-[#ff5252]"
                    : "border-gray-200 text-gray-600 hover:border-gray-400"
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>
      )}

      <p className="text-xs text-gray-500 mb-4 flex items-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>
        Free Express Delivery (Estimated 2-3 business days)
      </p>

      <div className="flex flex-wrap items-center gap-3 mb-4">
        <QtyBox
          value={qty}
          onChange={(val: number) => setQty(val)}
        />
        <button
          type="button"
          onClick={handleAddToCart}
          className="flex-1 sm:flex-none bg-[#ff5252] hover:bg-[#e04545] text-white px-6 py-2.5 rounded font-medium flex items-center justify-center gap-2 transition-colors shadow-sm text-sm"
        >
          <MdOutlineShoppingCart className="text-[18px]" />
          ADD TO CART
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-5 mt-3 pt-3 border-t border-gray-100">
        <button
          type="button"
          onClick={handleToggleWishlist}
          className="flex items-center gap-2 text-xs sm:text-sm font-medium text-gray-600 hover:text-red-500 transition-colors"
        >
          {isFav ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
          {isFav ? "In Wishlist" : "Add to Wishlist"}
        </button>

        <button
          type="button"
          onClick={handleToggleCompare}
          className="flex items-center gap-2 text-xs sm:text-sm font-medium text-gray-600 hover:text-blue-500 transition-colors"
        >
          <IoGitCompareOutline className={isCompared ? "text-blue-600" : ""} />
          {isCompared ? "In Compare List" : "Add to Compare"}
        </button>
      </div>
    </div>
  );
}

export default ProductDetails1;
