import React, { useState } from "react";
import HomeBanner from "../HomeBanner";
import HomeCatSlider from "../components/HomeCatSlider";
import { LiaShippingFastSolid } from "react-icons/lia";
import AdsBannerSlider from "../components/AdsBannerSlider";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ProductSlider from "../components/ProductSlider";
import type { Product } from "../types/product";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

// Fashion
import f1 from "../assets/BAnner4_files/Fashion/1783150937198_1b126a1a-259c-4e77-8039-503fb250daad1651661065083HERENOWMenWhiteSlimFitStripedCasualShirt1.jpg";
import f2 from "../assets/BAnner4_files/Fashion/1783150937199_36e45e27-0ae1-4255-af50-bafbe704e5791651661065092HERENOWMenWhiteSlimFitStripedCasualShirt3.jpg";
import f3 from "../assets/BAnner4_files/Fashion/1783151292475_bnbn1.jpg";
import f4 from "../assets/BAnner4_files/Fashion/1783151292475_bnbn3.jpg";
import f5 from "../assets/BAnner4_files/Fashion/1783151405015_ascscscscccswefsdvdd1.jpg";
import f6 from "../assets/BAnner4_files/Fashion/1783153348829_buynewtrend-women-maroon-cotton-blend-top-product-images-rvb22aqlk7-0-202201130044.jpg";
import f7 from "../assets/BAnner4_files/Fashion/1783153428934_deel-band-women-rayon-embroidered-kurta-pant-dupatta-set-product-images-rvz2bvyrm2-0-202404071602.webp";
import f8 from "../assets/BAnner4_files/Fashion/1784175199016_elqpri-girls-lehenga-choli-ethnic-wear-embroidered-lehenga-choli-and-dupatta-set-red-pack-of-1-9-10-years-product-images-rvck5u956f-0-202309191835.webp";

// Electronics
import e1 from "../assets/BAnner4_files/Electronics/1783148201496_ypjcazZmDZ-VivoY05-494793014-i-1.jpg";
import e2 from "../assets/BAnner4_files/Electronics/1783148372906_samsung-s24-ultra-5g-512-gb-12-gb-ram-titanium-gray-mobile-phone-digital-o494352159-p607431532-0-202401191135.webp";
import e3 from "../assets/BAnner4_files/Electronics/1783148590659_samsung-galaxy-a15-5g-128-gb-8-gb-ram-blue-black-mobile-phone-digital-o494351803-p607184842-0-202404101102.webp";
import e4 from "../assets/BAnner4_files/Electronics/1783148700934_apple-iphone-13-128-gb-starlight-digital-o491997700-p590798551-0-202208221207.webp";
import e5 from "../assets/BAnner4_files/Electronics/1783823737803_apple-iphone-13-128-gb-pink-digital-o491997703-p590798557-0-202208221207.webp";

// Home & Kitchen
import h1 from "../assets/BAnner4_files/Home and Kitchen/1783059754147_b0d92mn63m-0-1781773248923.jpg.f284fc9a37.jpg";
import h2 from "../assets/BAnner4_files/Home and Kitchen/1783060059596_01.jpg.11d09f8619.jpg";
import h3 from "../assets/BAnner4_files/Home and Kitchen/1784180059545_x1.webp";
import h4 from "../assets/BAnner4_files/Home and Kitchen/1784201597918_b0d731dwjm-1.jpeg.fb1bb062e9_(1).jpeg";

// Beauty
import b1 from "../assets/BAnner4_files/Beauty/1783066254118_olay-total-effect-7-in-one-day-cream-gentle-spf-15-50-gm-prod-o1051928-p608298952-0-202403020041.jpg";
import b2 from "../assets/BAnner4_files/Beauty/1783066276851_elovera-cream-150gm-prod-o327036-p608295354-0-202403012338.webp";
import b3 from "../assets/BAnner4_files/Beauty/1783153777319_nandika-beauty-massage-cream-wine-1-kg-prod-o1009518-p608316885-0-202403020848.jpg";
import b4 from "../assets/BAnner4_files/Beauty/1784176825709_mars-hd-2in1-nutration-for-skin-foundation-golden-beige-f07-product-images-orvjaeibjcv-p603656924-0-202308051112.webp";
import b5 from "../assets/BAnner4_files/Beauty/1784085670093_dr-batra-s-natural-shower-gel-enriched-with-olive-extract-pack-of-2-x-200-gm-1-s-prod-o1111474-p608303303-0-202403020330.webp";

