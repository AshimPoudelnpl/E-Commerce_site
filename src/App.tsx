import React from "react";
import Header from "./components/Header/Index";
import Footer from "./components/Footer/index";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Productlisting from "./pages/Productlisting";
import ProductDetails from "./pages/ProductDetails";

function App() {
  return (
    <>
      <Header />
      <main className="">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productDetails" element={<Productlisting />} />
          <Route path="/productDetails/:id" element={<ProductDetails />} />
        </Routes>
        <Footer />
      </main>
    </>
  );
}

export default App;
