import React, { useEffect, useState } from 'react'
import useProduct from '../store/product';
import useConstant from '../store/constant';
import useSeller from '../store/seller';
import ProductCard from '../components/ProductCard';

const SellerProducts = () => {
    const [loading, setLoading] = useState(true);
    const products = useProduct(s => s.products);
    const setProducts = useProduct(s => s.setProduct);
    const baseURL = useConstant(s => s.backendURL);
    const sid = useSeller(s => s.user._id);
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
    };
    useEffect(() => {
        fetchProduct();
    }, [])

    if (loading) return <p className='font-thin text-xl'>Loading...</p>
    if (products.length == 0) return (
        <div className='flex items-center justify-center h-full flex-col'>
            <h1 className='text-3xl m-4 text-gray-600'>No Products avilable !</h1>
            <div className='w-[30%]'>
                <img src="/empty_cart.svg" />
            </div>

        </div>
    )
    return (
        <>
            <div className='w-full h-fit grid grid-cols-4 gap-4 p-10'>

                {
                    products.filter(e => e.sid == sid).map((e, i) => (
                        <div key={e._id}>
                            <ProductCard product={e} mode={true} />
                        </div>
                    ))

                }
            </div>
        </>
    )
}

export default SellerProducts