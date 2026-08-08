import React from "react";
import { Link } from "react-router-dom";

function BannerBox(props: { img: string }) {
  return (
    <div className="bannerBox w-full h-full rounded-lg overflow-hidden">
      <Link to="/">
        <img src={props.img} className="w-full transition-all group-hover:scale-105 group-hover:rotate-2" alt="banner" />
      </Link>
    </div>
  );
}

export default BannerBox;
