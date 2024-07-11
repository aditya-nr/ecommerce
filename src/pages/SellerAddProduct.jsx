import { CurrencyInr } from '@phosphor-icons/react';
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import useSeller from '../store/seller';
import useConstant from '../store/constant';
import { useNavigate } from 'react-router-dom';

const SellerAddProduct = () => {
    const sid = useSeller(s => s.user._id);
    const backendURL = useConstant(s => s.backendURL);
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [catergory, setCatergory] = useState("");
    const [cost, setCost] = useState("");
    const [discount, setDiscount] = useState("");
    const [size, setSize] = useState("");
    const [material, setMaterial] = useState("");
    const [gender, setGender] = useState("");
    const [tags, setTags] = useState("");
    const [image, setImg] = useState("");

    const addProduct = async () => {
        if (!name || !image || !cost || !catergory || !material || !gender || !tags || !discount) {
            toast.error("Data insufficient");
            return;
        }
        try {
            const dataToSend = { name, desc, catergory, cost, discount, size, material, gender, tags, image, sid };
            console.log(dataToSend);
            const url = backendURL + '/add-product';
            let res = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dataToSend)
            });
            res = await res.json();
            console.log(res);
            if (res.status == "OK") {
                toast.success(res.message);
                navigate('/seller/products')
            } else {
                toast.error(res.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong !");
        }
    }

    return (
        <>
            <Toaster />
            <div className='w-full flex items-center justify-center'>
                <div className='flex flex-col gap-3 w-fit'>
                    {/* name */}
                    <input value={name} onChange={e => setName(e.target.value)}
                        type="text" placeholder='Product Name'
                        className='outline-none w-full h-full text-lg border border-black rounded-md p-3'
                    />
                    {/* desc */}
                    <textarea value={desc} onChange={e => setDesc(e.target.value)}
                        className='outline-none w-full h-full text-lg border border-black rounded-md p-3' placeholder='Product Description' />
                    {/* catergory */}
                    <div className='flex flex-col'>
                        <label htmlFor="options" className='text-lg'>Product Category :</label>
                        <select id="options"
                            className='outline-none w-full h-full text-lg border border-black rounded-md p-3'
                            value={catergory} onChange={e => setCatergory(e.target.value)}>
                            <option value="">Select an option</option>
                            <option value="pant">Pant</option>
                            <option value="shirt">Shirt</option>
                            <option value="saree">Saree</option>
                            <option value="kurti">Kurti</option>
                            <option value="jacket">Jacket</option>
                            <option value="coat">Coat</option>
                            <option value="dress">Dress</option>
                            <option value="skirt">Skirt</option>
                            <option value="shorts">Shorts</option>
                            <option value="t-shirt">T-Shirt</option>
                        </select>
                    </div>

                    <div className='flex gap-2'>
                        {/* price */}
                        <div className=' w-full h-full text-lg border border-black rounded-md flex gap-2 bg-white items-center p-3'>
                            <CurrencyInr size={32} />
                            <input value={cost} onChange={e => setCost(e.target.value)}
                                type="number" placeholder='Cost'
                                className='outline-none w-full h-full' />
                        </div>
                        {/* Discount */}
                        <div className=' w-full h-full text-lg border border-black rounded-md flex gap-2 bg-white items-center p-3'>
                            <CurrencyInr size={32} />
                            <input value={discount} onChange={e => setDiscount(e.target.value)}
                                type="number" placeholder='Discount'
                                className='outline-none w-full h-full' />
                        </div>
                    </div>
                    {/* Material */}
                    <div className='flex flex-col'>
                        <label htmlFor="options" className='text-lg'>Material :</label>
                        <select id="options"
                            className='outline-none w-full h-full text-lg border border-black rounded-md p-3'
                            value={material} onChange={e => setMaterial(e.target.value)}>
                            <option value="">Select an option</option>
                            <option value="cotton">Cotton</option>
                            <option value="linen">Linen</option>
                            <option value="silk">Silk</option>
                            <option value="wool">Wool</option>
                            <option value="polyester">Polyester</option>
                            <option value="nylon">Nylon</option>
                        </select>
                    </div>
                    {/* Size */}
                    <div className='flex flex-col'>
                        <label htmlFor="options" className='text-lg'>Size :</label>
                        <select id="options"
                            className='outline-none w-full h-full text-lg border border-black rounded-md p-3'
                            value={size} onChange={e => setSize(e.target.value)}>
                            <option value="">Select an option</option>
                            <option value="XS">XS</option>
                            <option value="S">S</option>
                            <option value="M">M</option>
                            <option value="L">L</option>
                            <option value="XL">XL</option>
                            <option value="XXL">XXL</option>
                        </select>
                    </div>
                    {/* Gender */}
                    <div className='flex flex-col'>
                        <label htmlFor="options" className='text-lg'>Gender :</label>
                        <select id="options"
                            className='outline-none w-full h-full text-lg border border-black rounded-md p-3'
                            value={gender} onChange={e => setGender(e.target.value)}>
                            <option value="">Select Gender</option>
                            <option value="option1">Male</option>
                            <option value="option2">Female</option>
                        </select>
                    </div>
                    {/* Tags */}
                    <input value={tags} onChange={e => setTags(e.target.value)}
                        type="text" placeholder='#Tags'
                        className='outline-none w-full h-full text-lg border border-black rounded-md p-3'
                    />
                    {/* Image */}
                    <input value={image} onChange={e => setImg(e.target.value)}
                        type="text" placeholder='Product Image Link'
                        className='outline-none w-full h-full text-lg border border-black rounded-md p-3'
                    />
                    {/* Submit */}
                    <div onClick={addProduct}
                        className='text-center py-3 text-lg bg-black text-white font-semibold rounded-md cursor-pointer w-full hover:bg-gray-200 border border-black hover:text-black transition-all'>Submit</div>
                </div>
            </div>
        </>
    )
}

export default SellerAddProduct