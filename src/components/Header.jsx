import { MagnifyingGlass, ShoppingBagOpen, ShoppingCart, SignOut, Storefront, UserCircle } from '@phosphor-icons/react'
import React from 'react'
import Logo from './Logo'
import { Link } from 'react-router-dom'
import useBuyer from '../store/buyer'

const Header = () => {
    const isLogin = useBuyer(s => s.isLogin);
    const logout = useBuyer(s => s.logout);

    const LogoutHandler = () => {
        logout();
        navigate('/login');
    }
    return (
        <>
            <div className='w-full bg-white'>
                <div className='w-[95%] mx-auto bg-white text-black flex justify-between items-center gap-3 py-4 px-2 text-lg'>
                    {/* logo */}
                    <Logo className={"text-xl mr-4"} />
                    {/* search */}
                    <div className='flex-1 p-3 flex items-center bg-slate-100 rounded-md gap-1'>
                        <MagnifyingGlass size={32} className='text-gray-500' />
                        <input type="text" className='w-full h-full bg-slate-100 text-lg outline-none text-gray-500' placeholder='Search for Products' />
                    </div>
                    {/* menu */}
                    <div className='flex gap-3'>
                        {!isLogin ?
                            <Link to={'/login'} className='flex gap-1 p-2 rounded-md hover:text-white hover:bg-blue-500  cursor-pointer'>
                                <UserCircle size={32} /> Login
                            </Link>
                            : <>
                                <Link to={"/orders"} className='flex gap-1 p-2 rounded-md hover:text-white hover:bg-blue-500  cursor-pointer'>
                                    <ShoppingBagOpen size={32} /> My Orders
                                </Link>
                                <Link to={"/cart"} className='flex gap-1 p-2 rounded-md  cursor-pointer'>
                                    <ShoppingCart size={32} /> Cart
                                </Link>
                                <Link
                                    onClick={LogoutHandler}
                                    className='flex gap-2 p-2 px-6 hover:bg-blue-100 cursor-pointer transition-all rounded-md'>
                                    <SignOut size={32} /> Sign Out
                                </Link>
                            </>
                        }

                        <Link to={'/seller'} className='flex gap-1 p-2 rounded-md cursor-pointer  hover:drop-shadow '>
                            <Storefront size={32} /> Seller
                        </Link>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Header