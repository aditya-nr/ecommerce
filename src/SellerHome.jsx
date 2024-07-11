import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import SellerSidebar from './components/SellerSidebar';
import useSeller from './store/seller';

const SellerHome = () => {
    const isLogin = useSeller(state => state.isLogin);
    const navigate = useNavigate();
    useEffect(() => {
        if (!isLogin) navigate('/seller-login')
        else navigate('/seller/products');
    }, [])
    return (
        <>
            <div className='h-screen w-full flex bg-slate-100'>
                <SellerSidebar />
                <div className="p-4 flex-1">
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default SellerHome