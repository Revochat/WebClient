import React from 'react';

const Footer = () => {
    return (
        <div >
            <footer className='flex justify-evenly text-xl mt-8 fixed bottom-0 bg-slate-400 h-28 items-center w-full'>
                <p> All rights reserved 2022 &copy; </p>
                <ul>
                    <li><a href="#"> Terms & conditions </a></li>
                </ul>
                <ul>
                    <li><a href="#"> About us </a></li>
                </ul>
                <ul>
                    <li><a href="#"> Contact </a></li>
                </ul>
                <ul>
                    <li><a href="#"> Developpers </a></li>
                </ul>
            </footer>
            
        </div>
    );
}

export default Footer;
