import React, { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { Context } from '../../pages/Context';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';


const SideBar = () => {

    const [Auth, setAuth] = useContext(Context);
    const [body, setBody] = useState();
    const [darkMode, setDarkMode] = useState()


    useEffect(() => {
        setBody(document.querySelector('body'));
    }, []);

    const toggleDarkMode = () => {
        body.classList.toggle("dark");
        setDarkMode(!darkMode)

     
    }

    const Logout = () => {
        setAuth(false);
    }
    return (
        <div className="sidebar">
            <IconButton  onClick={toggleDarkMode} color="inherit">
                {darkMode? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
            <button type='button'><ion-icon name="home-outline"></ion-icon></button>
            <button type='button'><ion-icon name="people-outline"></ion-icon></button>
            <button type='button'><ion-icon name="person-add-outline"></ion-icon></button>


            <button className='btn_logout' type='button' onClick={Logout} ><ion-icon name="log-out-outline"></ion-icon></button>

            
            
        </div>
    );
}

export default SideBar;
