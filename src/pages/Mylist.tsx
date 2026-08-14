
import React from 'react'
import { BsFillBagCheckFill } from 'react-icons/bs'
import { Button } from '@mui/material'
import CartItems from './CartItems'
import { Link } from 'react-router-dom'
import Mylistitems from './Mylistitems'
import AcccountSideaBar from '../components/AccountSideBar'

function Mylist() {
    return (
       
        <section className="section py-5 min-h-screen">
            <div className="container  w-[80%] max-w-[80%] flex gap-3">
                <AcccountSideaBar/>
                <div className="leftPart w-[70%]">
                    <div className="rounded-xl p-4 bg-white border border-gray-100">
                        <h2 className="text-xl font-bold text-gray-800 mb-1">My List</h2>
                        <p className="mt-0 text-sm text-gray-500 mb-4">
                            There are <span className="font-bold text-red-500">2</span> products in My list
                        </p>
                        <Mylistitems size="S" qty={1} />
                        <Mylistitems size="M" qty={1} />
                    </div>
                   
                </div>

            </div>
        </section>
    )
}

export default Mylist
