import React, { useState } from 'react';
import AcccountSideaBar from '../components/AccountSideBar';
import Badge from '../components/Badge';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

// Sample mock data for demonstration
const mockOrders = [
  {
    id: "67514d9914da0b78a342b261",
    paymentId: "pay_PTPQeXFhrtpy8",
    name: "RINKU VERMA",
    phone: "09643990046",
    address: "H No 222 Street No\nshivam medical ph.",
    status: "pending",
    products: [
      {
        productId: "67514d9914da0b78a342b261",
        title: "A-Line Kurti With Sharara & Du...",
        image: "https://via.placeholder.com/40",
        quantity: 2,
        price: 1500
      }
    ]
  }
];

const Order = () => {
  const [isOpenOrderedProduct, setIsOpenOrderedProduct] = useState<number | null>(null);

  const toggleOrderedProduct = (index: number) => {
    setIsOpenOrderedProduct(isOpenOrderedProduct === index ? null : index);
  };

  return (
    <section className="section py-5 min-h-screen bg-gray-50">
      <div className="container w-[80%] max-w-[80%] flex gap-3 mx-auto">
        <AcccountSideaBar />
        <div className="leftPart w-[70%]">
          <div className="rounded-xl p-6 bg-white border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold text-gray-800 mb-1">My Orders</h2>
            <p className="mt-0 text-sm text-gray-500 mb-6">
              There are <span className="font-bold text-red-500">{mockOrders.length}</span> orders
            </p>

            <div className="w-full overflow-x-auto rounded-md border border-gray-100 shadow-sm">
              <table className="w-full text-sm text-left text-gray-600">
                <thead className="bg-gray-50 text-[12px] font-bold uppercase text-gray-700">
                  <tr>
                    <th className="w-[50px] px-4 py-4"></th>
                    <th className="px-4 py-4">ORDER ID</th>
                    <th className="px-4 py-4">PAYMENT ID</th>
                    <th className="px-4 py-4">NAME</th>
                    <th className="px-4 py-4">PHONE NUMBER</th>
                    <th className="px-4 py-4">ADDRESS</th>
                    <th className="px-4 py-4">STATUS</th>
                  </tr>
                </thead>

                <tbody>
                  {mockOrders.map((order, index) => (
                    <React.Fragment key={order.id}>
                      {/* Main Order Row */}
                      <tr className="border-b hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-4">
                          <button
                            onClick={() => toggleOrderedProduct(index)}
                            className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
                          >
                            {isOpenOrderedProduct === index ? (
                              <IoIosArrowUp className="text-lg" />
                            ) : (
                              <IoIosArrowDown className="text-lg" />
                            )}
                          </button>
                        </td>
                        <td className="px-4 py-4 font-medium text-[#e58f82]">
                          {order.id}
                        </td>
                        <td className="px-4 py-4 font-medium text-[#e58f82]">
                          {order.paymentId}
                        </td>
                        <td className="px-4 py-4 font-medium text-gray-700 uppercase">
                          {order.name}
                        </td>
                        <td className="px-4 py-4 text-gray-600">
                          {order.phone}
                        </td>
                        <td className="px-4 py-4 text-gray-600 whitespace-pre-line">
                          {order.address}
                        </td>
                        <td className="px-4 py-4">
                          <Badge status={order.status} />
                        </td>
                      </tr>

                      {/* Collapsible Product Details Row */}
                      {isOpenOrderedProduct === index && (
                        <tr>
                          <td colSpan={7} className="p-0 border-b bg-gray-50/50">
                            <div className="py-3 px-6">
                              <table className="w-full text-sm">
                                <thead>
                                  <tr className="bg-gray-100/60 text-[11px] font-bold uppercase text-gray-600">
                                    <th className="px-4 py-3 text-left">PRODUCT ID</th>
                                    <th className="px-4 py-3 text-left">PRODUCT TITLE</th>
                                    <th className="px-4 py-3 text-center">IMAGE</th>
                                    <th className="px-4 py-3 text-center">QUANTITY</th>
                                    <th className="px-4 py-3 text-right">PRICE</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {order.products.map((product, pIdx) => (
                                    <tr key={pIdx} className="border-b border-gray-100 last:border-0">
                                      <td className="px-4 py-3 font-medium text-[#e58f82]">
                                        {product.productId}
                                      </td>
                                      <td className="px-4 py-3 text-gray-700">
                                        {product.title}
                                      </td>
                                      <td className="px-4 py-3 text-center">
                                        <img
                                          src={product.image}
                                          alt={product.title}
                                          className="w-10 h-10 object-cover rounded-md mx-auto border"
                                        />
                                      </td>
                                      <td className="px-4 py-3 text-center font-medium text-gray-700">
                                        {product.quantity}
                                      </td>
                                      <td className="px-4 py-3 text-right font-semibold text-gray-900">
                                        Rs. {product.price.toLocaleString()}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Order;