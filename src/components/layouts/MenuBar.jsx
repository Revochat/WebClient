'use client';
import React, { useContext, useEffect } from 'react';
import AddFriend from '../AddFriend';
import AddChannel from '../AddChannel';
import { RevochatContext } from '@/context/context';
import FriendsList from '../FriendsList';
import FriendsRequest from '../FriendsRequest';
import ProfilHeader from '../ProfilHeader';

const MenuBar = () => {

    const { currentUser, selectedChannel, setSelectedChannel } = useContext(RevochatContext);

    useEffect(() => {
        if(!JSON.parse(localStorage.getItem("selectedChannel"))) return;
        else setSelectedChannel(JSON.parse(localStorage.getItem("selectedChannel")))
    }, [])

    const handleSelectedChannel = (channel) => {
        setSelectedChannel(channel)
        localStorage.setItem("selectedChannel", JSON.stringify(channel))
    }

    return (
        <div className='h-full w-[360px] bg-[#D9D9D9] p-4'>
            <ProfilHeader />
        <div className='mt-10 items-center w-full flex justify-center'>
            <AddFriend />
        </div>
        {/* <div className='mt-10 items-center w-full flex justify-center'>
            <AddChannel />
        </div> */}
        <div className='mt-8 p-4'>
           <span className='font-bold'>Channels:</span> 
            <div>
                {currentUser?.channels?.map((channel, index) => (
                <div key={channel.channel_id} onClick={()=>handleSelectedChannel(channel)} className={`cursor-pointer font-bold  ${selectedChannel?.channel_id == channel?.channel_id? 'text-red-500': ''}`}>
                    {channel?.channel_name}
                </div>
                ))}
            </div>
        </div>

        <div className='p-4'>
            <FriendsList />
            <FriendsRequest />
            
        </div>

        </div>
    );
}

export default MenuBar;
