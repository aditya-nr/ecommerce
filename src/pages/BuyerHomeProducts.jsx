import React from 'react'
import useProduct from '../store/product'
import ProductCard from '../components/ProductCard';
import { Toaster } from 'react-hot-toast';

const BuyerHomeProducts = () => {
    const products = useProduct(s => s.products);
    return (
        <>
            <Toaster />
            <div className='w-full h-fit grid grid-cols-4 gap-4 p-10 '>

                {
                    products.map(e => <div key={e._id}><ProductCard product={e} /></div>)
                }


            </div>
        </>
    )
}

export default BuyerHomeProducts