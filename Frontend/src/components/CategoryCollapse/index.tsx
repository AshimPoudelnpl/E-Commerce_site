import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { FiMinusSquare } from "react-icons/fi";
import { FaRegSquarePlus } from "react-icons/fa6";
import { MyContext } from "../../context/MyContext";
import { initialCategories } from "../../types/category";

interface CategoryCollapseProps {
  onCloseDrawer?: () => void;
}

function CategoryCollapse({ onCloseDrawer }: CategoryCollapseProps) {
  const context = useContext(MyContext);
  const categories = context.categories && context.categories.length > 0
    ? context.categories
    : initialCategories;

  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const toggleCategory = (slug: string) => {
    setOpenCategory((prev) => (prev === slug ? null : slug));
  };

  return (
    <div className="scroll py-2">
      <ul className="w-full space-y-1">
        {categories.map((cat, catIdx) => {
          const hasSubs = cat.subCategories && cat.subCategories.length > 0;
          const isOpen = openCategory === cat.slug;
          const catKey = cat._id || cat.id || cat.slug || `cat-${catIdx}`;

          return (
            <li key={catKey} className="list-none relative border-b border-gray-100 last:border-b-0">
              <div className="flex items-center justify-between relative pr-2">
                <Link
                  to={`/category/${cat.slug}`}
                  className="w-full"
                  onClick={onCloseDrawer}
                >
                  <Button className="w-full !text-left !justify-start !px-3 !py-2 !text-gray-800 hover:!text-[#ff5252] !text-sm !font-medium !capitalize">
                    <span className="mr-2 text-base">{cat.icon || "🏷️"}</span>
                    {cat.name}
                  </Button>
                </Link>

                {hasSubs && (
                  <button
                    type="button"
                    onClick={() => toggleCategory(cat.slug)}
                    className="p-1 text-gray-500 hover:text-black focus:outline-none"
                    aria-label="Toggle subcategories"
                  >
                    {isOpen ? (
                      <FiMinusSquare className="text-[17px] text-[#ff5252]" />
                    ) : (
                      <FaRegSquarePlus className="text-[17px]" />
                    )}
                  </button>
                )}
              </div>

              {/* Subcategories list */}
              {hasSubs && isOpen && (
                <ul className="sub-menu w-full pl-6 bg-gray-50 py-1 space-y-0.5 border-l-2 border-red-200 ml-3">
                  {cat.subCategories!.map((sub, subIdx) => {
                    const subKey = sub._id || sub.id || sub.slug || `sub-${subIdx}`;
                    return (
                      <li key={subKey} className="list-none">
                        <Link
                          to={`/category/${cat.slug}/${sub.slug}`}
                          className="w-full block"
                          onClick={onCloseDrawer}
                        >
                          <Button className="w-full !text-left !justify-start !px-2 !py-1 !text-xs !text-gray-600 hover:!text-[#ff5252] !capitalize">
                            • {sub.name}
                          </Button>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default CategoryCollapse;
