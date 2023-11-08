'use client';
import Link from 'next/link';
import React, { useEffect } from 'react';
import revochatLogo from '../../assets/images/revochat_logo.png'
import { useRouter } from 'next/navigation';

const HomeNavBar = () => {

    const router = useRouter();

    useEffect(() => {
        // Check if router is ready before accessing its properties
        if (router.isReady) {
          // Access the query property when the router is ready
          const { type } = router.query;
          console.log(type);
        }
      }, [router.isReady]);


    const handleLoginClick = () => {
        router.push('/auth/login', { type: 'login'});
      };
    
      const handleRegisterClick = () => {
        router.push('/auth/register',  { type: 'register'});
      };

    return (
        <nav className='h-20 text-lg text-white font-semibold w-full items-center flex justify-between px-16'>
            <div className='flex gap-3 items-center cursor-pointer'>
                <img src={revochatLogo.src} alt="" className='h-16 w-16 '/>
                <span>Revochat</span>
            </div>

            <div className='flex items-center gap-12'>
                <span className='cursor-pointer'>FAQ</span>
                <span className='cursor-pointer'>Github</span>
                <span className='cursor-pointer'>Support</span>
                <div className='flex gap-4'>
                    <span className='rounded-md bg-[#3e4bc3] py-2 px-3 cursor-pointer' onClick={handleLoginClick}>Login</span>
                    <span className='rounded-md bg-[#2238FF] py-2 px-3 cursor-pointer' onClick={handleRegisterClick}>Register</span>
                </div>
            </div>
        </nav>
    );
}

export default HomeNavBar;
