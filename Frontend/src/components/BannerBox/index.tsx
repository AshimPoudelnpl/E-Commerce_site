import React from "react";
import { Link } from "react-router-dom";

function BannerBox(props: { img: string; link?: string }) {
  return (
    <div className="bannerBox w-full rounded-lg overflow-hidden group">
      <Link to={props.link ?? "/"}>
        <img
          src={props.img}
          className="w-full h-full object-cover transition-all group-hover:scale-105 group-hover:rotate-1"
          alt="banner"
        />
      </Link>
    </div>
  );
}

export default BannerBox;
