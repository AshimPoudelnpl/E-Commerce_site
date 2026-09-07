import logo from "../../assets/logo.jpg";
import { Link, useNavigate } from "react-router-dom";
import Search from "../Search";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Tooltip from "@mui/material/Tooltip";
import { MdShoppingCartCheckout } from "react-icons/md";
import { IoIosGitCompare, IoIosLogOut, IoMdHeartEmpty } from "react-icons/io";
import { TiHeartOutline } from "react-icons/ti";
import Navigation from "../Header/Navigation";
import { MyContext } from "../../context/MyContext";
import React, { useContext, type MouseEvent } from "react";
import { Avatar, Divider, Menu, MenuItem } from "@mui/material";
import { FaRegUser } from "react-icons/fa6";
import { postData } from "../../utils/api";
import { IoBagCheckOutline } from "react-icons/io5";

function Header() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const context = useContext(MyContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    postData("/api/user/logout", {})
      .then((res) => {
        console.log(res);
        localStorage.removeItem("token");
        localStorage.removeItem("userEmail");
        context.setIsLogin(false);
        context.alertBox({ type: "success", msg: "Logged out successfully" });
        navigate("/login");
      })
      .catch(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("userEmail");
        context.setIsLogin(false);
        navigate("/login");
      });
  };

  return (
    <header className="bg-white sticky top-0 z-40 shadow-xs">
      <div className="top-strip py-2 border-t-[1px] border-gray-300 border-b-[1px] hidden md:block">
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

      <div className="header py-2 md:py-3">
        <div className="container flex items-center justify-between px-2 md:px-4">
          <div className="col1 w-auto md:w-[25%] p-1 md:p-2">
            <Link to="/">
              <img src={logo} alt="logo" className="w-[110px] md:w-[150px] object-contain" />
            </Link>
          </div>

          <div className="col2 hidden md:block w-[45%]">
            <Search />
          </div>

          <div className="col3 w-auto md:w-[30%] pl-2 md:pl-5">
            <ul className="flex items-center justify-end gap-1 md:gap-3 w-full m-0 p-0">
              {context.isLogin === false ? (
                <li className="list-none flex items-center gap-1">
                  <Link
                    to="/login"
                    className="link transition text-[13px] md:text-[15px] font-[500]"
                  >
                    Login
                  </Link>

                  <span className="text-gray-400">|</span>

                  <Link
                    to="/sign-in"
                    className="link transition text-[13px] md:text-[15px] font-[500]"
                  >
                    Sign-in
                  </Link>
                </li>
              ) : (
                <>
                  <li className="list-none flex items-center">
                    <IconButton
                      onClick={handleClick}
                      aria-controls={open ? "account-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      size="small"
                    >
                      <Avatar sx={{ width: 32, height: 32 }}>
                        <FaRegUser className="text-[14px]" />
                      </Avatar>
                    </IconButton>
                    <span className="text-[13px] md:text-[14px] font-[500] hidden sm:inline ml-1">
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
                      <MenuItem disabled className="p-0">
                        <div className="flex flex-col px-2 py-1">
                          <span className="text-[14px] font-[600]">{context.user?.name}</span>
                          <span className="text-[12px] text-gray-500">{context.user?.email}</span>
                        </div>
                      </MenuItem>
                      <Divider />
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

                      <MenuItem onClick={handleLogout} className="p-0">
                        <span className="flex items-center gap-2 w-full px-2 py-2 cursor-pointer">
                          <IoIosLogOut className="text-[18px]" />
                          <span className="text-[14px]">Logout</span>
                        </span>
                      </MenuItem>
                    </Menu>
                  </li>
                </>
              )}

              {/* Compare Icon */}
              <li className="list-none hidden md:block">
                <Tooltip title="Compare">
                  <IconButton aria-label="compare" size="small">
                    <Badge badgeContent={4} color="secondary">
                      <IoIosGitCompare />
                    </Badge>
                  </IconButton>
                </Tooltip>
              </li>

              {/* Wishlist Icon */}
              <li className="list-none hidden md:block">
                <Tooltip title="Wishlist">
                  <IconButton aria-label="wishlist" size="small">
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
                    size="small"
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

        {/* Mobile Search Bar */}
        <div className="block md:hidden px-3 pt-2">
          <Search />
        </div>
      </div>

      <Navigation />
    </header>
  );
}

export default Header;
