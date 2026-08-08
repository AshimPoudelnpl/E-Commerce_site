import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import slide1 from "../../assets/578c27b4ff2171e9c60dfafbe9a04616.jpg";
import slide2 from "../../assets/photo-1612452830710-97cd38a7b6e8.avif";
import slide3 from "../../assets/photo-1695527081926-91936cdbc54e.avif";
import "./style.css";

function HomeSlider() {
  return (
    <Swiper
      navigation={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      loop={true}
      modules={[Navigation, Autoplay]}
      className="homeSwiper"
    >
      <SwiperSlide>
        <div className="item rounded-[20px] overflow-hidden">
          <img src={slide1} alt="Slide 1" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="item rounded-[20px] overflow-hidden">
          <img src={slide2} alt="Slide 2" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="item rounded-[20px] overflow-hidden">
          <img src={slide3} alt="Slide 3" />
        </div>
      </SwiperSlide>
    </Swiper>
  );
}

export default HomeSlider;