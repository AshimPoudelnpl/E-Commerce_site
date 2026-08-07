import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar } from "swiper/modules";
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
    <Swiper navigation={true} modules={[Navigation]} className="mySwiper w-full">
      <SwiperSlide><img src={slide1} alt="Slide 1" /></SwiperSlide>
      <SwiperSlide><img src={slide2} alt="Slide 2" /></SwiperSlide>
      <SwiperSlide><img src={slide3} alt="Slide 3" /></SwiperSlide>
      
    </Swiper>
  );
}

export default HomeSlider;
