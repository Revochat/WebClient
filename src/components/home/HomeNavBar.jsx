'use client';
import Link from 'next/link';
import React from 'react';
import revochatLogo from '../../assets/images/revochat_logo.png'

const HomeNavBar = () => {
    return (
        <nav className='h-20 text-lg text-white font-semibold w-full items-center flex justify-between px-10'>
            <div className='flex gap-3 items-center cursor-pointer'>
                <img src={revochatLogo.src} alt="" className='h-16 w-16 '/>
                <span>Revochat</span>
            </div>

            <div>
                <span className='mx-4 cursor-pointer'>FAQ</span>
                <span className='mx-4 cursor-pointer'>Github</span>
                <span className='mx-4 cursor-pointer'>Support</span>
                <span className='rounded-md bg-[#2238FF] py-2 px-3 cursor-pointer'>Register</span>
            </div>
        </nav>
    );
}

export default HomeNavBar;
