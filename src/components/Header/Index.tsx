import React from "react";
import logo from "../../assets/logo.jpg";
import { Link } from "react-router-dom";
import Search from "../Search";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Tooltip from "@mui/material/Tooltip";
import { MdShoppingCartCheckout } from "react-icons/md";
import { IoIosGitCompare } from "react-icons/io";
import { TiHeartOutline } from "react-icons/ti";
import Navigation from "../Header/Navigation";

function Header() {
  return (
    <header className="bg-white">
      <div className="top-strip py-2 border-t-[1px] border-gray-300 border-b-[1px]  ">
        <div className="container">
          <div className="flex items-center justify-between">
            <div className="col1 w-[50%]">
              <p className="text-[12px] font-[500]">
                Get up to 50% off New season styles ,limited time only{" "}
              </p>
            </div>
            <div className="col2 flex items-center justify-end">
              <ul className="flex items-center gap-3">
                <li className="list-none">
                  <Link
                    to="/help-center"
                    className="text-[12px] link font-[500] transition"
                  >
                    Help Center
                  </Link>
                </li>
                <li className="list-none">
                  <Link
                    to="/order-tracing"
                    className="text-[12px] link font-[500] transition"
                  >
                    Order-tracing
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="header">
        <div className="container flex items-center justify-between">
          <div className="col1 w-[25%] p-4">
            <Link to={"/"}>
              <img src={logo} alt="logo" />
            </Link>
          </div>
          <div className="col2 w-[45%]">
            <Search />
          </div>
          <div className="col3 w-[30%] pl-5">
            <ul className="flex items-center justify-end gap-3 w-full">
              <li className="list-none">
                <Link
                  to={"/login"}
                  className="link transition text-[15px] font-[500]"
                >
                  Login
                </Link>{" "}
                |{" "}
                <Link
                  to={"/sign-in"}
                  className="link transition text-[15px] font-[500]"
                >
                  Sign-in
                </Link>
              </li>

              {/* Compare Icon */}
              <li>
                <Tooltip title="Compare">
                  <IconButton aria-label="compare">
                    <Badge badgeContent={4} color="secondary">
                      <IoIosGitCompare />
                    </Badge>
                  </IconButton>
                </Tooltip>
              </li>

              {/* Wishlist / Heart Icon */}
              <li>
                <Tooltip title="Wishlist">
                  <IconButton aria-label="wishlist">
                    <Badge badgeContent={4} color="secondary">
                      <TiHeartOutline />
                    </Badge>
                  </IconButton>
                </Tooltip>
              </li>

              {/* Cart Icon */}
              <li>
                <Tooltip title="Cart">
                  <IconButton aria-label="cart">
                    <Badge badgeContent={4} color="secondary">
                      <MdShoppingCartCheckout />
                    </Badge>
                  </IconButton>
                </Tooltip>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Navigation />
    </header>
  );
}

export default Header;