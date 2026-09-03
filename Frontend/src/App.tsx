import React, { createContext, useState } from "react";
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

export const MyContext = createContext<any>({});

function App() {
  const [openProductDetailsModal, setOpenProductDetailsModal] =
    React.useState(false);
  const [maxWidth, setMaxWidth] = React.useState<DialogProps["maxWidth"]>("lg");
  const [fullWidth, setFullWidth] = React.useState(true);
  const [openCartPanel, setCartOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
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
