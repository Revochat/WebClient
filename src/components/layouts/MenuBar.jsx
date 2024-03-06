'use client';
import React, { useContext, useEffect } from 'react';
import AddFriend from '../AddFriend';
import AddChannel from '../AddChannel';
import { RevochatContext } from '@/context/context';
import FriendsList from '../FriendsList';
import FriendsRequest from '../FriendsRequest';
import ProfilHeader from '../ProfilHeader';
import DirectMessagesList from '../DirectMessagesList';

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
        <div className='h-full w-[360px] bg-[#282525] p-4'>
            <ProfilHeader />
            <div className='mt-6'>
               <DirectMessagesList messages={currentUser.channels} />
            </div>
       

        <div className='p-4 bg-primary rounded-xl mt-8'>
            <FriendsList />
            <FriendsRequest />
        </div>

        </div>
    );
}

export default MenuBar;
