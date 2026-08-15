import React, { useState } from "react";
import QtyBox from "../QtyBox";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa6";
import { IoGitCompareOutline } from "react-icons/io5";

function ProductDetails1() {
    const [productActionIndex, setProductActionIndex] = useState(null)
  return (
    <>
      <div className="w-[70%]">
        <h1 className="text-2xl font-semibold mb-1">Rounded Neck Tshirt</h1>

        <p className="text-gray-500 text-sm mb-3">
          Brands : <b>EagleBird</b> &nbsp; ★★★★☆ &nbsp; Review (5)
        </p>

        <p className="mb-3">
          <span className="line-through text-gray-400 mr-2">Rs 58.00</span>
          <span className="text-red-500 font-semibold mr-2">Rs 58.00</span>
          Available In Stock: <b className="text-green-600">147 Items</b>
        </p>

        <p className="text-gray-600 text-sm mb-5">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged.
        </p>

        <div className="flex items-center gap-2 mb-5">
          <span>Size:</span>
          {["S", "M", "L", "XL"].map((size) => (
            <button key={size} className="border rounded px-3 py-1 text-sm">
              {size}
            </button>
          ))}
        </div>

        <p className="text-sm text-gray-600 mb-4">
          Free Shipping (Est. Delivery Time 2-3 Days)
        </p>

        <div className="flex items-center gap-4">
          <QtyBox />
          <button className="bg-[#f0574c] text-white px-6 py-3 rounded font-medium flex ">
            <MdOutlineShoppingCart className="flex items-center mx-2" />
            ADD TO CART
          </button>
        </div>
        <div className="flex items-center gap-4 mt-4">
          <span className="flex items-center gap-2 text-[15px] link cursor-pointer font-[500]">
            <FaRegHeart className="text-[]" /> Add to Wishlist
          </span>

          <span className="flex items-center gap-2 text-[15px] link cursor-pointer font-[500]">
            <IoGitCompareOutline /> Add to Compare
          </span>
        </div>
      </div>
    </>
  );
}

export default ProductDetails1;
