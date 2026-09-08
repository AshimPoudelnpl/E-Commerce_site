import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import { MdZoomOutMap } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { IoGitCompareOutline } from "react-icons/io5";
import { FaCartShopping } from "react-icons/fa6";
import { useContext } from "react";
import { MyContext } from "../../context/MyContext";

interface ProductItemsProps {
  id?: number;
  img?: string;
  img2?: string;
  brand?: string;
  name?: string;
  description?: string;
  price?: number;
  oldPrice?: number;
  rating?: number;
  view?: "grid" | "list";
}

function ProductItems({
  id = 1,
  img,
  img2,
  brand,
  name = "Product Name",
  description,
  price = 499,
  oldPrice = 999,
  rating = 4,
  view = "grid",
}: ProductItemsProps) {
  const discount = Math.round(((oldPrice - price) / oldPrice) * 100);
  const context = useContext(MyContext);
  const product = {
    id,
    img: img ?? "",
    img2,
    brand,
    name,
    description,
    price,
    oldPrice,
    rating,
  };

  if (view === "list") {
    return (
      <Link
        to={`/productDetails/${id}`}
        className="productItems group flex items-stretch border border-[#e5e7eb] rounded-md overflow-hidden bg-white hover:shadow-md transition-all"
      >
        {/* Image — smaller on mobile */}
        <div className="imgWrapper relative w-[100px] sm:w-[160px] md:w-[220px] min-w-[100px] sm:min-w-[160px] md:min-w-[220px] h-[120px] sm:h-[180px] md:h-[220px] overflow-hidden flex-shrink-0">
          <img
            src={img}
            alt={name}
            className="w-full h-full object-cover transition-all duration-500 absolute top-0 left-0 group-hover:opacity-0"
          />
          <img
            src={img2 ?? img}
            alt={name}
            className="w-full h-full object-cover transition-all duration-500 opacity-0 group-hover:opacity-100"
          />
          <span className="discount flex items-center absolute top-[8px] left-[8px] z-50 bg-[#ff6347] text-white text-[11px] font-bold px-2 py-0.5 rounded-md">
            -{discount}%
          </span>
        </div>

        <div className="content flex flex-col justify-center gap-1 px-3 sm:px-6 py-3 sm:py-4 min-w-0">
          {brand && <span className="text-[12px] text-gray-500">{brand}</span>}
          <h4 className="text-[14px] sm:text-[16px] font-[600] text-[#1f2937] line-clamp-2">
            {name}
            {description ? ` — ${description}` : ""}
          </h4>
          <Rating
            value={rating}
            readOnly
            size="small"
            sx={{ color: "#f4a11e" }}
          />
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <span className="text-[13px] line-through text-gray-400">
              RS {oldPrice.toFixed(2)}
            </span>
            <span className="text-[14px] sm:text-[15px] font-[600] text-[#ff6347]">
              RS {price.toFixed(2)}
            </span>
          </div>
          <Button
            variant="contained"
            onClick={(e) => {
              e.preventDefault();
              context.addToCart(product);
            }}
            startIcon={<FaCartShopping />}
            className="!mt-2 sm:!mt-3 !bg-[#ff6347] hover:!bg-[#e5533d] !text-white !text-[12px] sm:!text-[13px] !normal-case !w-fit"
          >
            Add to Cart
          </Button>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/productDetails/${id}`}
      className="productItems group block border border-[#e5e7eb] rounded-md overflow-hidden bg-white hover:shadow-md transition-all relative"
    >
      <div className="imgWrapper overflow-hidden relative">
        <img
          src={img}
          alt={name}
          className="w-full h-[150px] sm:h-[180px] md:h-[200px] object-cover transition-all duration-500 absolute top-0 left-0 group-hover:opacity-0"
        />
        <img
          src={img2 ?? img}
          alt={name}
          className="w-full h-[150px] sm:h-[180px] md:h-[200px] object-cover transition-all duration-500 opacity-0 group-hover:opacity-100"
        />

        <span className="discount flex items-center absolute top-[8px] left-[8px] z-50 bg-[#ff6347] text-white text-[11px] font-bold px-2 py-0.5 rounded-md">
          -{discount}%
        </span>

        {/* Action buttons — hidden on mobile, shown on hover for desktop */}
        <div className="actions absolute top-[10px] right-[5px] z-50 hidden sm:flex items-center gap-2 flex-col w-[50px]">
          <Button
            className="!w-[32px] !h-[32px] sm:!w-[35px] sm:!h-[35px] !min-w-[32px] !rounded-full !bg-white text-black hover:!bg-[#ff6347] hover:!text-white !shadow-md"
            onClick={() => context.setOpenProductDetailsModal(true)}
          >
            <MdZoomOutMap className="text-[16px] sm:text-[18px]" />
          </Button>
          <Button
            className="!w-[32px] !h-[32px] sm:!w-[35px] sm:!h-[35px] !min-w-[32px] !rounded-full !bg-white text-black hover:!bg-[#ff6347] hover:!text-white !shadow-md"
            onClick={(e) => e.preventDefault()}
          >
            <IoGitCompareOutline className="text-[16px] sm:text-[18px]" />
          </Button>
          <Button
            className="!w-[32px] !h-[32px] sm:!w-[35px] sm:!h-[35px] !min-w-[32px] !rounded-full !bg-white text-black hover:!bg-[#ff6347] hover:!text-white !shadow-md"
            onClick={(e) => e.preventDefault()}
          >
            <FaRegHeart className="text-[16px] sm:text-[18px]" />
          </Button>
        </div>
      </div>

      {/* Spacer div to keep card height consistent with absolute-positioned images */}
      <div className="h-[150px] sm:h-[180px] md:h-[200px]" />

      <div className="p-2 sm:p-3">
        {brand && (
          <span className="text-[11px] sm:text-[12px] text-gray-500">
            {brand}
          </span>
        )}
        <h4 className="text-[13px] sm:text-[14px] font-[500] text-[#1f2937] truncate">
          {name}
        </h4>
        {description && (
          <p className="text-[11px] sm:text-[12px] text-gray-500 mt-1 line-clamp-2">
            {description}
          </p>
        )}
        <div className="flex items-center gap-1 sm:gap-2 mt-1 flex-wrap">
          <span className="text-[13px] sm:text-[15px] font-bold text-[#ff6347]">
            RS {price}
          </span>
          <span className="text-[11px] sm:text-[13px] line-through text-gray-400">
            RS {oldPrice}
          </span>
        </div>
        <Rating
          value={rating}
          readOnly
          size="small"
          sx={{ color: "#f4a11e", marginTop: "4px" }}
        />
        <Button
          variant="contained"
          onClick={(e) => {
            e.preventDefault();
            context.addToCart(product);
          }}
          startIcon={<FaCartShopping />}
          className="!mt-2 sm:!mt-3 !bg-[#ff6347] hover:!bg-[#e5533d] !text-white !text-[11px] sm:!text-[13px] !normal-case !w-full"
        >
          Add to Cart
        </Button>
      </div>
    </Link>
  );
}

export default ProductItems;