// Bags
import bg1 from "../assets/BAnner4_files/BAgs/1783072675993_1731424289008_ksc-khatushyam-collection-grey-pu-for-women-handheld-bag-product-images-rvoxe6ocho-0-202405282359.webp";
import bg2 from "../assets/BAnner4_files/BAgs/1783072916189_ksc-khatushyam-collection-black-pu-for-women-handheld-bag-product-images-rvkg3apiuk-0-202405282358.webp";
import bg3 from "../assets/BAnner4_files/BAgs/1783154438181_blubags-waterproof-school-backpack-36-l-laptop-bag-college-backpack-school-bag-product-images-rvpoeah0vm-0-202312201358.webp";
import bg4 from "../assets/BAnner4_files/BAgs/1783929883577_ushawu-medium-dome-satchel-model2-460815865_brown-2-202408141116.jpg";
import bg5 from "../assets/BAnner4_files/BAgs/1784173083253_zeden-green-polyester-laptop-backpack-35-l-product-images-rvxx7hwck0-0-202406101401.jpg";

// Shoes
import s1 from "../assets/BAnner4_files/shoes/1783066901241_file_1734774478545_1017934b-ebb7-4394-ab4e-8033671295541721124227083ASTEROIDMenColourblockedSuedeSneakers1.jpg";
import s2 from "../assets/BAnner4_files/shoes/1783933660323_aaaaa1.jpg";
import s3 from "../assets/BAnner4_files/shoes/1784021907626_fabbmate-casual-sports-shoes-white-sneakers-for-women-girls-white-shoes-product-images-rvouh9agls-0-202406162001.webp";
import s4 from "../assets/BAnner4_files/shoes/1784176426537_birde-comfortable-regular-wear-blue-sports-shoe-for-kids-product-images-rvq8camdzw-0-202406131255.jpg";

// Sandals
import sd1 from "../assets/BAnner4_files/sandle/1783071021376_piclite-slipper-for-women-daily-use-flipflops-ladies-slipper-casual-doctor-ortho-slipper-pack-of-1lh5-blue-7-product-images-rvwsfbtzkt-0-202401241802.jpg";
import sd2 from "../assets/BAnner4_files/sandle/1783934481750_aqualite-women-black-casual-shoes-product-images-rvoz5uufey-0-202305241601.webp";
import sd3 from "../assets/BAnner4_files/sandle/1784174986683_aqualite-s-trendy-and-stylish-orange-flip-flops-slides-for-women-product-images-rvr9enxkgt-0-202304181628.jpg";
import sd4 from "../assets/BAnner4_files/sandle/1784178419682_paragon-k6015l-women-sandals-casual-sandals-stylish-comfortable-durable-for-daily-wear-product-images-rvvoayb8w2-0-202309061241.jpg";

// Jewellery
import j1 from "../assets/BAnner4_files/Jwellery/1783175807260_dangar-enterprise-kundan-white-earring-for-women-and-girls-terndy-women-pooja-and-diwali-special-attractive-earrings-set-for-party-occasion-kundan-work-studs-triangle-shape.jpg";
import j2 from "../assets/BAnner4_files/Jwellery/1783176193654_file_1734528393445_sukkhi-ethnic-gold-plated-set-of-2-pair-temple-stud-earring-combo-for-women-product-images-rvs6la4c33-0-202202250141.jpg";
import j3 from "../assets/BAnner4_files/Jwellery/1783176978866_youbella-women-gold-plated-drop-earrings-for-women-golden-ybear_31222-product-images-rvvcu7jgpl-0-202207250611.jpg";
import j4 from "../assets/BAnner4_files/Jwellery/1783344768885_giva-sterling-silver-adjustable-wine-twirling-petal-ring-product-images-rvyplqevz2-0-202210200440.webp";
import BlogItem from "../components/BlogItem/Index";
import blog1 from "../assets/BAnner4_files/Banner_image Slider/1783056671047_blog-2-3.jpg";
import blog2 from "../assets/BAnner4_files/Banner_image Slider/1783056681537_blog-2-2.jpg";
import blog3 from "../assets/BAnner4_files/Banner_image Slider/1783056695345_blog-2-1.jpg";
import blog4 from "../assets/BAnner4_files/Banner_image Slider/1783056704340_blog-2-6.jpg";
import blog5 from "../assets/BAnner4_files/Banner_image Slider/1783066403324_1737036773579_sample-1.jpg";

