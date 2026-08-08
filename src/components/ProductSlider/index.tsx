import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import ProductItems from "../ProductItems";

import f1 from "../../assets/BAnner4_files/Fashion/1783150937198_1b126a1a-259c-4e77-8039-503fb250daad1651661065083HERENOWMenWhiteSlimFitStripedCasualShirt1.jpg";
import f2 from "../../assets/BAnner4_files/Fashion/1783150937199_36e45e27-0ae1-4255-af50-bafbe704e5791651661065092HERENOWMenWhiteSlimFitStripedCasualShirt3.jpg";
import f3 from "../../assets/BAnner4_files/Fashion/1783151292475_bnbn1.jpg";
import f4 from "../../assets/BAnner4_files/Fashion/1783151292475_bnbn3.jpg";
import f5 from "../../assets/BAnner4_files/Fashion/1783151405015_ascscscscccswefsdvdd1.jpg";
import f6 from "../../assets/BAnner4_files/Fashion/1783153348829_buynewtrend-women-maroon-cotton-blend-top-product-images-rvb22aqlk7-0-202201130044.jpg";
import f7 from "../../assets/BAnner4_files/Fashion/1783153428934_deel-band-women-rayon-embroidered-kurta-pant-dupatta-set-product-images-rvz2bvyrm2-0-202404071602.webp";
import f8 from "../../assets/BAnner4_files/Fashion/1784175199016_elqpri-girls-lehenga-choli-ethnic-wear-embroidered-lehenga-choli-and-dupatta-set-red-pack-of-1-9-10-years-product-images-rvck5u956f-0-202309191835.webp";

export interface Product {
  id: number;
  img: string;
  img2?: string;
  name: string;
  description?: string;
  price: number;
  oldPrice: number;
  rating: number;
}

const fashionProducts: Product[] = [
  { id: 1, img: f1, img2: f2, name: "Men's Striped Casual Shirt", description: "Slim fit striped casual shirt for men, perfect for daily wear.", price: 499, oldPrice: 999, rating: 4 },
  { id: 2, img: f2, img2: f1, name: "Men's Slim Fit Shirt", description: "Classic slim fit shirt with a clean look for all occasions.", price: 549, oldPrice: 1099, rating: 4 },
  { id: 3, img: f3, img2: f4, name: "Women's Top", description: "Stylish and comfortable women's top for casual outings.", price: 399, oldPrice: 799, rating: 3 },
  { id: 4, img: f4, img2: f3, name: "Women's Casual Top", description: "Lightweight casual top ideal for everyday wear.", price: 349, oldPrice: 699, rating: 4 },
  { id: 5, img: f5, img2: f6, name: "Ethnic Wear", description: "Beautiful ethnic wear with intricate embroidery detailing.", price: 699, oldPrice: 1299, rating: 5 },
  { id: 6, img: f6, img2: f5, name: "Women's Cotton Top", description: "Soft cotton blend top in vibrant maroon color.", price: 299, oldPrice: 599, rating: 4 },
  { id: 7, img: f7, img2: f8, name: "Kurta Pant Dupatta Set", description: "Elegant rayon embroidered kurta pant dupatta set for women.", price: 850, oldPrice: 1500, rating: 5 },
  { id: 8, img: f8, img2: f7, name: "Girls Lehenga Choli Set", description: "Festive embroidered lehenga choli and dupatta set for girls.", price: 750, oldPrice: 1400, rating: 4 },
];

function ProductSlider({ items, products }: { items?: number; products?: Product[] }) {
  const data = products ?? fashionProducts;
  return (
    <div className="productSlider">
      <Swiper
        slidesPerView={items}
        spaceBetween={10}
        modules={[Navigation]}
        navigation={true}
        breakpoints={{
          320: { slidesPerView: 2 },
          480: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 5 },
        }}
        className="productSwiper"
        style={{ height: "auto" }}
      >
        {data.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductItems {...product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default ProductSlider;
