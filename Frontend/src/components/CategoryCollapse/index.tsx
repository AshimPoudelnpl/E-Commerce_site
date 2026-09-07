import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { FiMinusSquare } from "react-icons/fi";
import { FaRegSquarePlus } from "react-icons/fa6";
const items = [
  ["Electronic", "/electronic"],
  ["Furniture", "/furniture"],
  ["Sunglasses", "/sunglasses"],
  ["Rolling Diamond", "/rolling-diamond"],
  ["Xbox Controller", "/xbox-controller"],
  ["Leather Watch", "/leather-watch"],
  ["Smart Tablet", "/smart-tablet"],
  ["Purse", "/purse"],
];

function CategoryCollapse() {
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  return (
    <div className="scroll">
      <ul className="w-full">
        <li className="list-none relative">
          <div className="flex items-center relative">
            <Link to="/fashion" className="w-full">
              <Button className="w-full !text-left !justify-start !px-3 !text-[rgba(0,0,0,0.8)]">
                Fashion
              </Button>
            </Link>
            {openCategory === "fashion" ? (
              <FiMinusSquare
                className="absolute top-[10px] right-[15px] cursor-pointer"
                onClick={() => setOpenCategory(null)}
              />
            ) : (
              <FaRegSquarePlus
                className="absolute top-[10px] right-[15px] cursor-pointer"
                onClick={() => setOpenCategory("fashion")}
              />
            )}
          </div>
          {openCategory === "fashion" && (
            <ul className="sub-menu w-full pl-3">
              <li className="list-none">
                <Link to="/apparel" className="w-full">
                  <Button className="w-full !text-left !justify-start !px-3 !text-[rgba(0,0,0,0.8)]">
                    Apparel
                  </Button>
                </Link>
              </li>
              <li className="list-none">
                <Link to="/fashion/men" className="w-full">
                  <Button className="w-full !text-left !justify-start !px-3 !text-[rgba(0,0,0,0.8)]">
                    Men
                  </Button>
                </Link>
              </li>
              <li className="list-none">
                <Link to="/fashion/women" className="w-full">
                  <Button className="w-full !text-left !justify-start !px-3 !text-[rgba(0,0,0,0.8)]">
                    Women
                  </Button>
                </Link>
              </li>
            </ul>
          )}
        </li>
        {[
          ["Jewellery", "/jewellery"],
          ["Watches", "/watches"],
          ["Outerwear", "/outerwear"],
          ...items,
        ].map(([name, path]) => (
          <li key={path} className="list-none flex items-center relative">
            <Link to={path} className="w-full">
              <Button className="w-full !text-left !justify-start !px-3 !text-[rgba(0,0,0,0.8)]">
                {name}
              </Button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryCollapse;