const tabProducts: Record<number, Product[]> = {
  0: [
    { id: 1, img: f1, img2: f2, name: "Men's Striped Casual Shirt", description: "Slim fit striped casual shirt for men, perfect for daily wear.", price: 499, oldPrice: 999, rating: 4 },
    { id: 2, img: f2, img2: f1, name: "Men's Slim Fit Shirt", description: "Classic slim fit shirt with a clean look for all occasions.", price: 549, oldPrice: 1099, rating: 4 },
    { id: 3, img: f3, img2: f4, name: "Women's Top", description: "Stylish and comfortable women's top for casual outings.", price: 399, oldPrice: 799, rating: 3 },
    { id: 4, img: f4, img2: f3, name: "Women's Casual Top", description: "Lightweight casual top ideal for everyday wear.", price: 349, oldPrice: 699, rating: 4 },
    { id: 5, img: f5, img2: f6, name: "Ethnic Wear", description: "Beautiful ethnic wear with intricate embroidery detailing.", price: 699, oldPrice: 1299, rating: 5 },
    { id: 6, img: f6, img2: f5, name: "Women's Cotton Top", description: "Soft cotton blend top in vibrant maroon color.", price: 299, oldPrice: 599, rating: 4 },
    { id: 7, img: f7, img2: f8, name: "Kurta Pant Dupatta Set", description: "Elegant rayon embroidered kurta pant dupatta set for women.", price: 850, oldPrice: 1500, rating: 5 },
    { id: 8, img: f8, img2: f7, name: "Girls Lehenga Choli Set", description: "Festive embroidered lehenga choli and dupatta set for girls.", price: 750, oldPrice: 1400, rating: 4 },
  ],
  1: [
    { id: 9, img: e1, img2: e2, name: "Vivo Y05", description: "Budget-friendly smartphone with great battery life.", price: 8999, oldPrice: 12999, rating: 4 },
    { id: 10, img: e2, img2: e1, name: "Samsung S24 Ultra", description: "Flagship Samsung phone with S-Pen and 200MP camera.", price: 89999, oldPrice: 109999, rating: 5 },
    { id: 11, img: e3, img2: e4, name: "Samsung Galaxy A15", description: "5G-enabled mid-range phone with AMOLED display.", price: 14999, oldPrice: 19999, rating: 4 },
    { id: 12, img: e4, img2: e5, name: "iPhone 13 Starlight", description: "Apple iPhone 13 with A15 Bionic chip and dual camera.", price: 59999, oldPrice: 79999, rating: 5 },
    { id: 13, img: e5, img2: e4, name: "iPhone 13 Pink", description: "Apple iPhone 13 in elegant pink color with 128GB storage.", price: 59999, oldPrice: 79999, rating: 5 },
  ],
  2: [
    { id: 14, img: h1, img2: h2, name: "Kitchen Storage", description: "Durable kitchen storage container for everyday use.", price: 349, oldPrice: 699, rating: 4 },
    { id: 15, img: h2, img2: h1, name: "Home Decor Item", description: "Elegant home decor piece to brighten your living space.", price: 499, oldPrice: 899, rating: 3 },
    { id: 16, img: h3, img2: h4, name: "Kitchen Organizer", description: "Space-saving kitchen organizer for a tidy countertop.", price: 299, oldPrice: 599, rating: 4 },
    { id: 17, img: h4, img2: h3, name: "Home Essential", description: "Must-have home essential for daily household needs.", price: 399, oldPrice: 799, rating: 4 },
  ],
  3: [
    { id: 18, img: b1, img2: b2, name: "Olay Total Effect Cream", description: "7-in-1 anti-aging day cream with SPF 15 protection.", price: 399, oldPrice: 699, rating: 4 },
    { id: 19, img: b2, img2: b1, name: "Elovera Cream", description: "Moisturizing cream enriched with aloe vera extracts.", price: 199, oldPrice: 399, rating: 4 },
    { id: 20, img: b3, img2: b4, name: "Nandika Massage Cream", description: "Wine-infused massage cream for deep skin nourishment.", price: 299, oldPrice: 599, rating: 3 },
    { id: 21, img: b4, img2: b3, name: "Mars HD Foundation", description: "2-in-1 HD foundation for flawless skin coverage.", price: 249, oldPrice: 499, rating: 4 },
    { id: 22, img: b5, img2: b1, name: "Dr Batra Shower Gel", description: "Natural shower gel enriched with olive extract.", price: 349, oldPrice: 649, rating: 5 },
  ],
  4: [
    { id: 23, img: bg1, img2: bg2, name: "Grey Handheld Bag", description: "Stylish grey PU handheld bag for women.", price: 599, oldPrice: 1099, rating: 4 },
    { id: 24, img: bg2, img2: bg1, name: "Black Handheld Bag", description: "Elegant black PU handheld bag for all occasions.", price: 649, oldPrice: 1199, rating: 4 },
    { id: 25, img: bg3, img2: bg4, name: "Waterproof Backpack", description: "36L waterproof school and college backpack.", price: 799, oldPrice: 1499, rating: 5 },
    { id: 26, img: bg4, img2: bg3, name: "Dome Satchel Brown", description: "Medium dome satchel in classic brown color.", price: 899, oldPrice: 1699, rating: 4 },
    { id: 27, img: bg5, img2: bg1, name: "Laptop Backpack", description: "Green polyester laptop backpack with multiple compartments.", price: 999, oldPrice: 1899, rating: 4 },
  ],
  5: [
    { id: 28, img: s1, img2: s2, name: "Asteroid Suede Sneakers", description: "Colourblocked suede sneakers for men.", price: 999, oldPrice: 1999, rating: 4 },
    { id: 29, img: s2, img2: s1, name: "Casual Shoes", description: "Comfortable casual shoes for everyday wear.", price: 699, oldPrice: 1299, rating: 4 },
    { id: 30, img: s3, img2: s4, name: "White Sneakers Women", description: "Lightweight white sneakers for women and girls.", price: 599, oldPrice: 1099, rating: 5 },
    { id: 31, img: s4, img2: s3, name: "Kids Sports Shoes", description: "Comfortable blue sports shoes for kids.", price: 499, oldPrice: 899, rating: 4 },
  ],
  6: [
    { id: 32, img: sd1, img2: sd2, name: "Women Flip Flops Blue", description: "Daily use flip flops with ortho comfort sole.", price: 199, oldPrice: 399, rating: 3 },
    { id: 33, img: sd2, img2: sd1, name: "Aqualite Black Sandals", description: "Stylish black casual sandals for women.", price: 249, oldPrice: 499, rating: 4 },
    { id: 34, img: sd3, img2: sd4, name: "Orange Flip Flops", description: "Trendy orange flip flops for women.", price: 179, oldPrice: 349, rating: 4 },
    { id: 35, img: sd4, img2: sd3, name: "Paragon Women Sandals", description: "Comfortable and durable sandals for daily wear.", price: 299, oldPrice: 599, rating: 5 },
  ],
  7: [
    { id: 36, img: j1, img2: j2, name: "Kundan Earring Set", description: "Festive kundan earring set for women and girls.", price: 199, oldPrice: 399, rating: 4 },
    { id: 37, img: j2, img2: j1, name: "Gold Plated Stud Combo", description: "Set of 2 pairs of gold plated temple stud earrings.", price: 299, oldPrice: 599, rating: 5 },
    { id: 38, img: j3, img2: j4, name: "Gold Drop Earrings", description: "Elegant gold plated drop earrings for women.", price: 249, oldPrice: 499, rating: 4 },
    { id: 39, img: j4, img2: j3, name: "Silver Petal Ring", description: "Sterling silver adjustable wine twirling petal ring.", price: 349, oldPrice: 699, rating: 5 },
  ],
};

