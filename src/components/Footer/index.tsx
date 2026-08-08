import React from "react";
import {
  LiaShippingFastSolid,
  LiaUndoAltSolid,
  LiaWalletSolid,
  LiaGiftSolid,
  LiaHeadsetSolid,
} from "react-icons/lia";
import { IoChatboxOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="py-6 bg-white border border-[rgba(0,0,0,0.1)]">
      <div className="container">
        {/* Top Icons Row */}
        <div className="flex items-center justify-center gap-2 pb-5">
          <div className="col flex items-center justify-center flex-col group w-1/5">
            <LiaShippingFastSolid className="text-[35px] transition-all duration-300 group-hover:text-primary group-hover:-translate-y-1" />
            <h3 className="text-[14px] font-[600] mt-2">Free Shipping</h3>
            <p className="text-[11px] font-[500]">For all Orders Over $100</p>
          </div>
          <div className="col flex items-center justify-center flex-col group w-1/5">
            <LiaUndoAltSolid className="text-[35px] transition-all duration-300 group-hover:text-primary group-hover:-translate-y-1" />
            <h3 className="text-[14px] font-[600] mt-2">30 Days Returns</h3>
            <p className="text-[11px] font-[500]">For an Exchange Product</p>
          </div>
          <div className="col flex items-center justify-center flex-col group w-1/5">
            <LiaWalletSolid className="text-[35px] transition-all duration-300 group-hover:text-primary group-hover:-translate-y-1" />
            <h3 className="text-[14px] font-[600] mt-2">Secured Payment</h3>
            <p className="text-[11px] font-[500]">Payment Cards Accepted</p>
          </div>
          <div className="col flex items-center justify-center flex-col group w-1/5">
            <LiaGiftSolid className="text-[35px] transition-all duration-300 group-hover:text-primary group-hover:-translate-y-1" />
            <h3 className="text-[14px] font-[600] mt-2">Special Gifts</h3>
            <p className="text-[11px] font-[500]">Our First Product Order</p>
          </div>
          <div className="col flex items-center justify-center flex-col group w-1/5">
            <LiaHeadsetSolid className="text-[35px] transition-all duration-300 group-hover:text-primary group-hover:-translate-y-1" />
            <h3 className="text-[14px] font-[600] mt-2">Support 24/7</h3>
            <p className="text-[11px] font-[500]">Contact us Anytime</p>
          </div>
        </div>

        <hr className="border-[rgba(0,0,0,0.1)]" />

        {/* Bottom Columns Row */}
        <div className="flex items-start divide-x bg-gray-100 divide-[rgba(0,0,0,0.1)] py-8">
          {/* Contact */}
          <div className="part1 w-[28%] pr-10 pl-6">
            <h2 className="text-[18px] font-[700] mb-4">Contact Us</h2>
            <p className="text-[14px] font-[400] text-[#374151] leading-6">
              Classyshop - Mega Super Store
              <br />
              507-Union Trade Centre
              <br />
              France
            </p>
            <Link className="link text-[14px] text-[#374151] block mt-2" to="mailto:sales@classyshop.com">
              sales@classyshop.com
            </Link>
            <span className="text-[22px] font-[700] block w-full mt-3 text-primary">
              (+977) 9866938081
            </span>
            <div className="flex items-center gap-2 mt-4">
              <IoChatboxOutline className="text-[36px] text-primary" />
              <span className="text-[15px] font-[600] leading-tight">
                Online Chat
                <br />
                Get Expert Help
              </span>
            </div>
          </div>

          {/* Products */}
          <div className="part2 w-[18%] px-8">
            <h2 className="text-[18px] font-[700] mb-4">Products</h2>
            <ul>
              <li className="list-none text-[14px] w-full mb-3">
                <Link to="/" className="link text-[#374151]">Prices Drop</Link>
              </li>
              <li className="list-none text-[14px] w-full mb-3">
                <Link to="/" className="link text-[#374151]">New Products</Link>
              </li>
              <li className="list-none text-[14px] w-full mb-3">
                <Link to="/" className="link text-[#374151]">Best Sales</Link>
              </li>
              <li className="list-none text-[14px] w-full mb-3">
                <Link to="/" className="link text-[#374151]">Contact Us</Link>
              </li>
              <li className="list-none text-[14px] w-full mb-3">
                <Link to="/" className="link text-[#374151]">Sitemap</Link>
              </li>
              <li className="list-none text-[14px] w-full mb-3">
                <Link to="/" className="link text-[#374151]">Stores</Link>
              </li>
            </ul>
          </div>

          {/* Our Company */}
          <div className="part3 w-[24%] px-8">
            <h2 className="text-[18px] font-[700] mb-4">Our Company</h2>
            <ul>
              <li className="list-none text-[14px] w-full mb-3">
                <Link to="/" className="link text-[#374151]">Delivery</Link>
              </li>
              <li className="list-none text-[14px] w-full mb-3">
                <Link to="/" className="link text-[#374151]">Legal Notice</Link>
              </li>
              <li className="list-none text-[14px] w-full mb-3">
                <Link to="/" className="link text-[#374151]">Terms And Conditions Of Use</Link>
              </li>
              <li className="list-none text-[14px] w-full mb-3">
                <Link to="/" className="link text-[#374151]">About Us</Link>
              </li>
              <li className="list-none text-[14px] w-full mb-3">
                <Link to="/" className="link text-[#374151]">Secure Payment</Link>
              </li>
              <li className="list-none text-[14px] w-full mb-3">
                <Link to="/login" className="link text-[#374151]">Login</Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="part4 w-[30%] pl-8">
            <h2 className="text-[18px] font-[700] mb-4">Subscribe To Newsletter</h2>
            <p className="text-[14px] font-[400] text-[#374151] leading-6 mb-4">
              Subscribe to our latest newsletter to get news about special discounts.
            </p>
            <input
              type="email"
              placeholder="Your Email Address"
              className="border border-[rgba(0,0,0,0.2)] rounded-md px-4 py-3 text-[14px] w-full outline-none focus:border-primary mb-4"
            />
            <button className="bg-primary text-white uppercase tracking-wide font-[600] text-[13px] px-6 py-3 rounded-md w-full hover:bg-red-600 transition-colors mb-4">
              Subscribe
            </button>
            <label className="flex items-start gap-2 text-[13px] text-[#374151] cursor-pointer">
              <input type="checkbox" className="mt-[3px]" />
              <span>I agree to the terms and conditions and the privacy policy</span>
            </label>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;