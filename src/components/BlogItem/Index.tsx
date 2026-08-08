import React from "react";
import blogImg from "../../assets/BAnner4_files/Banner_image Slider/1783056671047_blog-2-3.jpg";
import { IoIosArrowForward, IoMdTime } from "react-icons/io";
import { FaArrowRight } from "react-icons/fa";

interface BlogItemProps {
  image?: string;
  title?: string;
  date?: string;
}

function BlogItem({
  image = blogImg,
  title = "Nullam ullamcorper ornare molestie",
  date = "5 APRIL, 2023",
}: BlogItemProps) {
  return (
    <div className="blog-item group">
      <div className="imgWrapper w-full overflow-hidden rounded-md cursor-pointer relative">
        <img
          src={image}
          alt="blogImage"
          className="w-full transition-all group-hover:scale-105 group-hover:rotate-1"
        />
        <span className="flex items-center justify-center text-white absolute bottom-3.75 right-3.75 z-50 bg-primary rounded-md p-1 text-[12px] font-medium gap-1">
          <IoMdTime className="text-[16px]" /> {date}
        </span>
      </div>
      <div className="info py-4">
        <h2 className="text-[18px] font-[600] text-black">{title}</h2>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
        <a href="#" className="text-black font-medium text-[14px] mt-2 inline-flex items-center gap-1 hover:text-red-500 transition-colors">Read More <IoIosArrowForward className="text-[12px]" /></a>
      </div>
    </div>
  );
}

export default BlogItem;
