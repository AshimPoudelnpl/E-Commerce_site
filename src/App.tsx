import React, { createContext, useState } from "react";
import Header from "./components/Header/Index";
import Footer from "./components/Footer/index";
import { Route, Routes } from "react-router-dom"; // Removed BrowserRouter import

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
import { Drawer } from "@mui/material";

const MyContext = createContext<any>({});

function App() {
  const [openProductDetailsModal, setOpenProductDetailsModal] =
    React.useState(false);
  const [maxWidth, setMaxWidth] = React.useState<DialogProps["maxWidth"]>("lg");
  const [fullWidth, setFullWidth] = React.useState(true);
  const [openCartPanel, setCartOpen] = useState(true);

  const handleCloseProductDetailsModal = () => {
    setOpenProductDetailsModal(false);
  };

  const values = {
    setOpenProductDetailsModal,
  };
  const toggleCartPannel = (newOpen: boolean) => {
    setCartOpen(newOpen);
  };

  return (
    <>
      <MyContext.Provider value={values}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productDetails" element={<Productlisting />} />
          <Route path="/productDetails/:id" element={<ProductDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-in" element={<Register />} />
        </Routes>
        <Footer />
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
      <Drawer
        open={openCartPanel}
        onClose={() => toggleCartPannel(false)}
        anchor="right"
      >
        <div className="flex items-center justify-between py-3 px-4 gap-3">
          <h4>Shopping Cart (1)</h4>
          <IoCloseSharp className="text-[20px] cursor-pointer" />
        </div>
      </Drawer>
    </>
  );
}

export default App;
export { MyContext };
