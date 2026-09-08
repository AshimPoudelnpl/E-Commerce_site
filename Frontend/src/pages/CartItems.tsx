import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoCloseSharp } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa6";
import Rating from "@mui/material/Rating";
import { Button, Menu, MenuItem } from "@mui/material";
import type { CartItem } from "../context/MyContext";

interface CartItemsProps {
  item: CartItem;
  onRemove: (id: string) => void;
  onUpdateQty: (id: string, qty: number) => void;
}

function CartItems({ item, onRemove, onUpdateQty }: CartItemsProps) {
  const [qtyAnchorEl, setQtyAnchorEl] = useState<null | HTMLElement>(null);
  const openQty = Boolean(qtyAnchorEl);

  const handleClickQty = (event: React.MouseEvent<HTMLButtonElement>) => {
    setQtyAnchorEl(event.currentTarget);
  };

  const handleCloseQty = (selectedQty?: number) => {
    if (selectedQty !== undefined) {
      onUpdateQty(item.id, selectedQty);
    }
    setQtyAnchorEl(null);
  };

  const product = item.product;
  const discount =
    product.oldPrice > product.price
      ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
      : 0;

  return (
    <div className="cartItem w-full flex items-start gap-4 relative border-b border-gray-100 pb-4 mb-4 last:border-b-0 last:mb-0 last:pb-0">
      {/* Product Image */}
      <div className="w-[100px] sm:w-[110px] h-[100px] sm:h-[110px] rounded-xl overflow-hidden flex-shrink-0 border border-gray-200 bg-gray-50">
        <Link to={`/product/${item.productId}`} className="w-full h-full block">
          <img
            src={product.img}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </Link>
      </div>

      {/* Product Info */}
      <div className="flex-1 pr-8">
        {product.brand && (
          <span className="text-xs text-gray-400 font-medium block mb-0.5">
            {product.brand}
          </span>
        )}
        <h3 className="text-sm font-semibold text-gray-800 leading-snug mb-1">
          <Link
            to={`/product/${item.productId}`}
            className="hover:text-red-500 transition-colors"
          >
            {product.name}
          </Link>
        </h3>

        {/* Rating */}
        <div className="mb-2">
          <Rating
            value={product.rating || 4}
            precision={0.5}
            readOnly
            size="small"
            sx={{ fontSize: "14px", color: "#f59e0b" }}
          />
        </div>

        {/* Size & Qty controls */}
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          {item.selectedSize && (
            <span className="bg-gray-100 text-gray-700 text-xs px-2.5 py-1 rounded-md font-medium">
              Size: {item.selectedSize}
            </span>
          )}

          {/* Qty Dropdown */}
          <Button
            id={`qty-button-${item.id}`}
            aria-controls={openQty ? `qty-menu-${item.id}` : undefined}
            aria-haspopup="true"
            aria-expanded={openQty ? "true" : undefined}
            onClick={handleClickQty}
            className="!bg-gray-100 !text-gray-700 !text-xs !px-2.5 !py-1 !rounded-md !font-medium !min-w-0 !capitalize flex items-center gap-1"
          >
            Qty: {item.quantity}{" "}
            <FaAngleDown className="text-[10px] ml-1 text-gray-500" />
          </Button>
          <Menu
            id={`qty-menu-${item.id}`}
            anchorEl={qtyAnchorEl}
            open={openQty}
            onClose={() => handleCloseQty()}
          >
            {[1, 2, 3, 4, 5, 6, 8, 10].map((q) => (
              <MenuItem key={q} onClick={() => handleCloseQty(q)}>
                {q}
              </MenuItem>
            ))}
          </Menu>
        </div>

        {/* Price Details */}
        <div className="flex items-center gap-2 mt-2">
          <span className="font-bold text-gray-900 text-base">
            Rs {(item.price * item.quantity).toFixed(2)}
          </span>
          {product.oldPrice > product.price && (
            <span className="line-through text-gray-400 text-xs">
              Rs {(product.oldPrice * item.quantity).toFixed(2)}
            </span>
          )}
          {discount > 0 && (
            <span className="text-red-500 font-bold text-xs">
              {discount}% OFF
            </span>
          )}
        </div>
      </div>

      {/* Remove Button */}
      <button
        onClick={() => onRemove(item.id)}
        className="absolute top-0 right-0 text-gray-400 hover:text-red-500 transition-colors p-1"
        aria-label="Remove item"
      >
        <IoCloseSharp className="text-xl" />
      </button>
    </div>
  );
}

export default CartItems;
