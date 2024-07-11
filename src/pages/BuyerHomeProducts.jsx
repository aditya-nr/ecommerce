import React, { useState } from 'react'
import useProduct from '../store/product'
import ProductCard from '../components/ProductCard';
import { Toaster } from 'react-hot-toast';

const BuyerHomeProducts = () => {
    const products = useProduct(s => s.products);

    const [selectedCategories, setSelectedCategories] = useState([]);
    const categories = ["Pant", "Shirt", "Saree", "Kurti", "Jacket", "Coat", "Dress", "Skirt", "Shorts", "T-Shirt"];

    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setSelectedCategories([...selectedCategories, value]);
        } else {
            setSelectedCategories(selectedCategories.filter(category => category !== value));
        }
    };

    const [selectedSize, setSelectedSize] = useState([]);
    const sizes = ["XS", "S", "M", "L", "XL", "XLL"];

    const handleSizeFilter = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setSelectedSize([...selectedSize, value]);
        } else {
            setSelectedSize(selectedSize.filter(size => size !== value));
        }
    };

    return (
        <>
            <Toaster />
            <div className='flex h-full'>
                {/* filter */}
                <div className='h-full w-[15%] bg-white drop-shadow-md'>
                    {/* Size */}
                    <div className='p-3'>
                        <label className='font-semibold text-gray-600'>Size</label>
                        <div className=''>
                            {sizes.map(size => (
                                <label key={size} className='flex items-center m-2'>
                                    <input
                                        type="checkbox"
                                        value={size.toLowerCase()}
                                        checked={selectedSize.includes(size.toLowerCase())}
                                        onChange={handleSizeFilter}
                                        className='mr-2'
                                    />
                                    {size}
                                </label>
                            ))}
                        </div>
                    </div>
                    {/* product */}
                    <div className='p-3'>
                        <label className='font-semibold text-gray-600'>Category</label>
                        <div className=''>
                            {categories.map(category => (
                                <label key={category} className='flex items-center m-2'>
                                    <input
                                        type="checkbox"
                                        value={category.toLowerCase()}
                                        checked={selectedCategories.includes(category.toLowerCase())}
                                        onChange={handleCheckboxChange}
                                        className='mr-2'
                                    />
                                    {category}
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
                {/* products */}
                <div className='w-full h-fit grid grid-cols-4 gap-4 p-10 '>
                    {
                        products
                            .filter(e => {
                                if (selectedSize.length == 0) return true;
                                if (selectedSize.includes(e.size.toLowerCase())) return true;
                                else return false;
                            })
                            .filter(e => {
                                if (selectedCategories.length == 0) return true;
                                if (selectedCategories.includes(e.catergory.toLowerCase())) return true;
                                else return false;
                            })
                            .map(e => <div key={e._id}><ProductCard product={e} /></div>)
                    }
                </div>
            </div>
        </>
    )
}

export default BuyerHomeProducts