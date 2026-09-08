import React, { useContext, useState } from "react";
import Mylistitems from "./Mylistitems";
import AcccountSideaBar from "../components/AccountSideBar";
import { MyContext } from "../context/MyContext";

function Mylist() {
  const [activeSection, setActiveSection] = useState<
    "profile" | "password" | "address"
  >("profile");
  const { products, wishlist, toggleWishlist, addToCart } =
    useContext(MyContext);
  const listProducts = wishlist.length > 0 ? wishlist : products.slice(0, 2);

  return (
    <section className="section py-5 min-h-screen">
      <div className="container  w-[80%] max-w-[80%] flex gap-3">
        <AcccountSideaBar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
        <div className="leftPart w-[70%]">
          <div className="rounded-xl p-4 bg-white border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-1">My List</h2>
            <p className="mt-0 text-sm text-gray-500 mb-4">
              There are <span className="font-bold text-red-500">2</span>{" "}
              products in My list
            </p>
            {listProducts.map((product) => (
              <Mylistitems
                key={product.id}
                product={product}
                onRemove={toggleWishlist}
                onAddToCart={(item) => addToCart(item)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Mylist;
