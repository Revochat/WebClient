import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import logo from '../assets/img/logo.png'
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';


const NavBar = () => {
    
    const [body, setBody] = useState();
    const [darkMode, setDarkMode] = useState()

    useEffect(() => {
        setBody(document.querySelector('body'));
    }, []);

    const toggleDarkMode = () => {
        body.classList.toggle("dark");
        setDarkMode(!darkMode)
     
    }

    
    return (
        <nav>
            <div>
                <Link href='/'>
                <div className='logo'>
                    <img src={logo.src} alt="" />
                     Revochat
                </div>
                </Link>
                {/* <input className='search' type="text" placeholder='Search' /> */}
            </div>
            <div>

            <IconButton size='small' sx={{ ml: 1 }} onClick={toggleDarkMode} color="inherit">
                {darkMode? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
                

                <span>Guide</span>
                <span>Version</span>
                <span>FAQ</span>
                
                
            </div>
        </nav>
    );
}

export default NavBar;
