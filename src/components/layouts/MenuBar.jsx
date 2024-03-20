'use client';
import React, { useContext, useEffect } from 'react';
import AddFriend from '../AddFriend';
import AddChannel from '../AddChannel';
import { RevochatContext } from '@/context/context';
import FriendsList from '../FriendsList';
import FriendsRequest from '../FriendsRequest';
import ProfilHeader from '../ProfilHeader';
import DirectMessagesList from '../DirectMessagesList';
import { getUser } from '@/apis/sockets/getUser';
import { getChannel } from '@/apis/sockets/getChannel';
import { sendMessage } from '@/apis/sockets/sendMessage';

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

        <div className='flex flex-col gap-2'>
            <button className='bg-red-500 text-white rounded-md py-1 px-2 mt-8' onClick={() => getUser()}>
                getUser()
            </button>
            <button className='bg-green-500 text-white rounded-md py-1 px-2 mt-8' onClick={() => getChannel()}>
                getChannel()
            </button>
            <button className='bg-green-500 text-white rounded-md py-1 px-2 mt-8' onClick={() => sendMessage("Thomas send a message")}>
                sendMessage()
            </button>
        </div>

        </div>
    );
}

export default MenuBar;
