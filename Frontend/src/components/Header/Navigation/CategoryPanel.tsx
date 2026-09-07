import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { IoCloseSharp } from "react-icons/io5";
import CategoryCollapse from "../../CategoryCollapse";

interface CategoryPanelProps {
  openCategoryPanel: () => void;
  isopenCategoryPanel: boolean;
}

function CategoryPanel({
  openCategoryPanel,
  isopenCategoryPanel,
}: CategoryPanelProps) {
  const toggleDrawer = (open: boolean) => () => {
    if (!open) openCategoryPanel();
  };

  const DrawerList = (
    <Box sx={{ width: 280 }} role="presentation" className="categoryPanel p-4">
      <div className="flex items-center justify-between border-b pb-3 mb-2">
        <h3 className="text-[16px] font-bold text-gray-800">
          Shop By Categories
        </h3>
        <IoCloseSharp
          onClick={toggleDrawer(false)}
          className="cursor-pointer text-[22px] text-gray-500 hover:text-black"
        />
      </div>
      <CategoryCollapse onCloseDrawer={openCategoryPanel} />
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
