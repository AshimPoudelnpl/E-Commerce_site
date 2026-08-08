import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import banner1 from "../../assets/Banner/1782903771274_NewProject(6).jpg";
import banner2 from "../../assets/Banner/1782903786851_NewProject(12).jpg";
import banner3 from "../../assets/Banner/1782903801050_NewProject(8).jpg";
import banner4 from "../../assets/Banner/1782903814462_1721277298204_banner.jpg";
import banner5 from "../../assets/Banner/1782903826918_NewProject(11).jpg";

const banners = [
  { img: banner1, link: "/" },
  { img: banner2, link: "/" },
  { img: banner3, link: "/" },
  { img: banner4, link: "/" },
  { img: banner5, link: "/" },
];

function AdsBannerSlider({ items }: { items?: number }) {
  return (
    <div className="adsBannerSlider py-1 w-full">
      <Swiper
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        slidesPerView={items ?? 1}
        spaceBetween={10}
        modules={[Autoplay]}
        className="adsSwiper"
      >
        {banners.map((banner, i) => (
          <SwiperSlide key={i} style={{ height: "auto" }}>
            <Link to={banner.link} className="block w-full overflow-hidden rounded-md group">
              <img
                src={banner.img}
                alt={`banner-${i + 1}`}
                className="w-full h-[90px] sm:h-[100px] md:h-[110px] lg:h-[130px] object-cover transition-all group-hover:scale-105 group-hover:rotate-2"
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default AdsBannerSlider;
