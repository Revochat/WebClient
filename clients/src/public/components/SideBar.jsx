import React, { useEffect } from 'react';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import LogoutIcon from '@mui/icons-material/Logout';
import ServerList from './ServerList';


const SideBar = () => {

    // const [Auth, setAuth] = useContext(Context);
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
        // setAuth(false);
    }
    return (
        <div className="sidebar bg-cyan-900">
            <div >
                <ServerList/>
            </div>
            <div className='absolute bottom-0 ml-1'>
            <IconButton  onClick={toggleDarkMode} color="inherit">
                {darkMode? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
            <IconButton color="inherit">
                <LogoutIcon> </LogoutIcon>
            </IconButton>
            {/* <button className='btn_logout' type='button' onClick={Logout} ><ion-icon name="log-out-outline"></ion-icon></button> */}
            </div>
            
            
        </div>
    );
}

export default SideBar;
