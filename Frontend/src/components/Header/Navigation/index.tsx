import Button from "@mui/material/Button";
import React, { useState, useContext } from "react";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { LiaAngleDownSolid } from "react-icons/lia";
import { Link } from "react-router-dom";
import { GoRocket } from "react-icons/go";
import CategoryPanel from "./CategoryPanel";
import "./style.css";
import { MyContext } from "../../../context/MyContext";
import { initialCategories } from "../../../types/category";

function Navigation(): React.JSX.Element {
  const [isOpenCategoryPanel, setIsOpenCategoryPanel] = useState<boolean>(false);
  const context = useContext(MyContext);
  const categories = context.categories && context.categories.length > 0
    ? context.categories
    : initialCategories;

  const openCategoryPanel = () => {
    setIsOpenCategoryPanel((prev) => !prev);
  };

  return (
    <>
      <nav className="py-2 border-b border-gray-100 shadow-xs bg-white">
        <div className="container flex items-center justify-between gap-2 md:gap-5 px-2 md:px-4">
          {/* Categories Button */}
          <div className="col_1 w-auto lg:w-[20%] flex-shrink-0">
            <Button
              className="!text-black gap-1 md:gap-2 text-[13px] md:text-[14px] !font-[600] whitespace-nowrap !py-1 !min-w-fit hover:!text-[#ff5252]"
              onClick={openCategoryPanel}
            >
              <HiOutlineMenuAlt1 className="text-[18px]" />
              <span className="hidden sm:inline">Shop By Categories</span>
              <span className="sm:hidden">Categories</span>
              <LiaAngleDownSolid className="text-[13px] ml-1 font-bold" />
            </Button>
          </div>

          {/* Navigation Links */}
          <div className="col_2 flex-1 overflow-x-auto overflow-y-hidden whitespace-nowrap scrollbar-none py-1">
            <ul className="flex items-center gap-4 md:gap-6 lg:gap-7 min-w-max px-2 m-0 p-0">
              {/* Home */}
              <li className="list-none flex-shrink-0">
                <Link
                  to="/"
                  className="link transition text-[13px] md:text-[14px] font-[500] text-gray-700 hover:text-[#ff5252]"
                >
                  Home
                </Link>
              </li>

              {/* All Products */}
              <li className="list-none flex-shrink-0">
                <Link
                  to="/products"
                  className="link transition text-[13px] md:text-[14px] font-[500] text-gray-700 hover:text-[#ff5252]"
                >
                  All Products
                </Link>
              </li>

              {/* Dynamic Categories */}
              {categories.slice(0, 7).map((cat, catIdx) => {
                const hasSubs = cat.subCategories && cat.subCategories.length > 0;
                const catKey = cat._id || cat.id || cat.slug || `cat-${catIdx}`;
                return (
                  <li key={catKey} className="list-none relative flex-shrink-0 group">
                    <Link
                      to={`/category/${cat.slug}`}
                      className="link transition text-[13px] md:text-[14px] font-[500] text-gray-700 hover:text-[#ff5252] flex items-center gap-1"
                    >
                      {cat.name}
                      {hasSubs && <LiaAngleDownSolid className="text-[10px] opacity-60 group-hover:rotate-180 transition-transform" />}
                    </Link>

                    {hasSubs && (
                      <div className="submenu absolute top-[100%] left-0 min-w-[200px] bg-white shadow-lg border border-gray-100 rounded-md py-2 hidden group-hover:block z-50 animate-fadeIn">
                        <ul>
                          {cat.subCategories!.map((sub, subIdx) => {
                            const subKey = sub._id || sub.id || sub.slug || `sub-${subIdx}`;
                            return (
                              <li key={subKey} className="list-none w-full">
                                <Link
                                  to={`/category/${cat.slug}/${sub.slug}`}
                                  className="block px-4 py-1.5 text-xs text-gray-600 hover:bg-red-50 hover:text-[#ff5252] transition-colors"
                                >
                                  {sub.name}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Free Delivery Promo */}
          <div className="col_3 hidden xl:flex flex-shrink-0 items-center gap-3 whitespace-nowrap pl-4">
            <p className="font-[400] text-[13px] flex items-center gap-2 mb-0 mt-0 text-gray-600">
              <GoRocket className="text-[16px] text-[#ff5252]" />
              Free International Delivery
            </p>
          </div>
        </div>
      </nav>

      {/* Category Panel */}
      <CategoryPanel
        openCategoryPanel={openCategoryPanel}
        isopenCategoryPanel={isOpenCategoryPanel}
      />
    </>
  );
}

export default Navigation;
