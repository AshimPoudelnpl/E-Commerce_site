import React, { useState } from "react";
import { InnerImageZoom } from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/styles.min.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

import pic from "../../assets/578c27b4ff2171e9c60dfafbe9a04616.jpg";
import pic2 from "../../assets/photo-1612452830710-97cd38a7b6e8.avif";

const images = [pic, pic2, pic, pic];

function ProductZoom() {
  const [activeImg, setActiveImg] = useState(images[0]);

  return (
    <div>
      <div className="flex gap-3">
        <div className="slider w-[66px]">
          <Swiper
            direction="vertical"
            slidesPerView={4}
            spaceBetween={10}
            navigation={true}
            modules={[Navigation]}
            className="zoomProductSliderThumbs h-[380px] overflow-hidden"
          >
            {images.map((img, index) => (
              <SwiperSlide key={index}>
                <div
                  className={`item h-[88px] rounded-md overflow-hidden border cursor-pointer transition-all ${
                    activeImg === img
                      ? "border-gray-500"
                      : "border-gray-200 hover:border-gray-400"
                  }`}
                  onClick={() => setActiveImg(img)}
                >
                  <img src={img} className="w-full h-full object-cover" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="zoomContainer w-[350px] h-[460px] overflow-hidden relative rounded-md">
          <InnerImageZoom
            src={activeImg}
            zoomSrc={activeImg}
            zoomType="hover"
            zoomScale={1}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductZoom;
