import React, { useContext } from "react";
import { BsFillBagCheckFill } from "react-icons/bs";
import CartItems from "./CartItems";
import { Link } from "react-router-dom";
import { MyContext } from "../context/MyContext";

function Cart() {
  const { cart, removeFromCart, updateCartQty } = useContext(MyContext);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 1000 || cart.length === 0 ? 0 : 99;
  const total = subtotal + shipping;

  return (
    <section className="section py-8 bg-[#fbfbfb] min-h-[75vh]">
      <div className="container flex flex-col lg:flex-row gap-6">
        {/* Left Cart Items List */}
        <div className="leftPart flex-1">
          <div className="rounded-xl p-5 bg-white border border-gray-200 shadow-xs">
            <h2 className="text-xl font-bold text-gray-800 mb-1">Your Cart</h2>
            <p className="mt-0 text-sm text-gray-500 mb-5">
              There are{" "}
              <span className="font-bold text-[#ff5252]">{totalItems}</span>{" "}
              items in your cart
            </p>

            {cart.length === 0 ? (
              <div className="text-center py-12">
                <span className="text-5xl block mb-3">🛍️</span>
                <h3 className="text-lg font-bold text-gray-800 mb-1">
                  Your cart is currently empty
                </h3>
                <p className="text-sm text-gray-500 mb-6">
                  Explore our products and find great deals today.
                </p>
                <Link
                  to="/products"
                  className="inline-flex px-6 py-2.5 bg-[#ff5252] text-white text-sm font-semibold rounded-lg hover:bg-[#e04545] transition-colors"
                >
                  Continue Shopping
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {cart.map((item) => (
                  <CartItems
                    key={item.id}
                    item={item}
                    onRemove={removeFromCart}
                    onUpdateQty={updateCartQty}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Summary Block */}
        {cart.length > 0 && (
          <div className="rightPart w-full lg:w-[340px] flex-shrink-0">
            <div className="shadow-xs rounded-xl bg-white p-5 border border-gray-200 sticky top-24">
              <h3 className="pb-3 font-bold border-b border-gray-200 text-gray-800 text-base">
                Order Summary
              </h3>

              <div className="space-y-2.5 my-4 text-sm">
                <p className="flex items-center justify-between text-gray-600">
                  <span>Subtotal ({totalItems} items)</span>
                  <span className="font-semibold text-gray-900">
                    Rs {subtotal.toFixed(2)}
                  </span>
                </p>

                <p className="flex items-center justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="font-semibold text-gray-900">
                    {shipping === 0 ? (
                      <span className="text-green-600 font-bold">FREE</span>
                    ) : (
                      `Rs ${shipping.toFixed(2)}`
                    )}
                  </span>
                </p>

                <p className="flex items-center justify-between text-gray-600 text-xs">
                  <span>Estimated Delivery</span>
                  <span className="font-medium text-gray-700">2-3 Business Days</span>
                </p>
              </div>

              <div className="border-t border-gray-200 pt-3 mb-5">
                <p className="flex items-center justify-between">
                  <span className="text-base font-bold text-gray-900">Total Amount</span>
                  <span className="text-lg font-extrabold text-[#ff5252]">
                    Rs {total.toFixed(2)}
                  </span>
                </p>
                <span className="text-[11px] text-gray-400 block text-right mt-0.5">
                  (Inclusive of all taxes)
                </span>
              </div>

              <Link
                to="/checkout"
                className="w-full h-[44px] !bg-[#ff5252] hover:!bg-[#e04545] !text-white rounded-lg flex items-center justify-center gap-2 font-semibold text-sm transition-colors shadow-xs"
              >
                <BsFillBagCheckFill className="text-lg" /> Proceed to Checkout
              </Link>

              <div className="mt-4 text-center">
                <Link
                  to="/products"
                  className="text-xs text-gray-500 hover:text-[#ff5252] font-medium"
                >
                  ← Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Cart;
