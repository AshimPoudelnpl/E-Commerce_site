import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { FaRegUser } from "react-icons/fa6";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoBagCheckOutline } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdOutlineLocationOn } from "react-icons/md";
import { FaCloudUploadAlt } from "react-icons/fa";
import { uploadData } from "../../utils/api";
import { MyContext } from "../../context/MyContext";

type SideBarProps = {
  activeSection?: "profile" | "password" | "address";
  setActiveSection?: (s: "profile" | "password" | "address") => void;
};

const AcccountSideaBar = ({
  activeSection = "profile",
  setActiveSection = () => undefined,
}: SideBarProps) => {
  const context = useContext(MyContext);
  const [preview, setPreview] = useState<string | null>(null);

  const onChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    const formData = new FormData();
    formData.append("avatar", file);
    try {
      const res = await uploadData("/api/user/upload-avatar", formData);
      if (res?.success) {
        context.alertBox({
          type: "success",
          msg: "Avatar updated successfully!",
        });
        context.setUser(res.data);
      } else {
        context.alertBox({
          type: "error",
          msg: res?.message || "Failed to upload avatar",
        });
      }
    } catch {
      context.alertBox({ type: "error", msg: "Failed to upload avatar" });
    }
  };
  const navItems = [
    {
      label: "My Profile",
      to: "/my-account",
      icon: <FaRegUser className="text-[16px]" />,
    },
    {
      label: "List",
      to: "/my-list",
      icon: <IoMdHeartEmpty className="text-[18px]" />,
    },
    {
      label: "Orders",
      to: "/my-orders",
      icon: <IoBagCheckOutline className="text-[17px]" />,
    },
  ];

  return (
    <div className="leftSidebar w-full md:w-[25%] bg-white rounded-md shadow-sm overflow-hidden md:sticky md:top-[10px] min-h-2">
      <div className="flex flex-col items-center text-center py-5 px-4">
        <div className="relative group mb-3">
          <img
            src={
              preview ||
              context?.user?.avatar ||
              "https://via.placeholder.com/100"
            }
            alt="Profile"
            className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover"
          />

          {/* Upload Overlay */}
          <label
            htmlFor="profileImage"
            className="absolute inset-0 rounded-full bg-black/50
                 flex flex-col items-center justify-center
                 opacity-0 group-hover:opacity-100
                 transition-opacity duration-300 cursor-pointer"
          >
            <FaCloudUploadAlt className="text-white text-[25px]" />
            <span className="text-white text-[12px] font-medium">Upload</span>
          </label>

          <input
            type="file"
            id="profileImage"
            accept="image/*"
            className="hidden"
            onChange={onChangeFile}
          />
        </div>

        <h4 className="text-[15px] font-semibold text-gray-800">
          {context?.user?.name || "User"}
        </h4>
        <span className="text-[13px] text-gray-500">
          {context?.user?.email || ""}
        </span>
      </div>

      {/* Nav links — horizontal on mobile, vertical on md+ */}
      <ul className="flex flex-row md:flex-col overflow-x-auto md:overflow-x-visible scrollbar-none border-t md:border-t-0">
        {navItems.map((item) => (
          <li key={item.to} className="list-none flex-shrink-0 md:flex-shrink">
            <NavLink
              to={item.to}
              end={item.to === "/my-account"}
              onClick={() => setActiveSection("profile")}
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-3 text-[13px] md:text-[14px] font-medium border-b-4 md:border-b-0 md:border-l-4 transition-colors whitespace-nowrap ${
                  isActive && activeSection === "profile"
                    ? "border-[#e8623d] text-[#e8623d] bg-[#fdf1ee]"
                    : "border-transparent text-gray-600 hover:bg-gray-50"
                }`
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          </li>
        ))}

        <li className="list-none flex-shrink-0 md:flex-shrink">
          <button
            type="button"
            onClick={() => setActiveSection("address")}
            className={`w-full flex items-center gap-2 px-4 py-3 text-[13px] md:text-[14px] font-medium border-b-4 md:border-b-0 md:border-l-4 transition-colors whitespace-nowrap ${
              activeSection === "address"
                ? "border-[#e8623d] text-[#e8623d] bg-[#fdf1ee]"
                : "border-transparent text-gray-600 hover:bg-gray-50"
            }`}
          >
            <MdOutlineLocationOn className="text-[18px]" />
            My Addresses
          </button>
        </li>

        <li className="list-none flex-shrink-0 md:flex-shrink">
          <button
            type="button"
            onClick={() => setActiveSection("password")}
            className={`w-full flex items-center gap-2 px-4 py-3 text-[13px] md:text-[14px] font-medium border-b-4 md:border-b-0 md:border-l-4 transition-colors whitespace-nowrap ${
              activeSection === "password"
                ? "border-[#e8623d] text-[#e8623d] bg-[#fdf1ee]"
                : "border-transparent text-gray-600 hover:bg-gray-50"
            }`}
          >
            <RiLockPasswordLine className="text-[17px]" />
            Change Password
          </button>
        </li>

        <li className="list-none flex-shrink-0 md:flex-shrink">
          <button
            type="button"
            className="w-full flex items-center gap-2 px-4 py-3 text-[13px] md:text-[14px] font-medium border-b-4 md:border-b-0 md:border-l-4 border-transparent text-gray-600 hover:bg-gray-50 transition-colors whitespace-nowrap"
          >
            <LuLogOut className="text-[17px]" />
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default AcccountSideaBar;
