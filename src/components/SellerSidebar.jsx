import { HouseLine, ShoppingBagOpen, SignOut, StackPlus, Storefront } from '@phosphor-icons/react'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from './Logo'
import useSeller from '../store/seller'

const SellerSidebar = () => {
    const name = useSeller(state => state.user.fname);
    const logout = useSeller(s => s.logout);
    const navigate = useNavigate();

    const LogoutHandler = () => {
        logout();
        navigate('/');
    }
    return (
        <>
            <div className='w-fit bg-white p-4 drop-shadow-sm text-lg flex flex-col gap-6'>
                <div className='w-full text-center mt-3'>
                    <Logo className={"text-2xl"} />
                    <p className='text-gray-700 font-lg'>
                        Welcome <span className='font-semibold'>{name}</span>
                    </p>
                </div>
                <Link to={'/'} className='flex gap-2  p-2 px-6 hover:bg-blue-100 cursor-pointer transition-all rounded-md'>
                    <HouseLine size={32} /> Home
                </Link>
                <Link to={'/seller/products'} className='flex gap-2  p-2 px-6 hover:bg-blue-100 cursor-pointer transition-all rounded-md'>
                    <Storefront size={32} /> My Products
                </Link>
                <Link to={'/seller/add'} className='flex gap-2 p-2 px-6 hover:bg-blue-100 cursor-pointer transition-all rounded-md'>
                    <StackPlus size={32} /> Add New
                </Link>
                <Link to={"/seller/orders"} className='flex gap-2 p-2 px-6 hover:bg-blue-100 cursor-pointer transition-all rounded-md'>
                    <ShoppingBagOpen size={32} /> My Orders
                </Link>
                <div className='w-full border' />
                <Link
                    onClick={LogoutHandler}
                    className='flex gap-2 p-2 px-6 hover:bg-blue-100 cursor-pointer transition-all rounded-md'>
                    <SignOut size={32} /> Sign Out
                </Link>
            </div>
        </>
    )
}

export default SellerSidebar