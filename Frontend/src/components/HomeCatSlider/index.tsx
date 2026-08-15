import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";

const categories = [
  { name: "Fashion", icon: "👗", link: "/fashion" },
  { name: "Bags", icon: "👜", link: "/bags" },
  { name: "Footwear", icon: "👟", link: "/footwear" },
  { name: "Groceries", icon: "🛒", link: "/groceries" },
  { name: "Wellness", icon: "🧘", link: "/wellness" },
  { name: "Jewellery", icon: "💍", link: "/jewellery" },
  { name: "Beauty", icon: "💄", link: "/beauty" },
  { name: "Electronics", icon: "🎧", link: "/electronics" },
  { name: "Beauty", icon: "💄", link: "/beauty" },
  { name: "Electronics", icon: "🎧", link: "/electronics" },
];

function HomeCatSlider() {
  return (
    <div className="homeCatSLider py-6 pt-8 bg-[#f1f1f1]">
      <div className="container">
        <Swiper
          slidesPerView={7}
          spaceBetween={0}
          modules={[Navigation]}
          breakpoints={{
            320: { slidesPerView: 2 },
            480: { slidesPerView: 3 },
            768: { slidesPerView: 5 },
            1024: { slidesPerView: 7 },
          }}
          className="catSwiper !items-start !h-auto"
        >
          {categories.map((cat, index) => (
            <SwiperSlide key={index} className="!h-auto">
              <Link to={cat.link}>
                <div className="item py-7 px-4 flex flex-col items-center justify-center bg-white border border-[#e5e5e5] hover:shadow-md transition">
                  <span className="text-[42px] leading-none">
                    {cat.icon}
                  </span>
                  <h3 className="text-[13px] font-[500] mt-2">
                    {cat.name}
                  </h3>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default HomeCatSlider;