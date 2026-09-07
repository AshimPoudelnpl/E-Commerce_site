import Button from "@mui/material/Button";
import React, { useState } from "react";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { LiaAngleDownSolid } from "react-icons/lia";
import { Link } from "react-router-dom";
import { GoRocket } from "react-icons/go";
import CategoryPanel from "./CategoryPanel";
import "./style.css";

function Navigation(): React.JSX.Element {
  const [isOpenCategoryPanel, setIsOpenCategoryPanel] =
    useState<boolean>(false);

  const openCategoryPanel = () => {
    setIsOpenCategoryPanel((prev) => !prev);
  };

  return (
    <>
      <nav className="py-2 border-b border-gray-100 shadow-sm">
        <div className="container flex items-center justify-between gap-2 md:gap-5 px-2 md:px-4">
          {/* Categories Button */}
          <div className="col_1 w-auto lg:w-[20%] flex-shrink-0">
            <Button
              className="!text-black gap-1 md:gap-2 text-[13px] md:text-[14px] !font-[600] whitespace-nowrap !py-1 !min-w-fit"
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
            <ul className="flex items-center gap-4 md:gap-6 lg:gap-8 min-w-max px-2 m-0 p-0">
              {/* Home */}
              <li className="list-none flex-shrink-0">
                <Link
                  to="/"
                  className="link transition text-[13px] md:text-[14px] font-[500] hover:text-[#ff5252]"
                >
                  Home
                </Link>
              </li>

              {/* Fashion */}
              <li className="list-none relative flex-shrink-0 group">
                <Link
                  to="/"
                  className="link transition text-[13px] md:text-[14px] font-[500] hover:text-[#ff5252]"
                >
                  Fashion
                </Link>

                <div className="submenu absolute top-[100%] left-0 min-w-[200px] bg-white shadow-md z-50">
                  <ul>
                    <li className="list-none w-full">
                      <Link to="/fashion/men" className="block px-3 py-2">
                        Men
                      </Link>
                    </li>

                    <li className="list-none w-full">
                      <Link to="/fashion/women" className="block px-3 py-2">
                        Women
                      </Link>
                    </li>

                    <li className="list-none w-full">
                      <Link to="/fashion/kids" className="block px-3 py-2">
                        Kids
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>

              {/* Other Categories */}
              {[
                "Electronics",
                "Bags",
                "Footwear",
                "Groceries",
                "Beauty",
                "Jewellery",
              ].map((item) => (
                <li key={item} className="list-none flex-shrink-0">
                  <Link
                    to="/"
                    className="link transition text-[13px] md:text-[14px] font-[500] hover:text-[#ff5252]"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Delivery */}
          <div className="col_3 hidden xl:flex flex-shrink-0 items-center gap-3 whitespace-nowrap pl-4">
            <p className="font-[300] text-[13px] flex items-center gap-2 mb-0 mt-0 text-gray-600">
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
