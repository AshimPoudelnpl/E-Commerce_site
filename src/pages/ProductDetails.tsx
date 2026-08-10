import React, { useState } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import MuiLink from "@mui/material/Link";
import ProductZoom from "../components/ProductZoom";
import QtyBox from "../components/QtyBox";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa6";
import { IoGitCompareOutline } from "react-icons/io5";

function ProductDetails() {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <>
      <div className="py-5 ">
        <div className="container">
          <Breadcrumbs aria-label="breadcrumb">
            <MuiLink underline="hover" color="inherit" href="/">
              Home
            </MuiLink>
            <Typography sx={{ color: "text.primary" }}>Products</Typography>
          </Breadcrumbs>
        </div>
      </div>
      <section className="bg-white py-5">
        <div className="container flex gap-8 mt-5">
          <div className="productZoomContainer w-[30%] h-[50vh] overflow-hidden">
            <ProductZoom />
          </div>

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
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged.
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
        </div>
        <div className="container pt-10">
          <div className="flex items-center gap-8 pb-3 mb-5">
            <span
              onClick={() => setActiveTab(0)}
              className={`link text-[17px] cursor-pointer font-[500] transition-colors ${activeTab === 0 ? "text-[#f0574c]" : "hover:text-[#f0574c]"}`}
            >
              Description
            </span>
            <span
              onClick={() => setActiveTab(1)}
              className={`link text-[17px] cursor-pointer font-[500] transition-colors ${activeTab === 1 ? "text-[#f0574c]" : "hover:text-[#f0574c]"}`}
            >
              Product Details
            </span>
            <span
              onClick={() => setActiveTab(2)}
              className={`link text-[17px] cursor-pointer font-[500] transition-colors ${activeTab === 2 ? "text-[#f0574c]" : "hover:text-[#f0574c]"}`}
            >
              Reviews (5)
            </span>
          </div>
          {activeTab === 0 && (
            <div className="w-full p-5 border border-gray-300 rounded-md">
              <p className="mb-4 text-gray-700 leading-relaxed">
                The best is yet to come! Give your walls a voice with a framed
                poster. This aesthetic, optimistic poster will look great in
                your desk or in an open-space office. Painted wooden frame with
                passe-partout for more depth.
              </p>
              <h4 className="font-semibold text-lg mb-2">Lightweight Design</h4>
              <p className="text-gray-700 leading-relaxed">
                Designed with a super light geometric case, the Versa family
                watches are slim, casual and comfortable enough to wear all day
                and night. Switch up your look with classic, leather, metal and
                woven accessory bands. Ut elit tellus, luctus nec ullamcorper
                mattis, pulvinar dapibus leo.
              </p>
            </div>
          )}
          {activeTab === 1 && (
            <div className="w-full p-5 border border-gray-300 rounded-md">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-2">
                      Product Specifications
                    </h5>
                    <table className="w-full text-sm">
                      <tbody>
                        <tr className="border-b">
                          <td className="py-2 font-medium text-gray-600">
                            Brand
                          </td>
                          <td className="py-2 text-gray-900">EagleBird</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 font-medium text-gray-600">
                            Material
                          </td>
                          <td className="py-2 text-gray-900">100% Cotton</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 font-medium text-gray-600">
                            Fit Type
                          </td>
                          <td className="py-2 text-gray-900">Regular Fit</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 font-medium text-gray-600">
                            Neck Style
                          </td>
                          <td className="py-2 text-gray-900">Round Neck</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 font-medium text-gray-600">
                            Sleeve Type
                          </td>
                          <td className="py-2 text-gray-900">Half Sleeve</td>
                        </tr>
                        <tr>
                          <td className="py-2 font-medium text-gray-600">
                            Pattern
                          </td>
                          <td className="py-2 text-gray-900">Solid</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div>
                    <h5 className="font-semibold text-gray-900 mb-2">
                      Product Details
                    </h5>
                    <table className="w-full text-sm">
                      <tbody>
                        <tr className="border-b">
                          <td className="py-2 font-medium text-gray-600">
                            SKU
                          </td>
                          <td className="py-2 text-gray-900">TS-RND-001</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 font-medium text-gray-600">
                            Color
                          </td>
                          <td className="py-2 text-gray-900">
                            Multiple Colors Available
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 font-medium text-gray-600">
                            Size
                          </td>
                          <td className="py-2 text-gray-900">S, M, L, XL</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 font-medium text-gray-600">
                            Weight
                          </td>
                          <td className="py-2 text-gray-900">200g</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 font-medium text-gray-600">
                            Care Instructions
                          </td>
                          <td className="py-2 text-gray-900">Machine Wash</td>
                        </tr>
                        <tr>
                          <td className="py-2 font-medium text-gray-600">
                            Country of Origin
                          </td>
                          <td className="py-2 text-gray-900">India</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeTab === 2 && (
            <div className="w-full p-5 border border-gray-300 rounded-md">
              <div className="mb-6">
                <h5 className="font-semibold text-gray-900 mb-4">
                  Customer Reviews
                </h5>
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-gray-900">4.0</div>
                    <div className="text-yellow-500 text-xl">★★★★☆</div>
                    <div className="text-sm text-gray-500">
                      Based on 5 reviews
                    </div>
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm w-12">5 ★</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-yellow-500 h-2 rounded-full"
                          style={{ width: "60%" }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">3</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm w-12">4 ★</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-yellow-500 h-2 rounded-full"
                          style={{ width: "40%" }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">2</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm w-12">3 ★</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-yellow-500 h-2 rounded-full"
                          style={{ width: "0%" }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">0</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm w-12">2 ★</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-yellow-500 h-2 rounded-full"
                          style={{ width: "0%" }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">0</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm w-12">1 ★</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-yellow-500 h-2 rounded-full"
                          style={{ width: "0%" }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">0</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {/* Review 1 */}
                <div className=" pb-4">
                  <div className="flex items-start gap-3 mb-2">
                    <div className="w-[50px] h-[50px] overflow-hidden rounded-full flex-shrink-0">
                      <img
                        src="https://randomuser.me/api/portraits/men/32.jpg"
                        className="w-full h-full object-cover"
                        alt="Rahul Kumar"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-1">
                        <div>
                          <h6 className="font-semibold text-gray-900">
                            Rahul Kumar
                          </h6>
                          <div className="text-yellow-500 text-sm">★★★★★</div>
                        </div>
                        <span className="text-sm text-gray-500">
                          2 days ago
                        </span>
                      </div>
                      <p className="text-gray-700 text-sm">
                        Excellent quality t-shirt! The fabric is soft and
                        comfortable. Fits perfectly as described. Great value
                        for money. Highly recommended!
                      </p>
                    </div>
                  </div>
                </div>

                {/* Review 2 */}
                <div className="pb-4">
                  <div className="flex items-start gap-3 mb-2">
                    <div className="w-[50px] h-[50px] overflow-hidden rounded-full flex-shrink-0">
                      <img
                        src="https://randomuser.me/api/portraits/women/44.jpg"
                        className="w-full h-full object-cover"
                        alt="Priya Sharma"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-1">
                        <div>
                          <h6 className="font-semibold text-gray-900">
                            Priya Sharma
                          </h6>
                          <div className="text-yellow-500 text-sm">★★★★★</div>
                        </div>
                        <span className="text-sm text-gray-500">
                          1 week ago
                        </span>
                      </div>
                      <p className="text-gray-700 text-sm">
                        Bought this for my husband and he absolutely loves it!
                        The material is breathable and perfect for summer. The
                        color hasn't faded after multiple washes.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Review 3 */}
                <div className="pb-4">
                  <div className="flex items-start gap-3 mb-2">
                    <div className="w-[50px] h-[50px] overflow-hidden rounded-full flex-shrink-0">
                      <img
                        src="https://randomuser.me/api/portraits/men/52.jpg"
                        className="w-full h-full object-cover"
                        alt="Amit Patel"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-1">
                        <div>
                          <h6 className="font-semibold text-gray-900">
                            Amit Patel
                          </h6>
                          <div className="text-yellow-500 text-sm">★★★★☆</div>
                        </div>
                        <span className="text-sm text-gray-500">
                          2 weeks ago
                        </span>
                      </div>
                      <p className="text-gray-700 text-sm">
                        Good quality t-shirt. The fit is nice but I wish it was
                        slightly longer. Overall satisfied with the purchase.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Review 4 */}
                <div className="pb-4">
                  <div className="flex items-start gap-3 mb-2">
                    <div className="w-[50px] h-[50px] overflow-hidden rounded-full flex-shrink-0">
                      <img
                        src="https://randomuser.me/api/portraits/women/65.jpg"
                        className="w-full h-full object-cover"
                        alt="Sneha Verma"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-1">
                        <div>
                          <h6 className="font-semibold text-gray-900">
                            Sneha Verma
                          </h6>
                          <div className="text-yellow-500 text-sm">★★★★★</div>
                        </div>
                        <span className="text-sm text-gray-500">
                          3 weeks ago
                        </span>
                      </div>
                      <p className="text-gray-700 text-sm">
                        Amazing product! Very comfortable to wear all day. The
                        stitching quality is excellent and the price point is
                        reasonable. Will definitely buy more colors.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Review 5 */}
                <div className="pb-4">
                  <div className="flex items-start gap-3 mb-2">
                    <div className="w-[50px] h-[50px] overflow-hidden rounded-full flex-shrink-0">
                      <img
                        src="https://randomuser.me/api/portraits/men/67.jpg"
                        className="w-full h-full object-cover"
                        alt="Vikram Singh"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-1">
                        <div>
                          <h6 className="font-semibold text-gray-900">
                            Vikram Singh
                          </h6>
                          <div className="text-yellow-500 text-sm">★★★★☆</div>
                        </div>
                        <span className="text-sm text-gray-500">
                          1 month ago
                        </span>
                      </div>
                      <p className="text-gray-700 text-sm">
                        Nice t-shirt for the price. Fabric quality is good and
                        it's quite comfortable. Delivery was quick too!
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t">
                <button className="bg-[#f0574c] text-white px-6 py-2 rounded font-medium hover:bg-[#d9483d] transition-colors">
                  Write a Review
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default ProductDetails;
