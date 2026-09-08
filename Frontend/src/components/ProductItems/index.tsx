import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import { MdZoomOutMap } from "react-icons/md";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { IoGitCompareOutline } from "react-icons/io5";
import { FaCartShopping } from "react-icons/fa6";
import { MyContext } from "../../context/MyContext";
import { getProductById, type Product } from "../../types/product";

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
  category?: string;
  categorySlug?: string;
  countInStock?: number;
  images?: string[];
  sizes?: string[];
  colors?: string[];
  specs?: Record<string, string>;
  isFeatured?: boolean;
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
  category = "Fashion",
  categorySlug = "fashion",
  countInStock = 20,
  images,
  sizes,
  colors,
  specs,
  isFeatured,
}: ProductItemsProps) {
  const discount =
    oldPrice > price ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0;
  const context = useContext(MyContext);

  const productObj: Product = {
    id,
    name,
    brand,
    description: description || "",
    price,
    oldPrice,
    rating,
    reviewsCount: 15,
    countInStock,
    category,
    categorySlug,
    img: img || "",
    img2: img2 || img || "",
    images: images && images.length > 0 ? images : [img || ""],
    sizes,
    colors,
    specs,
    isFeatured,
  };

  const isWishlisted = context.isInWishlist ? context.isInWishlist(id) : false;
  const isCompared = context.isInCompare ? context.isInCompare(id) : false;

  const handleOpenQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const full = getProductById(id) || productObj;
    context.setActiveModalProduct(full);
    context.setOpenProductDetailsModal(true);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const full = getProductById(id) || productObj;
    context.addToCart(full, 1);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const full = getProductById(id) || productObj;
    context.toggleWishlist(full);
  };

  const handleToggleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const full = getProductById(id) || productObj;
    context.toggleCompare(full);
  };

  if (view === "list") {
    return (
      <div className="productItems group flex items-stretch border border-[#e5e7eb] rounded-md overflow-hidden bg-white hover:shadow-md transition-all relative">
        <Link
          to={`/product/${id}`}
          className="imgWrapper relative w-[120px] sm:w-[180px] md:w-[220px] min-w-[120px] sm:min-w-[180px] md:min-w-[220px] h-[140px] sm:h-[180px] md:h-[220px] overflow-hidden flex-shrink-0 bg-gray-50 flex items-center justify-center"
        >
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
          {discount > 0 && (
            <span className="discount flex items-center absolute top-[8px] left-[8px] z-20 bg-[#ff6347] text-white text-[11px] font-bold px-2 py-0.5 rounded-md">
              -{discount}%
            </span>
          )}
        </Link>

        <div className="content flex-1 flex flex-col justify-center gap-1 px-4 sm:px-6 py-3 sm:py-4 min-w-0">
          <div className="flex items-center justify-between">
            {brand && (
              <span className="text-[12px] uppercase tracking-wider font-semibold text-gray-500">
                {brand}
              </span>
            )}
            <span className="text-xs text-gray-400">{category}</span>
          </div>

          <Link to={`/product/${id}`}>
            <h4 className="text-[14px] sm:text-[16px] font-[600] text-[#1f2937] hover:text-[#ff5252] transition-colors line-clamp-2">
              {name}
            </h4>
          </Link>

          {description && (
            <p className="text-xs text-gray-500 line-clamp-2 mt-0.5">
              {description}
            </p>
          )}

          <div className="flex items-center gap-2 mt-1">
            <Rating value={rating} readOnly size="small" sx={{ color: "#f4a11e" }} />
            <span className="text-xs text-gray-400">({rating.toFixed(1)})</span>
          </div>

          <div className="flex items-center gap-3 mt-1 flex-wrap">
            <span className="text-[15px] sm:text-[17px] font-bold text-[#ff6347]">
              Rs {price.toFixed(2)}
            </span>
            {oldPrice > price && (
              <span className="text-[13px] line-through text-gray-400">
                Rs {oldPrice.toFixed(2)}
              </span>
            )}
            <span className="text-[11px] text-green-600 font-medium">In Stock</span>
          </div>

          <div className="flex items-center gap-2 mt-3">
            <Button
              variant="contained"
              onClick={handleAddToCart}
              startIcon={<FaCartShopping />}
              className="!bg-[#ff6347] hover:!bg-[#e5533d] !text-white !text-[12px] sm:!text-[13px] !normal-case !px-4"
            >
              Add to Cart
            </Button>
            <Button
              onClick={handleOpenQuickView}
              className="!min-w-[36px] !w-[36px] !h-[36px] !rounded-md !border !border-gray-300 !text-gray-600 hover:!bg-gray-100"
              title="Quick View"
            >
              <MdZoomOutMap size={16} />
            </Button>
            <Button
              onClick={handleToggleWishlist}
              className="!min-w-[36px] !w-[36px] !h-[36px] !rounded-md !border !border-gray-300 hover:!bg-gray-100"
              title="Wishlist"
            >
              {isWishlisted ? <FaHeart className="text-red-500" size={16} /> : <FaRegHeart size={16} />}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="productItems group block border border-[#e5e7eb] rounded-md overflow-hidden bg-white hover:shadow-lg transition-all duration-300 relative h-full flex flex-col">
      <div className="imgWrapper overflow-hidden relative bg-gray-50 flex items-center justify-center">
        <Link to={`/product/${id}`} className="block w-full">
          <img
            src={img}
            alt={name}
            className="w-full h-[160px] sm:h-[190px] md:h-[210px] object-cover transition-all duration-500 group-hover:scale-105"
          />
          {img2 && (
            <img
              src={img2}
              alt={name}
              className="w-full h-[160px] sm:h-[190px] md:h-[210px] object-cover transition-all duration-500 opacity-0 group-hover:opacity-100 absolute top-0 left-0"
            />
          )}
        </Link>

        {discount > 0 && (
          <span className="discount flex items-center absolute top-[8px] left-[8px] z-20 bg-[#ff6347] text-white text-[11px] font-bold px-2 py-0.5 rounded-md shadow-xs">
            -{discount}%
          </span>
        )}

        {/* Action buttons on hover */}
        <div className="actions absolute top-[8px] right-[8px] z-30 flex sm:opacity-0 group-hover:opacity-100 transition-all duration-300 items-center gap-1.5 flex-col">
          <Button
            className="!w-[32px] !h-[32px] !min-w-[32px] !rounded-full !bg-white !text-gray-700 hover:!bg-[#ff6347] hover:!text-white !shadow-md"
            onClick={handleOpenQuickView}
            title="Quick View"
          >
            <MdZoomOutMap className="text-[16px]" />
          </Button>
          <Button
            className="!w-[32px] !h-[32px] !min-w-[32px] !rounded-full !bg-white !text-gray-700 hover:!bg-[#ff6347] hover:!text-white !shadow-md"
            onClick={handleToggleCompare}
            title="Compare"
          >
            <IoGitCompareOutline className={`text-[16px] ${isCompared ? "!text-blue-600 font-bold" : ""}`} />
          </Button>
          <Button
            className="!w-[32px] !h-[32px] !min-w-[32px] !rounded-full !bg-white !text-gray-700 hover:!bg-[#ff6347] hover:!text-white !shadow-md"
            onClick={handleToggleWishlist}
            title="Wishlist"
          >
            {isWishlisted ? (
              <FaHeart className="text-[16px] text-red-500" />
            ) : (
              <FaRegHeart className="text-[16px]" />
            )}
          </Button>
        </div>
      </div>

      <div className="p-3 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-[11px] sm:text-[12px] text-gray-400 mb-0.5">
            <span>{brand || category}</span>
            <span className="capitalize">{categorySlug}</span>
          </div>

          <Link to={`/product/${id}`}>
            <h4 className="text-[13px] sm:text-[14px] font-[600] text-gray-800 hover:text-[#ff5252] transition-colors truncate" title={name}>
              {name}
            </h4>
          </Link>

          {description && (
            <p className="text-[11px] sm:text-[12px] text-gray-500 mt-1 line-clamp-1">
              {description}
            </p>
          )}

          <div className="flex items-center gap-1.5 mt-1.5">
            <Rating
              value={rating}
              readOnly
              size="small"
              sx={{ color: "#f4a11e", fontSize: "14px" }}
            />
            <span className="text-[11px] text-gray-400 font-medium">({rating.toFixed(1)})</span>
          </div>
        </div>

        <div className="mt-3">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[14px] sm:text-[16px] font-bold text-[#ff6347]">
              Rs {price}
            </span>
            {oldPrice > price && (
              <span className="text-[12px] line-through text-gray-400">
                Rs {oldPrice}
              </span>
            )}
          </div>

          <Button
            variant="contained"
            onClick={handleAddToCart}
            startIcon={<FaCartShopping size={13} />}
            className="!bg-[#ff6347] hover:!bg-[#e5533d] !text-white !text-[12px] !normal-case !w-full !py-1.5 !rounded-md !shadow-none"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProductItems;
