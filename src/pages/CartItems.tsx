import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { IoCloseSharp } from 'react-icons/io5'
import { FaAngleDown } from 'react-icons/fa6'
import Rating from '@mui/material/Rating'
import { Button, Menu, MenuItem } from '@mui/material'
import productImage from "../assets/578c27b4ff2171e9c60dfafbe9a04616.jpg"

interface CartItemsProps {
    size?: string;
    qty?: number;
}

function CartItems({ size: initialSize = 'S', qty: initialQty = 1 }: CartItemsProps) {
    const [size, setSize] = useState(initialSize)
    const [qty, setQty] = useState(initialQty)

    // State & handlers for Size Menu
    const [sizeAnchorEl, setSizeAnchorEl] = useState<null | HTMLElement>(null)
    const openSize = Boolean(sizeAnchorEl)

    const handleClickSize = (event: React.MouseEvent<HTMLButtonElement>) => {
        setSizeAnchorEl(event.currentTarget)
    }

    const handleCloseSize = (selectedSize?: string) => {
        if (selectedSize) {
            setSize(selectedSize)
        }
        setSizeAnchorEl(null)
    }

    // State & handlers for Qty Menu
    const [qtyAnchorEl, setQtyAnchorEl] = useState<null | HTMLElement>(null)
    const openQty = Boolean(qtyAnchorEl)

    const handleClickQty = (event: React.MouseEvent<HTMLButtonElement>) => {
        setQtyAnchorEl(event.currentTarget)
    }

    const handleCloseQty = (selectedQty?: number) => {
        if (selectedQty) {
            setQty(selectedQty)
        }
        setQtyAnchorEl(null)
    }

    return (
        <div className="cartItem w-full flex items-start gap-4 relative border-b border-gray-100 pb-4 mb-4 last:border-b-0 last:mb-0 last:pb-0">

            {/* Product Image */}
            <div className="w-[110px] h-[110px] rounded-xl overflow-hidden flex-shrink-0">
                <Link to="/product/7845" className="w-full h-full block">
                    <img
                        src={productImage}
                        alt="Product"
                        className="w-full h-full object-cover"
                    />
                </Link>
            </div>

            {/* Product Info */}
            <div className="flex-1 pr-8">
                <span className="text-xs text-gray-400 font-medium block mb-1">Sangria</span>
                <h3 className="text-sm font-semibold text-gray-800 leading-snug mb-1">
                    <Link to="/product/7845" className="hover:text-red-500 transition-colors">
                        A-Line Kurti With Sharara & Dupatta
                    </Link>
                </h3>

                {/* Rating Stars */}
                <div className="mb-2">
                    <Rating value={4} precision={0.5} readOnly size="small" />
                </div>

                {/* Size & Qty Controlled Dropdowns using MUI Menu */}
                <div className="flex items-center gap-2 mb-2">
                    {/* Size Dropdown */}
                    <Button
                        id="size-button"
                        aria-controls={openSize ? 'size-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={openSize ? 'true' : undefined}
                        onClick={handleClickSize}
                        className="!bg-gray-100 !text-gray-700 !text-xs !px-2.5 !py-1 !rounded-md !font-medium !min-w-0 !capitalize flex items-center gap-1"
                    >
                        Size: {size} <FaAngleDown className="text-[10px] ml-1 text-gray-500" />
                    </Button>
                    <Menu
                        id="size-menu"
                        anchorEl={sizeAnchorEl}
                        open={openSize}
                        onClose={() => handleCloseSize()}
                        slotProps={{
                            list: {
                                'aria-labelledby': 'size-button',
                            },
                        }}
                    >
                        <MenuItem onClick={() => handleCloseSize('S')}>S</MenuItem>
                        <MenuItem onClick={() => handleCloseSize('M')}>M</MenuItem>
                        <MenuItem onClick={() => handleCloseSize('L')}>L</MenuItem>
                        <MenuItem onClick={() => handleCloseSize('XL')}>XL</MenuItem>
                        <MenuItem onClick={() => handleCloseSize('XXL')}>XXL</MenuItem>
                    </Menu>

                    {/* Qty Dropdown */}
                    <Button
                        id="qty-button"
                        aria-controls={openQty ? 'qty-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={openQty ? 'true' : undefined}
                        onClick={handleClickQty}
                        className="!bg-gray-100 !text-gray-700 !text-xs !px-2.5 !py-1 !rounded-md !font-medium !min-w-0 !capitalize flex items-center gap-1"
                    >
                        Qty: {qty} <FaAngleDown className="text-[10px] ml-1 text-gray-500" />
                    </Button>
                    <Menu
                        id="qty-menu"
                        anchorEl={qtyAnchorEl}
                        open={openQty}
                        onClose={() => handleCloseQty()}
                        slotProps={{
                            list: {
                                'aria-labelledby': 'qty-button',
                            },
                        }}
                    >
                        {[1, 2, 3, 4, 5].map((q) => (
                            <MenuItem key={q} onClick={() => handleCloseQty(q)}>
                                {q}
                            </MenuItem>
                        ))}
                    </Menu>
                </div>

                {/* Price Details */}
                <div className="flex items-center gap-2 mt-2">
                    <span className="font-bold text-gray-900 text-base">${(58 * qty).toFixed(2)}</span>
                    <span className="line-through text-gray-400 text-xs">$58.00</span>
                    <span className="text-red-500 font-bold text-xs">55% OFF</span>
                </div>
            </div>

            {/* Remove Button */}
            <button
                className="absolute top-0 right-0 text-gray-400 hover:text-gray-700 transition-colors p-1"
                aria-label="Remove item"
            >
                <IoCloseSharp className="text-xl" />
            </button>

        </div>
    )
}

export default CartItems