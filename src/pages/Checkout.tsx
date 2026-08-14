import React from 'react'
import TextField from '@mui/material/TextField'
import { IoBagCheckOutline } from "react-icons/io5";
import productImage from "./../assets/photo-1612452830710-97cd38a7b6e8.avif"   
const orderItems = [
    { id: 1, name: 'A-Line Kurti With Sharara', qty: 1, price: 1300, image: productImage },
    { id: 2, name: 'A-Line Kurti With Sharara', qty: 1, price: 1300, image: productImage},
    { id: 3, name: 'A-Line Kurti With Sharara', qty: 1, price: 1300, image: productImage },
    { id: 4, name: 'A-Line Kurti With Sharara', qty: 1, price: 1300, image: productImage },
]

function Checkout() {
    return (
        <section className='py-10 bg-[#efece7] min-h-screen'>
            <div className='container mx-auto flex gap-5 max-w-5xl'>
                <div className="leftCol w-[70%]">
                    <div className="card bg-white shadow-md p-6 rounded-md w-full">
                        <h1 className='text-lg font-semibold mb-5'>Billing Details</h1>

                        <form action="" className='w-full flex flex-col gap-4'>
                            <div className='flex gap-4'>
                                <TextField
                                    id="full-name"
                                    label=""
                                    placeholder="Full Name"
                                    variant="outlined"
                                    fullWidth
                                    size="small"
                                />
                                <TextField
                                    id="email"
                                    placeholder="Email"
                                    variant="outlined"
                                    fullWidth
                                    size="small"
                                />
                            </div>

                            <div>
                                <p className='text-sm font-medium mb-2'>
                                    Street address <span className='text-red-500'>*</span>
                                </p>
                                <TextField
                                    id="street-address"
                                    placeholder="House No. and Street Name"
                                    variant="outlined"
                                    fullWidth
                                    size="small"
                                    required
                                />
                            </div>

                            <TextField
                                id="apartment"
                                placeholder="Apartment, suite, unit, etc. (optional)"
                                variant="outlined"
                                fullWidth
                                size="small"
                            />

                            <div className='flex gap-4'>
                                <div className='w-full'>
                                    <p className='text-sm font-medium mb-2'>
                                        Town / City <span className='text-red-500'>*</span>
                                    </p>
                                    <TextField
                                        id="town-city"
                                        placeholder="Town / City"
                                        variant="outlined"
                                        fullWidth
                                        size="small"
                                        required
                                    />
                                </div>
                                <div className='w-full'>
                                    <p className='text-sm font-medium mb-2'>
                                        State / County <span className='text-red-500'>*</span>
                                    </p>
                                    <TextField
                                        id="state-county"
                                        placeholder="State / County"
                                        variant="outlined"
                                        fullWidth
                                        size="small"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <p className='text-sm font-medium mb-2'>
                                    Postcode / ZIP <span className='text-red-500'>*</span>
                                </p>
                                <TextField
                                    id="zip"
                                    placeholder="Zip Code"
                                    variant="outlined"
                                    fullWidth
                                    size="small"
                                    required
                                />
                            </div>

                            <div className='flex gap-4'>
                                <TextField
                                    id="phone"
                                    placeholder="Phone Number"
                                    variant="outlined"
                                    fullWidth
                                    size="small"
                                />
                                <TextField
                                    id="email-address"
                                    placeholder="Email Address"
                                    variant="outlined"
                                    fullWidth
                                    size="small"
                                />
                            </div>
                        </form>
                    </div>
                </div>

                <div className="rightCol  h-[400px] w-[35%]    ">
                    <div className="card bg-white shadow-md p-6 rounded-md w-full flex flex-col">
                        <h1 className='text-lg font-semibold mb-5'>Your Order</h1>

                        <div className='flex justify-between text-sm font-medium text-gray-500 pb-3 border-b'>
                            <span>Product</span>
                            <span>Subtotal</span>
                        </div>

                        <div className='flex flex-col gap-4 max-h-[280px] overflow-y-auto py-3'>
                            {orderItems.map((item) => (
                                <div key={item.id} className='flex items-center justify-between gap-3'>
                                    <div className='flex items-center gap-3'>
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className='w-12 h-14 object-cover rounded-sm bg-gray-100'
                                        />
                                        <div>
                                            <p className='text-sm text-gray-700 leading-tight'>
                                                {item.name.length > 20 ? `${item.name.slice(0, 20)}...` : item.name}
                                            </p>
                                            <p className='text-xs text-gray-400'>Qty : {item.qty}</p>
                                        </div>
                                    </div>
                                    <span className='text-sm text-gray-700 whitespace-nowrap'>
                                        ₹{item.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <button
                            type='button'
                            className='mt-4 w-full bg-[#e8623d] hover:bg-[#d5552f] text-white font-medium py-3 rounded-md flex items-center justify-center gap-2 transition-colors'
                        >
                            <IoBagCheckOutline />

                            CHECKOUT
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}



export default Checkout