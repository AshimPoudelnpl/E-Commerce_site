import React, { useContext } from "react";
import Drawer from "@mui/material/Drawer";
import { IoCloseSharp } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { MyContext } from "../../App";
import productImage from "../../assets/578c27b4ff2171e9c60dfafbe9a04616.jpg";
import { Link } from "react-router-dom";

const CartPanel = () => {
  const { openCartPanel, toggleCartPannel } = useContext(MyContext);

  return (
    <Drawer
      open={openCartPanel}
      onClose={() => toggleCartPannel(false)}
      anchor="right"
    >
      <div className="w-[380px] max-w-[100vw] h-screen flex flex-col">

        {/* Header */}
        <div className="flex justify-between items-center px-4 py-3 border-b">
          <h4>Shopping Cart (1)</h4>

          <IoCloseSharp
            className="text-[20px] cursor-pointer"
            onClick={() => toggleCartPannel(false)}
          />
        </div>

        {/* Product */}
        <div className="px-4 py-4 border-b flex gap-3">
          <div className="w-[84px] h-[88px] border rounded">
            <img
              src={productImage}
              alt="Product"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1">
            <div className="flex justify-between">
              <Link to="/productDetails/22" className="text-[14px] hover:text-[#ff6347] font-bold">
                Mens Cotton Casual Short Sleeve T-Shirts
              </Link>

              <MdDeleteOutline className="text-[20px] cursor-pointer" />
            </div>

            <div className="flex justify-between items-center text-[14px] mt-2">
              <span className="text-gray-500 font-medium">QTY: 1</span>
              <span className="text-gray-500 font-medium">
                Price: <span className="text-[#ff6347] font-semibold">$86.00</span>
              </span>
            </div>
          </div>
        </div>
        <div className="px-4 py-4 border-b flex gap-3">
          <div className="w-[84px] h-[88px] border rounded">
            <img
              src={productImage}
              alt="Product"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1">
            <div className="flex justify-between">
              <Link to="/productDetails/22" className="text-[14px] hover:text-[#ff6347] font-bold">
                Mens Cotton Casual Short Sleeve T-Shirts
              </Link>

              <MdDeleteOutline className="text-[20px] cursor-pointer" />
            </div>

            <div className="flex justify-between items-center text-[14px] mt-2">
              <span className="text-gray-500 font-medium">QTY: 1</span>
              <span className="text-gray-500 font-medium">
                Price: <span className="text-[#ff6347] font-semibold">$86.00</span>
              </span>
            </div>
          </div>
        </div>
        <div className="px-4 py-4 border-b flex gap-3">
          <div className="w-[84px] h-[88px] border rounded">
            <img
              src={productImage}
              alt="Product"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1">
            <div className="flex justify-between">
              <Link to="/productDetails/22" className="text-[14px] hover:text-[#ff6347] font-bold">
                Mens Cotton Casual Short Sleeve T-Shirts
              </Link>

              <MdDeleteOutline className="text-[20px] cursor-pointer" />
            </div>

            <div className="flex justify-between items-center text-[14px] mt-2">
              <span className="text-gray-500 font-medium">QTY: 1</span>
              <span className="text-gray-500 font-medium">
                Price: <span className="text-[#ff6347] font-semibold">$86.00</span>
              </span>
            </div>
          </div>
        </div>

        {/* Push bottom section down */}
        <div className="flex-1"></div>

        {/* Summary */}
        <div className="border-t px-4 py-3">
          <div className="flex justify-between mb-2">
            <b>1 item</b>
            <b className="text-[#ff6347]">$86.00</b>
          </div>

          <div className="flex justify-between">
            <b>Shipping</b>
            <b className="text-[#ff6347]">$7.00</b>
          </div>
        </div>

        {/* Total */}
        <div className="border-t px-4 py-3">
          <div className="flex justify-between mb-2">
            <b>Total (tax excl.)</b>
            <b className="text-[#ff6347]">$93.00</b>
          </div>

          <div className="flex justify-between mb-2">
            <b>Total (tax incl.)</b>
            <b className="text-[#ff6347]">$93.00</b>
          </div>

          <div className="flex justify-between">
            <b>Taxes:</b>
            <b className="text-[#ff6347]">$0.00</b>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 px-4 py-3 border-t">
          <Link
            to="/cart"
            onClick={() => toggleCartPannel(false)}
            className="flex-1 h-[40px] bg-[#ff6347] text-white rounded font-semibold flex items-center justify-center hover:bg-[#e05338] transition-colors"
          >
            VIEW CART
          </Link>

          <Link
            to="/cart"
            onClick={() => toggleCartPannel(false)}
            className="flex-1 h-[40px] bg-[#ff6347] text-white rounded font-semibold flex items-center justify-center hover:bg-[#e05338] transition-colors"
          >
            CHECKOUT
          </Link>
        </div>

      </div>
    </Drawer>
  );
};

export default CartPanel;