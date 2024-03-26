'use client';
import React, { useEffect } from 'react';
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

    return (
        <nav className='h-20 text-lg text-white font-semibold w-full items-center flex justify-between px-16'>
            <div className='flex gap-3 items-center cursor-pointer'>
                <img src="/logo.svg" alt="revoLogo" className='h-10 w-10'/>
                <span>Revochat</span>
            </div>

            <div className='flex items-center gap-12'>
                <span className='cursor-pointer hover:border-b hover:border-orange-400'>FAQ</span>
                <span className='cursor-pointer hover:border-b hover:border-orange-400'>Github</span>
                <span className='cursor-pointer hover:border-b hover:border-orange-400'>Support</span>
                <div className='flex gap-4 text-sm'>
                    <button className='rounded-full bg-gradient-to-tr from-[#3e4bc3] to-pink-400 py-[6px] px-3 cursor-pointer hover:scale-105 transition-all' onClick={() => router.push('/auth/login')}>Login</button>
                    <button className='rounded-full bg-gradient-to-tr from-[#2238FF] to-pink-400 py-[6px] px-3 cursor-pointer hover:scale-105 transition-all' onClick={() => router.push('/auth/register')}>Register</button>
                </div>
            </div>
        </nav>
    );
}

export default HomeNavBar;
