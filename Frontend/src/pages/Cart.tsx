import React, { useContext } from "react";
import { BsFillBagCheckFill } from "react-icons/bs";
import { Button } from "@mui/material";
import CartItems from "./CartItems";
import { Link } from "react-router-dom";
import { MyContext } from "../context/MyContext";

function Cart() {
  const { cartItems, updateCartQuantity, removeFromCart } =
    useContext(MyContext);
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  return (
    <section className="section py-5">
      <div className="container w-[94%] lg:w-[80%] max-w-[80%] flex flex-col lg:flex-row gap-4">
        <div className="leftPart w-full lg:w-[70%]">
          <div className="rounded-xl p-4 bg-white border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-1">Your Cart</h2>
            <p className="mt-0 text-sm text-gray-500 mb-4">
              There are{" "}
              <span className="font-bold text-red-500">{cartItems.length}</span>{" "}
              products in your cart
            </p>
            {cartItems.length ? (
              cartItems.map((item) => (
                <CartItems
                  key={item.id}
                  item={item}
                  onRemove={removeFromCart}
                  onQuantityChange={updateCartQuantity}
                />
              ))
            ) : (
              <p className="py-10 text-center text-sm text-gray-500">
                Your cart is empty.
              </p>
            )}
          </div>
        </div>
        <div className="rightPart w-full lg:w-[30%] lg:pl-4">
          <div className="shadow-md rounded-md bg-white p-5">
            <h3 className="pb-2 font-semibold border-b border-gray-200 text-gray-800">
              Cart Totals
            </h3>

            <p className="flex items-center justify-between my-2">
              <span className="text-[14px] font-[500]">Subtotal</span>
              <span className="text-primary font-bold">
                ₹
                {subtotal.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
              </span>
            </p>

            <p className="flex items-center justify-between mb-2">
              <span className="text-[14px] font-[500]">Shipping</span>
              <span className="font-bold">Free</span>
            </p>
            <p className="flex items-center justify-between mb-2">
              <span className="text-[14px] font-[500]">Estimate for</span>
              <span className="font-bold">United Kingdom</span>
            </p>

            <p className="flex items-center justify-between pt-2 mt-2 py-2">
              <span className="text-[14px] font-[600]">Total</span>
              <span className="text-primary font-bold">
                ₹
                {subtotal.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
              </span>
            </p>
            <Link
              to="/checkout"
              className={`btnorg p-2 btn-lg w-full !bg-[#ff5252] !text-white rounded-full flex items-center justify-center gap-2 ${!cartItems.length ? "pointer-events-none opacity-50" : ""}`}
            >
              <BsFillBagCheckFill className="text-xl" /> Checkout
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cart;
