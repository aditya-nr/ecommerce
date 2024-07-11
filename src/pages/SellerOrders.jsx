import React, { useEffect, useState } from 'react'
import useBuyer from '../store/buyer'
import useProduct from '../store/product';
import { CurrencyInr } from '@phosphor-icons/react';
import useConstant from '../store/constant';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import useSeller from '../store/seller';

const SellerOrders = () => {
    const navigate = useNavigate();
    const sid = useSeller(s => s.user._id);
    const backendURL = useConstant(s => s.backendURL);
    const products = useProduct(s => s.products);

    const [cartProducts, setCartProducts] = useState([])
    console.log(cartProducts);

    const fetchOrders = async () => {
        try {
            console.log(sid);
            const url = backendURL + '/getSidOrder';
            let res = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ sid })
            });
            res = await res.json();
            console.log(res);
            if (res.status == "OK") {
                toast.success(res.message);
                let pids = res.data.map(e => e.pid);
                res = products.filter(e => pids.includes(e._id));
                setCartProducts(res);
            } else {
                toast.error(res.message);
            }

        } catch (error) {
            console.log(error);
            toast.error("Something went wrong !");
        }
    }

    useEffect(() => { fetchOrders() }, [])
    if (cartProducts.length == 0) return (
        <div className='flex items-center justify-center h-full flex-col'>
            <h1 className='text-3xl m-4 text-gray-600'>Orders is Empty !</h1>
            <div className='w-[30%]'>
                <img src="/empty_cart.svg" />
            </div>

        </div>
    )
    return (
        <>
            <div className='relative h-full'>
                {/* List */}
                <div className='w-[60%] mx-auto mt-8 flex gap-4'>
                    <div className='w-full flex flex-col gap-3'>
                        {
                            cartProducts.map(e => (
                                <div key={e._id} className='flex bg-white rounded-md px-4 py-2 justify-between gap-2 items-center'>
                                    <div className='w-20 h-20 overflow-hidden'>
                                        <img src={e.image} />
                                    </div>
                                    <div className='flex-1'>
                                        <span className='text-lg'>{e.name}</span>
                                        <p className='text-sm'>Size : <span className='font-semibold'>{e.size}</span></p>
                                    </div>
                                    <p className='flex items-center text-lg'><CurrencyInr />{e.cost}/-</p>
                                </div>
                            ))
                        }
                    </div>
                </div>

            </div>
        </>
    )
}

export default SellerOrders