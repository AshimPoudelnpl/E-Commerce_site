import { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import { MyContext } from "../../context/MyContext";
import { initialCategories } from "../../types/category";

function HomeCatSlider() {
  const context = useContext(MyContext);
  const categories = context.categories && context.categories.length > 0
    ? context.categories
    : initialCategories;

  return (
    <div className="homeCatSLider py-6 pt-8 bg-[#f8f9fa]">
      <div className="container">
        <Swiper
          slidesPerView={7}
          spaceBetween={10}
          modules={[Navigation]}
          breakpoints={{
            320: { slidesPerView: 2, spaceBetween: 8 },
            480: { slidesPerView: 3, spaceBetween: 10 },
            768: { slidesPerView: 5, spaceBetween: 10 },
            1024: { slidesPerView: 7, spaceBetween: 12 },
          }}
          className="catSwiper !items-start !h-auto"
        >
          {categories.map((cat, idx) => (
            <SwiperSlide key={cat._id || cat.id || cat.slug || idx} className="!h-auto">
              <Link to={`/category/${cat.slug}`} className="block group">
                <div className="item py-5 px-3 flex flex-col items-center justify-center bg-white border border-[#e8eaed] rounded-xl hover:shadow-md hover:border-red-200 transition-all duration-300">
                  <span className="text-[38px] leading-none transform group-hover:scale-110 transition-transform">
                    {cat.icon || "🛍️"}
                  </span>
                  <h3 className="text-[13px] font-[600] text-gray-800 group-hover:text-[#ff5252] mt-2 transition-colors text-center truncate w-full">
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
