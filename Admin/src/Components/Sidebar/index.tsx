import React, { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.jpg";

import {
  MdDashboard,
  MdImage,
  MdPeople,
  MdShoppingBag,
  MdCategory,
  MdReceiptLong,
  MdLogout,
} from "react-icons/md";

import { IoChevronDown } from "react-icons/io5";
import { MyContext } from "../../App";

const Sidebar = () => {
  const { isSideBarOpen } = useContext(MyContext);

  return (
    <aside
      className={`fixed top-0 left-0 z-40 h-screen w-[18%] border-r border-gray-200 bg-white transition-all duration-300 ${
        isSideBarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Logo */}
      <div className="flex h-[70px] items-center border-b border-gray-200 px-6">
        <img src={logo} alt="Ecme" className="w-[120px]" />
      </div>

      {/* Menu */}
      <div className="px-3 py-5">
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
          Main Menu
        </p>

        {/* Dashboard */}
        <Link
          to="/"
          className="mb-1 flex items-center gap-3 rounded-lg bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-600"
        >
          <MdDashboard className="text-xl" />
          <span>Dashboard</span>
        </Link>

        {/* Home Slides */}
        <Link
          to="/home-slides"
          className="mb-1 flex w-full items-center justify-between rounded-lg px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
        >
          <span className="flex items-center gap-3">
            <MdImage className="text-xl text-gray-500" />
            <span>Home Slides</span>
          </span>

          <IoChevronDown className="text-gray-500" />
        </Link>

        {/* Users */}
        <Link
          to="/users"
          className="mb-1 flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
        >
          <MdPeople className="text-xl text-gray-500" />
          <span>Users</span>
        </Link>

        {/* Products */}
        <Link
          to="/products"
          className="mb-1 flex w-full items-center justify-between rounded-lg px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
        >
          <span className="flex items-center gap-3">
            <MdShoppingBag className="text-xl text-gray-500" />
            <span>Products</span>
          </span>

          <IoChevronDown className="text-gray-500" />
        </Link>

        {/* Category */}
        <Link
          to="/category"
          className="mb-1 flex w-full items-center justify-between rounded-lg px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
        >
          <span className="flex items-center gap-3">
            <MdCategory className="text-xl text-gray-500" />
            <span>Category</span>
          </span>

          <IoChevronDown className="text-gray-500" />
        </Link>

        {/* Orders */}
        <Link
          to="/orders"
          className="mb-1 flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
        >
          <MdReceiptLong className="text-xl text-gray-500" />
          <span>Orders</span>
        </Link>

        {/* Logout */}
        <button className="mt-5 flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold text-red-500 transition hover:bg-red-50">
          <MdLogout className="text-xl" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
