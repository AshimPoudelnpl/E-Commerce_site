import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../Search/style.css";
import Button from "@mui/material/Button";
import { CiSearch } from "react-icons/ci";
import { MyContext } from "../../context/MyContext";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const context = useContext(MyContext);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      if (context.setSearchQuery) {
        context.setSearchQuery(searchTerm.trim());
      }
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="searchBox w-[100%] h-[50px] bg-[#e5e5e5] rounded-[5px] relative p-2 flex items-center"
    >
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for products, brands, or categories..."
        className="w-full h-[35px] focus:outline-none bg-inherit p-2 text-[14px] sm:text-[15px] pr-10"
      />
      <Button
        type="submit"
        className="!absolute top-[8px] right-[5px] z-20 !w-[35px] !min-w-[35px] h-[35px] !rounded-full !text-black hover:!bg-gray-200"
      >
        <CiSearch className="text-black text-[22px]" />
      </Button>
    </form>
  );
};

export default Search;
