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
    <div className="w-full">
      {/* On mobile: stack vertically; on md+: side-by-side with vertical thumb strip */}
      <div className="flex flex-col md:flex-row gap-3 w-full">

        {/* Thumbnail strip — horizontal on mobile, vertical on md+ */}
        <div className="order-2 md:order-1 w-full md:w-[66px]">
          {/* Mobile horizontal thumbs */}
          <div className="flex md:hidden gap-2 overflow-x-auto scrollbar-none py-1">
            {images.map((img, index) => (
              <div
                key={index}
                className={`flex-shrink-0 w-[68px] h-[68px] rounded-md overflow-hidden border cursor-pointer transition-all ${
                  activeImg === img
                    ? "border-gray-500"
                    : "border-gray-200 hover:border-gray-400"
                }`}
                onClick={() => setActiveImg(img)}
              >
                <img src={img} className="w-full h-full object-cover" alt={`thumb-${index}`} />
              </div>
            ))}
          </div>

          {/* Desktop vertical swiper */}
          <Swiper
            direction="vertical"
            slidesPerView={4}
            spaceBetween={10}
            navigation={true}
            modules={[Navigation]}
            className="zoomProductSliderThumbs h-[300px] md:h-[380px] overflow-hidden hidden md:block"
          >
            {images.map((img, index) => (
              <SwiperSlide key={index}>
                <div
                  className={`item h-[68px] md:h-[88px] rounded-md overflow-hidden border cursor-pointer transition-all ${
                    activeImg === img
                      ? "border-gray-500"
                      : "border-gray-200 hover:border-gray-400"
                  }`}
                  onClick={() => setActiveImg(img)}
                >
                  <img src={img} className="w-full h-full object-cover" alt={`thumb-${index}`} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Main zoom image */}
        <div className="order-1 md:order-2 zoomContainer w-full md:w-[350px] h-[260px] sm:h-[340px] md:h-[460px] overflow-hidden relative rounded-md">
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
