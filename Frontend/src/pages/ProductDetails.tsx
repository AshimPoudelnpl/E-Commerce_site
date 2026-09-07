import React, { useState, useMemo, useContext } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import MuiLink from "@mui/material/Link";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import toast from "react-hot-toast";

import ProductZoom from "../components/ProductZoom";
import ProductDetails1 from "../components/ProductDetails";
import ProductSlider from "../components/ProductSlider";
import { MyContext } from "../context/MyContext";
import { getProductById, getProductsByCategory, initialProducts, type ReviewItem, type Product } from "../types/product";

function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const context = useContext(MyContext);
  const [activeTab, setActiveTab] = useState(0);

  // Find product dynamically by ID
  const product: Product = useMemo(() => {
    const numId = Number(id);
    if (!isNaN(numId)) {
      const foundInContext = context.products?.find((p) => p.id === numId);
      if (foundInContext) return foundInContext;
      const foundInInitial = getProductById(numId);
      if (foundInInitial) return foundInInitial;
    }
    return initialProducts[0];
  }, [id, context.products]);

  // Related products from the same category (excluding current product)
  const relatedProducts = useMemo(() => {
    const categorySlug = product.categorySlug || product.category.toLowerCase().replace(/\s+/g, "-");
    const sameCat = getProductsByCategory(categorySlug);
    const filtered = sameCat.filter((p) => p.id !== product.id);
    return filtered.length > 0 ? filtered : initialProducts.filter((p) => p.id !== product.id).slice(0, 6);
  }, [product]);

  // Reviews state with interactive add review
  const [reviews, setReviews] = useState<ReviewItem[]>(() => {
    if (product.reviews && product.reviews.length > 0) {
      return product.reviews;
    }
    return [
      {
        id: "1",
        name: "Aarav Sharma",
        userName: "Aarav Sharma",
        rating: 5,
        date: "2 days ago",
        comment: "Excellent quality! The finish and fabric exceeded my expectations. Delivery was very fast.",
      },
      {
        id: "2",
        name: "Priya Patel",
        userName: "Priya Patel",
        rating: 4,
        date: "1 week ago",
        comment: "Very comfortable and fits as described. Would definitely buy again in other colors.",
      },
      {
        id: "3",
        name: "Rajesh Kumar",
        userName: "Rajesh Kumar",
        rating: 5,
        date: "2 weeks ago",
        comment: "Top notch product and great packaging. Worth every rupee!",
      },
    ];
  });

  // Review form state
  const [reviewRating, setReviewRating] = useState<number | null>(5);
  const [reviewName, setReviewName] = useState("");
  const [reviewComment, setReviewComment] = useState("");

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName.trim() || !reviewComment.trim()) {
      toast.error("Please enter your name and comment.");
      return;
    }

    const newReview: ReviewItem = {
      id: Date.now().toString(),
      name: reviewName.trim(),
      userName: reviewName.trim(),
      rating: reviewRating || 5,
      date: "Just now",
      comment: reviewComment.trim(),
    };

    setReviews([newReview, ...reviews]);
    setReviewName("");
    setReviewComment("");
    setReviewRating(5);
    toast.success("Thank you! Your review has been submitted.");
  };

  return (
    <div className="bg-[#fbfbfb] min-h-screen pb-16">
      {/* Breadcrumb Navigation */}
      <div className="py-4 bg-white border-b border-gray-100">
        <div className="container">
          <Breadcrumbs aria-label="breadcrumb">
            <MuiLink component={RouterLink} underline="hover" color="inherit" to="/">
              Home
            </MuiLink>
            <MuiLink component={RouterLink} underline="hover" color="inherit" to="/products">
              Products
            </MuiLink>
            <MuiLink
              component={RouterLink}
              underline="hover"
              color="inherit"
              to={`/category/${product.categorySlug || product.category.toLowerCase().replace(/\s+/g, "-")}`}
            >
              {product.category}
            </MuiLink>
            <Typography sx={{ color: "text.primary", fontWeight: 500 }} className="line-clamp-1 max-w-[280px]">
              {product.name}
            </Typography>
          </Breadcrumbs>
        </div>
      </div>

      {/* Product Hero Section */}
      <section className="bg-white py-8 border-b border-gray-200">
        <div className="container flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          {/* Gallery / Zoom */}
          <div className="w-full lg:w-[45%] flex-shrink-0">
            <ProductZoom images={product.images && product.images.length > 0 ? product.images : [product.img]} />
          </div>

          {/* Product Details & Actions */}
          <div className="w-full lg:w-[55%]">
            <ProductDetails1 product={product} />
          </div>
        </div>
      </section>

      {/* Tabs Section: Description, Specifications, Reviews */}
      <section className="container pt-10">
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-xs">
          {/* Tabs Navigation Header */}
          <div className="flex items-center gap-6 border-b border-gray-200 pb-4 mb-6 overflow-x-auto">
            <button
              type="button"
              onClick={() => setActiveTab(0)}
              className={`text-base sm:text-lg font-semibold cursor-pointer pb-2 relative transition-colors whitespace-nowrap ${
                activeTab === 0
                  ? "text-[#ff5252] border-b-2 border-[#ff5252]"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              Product Description
            </button>
            <button
              type="button"
              onClick={() => setActiveTab(1)}
              className={`text-base sm:text-lg font-semibold cursor-pointer pb-2 relative transition-colors whitespace-nowrap ${
                activeTab === 1
                  ? "text-[#ff5252] border-b-2 border-[#ff5252]"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              Technical Specifications
            </button>
            <button
              type="button"
              onClick={() => setActiveTab(2)}
              className={`text-base sm:text-lg font-semibold cursor-pointer pb-2 relative transition-colors whitespace-nowrap ${
                activeTab === 2
                  ? "text-[#ff5252] border-b-2 border-[#ff5252]"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              Customer Reviews ({reviews.length})
            </button>
          </div>

          {/* Tab 0: Description */}
          {activeTab === 0 && (
            <div className="space-y-4 text-gray-700 leading-relaxed max-w-4xl">
              <p className="text-base font-normal">
                {product.description}
              </p>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-100 my-4">
                <h4 className="font-semibold text-gray-900 mb-2">Key Highlights:</h4>
                <ul className="list-disc list-inside space-y-1.5 text-sm text-gray-600">
                  <li>Premium authentic materials certified for quality and long-lasting durability.</li>
                  <li>Curated by top-tier designers for optimal comfort and everyday performance.</li>
                  <li>100% Genuine product backed by official manufacturer warranty.</li>
                  <li>Easy 7-day hassle-free returns and responsive customer support.</li>
                </ul>
              </div>
              <p className="text-sm text-gray-500">
                Care instructions: Keep in a dry, ventilated place. For apparel, gentle machine wash with mild detergent; for electronics, wipe with soft microfiber cloth.
              </p>
            </div>
          )}

          {/* Tab 1: Specifications */}
          {activeTab === 1 && (
            <div className="max-w-2xl">
              <h4 className="font-semibold text-gray-900 mb-3 text-base">Specifications</h4>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <table className="w-full text-sm text-left">
                  <tbody>
                    <tr className="border-b border-gray-100 bg-gray-50">
                      <td className="py-2.5 px-4 font-semibold text-gray-600 w-1/3">Brand</td>
                      <td className="py-2.5 px-4 text-gray-900">{product.brand || "Authentic"}</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-2.5 px-4 font-semibold text-gray-600">Category</td>
                      <td className="py-2.5 px-4 text-gray-900">{product.category}</td>
                    </tr>
                    {product.subCategory && (
                      <tr className="border-b border-gray-100 bg-gray-50">
                        <td className="py-2.5 px-4 font-semibold text-gray-600">Sub-Category</td>
                        <td className="py-2.5 px-4 text-gray-900">{product.subCategory}</td>
                      </tr>
                    )}
                    {product.specs &&
                      Object.entries(product.specs).map(([key, val], idx) => (
                        <tr
                          key={key}
                          className={`border-b border-gray-100 ${idx % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                        >
                          <td className="py-2.5 px-4 font-semibold text-gray-600 capitalize">{key}</td>
                          <td className="py-2.5 px-4 text-gray-900">{val}</td>
                        </tr>
                      ))}
                    <tr className="border-b border-gray-100">
                      <td className="py-2.5 px-4 font-semibold text-gray-600">Stock Availability</td>
                      <td className="py-2.5 px-4 text-gray-900">
                        {product.countInStock > 0 ? `${product.countInStock} Units in Stock` : "Out of Stock"}
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="py-2.5 px-4 font-semibold text-gray-600">Product SKU</td>
                      <td className="py-2.5 px-4 text-gray-900">SKU-{product.id}-2026</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab 2: Reviews */}
          {activeTab === 2 && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Existing reviews list */}
              <div className="lg:col-span-7 space-y-4">
                <h4 className="font-semibold text-gray-900 text-base mb-4">
                  Customer Feedback ({reviews.length})
                </h4>
                {reviews.map((rev) => (
                  <div key={rev.id} className="border border-gray-100 rounded-lg p-4 bg-gray-50">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <Avatar sx={{ width: 32, height: 32, bgcolor: "#ff5252", fontSize: "14px" }}>
                          {(rev.userName || rev.name || "C").charAt(0)}
                        </Avatar>
                        <div>
                          <h5 className="font-semibold text-sm text-gray-900">
                            {rev.userName || rev.name || "Customer"}
                          </h5>
                          <span className="text-xs text-gray-400">{rev.date}</span>
                        </div>
                      </div>
                      <Rating value={rev.rating} readOnly size="small" sx={{ color: "#f59e0b" }} />
                    </div>
                    <p className="text-sm text-gray-700">{rev.comment}</p>
                  </div>
                ))}
              </div>

              {/* Submit review form */}
              <div className="lg:col-span-5 bg-gray-50 p-5 rounded-xl border border-gray-200">
                <h4 className="font-bold text-gray-900 text-base mb-3">Add Your Review</h4>
                <form onSubmit={handleReviewSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Your Rating *
                    </label>
                    <Rating
                      value={reviewRating}
                      onChange={(_e, val) => setReviewRating(val)}
                      sx={{ color: "#f59e0b" }}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Your Name *
                    </label>
                    <TextField
                      fullWidth
                      size="small"
                      value={reviewName}
                      onChange={(e) => setReviewName(e.target.value)}
                      placeholder="e.g. John Doe"
                      className="bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Your Review *
                    </label>
                    <TextField
                      fullWidth
                      multiline
                      rows={3}
                      size="small"
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      placeholder="Share your thoughts about this product..."
                      className="bg-white"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="contained"
                    className="!bg-[#ff5252] hover:!bg-[#e04545] !text-white !capitalize !w-full !py-2 !rounded-lg"
                  >
                    Submit Review
                  </Button>
                </form>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Related Products Slider */}
      <section className="container pt-12">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Related Products</h3>
            <p className="text-xs text-gray-500">More items in {product.category}</p>
          </div>
          <MuiLink
            component={RouterLink}
            to={`/category/${product.categorySlug || product.category.toLowerCase().replace(/\s+/g, "-")}`}
            className="text-xs font-semibold text-[#ff5252] hover:underline"
          >
            View All in {product.category} →
          </MuiLink>
        </div>
        <ProductSlider products={relatedProducts} />
      </section>
    </div>
  );
}

export default ProductDetails;
