import Button from "@mui/material/Button";
import React from "react";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { LiaAngleDownSolid } from "react-icons/lia";
import { Link } from "react-router-dom";
import { GoRocket } from "react-icons/go";
import CategoryPanel from "./CategoryPanel";
import "./style.css";

function Navigation(): React.JSX.Element {
  const [isopenCategoryPanel, setIsOpenCategoryPanel] = React.useState(false);
  const openCategoryPanel = () => {
    setIsOpenCategoryPanel(!isopenCategoryPanel);
  };

  return (
    <>
      <nav className="py-2">
        <div className="container flex items-center justify-end gap-5">
          <div className="col_1 w-[20%]">
            <Button className="!text-black gap-2 w-full" onClick={openCategoryPanel}>
              <HiOutlineMenuAlt1 className="text-[18px]" />
              Shop By Categories
              <LiaAngleDownSolid className="text-[13px] ml-auto font-bold" />
            </Button>
          </div>
          <div className="col_2 w-[65%]">
            <ul className="flex items-center gap-3">
              <li className="list-none">
                <Link to="/" className="link transition text-[14px] font-[500]">Home</Link>
              </li>
              <li className="list-none relative">
                <Link to="/" className="link transition text-[14px] font-[500]">Fashion</Link>
                <div className="submenu absolute top-[100%] left-[0%] min-w-[200px] bg-white shadow-md">
                  <ul>
                    <li className="list-none w-full">
                      <Link to="/fashion/men" className="block px-3 py-2 text-[rgba(0,0,0,0.8)] hover:bg-gray-100">Men</Link>
                      <div className="submenu absolute top-[0%] left-[100%] min-w-[200px] bg-white shadow-md">
                        <ul>
                          <li className="list-none w-full"><Link to="/fashion/men/tshirt" className="block px-3 py-2 text-[rgba(0,0,0,0.8)] hover:bg-gray-100">T-shirt</Link></li>
                          <li className="list-none w-full"><Link to="/fashion/men/jeans" className="block px-3 py-2 text-[rgba(0,0,0,0.8)] hover:bg-gray-100">Jeans</Link></li>
                          <li className="list-none w-full"><Link to="/fashion/men/footwear" className="block px-3 py-2 text-[rgba(0,0,0,0.8)] hover:bg-gray-100">Footwear</Link></li>
                          <li className="list-none w-full"><Link to="/fashion/men/watch" className="block px-3 py-2 text-[rgba(0,0,0,0.8)] hover:bg-gray-100">Watch</Link></li>
                          <li className="list-none w-full"><Link to="/fashion/men/pants" className="block px-3 py-2 text-[rgba(0,0,0,0.8)] hover:bg-gray-100">Pants</Link></li>
                        </ul>
                      </div>
                    </li>
                    <li className="list-none w-full"><Link to="/fashion/women" className="block px-3 py-2 text-[rgba(0,0,0,0.8)] hover:bg-gray-100">Women</Link></li>
                    <li className="list-none w-full"><Link to="/fashion/kids" className="block px-3 py-2 text-[rgba(0,0,0,0.8)] hover:bg-gray-100">Kids</Link></li>
                    <li className="list-none w-full"><Link to="/fashion/girls" className="block px-3 py-2 text-[rgba(0,0,0,0.8)] hover:bg-gray-100">Girls</Link></li>
                    <li className="list-none w-full"><Link to="/fashion/boys" className="block px-3 py-2 text-[rgba(0,0,0,0.8)] hover:bg-gray-100">Boys</Link></li>
                  </ul>
                </div>
              </li>
              <li className="list-none">
                <Link to="/" className="link transition text-[14px] font-[500]">Electronics</Link>
              </li>
              <li className="list-none">
                <Link to="/" className="link transition text-[14px] font-[500]">Bags</Link>
              </li>
              <li className="list-none">
                <Link to="/" className="link transition text-[14px] font-[500]">Footwear</Link>
              </li>
              <li className="list-none">
                <Link to="/" className="link transition text-[14px] font-[500]">Groceries</Link>
              </li>
              <li className="list-none">
                <Link to="/" className="link transition text-[14px] font-[500]">Beauty</Link>
              </li>
              <li className="list-none">
                <Link to="/" className="link transition text-[14px] font-[500]">Jewellery</Link>
              </li>
            </ul>
          </div>
          <div className="col_3 w-fit flex-shrink-0 flex items-center gap-3 whitespace-nowrap">
            <p className="font-[300] text-[14px] flex items-center gap-3 mb-0 mt-0">
              <GoRocket className="text-[18px]" />
              Free International Delivery
            </p>
          </div>
        </div>
      </nav>
      <CategoryPanel openCategoryPanel={openCategoryPanel} isopenCategoryPanel={isopenCategoryPanel} />
    </>
  );
}

export default Navigation;
