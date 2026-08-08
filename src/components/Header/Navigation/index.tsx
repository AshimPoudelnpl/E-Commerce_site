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
            <Button
              className="!text-black gap-2 w-full"
              onClick={openCategoryPanel}
            >
              <HiOutlineMenuAlt1 className="text-[18px]" />
              Shop By Categories
              <LiaAngleDownSolid className="text-[13px] ml-auto font-bold" />
            </Button>
          </div>
          <div className="col_2 w-[65%] ">
            <ul className="flex items-center gap-3">
              <li className="list-none">
                <Link
                  to={"/"}
                  className="link transition text-[14px] font-[500]"
                >
                  <Button className="link transition !text-[rgba(0,0,0,0.7)] hover:!text-[red]">
                    Home
                  </Button>
                </Link>
              </li>
              <li className="list-none relative">
                <Link
                  to={"/"}
                  className="link transition text-[14px] font-[500]"
                >
                  <Button className="link transition !text-[rgba(0,0,0,0.7)] hover:!text-[red]">
                    Fashion
                  </Button>
                </Link>
                <div className="submenu absolute top-[100%] left-[0%] min-w-[200px] bg-white shadow-md">
                  <ul>
                    <Link to="/fashion/men" className="w-full">
                      <li className="list-none w-full">
                        <Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none">
                          Men
                        </Button>
                        <div className="submenu absolute top-[100%] left-[0%] min-w-[200px] bg-white shadow-md">
                          <ul>
                            <Link to="/fashion/men" className="w-full">
                              <li className="list-none w-full">
                                <Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none">
                                  T-shirt
                                </Button>
                              </li>
                            </Link>
                            <Link to="/fashion/women" className="w-full">
                              <li className="list-none w-full">
                                <Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none">
                                  Jeans
                                </Button>
                              </li>
                            </Link>
                            <Link to="/fashion/kids" className="w-full">
                              <li className="list-none w-full">
                                <Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none">
                                  Footwear
                                </Button>
                              </li>
                            </Link>
                            <Link to="/fashion/girls" className="w-full">
                              <li className="list-none w-full">
                                <Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none">
                                  Watch
                                </Button>
                              </li>
                            </Link>
                            <Link to="/fashion/boys" className="w-full">
                              <li className="list-none w-full">
                                <Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none">
                                  Pents
                                </Button>
                              </li>
                            </Link>
                          </ul>
                        </div>
                      </li>
                    </Link>
                    <Link to="/fashion/women" className="w-full">
                      <li className="list-none w-full">
                        <Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none">
                          Women
                        </Button>
                      </li>
                    </Link>
                    <Link to="/fashion/kids" className="w-full">
                      <li className="list-none w-full">
                        <Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none">
                          Kids
                        </Button>
                      </li>
                    </Link>
                    <Link to="/fashion/girls" className="w-full">
                      <li className="list-none w-full">
                        <Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none">
                          Girls
                        </Button>
                      </li>
                    </Link>
                    <Link to="/fashion/boys" className="w-full">
                      <li className="list-none w-full">
                        <Button className="!text-[rgba(0,0,0,0.8)] w-full !text-left !justify-start !rounded-none">
                          Boys
                        </Button>
                      </li>
                    </Link>
                  </ul>
                </div>
              </li>
              <li className="list-none">
                <Link
                  to={"/"}
                  className="link transition text-[14px] font-[500]"
                >
                  <Button className="link transition !text-[rgba(0,0,0,0.7)] hover:!text-[red]">
                    Electronics
                  </Button>
                </Link>
              </li>
              <li className="list-none">
                <Link
                  to={"/"}
                  className="link transition text-[14px] font-[500]"
                >
                  <Button className="link transition !text-[rgba(0,0,0,0.7)] hover:!text-[red]">
                    Bags
                  </Button>
                </Link>
              </li>
              <li className="list-none">
                <Link
                  to={"/"}
                  className="link transition text-[14px] font-[500]"
                >
                  <Button className="link transition !text-[rgba(0,0,0,0.7)] hover:!text-[red]">
                    {" "}
                    Footwear
                  </Button>
                </Link>
              </li>
              <li className="list-none">
                <Link
                  to={"/"}
                  className="link transition text-[14px] font-[500]"
                >
                  <Button className="link transition !text-[rgba(0,0,0,0.7)] hover:!text-[red]">
                    Groceries
                  </Button>
                </Link>
              </li>
              <li className="list-none">
                <Link
                  to={"/"}
                  className="link transition text-[14px] font-[500]"
                >
                  <Button className="link transition !text-[rgba(0,0,0,0.7)] hover:!text-[red]">
                    Beauty
                  </Button>
                </Link>
              </li>
              <li className="list-none">
                <Link
                  to={"/"}
                  className="link transition text-[14px] font-[500]"
                >
                  <Button className="link transition !text-[rgba(0,0,0,0.7)] hover:!text-[red]">
                    Jwellery
                  </Button>
                </Link>
              </li>
            </ul>
          </div>
          <div className="col_3 w-fit flex-shrink-0 flex items-center gap-3 whitespace-nowrap">
            <p className="font-[300] text-[14px] flex items-center gap-3 mb-0 mt-0"/>
              <GoRocket className="text-[18px] " />
              Free International Delievery
          </div>
        </div>
      </nav>
      <CategoryPanel
        openCategoryPanel={openCategoryPanel}
        isopenCategoryPanel={isopenCategoryPanel}
      />
    </>
  );
}

export default Navigation;