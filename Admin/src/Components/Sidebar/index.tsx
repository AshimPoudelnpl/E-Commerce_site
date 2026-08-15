import React from "react";
import { Link } from "react-router-dom";

import {
  HiOutlineViewGrid,
  HiOutlinePhotograph,
  HiOutlineUsers,
  HiOutlineShoppingBag,
  HiOutlineCollection,
  HiOutlineClipboardList,
  HiOutlineLogout,
  HiOutlineChevronDown,
} from "react-icons/hi";

const Sidebar = () => {
  return (
    <aside className="fixed top-0 left-0 z-40 h-screen w-[18%] border-r border-gray-200 bg-white px-4 py-3">
      {/* Logo */}
      <div className="mb-6 flex w-full items-center px-2">
        <Link to="/">
          <img src="/logo.jpg" alt="Ecme" className="w-[120px]" />
        </Link>
      </div>

      {/* Menu */}
      <nav className="w-full">
        {/* Dashboard */}
        <Link
          to="/"
          className="mb-1 flex h-[45px] items-center gap-4 rounded-md px-2 text-[14px] font-medium text-gray-700 hover:bg-gray-100"
        >
          <HiOutlineViewGrid className="text-[21px] font-bold text-gray-600" />
          <span className="font-bold">Dashboard</span>
        </Link>

        {/* Home Slides */}
        <Link
          to="/home-slides"
          className="mb-1 flex h-[45px] items-center justify-between rounded-md px-2 text-[14px] font-medium text-gray-700 hover:bg-gray-100"
        >
          <div className="flex items-center gap-4">
            <HiOutlinePhotograph className="text-[21px] text-gray-600" />
            <span  className="font-bold">Home Slides</span>
          </div>

          <HiOutlineChevronDown className="text-[16px] text-gray-600" />
        </Link>

        {/* Users */}
        <Link
          to="/users"
          className="mb-1 flex h-[45px] items-center gap-4 rounded-md px-2 text-[14px] font-medium text-gray-700 hover:bg-gray-100"
        >
          <HiOutlineUsers className="text-[21px] text-gray-600" />
          <span  className="font-bold">Users</span>
        </Link>

        {/* Products */}
        <Link
          to="/products"
          className="mb-1 flex h-[45px] items-center justify-between rounded-md px-2 text-[14px] font-medium text-gray-700 hover:bg-gray-100"
        >
          <div className="flex items-center gap-4">
            <HiOutlineShoppingBag className="text-[21px] text-gray-600" />
            <span className="font-bold">Products</span>
          </div>

          <HiOutlineChevronDown className="text-[16px] text-gray-600" />
        </Link>

        {/* Category */}
        <Link
          to="/category"
          className="mb-1 flex h-[45px] items-center justify-between rounded-md px-2 text-[14px] font-medium text-gray-700 hover:bg-gray-100"
        >
          <div className="flex items-center gap-4">
            <HiOutlineCollection className="text-[21px] text-gray-600" />
            <span className="font-bold">Category</span>
          </div>

          <HiOutlineChevronDown className="text-[16px] text-gray-600" />
        </Link>

        {/* Orders */}
        <Link
          to="/orders"
          className="mb-1 flex h-[45px] items-center gap-4 rounded-md px-2 text-[14px] font-medium text-gray-700 hover:bg-gray-100"
        >
          <HiOutlineClipboardList className="text-[21px] text-gray-600" />
          <span  className="font-bold">Orders</span>
        </Link>

        {/* Logout */}
        <button className="flex h-[45px] w-full items-center gap-4 rounded-md px-2 text-[14px] font-medium text-gray-700 hover:bg-gray-100">
          <HiOutlineLogout className="text-[21px] text-gray-600" />
          <span className="font-bold">Logout</span>
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
