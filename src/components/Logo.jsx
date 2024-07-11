import React from 'react'
import { Link } from 'react-router-dom'

const Logo = ({ className }) => {
    return (
        <Link to={'/'} className={`text-lg font-bold italic text-slate-400 ${className}`}>
            Just<span className='text-blue-400'>Buyy</span>
        </Link >
    )
}

export default Logo