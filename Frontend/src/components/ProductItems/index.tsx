import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import { MdZoomOutMap } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { IoGitCompareOutline } from "react-icons/io5";
import { FaCartShopping } from "react-icons/fa6";
import { useContext } from "react";
import { MyContext } from "../../App";

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

  const context= useContext(MyContext);

  if (view === "list") {
    return (
      <Link
        to={`/product/${id}`}
        className="productItems group flex items-stretch border border-[#e5e7eb] rounded-md overflow-hidden bg-white hover:shadow-md transition-all"
      >
        <div className="imgWrapper relative w-[220px] min-w-[220px] h-[220px] overflow-hidden">
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
          <span className="discount flex items-center absolute top-[10px] left-[10px] z-50 bg-[#ff6347] text-white text-[12px] font-bold px-2 py-1 rounded-md">
            -{discount}%
          </span>
        </div>

        <div className="content flex flex-col justify-center gap-1 px-6 py-4">
          {brand && <span className="text-[13px] text-gray-500">{brand}</span>}
          <h4 className="text-[16px] font-[600] text-[#1f2937]">
            {name}
            {description ? ` — ${description}` : ""}
          </h4>
          <Rating value={rating} readOnly size="small" sx={{ color: "#f4a11e" }} />
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[14px] line-through text-gray-400">
              RS {oldPrice.toFixed(2)}
            </span>
            <span className="text-[15px] font-[600] text-[#ff6347]">
              RS {price.toFixed(2)}
            </span>
          </div>
          <Button
            variant="contained"
            onClick={(e) => e.preventDefault()}
            startIcon={<FaCartShopping />}
            className="!mt-3 !bg-[#ff6347] hover:!bg-[#e5533d] !text-white !text-[13px] !normal-case !w-fit"
          >
            Add to Cart
          </Button>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/product/${id}`}
      className="productItems group block border border-[#e5e7eb] rounded-md overflow-hidden bg-white hover:shadow-md transition-all relative"
    >
      <div className="imgWrapper overflow-hidden relative">
        <img
          src={img}
          alt={name}
          className="w-full h-[200px] object-cover transition-all duration-500 absolute top-0 left-0 group-hover:opacity-0"
        />
        <img
          src={img2 ?? img}
          alt={name}
          className="w-full h-[200px] object-cover transition-all duration-500 opacity-0 group-hover:opacity-100"
        />

        <span className="discount flex items-center absolute top-[10px] left-[10px] z-50 bg-[#ff6347] text-white text-[12px] font-bold px-2 py-1 rounded-md">
          -{discount}%
        </span>

        <div className="actions absolute top-[15px] right-[5px] z-50 flex items-center gap-2 flex-col w-[50px]">
          <Button
            className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-white text-black hover:!bg-[#ff6347] hover:!text-white !shadow-md"
            onClick={()=>context.setOpenProductDetailsModal(true)}
          > 
            <MdZoomOutMap className="text-[18px]" />
          </Button>
          <Button
            className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-white text-black hover:!bg-[#ff6347] hover:!text-white !shadow-md"
            onClick={(e) => e.preventDefault()}
          >
            <IoGitCompareOutline className="text-[18px]" />
          </Button>
          <Button
            className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-white text-black hover:!bg-[#ff6347] hover:!text-white !shadow-md"
            onClick={(e) => e.preventDefault()}
          >
            <FaRegHeart className="text-[18px]" />
          </Button>
        </div>
      </div>

      <div className="p-3">
        {brand && <span className="text-[12px] text-gray-500">{brand}</span>}
        <h4 className="text-[14px] font-[500] text-[#1f2937] truncate">{name}</h4>
        {description && (
          <p className="text-[12px] text-gray-500 mt-1 line-clamp-2">{description}</p>
        )}
        <div className="flex items-center gap-2 mt-1">
          <span className="text-[15px] font-bold text-[#ff6347]">RS {price}</span>
          <span className="text-[13px] line-through text-gray-400">RS {oldPrice}</span>
        </div>
        <Rating value={rating} readOnly size="small" sx={{ color: "#f4a11e", marginTop: "4px" }} />
        <Button
          variant="contained"
          onClick={(e) => e.preventDefault()}
          startIcon={<FaCartShopping />}
          className="!mt-3 !bg-[#ff6347] hover:!bg-[#e5533d] !text-white !text-[13px] !normal-case !w-full"
        >
          Add to Cart
        </Button>
      </div>
    </Link>
  );
}

export default ProductItems;
