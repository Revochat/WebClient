'use client';
import React, { useContext, useEffect, useState } from 'react';
import { RevochatContext } from '@/context/context';
import FriendsList from '../FriendsList';
import FriendsRequest from '../FriendsRequest';
import ProfilHeader from '../ProfilHeader';
import DirectMessagesList from '../DirectMessagesList';
import { getChannels } from '@/apis/sockets/channels';

const MenuBar = () => {

    const { currentUser } = useContext(RevochatContext);
    const [channels, setChannels] = useState([])

    useEffect(() => {
        if(!currentUser) return;
        GetUserChannels()
    }, [currentUser])

    const GetUserChannels = async () => {
        try {
            const token = localStorage.getItem("token")
            await getChannels(token, (channels) => {
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
       

        <div className='p-2 bg-[#033255] rounded-xl mt-8'>
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
