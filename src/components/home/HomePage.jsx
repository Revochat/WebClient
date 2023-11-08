
import React from 'react';
import HomeNavBar from './HomeNavBar';
import laptop from '../../assets/images/laptop.png'

const HomePage = () => {
    return (
        <div className="h-screen w-screen overflow-hidden" style={{background: 'linear-gradient(121.07deg, #1E266C -3.48%, #01003D 101.18%)'}}>
            <HomeNavBar/>
           <div className='flex justify-evenly px-10 flex-col md:flex-row text-center md:text-left items-center mt-10'>
            <div className='text-white max-w-[50%]'>
                <h2 className='text-7xl font-bold'>Discover a new way to chat</h2>
                <p className='italic mt-2 font-bold opacity-80'>The best way to chat with your friends and community securely</p>
            </div>
            <img src={laptop.src} alt="" width='50%' height='auto' />
           </div>
        </div>
    );
}

export default HomePage;