const tabs = [
  "Fashion",
  "Electronics",
  "Home & Kitchen",
  "Beauty",
  "Bags",
  "Shoes",
  "Sandals",
  "Jewellery",
];

function CustomTabPanel(props: {
  children?: React.ReactNode;
  value: number;
  index: number;
  [key: string]: any;
}) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <div className="py-2">{children}</div>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function Home() {
  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <HomeBanner />
      <HomeCatSlider />

      {/* Popular Products */}
      <section className="py-6 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-4">
            <div className="leftSec">
              <h2 className="text-[22px] font-bold text-[#1f2937]">
                Popular Products
              </h2>
              <p className="text-[14px] text-[#6b7280] font-[400] mt-1">
                Do not miss the current offers until the end of March.
              </p>
            </div>
            <div className="rightSec w-[70%]">
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="popular products tabs"
                variant="scrollable"
                scrollButtons="auto"
                sx={{
                  "& .MuiTabs-indicator": {
                    backgroundColor: "#166534",
                    height: "2px",
                  },
                  "& .MuiTab-root": {
                    textTransform: "uppercase",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "#4b5563",
                    minWidth: "auto",
                    paddingX: "16px",
                    "&.Mui-selected": { color: "#166534" },
                  },
                }}
              >
                {tabs.map((label, i) => (
                  <Tab key={label} label={label} {...a11yProps(i)} />
                ))}
              </Tabs>
            </div>
          </div>

          {tabs.map((_, i) => (
            <CustomTabPanel value={value} index={i} key={i}>
              <ProductSlider items={5} products={tabProducts[i] ?? []} />
            </CustomTabPanel>
          ))}

          {/* Free Shipping */}
          <div className="freeShipping w-full py-3 px-6 border border-[#e2b8a6] flex items-center justify-between rounded-md my-4">
            <div className="col1 flex items-center gap-4">
              <LiaShippingFastSolid className="text-[50px]" />
              <span className="text-[20px] font-[600]">Free Shipping</span>
            </div>
            <div className="col2">
              <p className="mb-0 font-[500]">
                Free Delivery Now On Your First Order and over RS 200
              </p>
            </div>
            <p className="font-bold text-[25px] mb-0">- Only RS 200</p>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-6 bg-white border-t border-[#f1f1f1]">
        <div className="container mx-auto px-4">
          <h2 className="text-[22px] font-bold text-[#1f2937] mb-4">
            Featured Products
          </h2>
          <ProductSlider items={6} />
        </div>
      </section>

      {/* Latest Products */}
      <section className="pt-6 pb-2 bg-white border-t border-[#f1f1f1]">
        <div className="container mx-auto px-4">
          <h2 className="text-[20px] font-[600] mb-4">Latest Products</h2>
          <ProductSlider items={6} />
          <div className="mt-4">
            <AdsBannerSlider items={4} />
            
          </div>
        </div>
      </section>

      {/* Blog Section Directly Attached Below Banners */}
      <section className="py-16 bg-white border-t border-[#f1f1f1]">
        <div className="container mx-auto px-4 w-full"> 
          <h2 className="text-[22px] font-bold text-[#1f2937] mb-4">
            From the Blog
          </h2>
          <Swiper
            slidesPerView={3}
            spaceBetween={10}
            navigation={true}
            modules={[Navigation]}
            className="blogSlider"
          >
            <SwiperSlide><BlogItem image={blog1} title="Top Fashion Trends 2024" date="5 APRIL, 2024" /></SwiperSlide>
            <SwiperSlide><BlogItem image={blog2} title="Best Electronics Deals" date="12 MAY, 2024" /></SwiperSlide>
            <SwiperSlide><BlogItem image={blog3} title="Home Decor Ideas" date="20 JUNE, 2024" /></SwiperSlide>
            <SwiperSlide><BlogItem image={blog4} title="Beauty Tips & Tricks" date="8 JULY, 2024" /></SwiperSlide>
            <SwiperSlide><BlogItem image={blog5} title="Summer Collection 2024" date="15 AUG, 2024" /></SwiperSlide>
          </Swiper>
        </div>
      </section>
    </>
  );
}

export default Home;