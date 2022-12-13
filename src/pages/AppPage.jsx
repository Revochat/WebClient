import React from 'react';
import SideBar from '../public/components/SideBar'
import ChatPage from '../public/components/ChatPage'
import NavBar from '../public/components/NavBar';
import FriendsList from '../public/components/FriendsList';
import Wallet from '../public/components/Wallet';
import ChatsList from '../public/components/ChatsList';


const AppPage = () => {
    return (
        <div className='w-full'>
           <div >
                <SideBar/>
            </div>
           <div className=' ml-16 absolute left-2 h-full w-56'>
            <ChatsList/>
            <span className='absolute bottom-2 py-1 border rounded-full border-purple-500 flex max-w-full'>
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
           <div className='bg-neutral-700 absolute ml-72 left-2 h-full overflow-hidden' style={{width: '82.6%'}}>
                <FriendsList />
            </div> 
           {/* <ChatPage/> */}
        </div>
    );
}

export default AppPage;
