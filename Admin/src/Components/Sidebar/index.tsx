import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.jpg";
import { uploadData, getData } from "../../utils/api";

import {
  MdDashboard,
  MdImage,
  MdPeople,
  MdShoppingBag,
  MdCategory,
  MdReceiptLong,
  MdLogout,
  MdPerson,
} from "react-icons/md";

import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { MyContext } from "../../App";

const Sidebar = () => {
  const { isSideBarOpen } = useContext(MyContext);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [catOpen, setCatOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await getData("/api/user/logout");
    } catch {
      console.log("Logout failed");
    }
    localStorage.removeItem("token");
    localStorage.removeItem("adminAvatar");
    navigate("/login");
  };

  const onChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatar(URL.createObjectURL(file));
    const formData = new FormData();
    formData.append("avatar", file);
    try {
      await uploadData("/api/user/upload-avatar", formData);
    } catch {
      console.log("Avatar upload failed");
    }
  };

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

        {/* Category Dropdown */}
        <div className="mb-1">
          <button
            onClick={() => setCatOpen((v) => !v)}
            className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
          >
            <span className="flex items-center gap-3">
              <MdCategory className="text-xl text-gray-500" />
              <span>Category</span>
            </span>
            {catOpen ? <IoChevronUp className="text-gray-500" /> : <IoChevronDown className="text-gray-500" />}
          </button>
          {catOpen && (
            <div className="ml-8 flex flex-col gap-1 mt-1">
              <Link to="/category" className="rounded-lg px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-blue-600">
                Category
              </Link>
              <Link to="/sub-category" className="rounded-lg px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-blue-600">
                Sub Category
              </Link>
            </div>
          )}
        </div>

        {/* Orders */}
        <Link
          to="/orders"
          className="mb-1 flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
        >
          <MdReceiptLong className="text-xl text-gray-500" />
          <span>Orders</span>
        </Link>

        {/* Profile */}
        <Link
          to="/profile"
          className="mb-1 flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
        >
          <MdPerson className="text-xl text-gray-500" />
          <span>Profile</span>
        </Link>

        {/* Logout */}
        <button onClick={handleLogout} className="mt-5 flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold text-red-500 transition hover:bg-red-50">
          <MdLogout className="text-xl" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
