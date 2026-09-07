import blogImg from "../../assets/BAnner4_files/Banner_image Slider/1783056671047_blog-2-3.jpg";
import { IoIosArrowForward, IoMdTime } from "react-icons/io";

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
          className="w-full transition-all group-hover:scale-105 group-hover:rotate-1 object-cover"
        />
        <span className="flex items-center justify-center text-white absolute bottom-3 right-3 z-50 bg-primary rounded-md p-1 text-[11px] sm:text-[12px] font-medium gap-1">
          <IoMdTime className="text-[14px] sm:text-[16px]" /> {date}
        </span>
      </div>
      <div className="info py-3 sm:py-4">
        <h2 className="text-[15px] sm:text-[18px] font-[600] text-black leading-snug mb-1">
          {title}
        </h2>
        <p className="text-[13px] text-gray-500 line-clamp-3">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s.
        </p>
        <a
          href="#"
          className="text-black font-medium text-[13px] sm:text-[14px] mt-2 inline-flex items-center gap-1 hover:text-red-500 transition-colors"
        >
          Read More <IoIosArrowForward className="text-[12px]" />
        </a>
      </div>
    </div>
  );
}

export default BlogItem;
