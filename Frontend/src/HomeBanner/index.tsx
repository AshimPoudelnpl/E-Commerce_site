import HomeSlider from '../components/HomeSlider';
import PromoCards from '../components/Promocards';

function HomeBanner() {
  return (
    <div className="flex flex-col md:flex-row gap-5 p-5 items-stretch">
      <div className="w-full md:flex-[0_0_68%] md:max-w-[68%]">
        <HomeSlider />
      </div>
      <div className="w-full md:flex-1">
        <PromoCards />
      </div>
    </div>
  );
}

export default HomeBanner;
