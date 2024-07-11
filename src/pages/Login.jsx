import { Eye, EyeClosed, Key, User } from '@phosphor-icons/react'
import React, { useState } from 'react'
import Logo from '../components/Logo'
import { Link, useNavigate } from 'react-router-dom'
import useConstant from '../store/constant';
import toast, { Toaster } from 'react-hot-toast';
import useBuyer from '../store/buyer';

const Login = () => {
    const backendURL = useConstant(state => state.backendURL);
    const setLogin = useBuyer(s => s.login);
    const navigate = useNavigate();
    const [view, setView] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginHandler = async () => {
        try {
            const dataToSend = { email, password };
            console.log(dataToSend);
            const url = backendURL + '/login';
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
                setLogin(res.jwt, res.user);
                navigate('/');
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
                {/* Side */}
                <div className='text-gray-700 w-[40%] bg-blue-100 p-10 relative'>
                    <h1 className='text-3xl font-semibold my-4'>Login</h1>
                    <p className='text-lg my-4'>Get access to your Orders, Wishlist and Recommendations</p>
                    <img src="/with_bag.svg" alt="JustBuy" className='absolute bottom-0 left-0 ' />
                </div>
                {/* Login Page */}
                <div className='flex-1 flex flex-col justify-center items-center '>
                    <Logo className={"mb-10 text-2xl"} />
                    <div className='flex flex-col gap-4 w-[70%]'>
                        {/* fields */}
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
                        <div onClick={loginHandler}
                            className='text-center py-3 text-lg bg-black text-white font-semibold rounded-md cursor-pointer w-full hover:bg-gray-200 border border-black hover:text-black transition-all'>
                            Login
                        </div>
                    </div>
                    {/* footer */}
                    <div className='mt-2'>
                        Don't have seller account? <Link to={'/register'} className='font-semibold text-blue-500 cursor-pointer'>Create One</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login