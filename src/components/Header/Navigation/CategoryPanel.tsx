import React, { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { IoCloseSharp } from "react-icons/io5";
import { FaRegSquarePlus } from "react-icons/fa6";
import { FiMinusSquare } from "react-icons/fi";
import { Link } from "react-router-dom";
import CategoryCollapse from "../../CategoryCollapse";

interface CategoryPanelProps {
  openCategoryPanel: () => void;
  isopenCategoryPanel: boolean;
}

function CategoryPanel({
  openCategoryPanel,
  isopenCategoryPanel,
}: CategoryPanelProps) {
  const [subMenuIndex, setsubMenuIndex] = useState<number | null>(null);
  const [subInnerMenuIndex, setsubInnerMenuIndex] = useState<number | null>(
    null,
  );
  const toggleDrawer = (open: boolean) => () => {
    if (!open) openCategoryPanel();
  };
  const openSubmenu = (index: number) => {
    if (subMenuIndex === index) {
      setsubMenuIndex(null);
      return;
    }
    setsubMenuIndex(index);
  };
  const openinnerSubmenu = (index: number) => {
    if (subInnerMenuIndex === index) {
      setsubInnerMenuIndex(null);
      return;
    }
    setsubInnerMenuIndex(index);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" className="categoryPanel">
      <h3 className="p-3 text-[16px] font-[500] flex items-center justify-between">
        Shop By Categories
        <IoCloseSharp
          onClick={toggleDrawer(false)}
          className="cursor-pointer text-[20px]"
        />
      </h3>
      <CategoryCollapse/>
    </Box>
  );

  return (
    <div>
      <Drawer open={isopenCategoryPanel} onClose={openCategoryPanel}>
        {DrawerList}
      </Drawer>
    </div>
  );
}

export default CategoryPanel;
