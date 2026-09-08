import React, { useState, useContext } from "react";
import HomeBanner from "../HomeBanner";
import HomeCatSlider from "../components/HomeCatSlider";
import { LiaShippingFastSolid } from "react-icons/lia";
import AdsBannerSlider from "../components/AdsBannerSlider";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ProductSlider from "../components/ProductSlider";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import { MyContext } from "../context/MyContext";
import { getProductsByCategory } from "../types/product";

import BlogItem from "../components/BlogItem/Index";
import blog1 from "../assets/BAnner4_files/Banner_image Slider/1783056671047_blog-2-3.jpg";
import blog2 from "../assets/BAnner4_files/Banner_image Slider/1783056681537_blog-2-2.jpg";
import blog3 from "../assets/BAnner4_files/Banner_image Slider/1783056695345_blog-2-1.jpg";
import blog4 from "../assets/BAnner4_files/Banner_image Slider/1783056704340_blog-2-6.jpg";
import blog5 from "../assets/BAnner4_files/Banner_image Slider/1783066403324_1737036773579_sample-1.jpg";

const tabCategories = [
  { label: "Fashion", slug: "fashion" },
  { label: "Electronics", slug: "electronics" },
  { label: "Home & Kitchen", slug: "home-kitchen" },
  { label: "Beauty", slug: "beauty" },
  { label: "Bags", slug: "bags" },
  { label: "Shoes", slug: "shoes" },
  { label: "Sandals", slug: "sandals" },
  { label: "Jewellery", slug: "jewellery" },
];

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <div>{children}</div>}
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
  const [activeTab, setActiveTab] = useState(0);
  const context = useContext(MyContext);
  const products = context.products || [];

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 8);
  const latestProducts = products.slice(0, 8);

  return (
    <>
      <HomeBanner />
      <HomeCatSlider />

      {/* Popular Products Tabs */}
      <section className="py-6 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 gap-3">
            <div className="leftSec">
              <h2 className="text-[22px] font-bold text-[#1f2937]">
                Popular Products
              </h2>
              <p className="text-[14px] text-[#6b7280] font-[400] mt-1">
                Explore handpicked products from our best-selling categories.
              </p>
            </div>
            <div className="rightSec w-full md:w-[70%]">
              <Tabs
                value={activeTab}
                onChange={handleTabChange}
                aria-label="popular products tabs"
                variant="scrollable"
                scrollButtons="auto"
                sx={{
                  "& .MuiTabs-indicator": {
                    backgroundColor: "#ff5252",
                    height: "2px",
                  },
                  "& .MuiTab-root": {
                    textTransform: "uppercase",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "#4b5563",
                    minWidth: "auto",
                    paddingX: "16px",
                    "&.Mui-selected": { color: "#ff5252" },
                  },
                }}
              >
                {tabCategories.map((cat, i) => (
                  <Tab key={cat.slug} label={cat.label} {...a11yProps(i)} />
                ))}
              </Tabs>
            </div>
          </div>

          {tabCategories.map((cat, i) => (
            <CustomTabPanel value={activeTab} index={i} key={cat.slug}>
              <ProductSlider
                items={5}
                products={getProductsByCategory(cat.slug)}
              />
            </CustomTabPanel>
          ))}

          {/* Free Shipping Banner */}
          <div className="freeShipping w-full py-3 px-4 md:px-6 border border-[#e2b8a6] flex flex-col md:flex-row items-center justify-between rounded-md my-6 gap-2 text-center md:text-left bg-[#fefaf8]">
            <div className="col1 flex items-center gap-4">
              <LiaShippingFastSolid className="text-[50px] text-[#ff5252]" />
              <span className="text-[20px] font-[600] text-gray-800">Free Shipping</span>
            </div>
            <div className="col2">
              <p className="mb-0 font-[500] text-gray-600">
                Free Delivery Now On Your First Order and orders over Rs 1,000
              </p>
            </div>
            <p className="font-bold text-[22px] mb-0 text-[#ff5252]">Fast & Reliable</p>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-6 bg-white border-t border-[#f1f1f1]">
        <div className="container mx-auto px-4">
          <h2 className="text-[22px] font-bold text-[#1f2937] mb-4">
            Featured Products
          </h2>
          <ProductSlider items={6} products={featuredProducts.length > 0 ? featuredProducts : products.slice(0, 6)} />
        </div>
      </section>

      {/* Latest Products */}
      <section className="pt-6 pb-2 bg-white border-t border-[#f1f1f1]">
        <div className="container mx-auto px-4">
          <h2 className="text-[20px] font-[600] mb-4 text-gray-800">Latest Products</h2>
          <ProductSlider items={6} products={latestProducts} />
          <div className="mt-4">
            <AdsBannerSlider items={4} />
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-14 bg-white border-t border-[#f1f1f1]">
        <div className="container mx-auto px-4 w-full">
          <h2 className="text-[22px] font-bold text-[#1f2937] mb-4">
            From the Blog
          </h2>
          <Swiper
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            spaceBetween={10}
            navigation={true}
            modules={[Navigation]}
            className="blogSlider"
          >
            <SwiperSlide>
              <BlogItem
                image={blog1}
                title="Top Fashion Trends 2024"
                date="5 APRIL, 2024"
              />
            </SwiperSlide>
            <SwiperSlide>
              <BlogItem
                image={blog2}
                title="Best Electronics Deals"
                date="12 MAY, 2024"
              />
            </SwiperSlide>
            <SwiperSlide>
              <BlogItem
                image={blog3}
                title="Home Decor Ideas"
                date="20 JUNE, 2024"
              />
            </SwiperSlide>
            <SwiperSlide>
              <BlogItem
                image={blog4}
                title="Beauty Tips & Tricks"
                date="8 JULY, 2024"
              />
            </SwiperSlide>
            <SwiperSlide>
              <BlogItem
                image={blog5}
                title="Summer Collection 2024"
                date="15 AUG, 2024"
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </section>
    </>
  );
}

export default Home;
