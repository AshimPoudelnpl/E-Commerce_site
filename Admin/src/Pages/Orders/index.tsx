import React, { useState } from "react";
import tShirtImage from "../../assets/4284_plain_t-shirt_2048x2048_85d.webp";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { Badge } from "@mui/material";

const mockOrders = [
  {
    id: "#20241",
    paymentId: "PAY001",
    name: "John Doe",
    phone: "+1 234-567-8900",
    address: "123 Main Street\nNew York, NY 10001",
    status: "Delivered",
    products: [
      {
        productId: "PROD001",
        title: "VNEED Women Embroidered Rayon Kurta Pant Set",
        image: tShirtImage,
        quantity: 1,
        price: 58,
      },
    ],
  },
  {
    id: "#20242",
    paymentId: "PAY002",
    name: "Jane Smith",
    phone: "+1 234-567-8901",
    address: "456 Oak Avenue\nLos Angeles, CA 90001",
    status: "Pending",
    products: [
      {
        productId: "PROD002",
        title: "Premium Cotton T-Shirt",
        image: tShirtImage,
        quantity: 2,
        price: 35,
      },
    ],
  },
  {
    id: "#20243",
    paymentId: "PAY003",
    name: "Bob Johnson",
    phone: "+1 234-567-8902",
    address: "789 Pine Road\nChicago, IL 60601",
    status: "Processing",
    products: [
      {
        productId: "PROD003",
        title: "Casual Wear T-Shirt",
        image: tShirtImage,
        quantity: 1,
        price: 40,
      },
    ],
  },
];

const Orders = () => {
  const [isOpenOrderedProduct, setIsOpenOrderedProduct] = useState<
    number | null
  >(null);
  const toggleOrderedProduct = (index: number) => {
    setIsOpenOrderedProduct(isOpenOrderedProduct === index ? null : index);
  };
  return (
    <div className="bg-white rounded-md border border-[rgba(0,0,0,0.1)] p-5">
      <h2 className="text-[18px] font-medium text-gray-800 mb-4">
        Recent Orders
      </h2>

      <div className="overflow-x-auto">
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
                  <td className="px-4 py-4 text-gray-600">{order.phone}</td>
                  <td className="px-4 py-4 text-gray-600 whitespace-pre-line">
                    {order.address}
                  </td>
                  <td className="px-4 py-4">
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
                              <th className="px-4 py-3 text-left">
                                PRODUCT ID
                              </th>
                              <th className="px-4 py-3 text-left">
                                PRODUCT TITLE
                              </th>
                              <th className="px-4 py-3 text-center">IMAGE</th>
                              <th className="px-4 py-3 text-center">
                                QUANTITY
                              </th>
                              <th className="px-4 py-3 text-right">PRICE</th>
                            </tr>
                          </thead>
                          <tbody>
                            {order.products.map((product, pIdx) => (
                              <tr
                                key={pIdx}
                                className="border-b border-gray-100 last:border-0"
                              >
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
  );
};

export default Orders;
