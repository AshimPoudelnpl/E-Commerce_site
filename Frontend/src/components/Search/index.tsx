import React from "react";
import "../Search/style.css";
import Button from "@mui/material/Button";
import { CiSearch } from "react-icons/ci";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const submitSearch = () => {
    const value = query.trim();
    navigate(
      value
        ? `/productDetails?search=${encodeURIComponent(value)}`
        : "/productDetails",
    );
  };

  return (
    <div className="searchBox w-[100%] h-[50px] bg-[#e5e5e5] rounded-[5px] relative p-2">
      <input
        type="text"
        placeholder="Search for products ..."
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        onKeyDown={(event) => event.key === "Enter" && submitSearch()}
        className="w-full h-[35px] focus:outline-none bg-inherit p-2 text-[15px]"
      />
      <Button
        onClick={submitSearch}
        aria-label="Search"
        className="!absolute top-[8px] right-[5px] z-50 !w-[35px] !min-w[35px] h-[35px] !rounded-full !text-black"
      >
        <CiSearch className="text-black text-[22px]" />
      </Button>
    </div>
  );
};

export default Search;
