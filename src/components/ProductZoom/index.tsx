import React from "react";
import { InnerImageZoom } from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/styles.min.css";

import pic from "../../assets/578c27b4ff2171e9c60dfafbe9a04616.jpg";

function ProductZoom() {
  return (
    <div>
      <InnerImageZoom
        src={pic}
        zoomSrc={pic}
        zoomType="hover"
        zoomScale={1}
        alt="Product"
      />
    </div>
  );
}

export default ProductZoom;
