'use client';
import React, { useContext, useEffect, useState } from 'react';
import AddFriend from '../AddFriend';
import AddChannel from '../AddChannel';
import { RevochatContext } from '@/context/context';
import FriendsList from '../FriendsList';
import FriendsRequest from '../FriendsRequest';
import ProfilHeader from '../ProfilHeader';
import DirectMessagesList from '../DirectMessagesList';
import { getUser } from '@/apis/sockets/users';
import { getChannel, getChannels } from '@/apis/sockets/channels';
import { sendMessage } from '@/apis/sockets/messages';

const MenuBar = () => {

    const { currentUser, selectedChannel, setSelectedChannel } = useContext(RevochatContext);
    const [channels, setChannels] = useState([])

    useEffect(() => {
        if(!currentUser) return;
        GetUserChannels()
    }, [currentUser])


    const handleSelectedChannel = (channel) => {
        setSelectedChannel(channel)
        localStorage.setItem("selectedChannel", JSON.stringify(channel))
    }

    const GetUserChannels = async () => {
        try {
            const token = localStorage.getItem("token")
            await getChannels(token, (channels) => {
                console.log(channels)
                setChannels(channels)
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='h-full w-[360px] bg-[#282525] p-4'>
            <ProfilHeader />
            <div className='mt-6'>
               <DirectMessagesList channels={channels} />
            </div>
       

        <div className='p-4 bg-primary rounded-xl mt-8'>
            <FriendsList />
            <FriendsRequest />
        </div>

        <div className='flex flex-col gap-2'>
            {/* <button className='bg-red-500 text-white rounded-md py-1 px-2 mt-8' onClick={() => getUser()}>
                getUser()
            </button> */}
           
        </div>

        </div>
    );
}

export default MenuBar;
