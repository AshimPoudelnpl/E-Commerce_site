import React from 'react'
import { BsFillBagCheckFill } from 'react-icons/bs'
import { Button } from '@mui/material'
import CartItems from './CartItems'

function Cart() {
    return (
        <section className="section py-5">
            <div className="container w-[80%] max-w-[80%] flex">
                <div className="leftPart w-[70%]">
                    <div className="rounded-xl p-4 bg-white border border-gray-100">
                        <h2 className="text-xl font-bold text-gray-800 mb-1">Your Cart</h2>
                        <p className="mt-0 text-sm text-gray-500 mb-4">
                            There are <span className="font-bold text-red-500">2</span> products in your cart
                        </p>
                        <CartItems size="S" qty={1} />
                        <CartItems size="M" qty={1} />
                    </div>
                </div>
                <div className="rightPart w-[30%] pl-4">
                    <div className="shadow-md rounded-md bg-white p-5">
                        <h3 className="pb-2 font-semibold border-b border-gray-200 text-gray-800">Cart Totals</h3>

                        <p className="flex items-center justify-between my-2">
                            <span className="text-[14px] font-[500]">Subtotal</span>
                            <span className="text-primary font-bold">₹1,300.00</span>
                        </p>

                        <p className="flex items-center justify-between mb-2">
                            <span className="text-[14px] font-[500]">Shipping</span>
                            <span className="font-bold">Free</span>
                        </p>
                        <p className="flex items-center justify-between mb-2">
                            <span className="text-[14px] font-[500]">Estimate for</span>
                            <span className="font-bold">United Kingdom</span>
                        </p>

                        <p className="flex items-center justify-between pt-2 mt-2 py-2">
                            <span className="text-[14px] font-[600]">Total</span>
                            <span className="text-primary font-bold">₹1,300.00</span>
                        </p>
                        <Button className='btnorg btn-lg w-full !bg-[#ff5252] !text-white rounded-full flex items-center justify-center gap-2'>
                            <BsFillBagCheckFill className="text-xl" /> Checkout
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Cart
