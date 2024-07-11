import { CurrencyInr, Plus, ShoppingCart } from '@phosphor-icons/react';
import React from 'react'
import useBuyer from '../store/buyer';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const ProductCard = ({ product, mode }) => {
    const isLogin = useBuyer(s => s.isLogin);
    const addToCart = useBuyer(s => s.addToCart);
    const navigate = useNavigate();
    const handleClick = () => {
        if (!isLogin) {
            navigate('/login');
            return;
        }
        addToCart(product._id);
        toast.success("Product Added Successfully")
    }
    return (
        <div className=' bg-white rounded-md drop-shadow w-fit h-fit'>
            <div className='w-60 h-60 rounded-md overflow-hidden'>
                <img src={product.image} />
            </div>
            <p className='text-lg text-center'>{product.name}</p>
            <div className='flex justify-between items-center p-2 text-gray-600'>
                <p className='flex items-center px-2 py-1 text-lg'>
                    <CurrencyInr size={30} /> {product.cost}/-
                </p>
                {!mode && <p onClick={handleClick}
                    className='active:text-lg active:bg-red-500 cursor-pointer flex items-center gap-1 px-2 py-1 bg-red-200 rounded-md border border-red-500 text-red-500'>
                    <Plus /><ShoppingCart size={32} />
                </p>}
            </div>
        </div>
    )
}

export default ProductCard