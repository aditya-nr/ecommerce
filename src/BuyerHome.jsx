import React, { useEffect, useState } from 'react'
import Header from './components/Header'
import { Outlet } from 'react-router-dom'
import useProduct from './store/product';
import useConstant from './store/constant';
import toast from 'react-hot-toast';

const BuyerHome = () => {
    const [loading, setLoading] = useState(true);
    const setProducts = useProduct(s => s.setProduct);
    const baseURL = useConstant(s => s.backendURL);
    const fetchProduct = async () => {
        try {
            const url = baseURL + "/all-products";
            let data = await fetch(url);
            data = await data.json();
            if (data.status == "OK") {
                console.log(data.data);
                setProducts(data.data);
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong !");
        }
    }
    useEffect(() => {
        fetchProduct();
    }, [])

    if (loading) return <p className='font-thin text-2xl'>Loading...</p>
    return (
        <>
            <div className='w-full bg-slate-100 h-screen'>
                <Header />
                <Outlet />
            </div>
        </>
    )
}

export default BuyerHome