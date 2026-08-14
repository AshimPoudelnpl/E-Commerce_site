import React from 'react'
import { NavLink, Outlet } from "react-router-dom";
import { FaRegUser } from "react-icons/fa6";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoBagCheckOutline } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";
import avatar from "./../../assets/verify.png";
import { FaCloudUploadAlt } from "react-icons/fa";

const AcccountSideaBar = () => {
    const navItems = [
        {
            label: "My Profile",
            to: "/my-account",
            icon: <FaRegUser className="text-[16px]" />,
        },
        {
            label: "My List",
            to: "/my-list",
            icon: <IoMdHeartEmpty className="text-[18px]" />,
        },
        {
            label: "My Orders",
            to: "/orders",
            icon: <IoBagCheckOutline className="text-[17px]" />,
        },
    ];
    return (
        <div className="leftSidebar w-[25%] bg-white rounded-md shadow-sm overflow-hidden sticky top-[10px] min-h-2">

            <div className="flex flex-col items-center text-center py-6 px-4">
                <div className="relative group mb-3">
                    <img
                        src={avatar}
                        alt="Profile"
                        className="w-24 h-24 rounded-full object-cover"
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

                        <span className="text-white text-[12px] font-medium">
                            Upload
                        </span>
                    </label>

                    <input
                        type="file"
                        id="profileImage"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                            console.log(e.target.files[0]);
                        }}
                    />
                </div>

                <h4 className="text-[15px] font-semibold text-gray-800">
                    Rajesh Sharma
                </h4>

                <span className="text-[13px] text-gray-500">
                    rinkuv37@gmail.com
                </span>
            </div>

            <ul className="flex flex-col">
                {navItems.map((item) => (
                    <li key={item.to} className="list-none">
                        <NavLink
                            to={item.to}
                            end={item.to === "/my-account"}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-5 py-3 text-[14px] font-medium border-l-4 transition-colors ${isActive
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

                <li className="list-none">
                    <button
                        type="button"
                        className="w-full flex items-center gap-3 px-5 py-3 text-[14px] font-medium border-l-4 border-transparent text-gray-600 hover:bg-gray-50 transition-colors"
                    >
                        <LuLogOut className="text-[17px]" />
                        Logout
                    </button>
                </li>
            </ul>
        </div>
    )
}

export default AcccountSideaBar;