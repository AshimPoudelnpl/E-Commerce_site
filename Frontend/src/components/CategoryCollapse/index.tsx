import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'
import { FiMinusSquare } from 'react-icons/fi'
import { FaRegSquarePlus } from 'react-icons/fa6'

function CategoryCollapse() {
  const [subMenuIndex, setSubMenuIndex] = useState<number | null>(null)
  const [subInnerMenuIndex, setSubInnerMenuIndex] = useState<number | null>(null)

  const openSubmenu = (index: number) =>
    setSubMenuIndex(subMenuIndex === index ? null : index)

  const openinnerSubmenu = (index: number) =>
    setSubInnerMenuIndex(subInnerMenuIndex === index ? null : index)
  return (
    <div className="scroll">
        <ul className="w-full">
          <li className="list-none relative">
            <div className="flex items-center relative">
              <Link to={"/fashion"} className="w-full">
                <Button className="w-full !text-left !justify-start !px-3 !text-[rgba(0,0,0,0.8)]">
                  Fashion
                </Button>
              </Link>
              {subMenuIndex === 0 ? (
                <FiMinusSquare
                  className="absolute top-[10px] right-[15px] cursor-pointer"
                  onClick={() => openSubmenu(0)}
                />
              ) : (
                <FaRegSquarePlus
                  className="absolute top-[10px] right-[15px] cursor-pointer"
                  onClick={() => openSubmenu(0)}
                />
              )}
            </div>
            {subMenuIndex === 0 && (
              <ul className="sub-menu w-full pl-3">
                <li className="list-none relative">
                  <div className="flex items-center relative">
                    <Link to={"/apparel"} className="w-full">
                      <Button className="w-full !text-left !justify-start !px-3 !text-[rgba(0,0,0,0.8)]">
                        Apparel
                      </Button>
                    </Link>
                    {subInnerMenuIndex === 0 ? (
                      <FiMinusSquare
                        className="absolute top-[10px] right-[15px] cursor-pointer"
                        onClick={() => openinnerSubmenu(0)}
                      />
                    ) : (
                      <FaRegSquarePlus
                        className="absolute top-[10px] right-[15px] cursor-pointer"
                        onClick={() => openinnerSubmenu(0)}
                      />
                    )}
                  </div>
                  {subInnerMenuIndex === 0 && (
                    <ul className="inner_sub-menu w-full pl-3">
                      <li className="list-none relative mb-1">
                        <Link
                          to={"/apparel"}
                          className=" link w-full !text-left !justify-start !px-3 !text-[rgba(0,0,0,0.8)]"
                        >
                          Smart Tablet
                        </Link>
                      </li>
                      <li className="list-none relative mb-1">
                        <Link
                          to={"/apparel"}
                          className=" link w-full !text-left !justify-start !px-3 !text-[rgba(0,0,0,0.8)]"
                        >
                          Crepe T-shirt
                        </Link>
                      </li>
                      <li className="list-none relative mb-1">
                        <Link
                          to={"/apparel"}
                          className=" link w-full !text-left !justify-start !px-3 !text-[rgba(0,0,0,0.8)]"
                        >
                          Leather Watch
                        </Link>
                      </li>
                      <li className="list-none relative mb-1">
                        <Link
                          to={"/apparel"}
                          className=" link w-full !text-left !justify-start !px-3 !text-[rgba(0,0,0,0.8)]"
                        >
                          Rolling Diamond
                        </Link>
                      </li>
                    </ul>
                  )}
                </li>
              </ul>
            )}
          </li>

          {/* Jewellery */}
          <li className="list-none flex items-center relative">
            <Link to="/jewellery" className="w-full">
              <Button className="w-full !text-left !justify-start !px-3 !text-[rgba(0,0,0,0.8)]">
                Jewellery
              </Button>
            </Link>
          </li>

          {/* Watches */}
          <li className="list-none flex items-center relative">
            <Link to="/watches" className="w-full">
              <Button className="w-full !text-left !justify-start !px-3 !text-[rgba(0,0,0,0.8)]">
                Watches
              </Button>
            </Link>
          </li>

          {/* Outerwear */}
          <li className="list-none relative">
            <div className="flex items-center relative">
              <Link to="/outerwear" className="w-full">
                <Button className="w-full !text-left !justify-start !px-3 !text-[rgba(0,0,0,0.8)]">
                  Outerwear
                </Button>
              </Link>
              {subMenuIndex === 1 ? (
                <FiMinusSquare
                  className="absolute top-[10px] right-[15px] cursor-pointer"
                  onClick={() => openSubmenu(1)}
                />
              ) : (
                <FaRegSquarePlus
                  className="absolute top-[10px] right-[15px] cursor-pointer"
                  onClick={() => openSubmenu(1)}
                />
              )}
            </div>
            {subMenuIndex === 1 && (
              <ul className="sub-menu w-full bg-white z-10 pl-3 shadow">
                <li className="list-none">
                  <Link to="/cosmetics">
                    <Button className="w-full !text-left !justify-start !px-3 !text-[rgba(0,0,0,0.8)]">
                      Cosmetics
                    </Button>
                  </Link>
                </li>
                <li className="list-none">
                  <Link to="/accessories">
                    <Button className="w-full !text-left !justify-start !px-3 !text-[rgba(0,0,0,0.8)]">
                      Accessories
                    </Button>
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Flat items */}
          {[
            { name: "Electronic", path: "/electronic" },
            { name: "Furniture", path: "/furniture" },
            { name: "Sunglasses", path: "/sunglasses" },
            { name: "Rolling Diamond", path: "/rolling-diamond" },
            { name: "Xbox Controller", path: "/xbox-controller" },
            { name: "Leather Watch", path: "/leather-watch" },
            { name: "Smart Tablet", path: "/smart-tablet" },
            { name: "Purse", path: "/purse" },
            { name: "Sunglasses", path: "/sunglasses-2" },
          ].map((item, i) => (
            <li key={i} className="list-none flex items-center relative">
              <Link to={item.path} className="w-full">
                <Button className="w-full !text-left !justify-start !px-3 !text-[rgba(0,0,0,0.8)]">
                  {item.name}
                </Button>
              </Link>
            </li>
          ))}
        </ul>
      </div>
  )
}

export default CategoryCollapse