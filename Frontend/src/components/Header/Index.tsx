import logo from "../../assets/logo.jpg";
import { Link } from "react-router-dom";
import Search from "../Search";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Tooltip from "@mui/material/Tooltip";
import { MdShoppingCartCheckout } from "react-icons/md";
import { IoIosGitCompare, IoIosLogOut, IoMdHeartEmpty } from "react-icons/io";
import { TiHeartOutline } from "react-icons/ti";
import Navigation from "../Header/Navigation";
import { MyContext } from "../../App";
import React, { useContext } from "react";
import { Avatar, Divider, ListItemIcon, Menu, MenuItem } from "@mui/material";
import { BsPersonAdd } from "react-icons/bs";
import { CiSettings } from "react-icons/ci";
import { FiLogOut } from "react-icons/fi";
import { FaBoxOpen, FaList, FaRegUser } from "react-icons/fa6";
import { IoBagCheckOutline } from "react-icons/io5";

function Header() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const context = useContext(MyContext);

  return (
    <header className="bg-white">
      <div className="top-strip py-2 border-t-[1px] border-gray-300 border-b-[1px]">
        <div className="container">
          <div className="flex items-center justify-between">
            <div className="col1 w-[50%]">
              <p className="text-[12px] font-[500]">
                Get up to 50% off New season styles, limited time only
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
            <Link to="/">
              <img src={logo} alt="logo" />
            </Link>
          </div>

          <div className="col2 w-[45%]">
            <Search />
          </div>

          <div className="col3 w-[30%] pl-5">
            <ul className="flex items-center justify-end gap-3 w-full">
              {context.isLogin === false ? (
                <li className="list-none">
                  <Link
                    to="/login"
                    className="link transition text-[15px] font-[500]"
                  >
                    Login
                  </Link>

                  {" | "}

                  <Link
                    to="/sign-in"
                    className="link transition text-[15px] font-[500]"
                  >
                    Sign-in
                  </Link>
                </li>
              ) : (
                <>
                  <li className="list-none">
                    <IconButton
                      onClick={handleClick}
                      aria-controls={open ? "account-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                    >
                      <Avatar>
                        <FaRegUser />
                      </Avatar>
                    </IconButton>
                    <span className="text-[14px] font-[500]">
                      {context.user?.name || "User"}
                    </span>

                    <Menu
                      anchorEl={anchorEl}
                      id="account-menu"
                      open={open}
                      onClose={handleClose}
                      onClick={handleClose}
                      slotProps={{
                        paper: {
                          elevation: 0,
                          sx: {
                            overflow: "visible",
                            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                            mt: 1.5,
                            "& .MuiAvatar-root": {
                              width: 32,
                              height: 32,
                              ml: -0.5,
                              mr: 1,
                            },
                            "&::before": {
                              content: '""',
                              display: "block",
                              position: "absolute",
                              top: 0,
                              right: 14,
                              width: 10,
                              height: 10,
                              bgcolor: "background.paper",
                              transform: "translateY(-50%) rotate(45deg)",
                              zIndex: 0,
                            },
                          },
                        },
                      }}
                      transformOrigin={{
                        horizontal: "right",
                        vertical: "top",
                      }}
                      anchorOrigin={{
                        horizontal: "right",
                        vertical: "bottom",
                      }}
                    >
                      <MenuItem onClick={handleClose} className="p-0">
                        <Link
                          to="/my-account"
                          className="flex items-center gap-2 w-full px-2 py-2"
                        >
                          <FaRegUser className="text-[18px]" />
                          <span className="text-[14px]">My Account</span>
                        </Link>
                      </MenuItem>

                      <MenuItem onClick={handleClose} className="p-0">
                        <Link
                          to="/my-orders"
                          className="flex items-center gap-2 w-full px-2 py-2"
                        >
                          <IoBagCheckOutline className="text-[18px]" />
                          <span className="text-[14px]">Orders</span>
                        </Link>
                      </MenuItem>

                      <MenuItem onClick={handleClose} className="p-0">
                        <Link
                          to="/my-list"
                          className="flex items-center gap-2 w-full px-2 py-2"
                        >
                          <IoMdHeartEmpty className="text-[18px]" />
                          <span className="text-[14px]">My List</span>
                        </Link>
                      </MenuItem>

                      <MenuItem onClick={handleClose} className="p-0">
                        <Link
                          to="/logout"
                          className="flex items-center gap-2 w-full px-2 py-2"
                        >
                          <IoIosLogOut className="text-[18px]" />
                          <span className="text-[14px]">Logout</span>
                        </Link>
                      </MenuItem>
                    </Menu>
                  </li>
                </>
              )}

              {/* Compare Icon */}
              <li className="list-none">
                <Tooltip title="Compare">
                  <IconButton aria-label="compare">
                    <Badge badgeContent={4} color="secondary">
                      <IoIosGitCompare />
                    </Badge>
                  </IconButton>
                </Tooltip>
              </li>

              {/* Wishlist Icon */}
              <li className="list-none">
                <Tooltip title="Wishlist">
                  <IconButton aria-label="wishlist">
                    <Badge badgeContent={4} color="secondary">
                      <TiHeartOutline />
                    </Badge>
                  </IconButton>
                </Tooltip>
              </li>

              {/* Cart Icon */}
              <li className="list-none">
                <Tooltip title="Cart">
                  <IconButton
                    aria-label="cart"
                    onClick={() => context.setCartOpen(true)}
                  >
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
