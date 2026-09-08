import React, { useState, useEffect } from "react";
import { MyContext, type CartItem } from "./context/MyContext";
import { deleteData, getData, postData, putData } from "./utils/api";
import Header from "./components/Header/Index";
import Footer from "./components/Footer/index";
import { Route, Routes } from "react-router-dom"; // Removed BrowserRouter import
import productImage from "./assets/578c27b4ff2171e9c60dfafbe9a04616.jpg";

import Home from "./pages/Home";
import Productlisting from "./pages/Productlisting";
import ProductDetails from "./pages/ProductDetails";
import Button from "@mui/material/Button";
import Dialog, { type DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ProductZoom from "./components/ProductZoom";
import { IoCloseSharp } from "react-icons/io5";
import ProductDetails1 from "./components/ProductDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CartPanel from "./components/cartPanel";
import Cart from "./pages/Cart";
import Verify from "./components/verify";
import ForgotPassword from "./pages/Forgot-passwprd";
import ResetPassword from "./pages/ResetPassword";
import toast, { Toaster } from "react-hot-toast";
import Checkout from "./pages/Checkout";
import Myaccount from "./pages/Myaccount";
import Mylist from "./pages/Mylist";
import Order from "./pages/Order";

const alertBox = ({ msg, type }: { msg: string; type: string }) => {
  console.log(type);
  if (type === "success") {
    toast.success(msg);
  } else {
    toast.error(msg);
  }
};

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      return JSON.parse(
        localStorage.getItem("cartItems") || "[]",
      ) as CartItem[];
    } catch {
      return [];
    }
  });
  const [openProductDetailsModal, setOpenProductDetailsModal] =
    React.useState(false);
  const [maxWidth, setMaxWidth] = React.useState<DialogProps["maxWidth"]>("lg");
  const [fullWidth, setFullWidth] = React.useState(true);
  const [openCartPanel, setCartOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(
    null,
  );
  const [userData, setUserData] = useState<unknown>(null);
  const [catData, setCatData] = useState<unknown[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getData("/api/user/user-details").then((res) => {
        if (res?.success) {
          setUser(res.data);
          setIsLogin(true);
        }
      });
    }
  }, [isLogin]);
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleCloseProductDetailsModal = () => {
    setOpenProductDetailsModal(false);
  };

  const toggleCartPannel = (newOpen: boolean) => {
    setCartOpen(newOpen);
  };
  const success = (msg: string) => {
    toast.success(msg);
  };

  const error = (msg: string) => {
    toast.error(msg);
  };

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    if (!isLogin) return;
    getData("/api/cart/items")
      .then((res) => {
        if (!res?.success || !Array.isArray(res.data)) return;
        const serverItems: CartItem[] = res.data.map((entry: any) => {
          const product = entry.productId;
          return {
            id: Number.parseInt(product._id.slice(-8), 16),
            serverProductId: product._id,
            cartItemId: entry._id,
            img: product.images?.[0] || "",
            img2: product.images?.[1],
            brand: product.brand,
            name: product.name || product.title || "Product",
            description: product.description,
            price: Number(product.price || product.newPrice || 0),
            oldPrice: Number(product.oldPrice || product.price || 0),
            rating: Number(product.rating || 0),
            quantity: Number(entry.quantity || 1),
          };
        });
        setCartItems(serverItems);
      })
      .catch(() => undefined);
  }, [isLogin]);

  const addToCart = (product: CartItem | Omit<CartItem, "quantity">) => {
    if (isLogin && "serverProductId" in product && product.serverProductId) {
      postData("/api/cart/add-to-cart", {
        productId: product.serverProductId,
        quantity: 1,
      })
        .then((res) => {
          if (res?.success) {
            setCartItems((currentItems) => [
              ...currentItems,
              { ...product, quantity: 1, cartItemId: res.data?._id },
            ]);
            toast.success("Added to cart");
          }
        })
        .catch(() => toast.error("Could not add item to cart"));
      return;
    }
    setCartItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === product.id);
      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...currentItems, { ...product, quantity: 1 }];
    });
    toast.success("Added to cart");
  };

  const updateCartQuantity = (productId: number, quantity: number) => {
    const currentItem = cartItems.find((item) => item.id === productId);
    if (currentItem?.cartItemId) {
      putData(`/api/cart/update/${currentItem.cartItemId}`, { quantity })
        .then(() => undefined)
        .catch(() => toast.error("Could not update cart item"));
    }
    setCartItems((currentItems) =>
      currentItems
        .map((item) => (item.id === productId ? { ...item, quantity } : item))
        .filter((item) => item.quantity > 0),
    );
  };

  const removeFromCart = (productId: number) => {
    const currentItem = cartItems.find((item) => item.id === productId);
    if (currentItem?.cartItemId) {
      deleteData(`/api/cart/remove/${currentItem.cartItemId}`)
        .then(() => undefined)
        .catch(() => toast.error("Could not remove cart item"));
    }
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== productId),
    );
  };

  const values = {
    setOpenProductDetailsModal,
    setCartOpen,
    openCartPanel,
    toggleCartPannel,
    success,
    error,
    isLogin,
    setIsLogin,
    alertBox,
    apiUrl,
    user,
    setUser,
    userData,
    setUserData,
    catData,
    cartItems,
    addToCart,
    updateCartQuantity,
    removeFromCart,
  };

  return (
    <>
      <Toaster />
      <MyContext.Provider value={values}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productDetails" element={<Productlisting />} />
          <Route path="/productDetails/:id" element={<ProductDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-in" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/my-account" element={<Myaccount />} />
          <Route path="/my-list" element={<Mylist />} />
          <Route path="/my-orders" element={<Order />} />
        </Routes>
        <Footer />
        <CartPanel />
      </MyContext.Provider>

      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={openProductDetailsModal}
        onClose={handleCloseProductDetailsModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        role="alertdialog"
      >
        <DialogContent>
          <div className="flex items-center w-full productDetailsModalContainer">
            <Button
              onClick={handleCloseProductDetailsModal}
              className="!w-[40px] !h-[40px] !min-w-[40px] ! rounded-full !text-[#000] !absolute top-[0px] right-[0px]"
            >
              <IoCloseSharp />
            </Button>

            <div className="co11I w-[40%]">
              <ProductZoom />
            </div>
            <div className="col2 w-[60%] py-5 px-5">
              <ProductDetails1 />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default App;
