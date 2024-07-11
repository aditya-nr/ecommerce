import React, { useState } from 'react'
import useBuyer from '../store/buyer'
import useProduct from '../store/product';
import { CurrencyInr } from '@phosphor-icons/react';
import useConstant from '../store/constant';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const cart = useBuyer(s => s.user.cart);
    const uid = useBuyer(s => s.user._id);
    const backendURL = useConstant(s => s.backendURL);
    const navigate = useNavigate();

    const emptyCart = useBuyer(s => s.emptyCart);
    const products = useProduct(s => s.products);
    const CartProducts = products.filter(e => cart?.includes(e._id));
    const [category, setCategory] = useState("")
    const [view, setView] = useState(false);
    console.log(CartProducts);

    const handleCheckout = async () => {
        try {
            const dataToSend = CartProducts.map(e => ({ uid, pid: e._id, sid: e.sid }));
            console.log(dataToSend);
            const url = backendURL + '/place-order';
            let res = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ orders: dataToSend })
            });
            res = await res.json();
            console.log(res);
            if (res.status == "OK") {
                toast.success(res.message);
                emptyCart();
                setView(false);
                navigate('/orders');
            } else {
                toast.error(res.message);
            }

        } catch (error) {
            console.log(error);
            toast.error("Something went wrong !");
        }
    }

    if (CartProducts.length == 0) return (
        <div className='flex items-center justify-center h-full flex-col'>
            <h1 className='text-3xl m-4 text-gray-600'>Cart is Empty !</h1>
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
                    <div className='w-[60%] flex flex-col gap-3'>
                        {
                            CartProducts.map(e => (
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

                    {/* Total */}
                    <div className='w-[40%] bg-white flex flex-col gap-2 p-10 text-xl'>
                        <div className='flex items-center justify-between'>
                            <span>Total: </span>
                            <span className='flex items-center'> <CurrencyInr /> {CartProducts.reduce((prev, e) => (Number(prev) + Number(e.cost)), 0)}/-</span>
                        </div>
                        <div className='w-full border border-gray-800 my-2' />
                        <div onClick={() => setView(true)} className='text-center py-3 text-lg bg-black text-white font-semibold rounded-md cursor-pointer w-full hover:bg-gray-200 border border-black hover:text-black transition-all'>Checkout</div>
                    </div>


                </div>

                {
                    view && <div className='absolute -top-[6rem] bottom-0 left-0 right-0'>
                        <div className='backdrop-blur h-screen flex justify-center items-center'>
                            <div className='flex flex-col gap-2 bg-white rounded-md p-4  drop-shadow-md w-[30%]'>
                                <textarea placeholder='Address' className='outline-none w-full h-full text-lg border border-black rounded-md p-3' />
                                <input type="Number" placeholder='Phone' className='outline-none w-full h-full text-lg border border-black rounded-md p-3' />
                                <div className='flex flex-col'>
                                    <label htmlFor="options" className='text-lg'>Payment Method :</label>
                                    <select id="options"
                                        className='outline-none w-full h-full text-lg border border-black rounded-md p-3'
                                        value={category} onChange={e => setCategory(e.target.value)}>
                                        <option value="">Select an option</option>
                                        <option value="COD">Pay On Delivery</option>
                                    </select>
                                </div>
                                <div onClick={handleCheckout} className='text-center py-3 text-lg bg-black text-white font-semibold rounded-md cursor-pointer w-full hover:bg-gray-200 border border-black hover:text-black transition-all'>Order</div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

export default Cart