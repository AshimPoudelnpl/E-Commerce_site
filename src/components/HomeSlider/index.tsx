import { useRef } from "react";
import { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import slide1 from "../../assets/578c27b4ff2171e9c60dfafbe9a04616.jpg";
import slide2 from "../../assets/photo-1612452830710-97cd38a7b6e8.avif";
import slide3 from "../../assets/photo-1695527081926-91936cdbc54e.avif";

const slides = [
  {
    image: slide1,
    eyebrow: "Big Saving Days Sale",
    title: "Round Green T-Shirt",
    price: "RS 590.00",
  },
  {
    image: slide2,
    eyebrow: "Weekend Special",
    title: "Men Casual Sneakers",
    price: "RS 450.00",
  },
  {
    image: slide3,
    eyebrow: "New Arrival",
    title: "Cosmetic Makeup Kit",
    price: "RS 720.00",
  },
];

function HomeSlider() {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <div className="relative group">
      <Swiper
        onSwiper={(swiper) => { swiperRef.current = swiper; }}
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{
          clickable: true,
          renderBullet: (_index, className) =>
            `<span class="${className} !w-2 !h-2 !bg-white/70 !opacity-100 [&.swiper-pagination-bullet-active]:!bg-red-500 [&.swiper-pagination-bullet-active]:!w-2.5 [&.swiper-pagination-bullet-active]:!h-2.5"></span>`,
        }}
        modules={[Pagination, Autoplay]}
        className="h-[420px] rounded-[20px] overflow-hidden"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-[420px]">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />

              <div className="absolute top-1/2 left-11 -translate-y-1/2 max-w-[380px]">
                <p className="text-base text-white mb-2">{slide.eyebrow}</p>
                <h2 className="text-3xl font-bold leading-tight text-white mb-5">
                  {slide.title}
                </h2>
                <p className="text-base text-white mb-5">
                  Starting At Only{" "}
                  <span className="text-xl font-bold text-red-500 ml-1">
                    {slide.price}
                  </span>
                </p>
                <button className="bg-red-500 hover:bg-red-600 text-white font-bold text-xs tracking-wide px-7 py-3 rounded transition-colors">
                  SHOP NOW
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        onClick={() => swiperRef.current?.slidePrev()}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button
        onClick={() => swiperRef.current?.slideNext()}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}

export default HomeSlider;