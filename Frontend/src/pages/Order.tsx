import React, { useState, useEffect } from "react";
import AcccountSideaBar from "../components/AccountSideBar";
import Badge from "../components/Badge";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { Link } from "react-router-dom";
import { getStoredOrders, type CreatedOrder } from "../types/order";

const Order = () => {
  const [orders, setOrders] = useState<CreatedOrder[]>([]);
  const [isOpenOrderedProduct, setIsOpenOrderedProduct] = useState<number | null>(null);

  useEffect(() => {
    setOrders(getStoredOrders());
  }, []);

  const toggleOrderedProduct = (index: number) => {
    setIsOpenOrderedProduct(isOpenOrderedProduct === index ? null : index);
  };

  return (
    <section className="section py-6 md:py-8 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-[260px] flex-shrink-0">
          <AcccountSideaBar />
        </div>

        <div className="flex-1">
          <div className="rounded-xl p-5 sm:p-6 bg-white border border-gray-200 shadow-xs">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100 flex-wrap gap-2">
              <div>
                <h2 className="text-xl font-bold text-gray-800">My Orders</h2>
                <p className="mt-0.5 text-xs sm:text-sm text-gray-500">
                  Showing <span className="font-bold text-[#ff5252]">{orders.length}</span> recorded orders
                </p>
              </div>
              <Link
                to="/products"
                className="text-xs sm:text-sm font-semibold text-[#ff5252] hover:underline"
              >
                Continue Shopping &rarr;
              </Link>
            </div>

            {orders.length === 0 ? (
              <div className="text-center py-12">
                <span className="text-4xl block mb-2">📦</span>
                <h3 className="text-base font-bold text-gray-800">No orders placed yet</h3>
                <p className="text-xs text-gray-500 mt-1 mb-4">
                  Browse products and check out to view your real-time orders here.
                </p>
                <Link
                  to="/products"
                  className="inline-block px-5 py-2 bg-[#ff5252] text-white text-xs font-semibold rounded-md hover:bg-[#e04545]"
                >
                  Start Shopping
                </Link>
              </div>
            ) : (
              <div className="w-full overflow-x-auto rounded-lg border border-gray-200">
                <table className="w-full text-xs sm:text-sm text-left text-gray-600">
                  <thead className="bg-gray-50 text-[11px] sm:text-[12px] font-bold uppercase text-gray-700 border-b border-gray-200">
                    <tr>
                      <th className="w-[45px] px-3 py-3.5 text-center"></th>
                      <th className="px-3 py-3.5">ORDER ID</th>
                      <th className="px-3 py-3.5">PAYMENT ID</th>
                      <th className="px-3 py-3.5">METHOD</th>
                      <th className="px-3 py-3.5">CUSTOMER</th>
                      <th className="px-3 py-3.5">TOTAL</th>
                      <th className="px-3 py-3.5">STATUS</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-100">
                    {orders.map((order, index) => {
                      const isOpened = isOpenOrderedProduct === index;
                      return (
                        <React.Fragment key={order.id || index}>
                          {/* Main Order Row */}
                          <tr className="hover:bg-gray-50 transition-colors">
                            <td className="px-3 py-3 text-center">
                              <button
                                onClick={() => toggleOrderedProduct(index)}
                                className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
                                title="View order items"
                              >
                                {isOpened ? (
                                  <IoIosArrowUp className="text-base" />
                                ) : (
                                  <IoIosArrowDown className="text-base" />
                                )}
                              </button>
                            </td>
                            <td className="px-3 py-3 font-semibold text-[#ff5252] whitespace-nowrap">
                              {order.id}
                            </td>
                            <td className="px-3 py-3 font-mono text-xs text-gray-600 whitespace-nowrap">
                              {order.paymentId}
                            </td>
                            <td className="px-3 py-3 whitespace-nowrap">
                              <span
                                className={`px-2 py-0.5 rounded text-[11px] font-bold uppercase ${
                                  order.paymentMethod === "esewa"
                                    ? "bg-green-100 text-green-700"
                                    : order.paymentMethod === "khalti"
                                    ? "bg-purple-100 text-purple-700"
                                    : "bg-amber-100 text-amber-800"
                                }`}
                              >
                                {order.paymentMethod || "COD"}
                              </span>
                            </td>
                            <td className="px-3 py-3">
                              <p className="font-semibold text-gray-800 leading-tight">{order.name}</p>
                              <p className="text-[11px] text-gray-400">{order.phone}</p>
                            </td>
                            <td className="px-3 py-3 font-bold text-gray-900 whitespace-nowrap">
                              Rs. {(order.totalAmount || 0).toLocaleString()}
                            </td>
                            <td className="px-3 py-3 whitespace-nowrap">
                              <Badge status={order.status.toLowerCase()} />
                            </td>
                          </tr>

                          {/* Collapsible Products Drawer */}
                          {isOpened && (
                            <tr className="bg-gray-50/70">
                              <td colSpan={7} className="px-4 py-3">
                                <div className="p-3 bg-white rounded-lg border border-gray-200">
                                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-gray-100 text-xs text-gray-500">
                                    <span>Shipping to: <b>{order.address.replace("\n", " • ")}</b></span>
                                    <span>Date: <b>{order.createdAt}</b></span>
                                  </div>

                                  <div className="space-y-2">
                                    {order.products.map((p, pIdx) => (
                                      <div
                                        key={pIdx}
                                        className="flex items-center justify-between gap-3 text-xs"
                                      >
                                        <div className="flex items-center gap-2.5">
                                          <img
                                            src={p.image}
                                            alt={p.title}
                                            className="w-10 h-10 object-cover rounded-md border border-gray-200"
                                          />
                                          <div>
                                            <p className="font-semibold text-gray-800">{p.title}</p>
                                            <p className="text-gray-400">Qty: {p.quantity}</p>
                                          </div>
                                        </div>
                                        <span className="font-bold text-gray-900">
                                          Rs. {(p.price * p.quantity).toLocaleString()}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Order;
