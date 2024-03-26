
"use client";
import React from 'react';
import HomeNavBar from './HomeNavBar';
import laptop from '../../assets/images/laptop.png'
import TypewriterComponent from "typewriter-effect";

const HomePage = () => {
    return (
        <div className="h-screen w-screen overflow-hidden" style={{background: 'linear-gradient(121.07deg, #1E266C -3.48%, #01003D 101.18%)'}}>
            <HomeNavBar/>
           <div className='flex justify-evenly px-10 flex-col md:flex-row text-center md:text-left items-center mt-10'>
            <div className='text-white max-w-[50%] text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-8 font-extrabold'>
                <h2>Discover A New Way To Chat</h2>
                <div className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-orange-400 py-4">
                    <TypewriterComponent 
                        options={{
                            strings: [
                                "Live Messages.",
                                "Security.",
                                "Easy to handle.",
                                "Plugins.",
                            ],
                            autoStart: true,
                            loop: true,
                        }}
                    />
                </div>
            </div>
            <img src={laptop.src} alt="" width='50%' height='auto' />
           </div>
        </div>
    );
}

export default HomePage;
