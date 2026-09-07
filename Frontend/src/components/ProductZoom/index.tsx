import React, { useState, useEffect } from "react";
import { InnerImageZoom } from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/styles.min.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

import pic from "../../assets/578c27b4ff2171e9c60dfafbe9a04616.jpg";
import pic2 from "../../assets/photo-1612452830710-97cd38a7b6e8.avif";

const defaultImages = [pic, pic2, pic, pic];

interface ProductZoomProps {
  images?: string[];
}

function ProductZoom({ images }: ProductZoomProps) {
  const displayImages = images && images.length > 0 ? images : defaultImages;
  const [activeImg, setActiveImg] = useState<string>(displayImages[0]);

  useEffect(() => {
    if (displayImages && displayImages.length > 0) {
      setActiveImg(displayImages[0]);
    }
  }, [displayImages]);

  return (
    <div className="w-full">
      {/* On mobile: stack vertically; on md+: side-by-side with vertical thumb strip */}
      <div className="flex flex-col md:flex-row gap-3 w-full">
        {/* Thumbnail strip */}
        <div className="order-2 md:order-1 w-full md:w-[66px]">
          {/* Mobile horizontal thumbs */}
          <div className="flex md:hidden gap-2 overflow-x-auto scrollbar-none py-1">
            {displayImages.map((img, index) => (
              <div
                key={index}
                className={`flex-shrink-0 w-[68px] h-[68px] rounded-md overflow-hidden border cursor-pointer transition-all ${
                  activeImg === img
                    ? "border-red-500 ring-2 ring-red-200"
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
            slidesPerView={Math.min(4, displayImages.length)}
            spaceBetween={10}
            navigation={displayImages.length > 4}
            modules={[Navigation]}
            className="zoomProductSliderThumbs h-[300px] md:h-[380px] overflow-hidden hidden md:block"
          >
            {displayImages.map((img, index) => (
              <SwiperSlide key={index}>
                <div
                  className={`item h-[68px] md:h-[88px] rounded-md overflow-hidden border cursor-pointer transition-all ${
                    activeImg === img
                      ? "border-red-500 ring-2 ring-red-200"
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
        <div className="order-1 md:order-2 zoomContainer w-full md:w-[350px] h-[260px] sm:h-[340px] md:h-[420px] overflow-hidden relative rounded-md border border-gray-100 flex items-center justify-center bg-gray-50">
          <InnerImageZoom
            src={activeImg}
            zoomSrc={activeImg}
            zoomType="hover"
            zoomScale={1.3}
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
}

export default ProductZoom;
