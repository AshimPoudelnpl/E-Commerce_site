import React, { useContext } from "react";
import Drawer from "@mui/material/Drawer";
import { IoCloseSharp } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { MyContext } from "../../context/MyContext";
import { Link } from "react-router-dom";

const CartPanel = () => {
  const { openCartPanel, toggleCartPannel, cart, removeFromCart } = useContext(MyContext);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 1000 || cart.length === 0 ? 0 : 99;
  const total = subtotal + shipping;

  return (
    <Drawer
      open={openCartPanel}
      onClose={() => toggleCartPannel(false)}
      anchor="right"
    >
      <div className="w-[320px] sm:w-[380px] max-w-[100vw] h-screen flex flex-col bg-white">
        {/* Header */}
        <div className="flex justify-between items-center px-4 py-3.5 border-b border-gray-100 bg-gray-50">
          <h4 className="font-bold text-gray-900 text-base">
            Shopping Cart ({totalItems})
          </h4>
          <IoCloseSharp
            className="text-[22px] cursor-pointer text-gray-500 hover:text-black"
            onClick={() => toggleCartPannel(false)}
          />
        </div>

        {/* Product list */}
        <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
          {cart.length === 0 ? (
            <div className="p-8 text-center text-gray-500 flex flex-col items-center justify-center h-full">
              <span className="text-4xl mb-3">🛒</span>
              <p className="font-semibold text-gray-700">Your cart is empty</p>
              <p className="text-xs text-gray-400 mt-1 mb-4">Add products to your cart to checkout</p>
              <Link
                to="/products"
                onClick={() => toggleCartPannel(false)}
                className="px-4 py-2 bg-[#ff5252] text-white text-xs font-semibold rounded-md hover:bg-[#e04545]"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="px-4 py-3 flex gap-3 items-center hover:bg-gray-50">
                <div className="w-[64px] h-[68px] border border-gray-200 rounded-md overflow-hidden flex-shrink-0 bg-gray-50">
                  <img
                    src={item.product.img}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-1">
                    <Link
                      to={`/product/${item.productId}`}
                      onClick={() => toggleCartPannel(false)}
                      className="text-xs sm:text-sm font-semibold text-gray-800 hover:text-[#ff5252] truncate block"
                    >
                      {item.product.name}
                    </Link>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-red-500 p-0.5"
                    >
                      <MdDeleteOutline className="text-[18px]" />
                    </button>
                  </div>

                  {item.selectedSize && (
                    <span className="text-[11px] text-gray-400 block">
                      Size: {item.selectedSize}
                    </span>
                  )}

                  <div className="flex justify-between items-center text-xs mt-1.5">
                    <span className="text-gray-500">Qty: {item.quantity}</span>
                    <span className="font-bold text-[#ff5252]">
                      Rs {(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Bottom summary and buttons */}
        {cart.length > 0 && (
          <div className="border-t border-gray-200 bg-gray-50 p-4 space-y-2">
            <div className="flex justify-between text-xs text-gray-600">
              <span>Subtotal:</span>
              <span className="font-semibold text-gray-900">Rs {subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xs text-gray-600">
              <span>Shipping:</span>
              <span className="font-semibold text-gray-900">
                {shipping === 0 ? "Free" : `Rs ${shipping.toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between text-sm font-bold text-gray-900 pt-2 border-t border-gray-200">
              <span>Total:</span>
              <span className="text-[#ff5252]">Rs {total.toFixed(2)}</span>
            </div>

            <div className="flex gap-2 pt-2">
              <Link
                to="/cart"
                onClick={() => toggleCartPannel(false)}
                className="flex-1 h-[38px] bg-gray-800 text-white text-xs rounded-md font-semibold flex items-center justify-center hover:bg-black transition-colors"
              >
                VIEW CART
              </Link>
              <Link
                to="/checkout"
                onClick={() => toggleCartPannel(false)}
                className="flex-1 h-[38px] bg-[#ff5252] text-white text-xs rounded-md font-semibold flex items-center justify-center hover:bg-[#e04545] transition-colors"
              >
                CHECKOUT
              </Link>
            </div>
          </div>
        )}
      </div>
    </Drawer>
  );
};

export default CartPanel;
