import { Eye, EyeClosed, Key, Phone, User } from '@phosphor-icons/react'
import React, { useState } from 'react'
import Logo from '../components/Logo'
import { Link, useNavigate } from 'react-router-dom';
import useConstant from '../store/constant';
import toast, { Toaster } from 'react-hot-toast';

const Register = () => {
    const backendURL = useConstant(state => state.backendURL);
    const navigate = useNavigate();
    const [view, setView] = useState(false);
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSeller, setIsSeller] = useState(true);

    const register = async () => {
        try {
            const dataToSend = { fname, lname, email, password, isSeller };
            console.log(dataToSend);
            const url = backendURL + '/register';
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
                navigate('/login');
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
            <div className='flex w-[60%] mx-auto mt-10 h-[80vh] rounded-md bg-white drop-shadow-lg'>
                {/* side */}
                <div className='text-gray-700 w-[40%] bg-blue-100 p-10 relative'>
                    <h1 className='text-3xl font-semibold my-4'>Looks like you're new here!</h1>
                    <p className='text-lg my-4'>Sign up with your email to get started </p>
                    <img src="/with_bag.svg" alt="JustBuy" className='absolute bottom-0 left-0' />
                </div>
                {/* form */}
                <div className='flex-1 flex flex-col justify-center items-center '>
                    <Logo className={"mb-10 text-2xl"} />
                    {/* fields */}
                    <div className='flex flex-col gap-4 w-[70%]'>
                        <div className='flex gap-4'>
                            <input type="text" value={fname} onChange={e => setFname(e.target.value)}
                                className='outline-none w-full h-full text-lg border border-black rounded-md p-3' placeholder='First Name' />
                            <input type="text" value={lname} onChange={e => setLname(e.target.value)}
                                className='outline-none w-full h-full text-lg border border-black rounded-md p-3' placeholder='Last Name' />
                        </div>
                        <div className='flex gap-2 bg-white border rounded-md border-black items-center p-2'>
                            <Phone size={32} />
                            <input type="number" className='outline-none w-full h-full text-lg' placeholder='Phone' />
                        </div>
                        <div className='flex gap-2 bg-white border rounded-md border-black items-center p-2'>
                            <User size={32} />
                            <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                                className='outline-none w-full h-full text-lg' placeholder='Email' />
                        </div>

                        <div className='flex gap-2 bg-white border rounded-md border-black items-center p-2'>
                            <Key size={32} />
                            <input value={password} onChange={e => setPassword(e.target.value)}
                                type={view ? "text" : "password"} className='outline-none w-full h-full text-lg' placeholder='Password' />
                            {!view ? <EyeClosed size={32} onClick={() => setView(true)} /> : <Eye size={32} onClick={() => setView(false)} />}
                        </div>

                        {/* button */}
                        <div onClick={register}
                            className='text-center py-3 text-lg bg-black text-white font-semibold rounded-md cursor-pointer w-full hover:bg-gray-200 border border-black hover:text-black transition-all'>
                            Register
                        </div>
                    </div>
                    {/* footer */}
                    <div className='mt-2'>
                        Existing User? <Link to={'/login'} className='font-semibold text-blue-500 cursor-pointer'>Log in</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register