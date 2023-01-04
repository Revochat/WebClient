import React from 'react';
import SideBar from '../public/components/SideBar'
import ChatPage from './ChatPage'
import NavBar from '../public/components/NavBar';
import FriendsList from '../public/components/FriendsList';
import Wallet from '../public/components/Wallet';
import ChatsList from '../public/components/ChatsList';
import { Divider } from '@mui/material'
import Messages from '../public/components/Messages';



const AppPage = () => {
    return (
        <div className='flex-wrap '>
           <div >
                <SideBar/>
            </div>

           <div className='bg-cyan-700 ml-14 absolute pl-2 h-full w-60'>
            <ChatsList/>
            {/* <Divider orientation='vertical' /> */}

            <span className='absolute bottom-2 ml-6 py-1 border rounded-full border-purple-500 flex max-w-full'>
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                        width="30" height="30"
                        viewBox="0 0 48 48">
                        <path fill="#7880e7" d="M11,24L25,2l14,22l-14,8L11,24z"></path><path fill="#5c64c7" d="M25,2l14,22l-14,8V2z"></path><path fill="#7880e7" d="M11,27l14,8l14-8L25,46L11,27z"></path><path fill="#5c64c7" d="M25,35l14-8L25,46V35z M11,24l14-6l14,6l-14,8L11,24z"></path><path fill="#2a3192" d="M25,18l14,6l-14,8V18z"></path>
                    </svg>
                </span>
            
            <Wallet />
            </span>
           </div> 
           <div className='bg-cyan-600 ml-72 left-2 absolute  h-full ' style={{width: '80%'}} >
                {/* <FriendsList /> */}
                <Messages/>

            </div> 
           {/* <ChatPage/> */}
        </div>
    );
}

export default AppPage;
