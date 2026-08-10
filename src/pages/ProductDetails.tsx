import React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import MuiLink from "@mui/material/Link";
import ProductZoom from "../components/ProductZoom";

function ProductDetails() {
  return (
    <>
      <div className="py-5 ">
        <div className="container">
          <Breadcrumbs aria-label="breadcrumb">
            <MuiLink underline="hover" color="inherit" href="/">
              Home
            </MuiLink>
            <Typography sx={{ color: "text.primary" }}>Products</Typography>
          </Breadcrumbs>
        </div>
      </div>
      <section className="bg-white py-5">
        <div className="container flex gap-4 mt-5">
          <div className="productZoomContainer w-[30%]">
            <ProductZoom />
          </div>
        </div>
      </section>
    </>
  );
}

export default ProductDetails;
