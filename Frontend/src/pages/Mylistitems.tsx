import React from "react";
import { Link } from "react-router-dom";
import { IoCloseSharp } from "react-icons/io5";
import Rating from "@mui/material/Rating";
import { Button } from "@mui/material";
import productImage from "../assets/578c27b4ff2171e9c60dfafbe9a04616.jpg";

interface MylistitemsProps {
    size?: string;
    qty?: number;
}

function Mylistitems({
    size: initialSize = "S",
    qty: initialQty = 1,
}: MylistitemsProps) {
    return (
        <div className="w-full bg-white border-b border-gray-200 p-5 relative">

            {/* Close Button */}
            <button
                type="button"
                className="absolute top-4 right-4 text-gray-600 hover:text-black"
                aria-label="Remove item"
            >
                <IoCloseSharp className="text-[20px]" />
            </button>

            <div className="flex items-start gap-4">

                {/* Product Image */}
                <div className="w-[100px] h-[125px] flex-shrink-0 rounded-md overflow-hidden">
                    <Link to="/productDetails/7845">
                        <img
                            src={productImage}
                            alt="A-Line Kurti With Sharara & Dupatta"
                            className="w-full h-full object-cover"
                        />
                    </Link>
                </div>

                {/* Product Details */}
                <div className="flex-1">

                    {/* Brand */}
                    <span className="text-[12px] text-gray-500 block mb-1">
                        Sangria
                    </span>

                    {/* Product Name */}
                    <h3 className="text-[14px] font-medium text-gray-800 mb-1">
                        <Link
                            to="/productDetails/7845"
                            className="hover:text-orange-500 transition"
                        >
                            A-Line Kurti With Sharara & Dupatta
                        </Link>
                    </h3>

                    {/* Rating */}
                    <div className="mb-2">
                        <Rating
                            value={4}
                            precision={0.5}
                            readOnly
                            size="small"
                        />
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-[14px] font-semibold text-gray-800">
                            $58.00
                        </span>

                        <span className="text-[13px] text-gray-400 line-through">
                            $58.00
                        </span>

                        <span className="text-[13px] font-medium text-[#e8623d]">
                            55% OFF
                        </span>
                    </div>

                    {/* Add To Cart */}
                    <Button
                        className="
              !bg-[#b84b3b]
              hover:!bg-[#a43e31]
              !text-white
              !text-[12px]
              !font-semibold
              !px-5
              !py-2
              !rounded-[3px]
              !min-w-[125px]
              !h-[34px]
            "
                    >
                        ADD TO CART
                    </Button>

                </div>
            </div>
        </div>
    );
}

export default Mylistitems;