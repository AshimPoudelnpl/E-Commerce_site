import promo1 from "../../assets/BAnner4_files/Banner_image Slider/1784207574749_New_Project_(3).png";
import promo2 from "../../assets/BAnner4_files/Banner_image Slider/1784207621981_New_Project_(10).jpg";

const promos = [
  { image: promo1, href: "/" },
  { image: promo2, href: "/" },
];

function PromoCards() {
  return (
    <div className="flex flex-col gap-5 h-full">
      {promos.map((promo, index) => (
        <a
          href={promo.href}
          key={index}
          className="block flex-1 h-[200px] rounded-[20px] overflow-hidden bg-blue-100"
        >
          <img
            src={promo.image}
            alt="Promo"
            className="w-full h-full object-cover"
          />
        </a>
      ))}
    </div>
  );
}

export default PromoCards;