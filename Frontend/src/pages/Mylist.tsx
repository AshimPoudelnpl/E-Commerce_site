import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Mylistitems from "./Mylistitems";
import AcccountSideaBar from "../components/AccountSideBar";
import { MyContext } from "../context/MyContext";

function Mylist() {
  const { wishlist, toggleWishlist, addToCart } = useContext(MyContext);

  return (
    <section className="section py-8 min-h-screen bg-[#fbfbfb]">
      <div className="container flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-[260px] flex-shrink-0">
          <AcccountSideaBar />
        </div>

        <div className="flex-1">
          <div className="rounded-xl p-5 bg-white border border-gray-200 shadow-xs">
            <h2 className="text-xl font-bold text-gray-800 mb-1">My Wishlist</h2>
            <p className="mt-0 text-sm text-gray-500 mb-5">
              There are{" "}
              <span className="font-bold text-[#ff5252]">{wishlist.length}</span>{" "}
              products in your wishlist
            </p>

            {wishlist.length === 0 ? (
              <div className="text-center py-12">
                <span className="text-5xl block mb-3">❤️</span>
                <h3 className="text-lg font-bold text-gray-800 mb-1">
                  Your wishlist is empty
                </h3>
                <p className="text-sm text-gray-500 mb-6">
                  Save items you love to review and purchase later.
                </p>
                <Link
                  to="/products"
                  className="inline-flex px-6 py-2.5 bg-[#ff5252] text-white text-sm font-semibold rounded-lg hover:bg-[#e04545] transition-colors"
                >
                  Explore Products
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {wishlist.map((product) => (
                  <Mylistitems
                    key={product.id}
                    product={product}
                    onRemove={toggleWishlist}
                    onAddToCart={(p) => addToCart(p, 1)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Mylist;
