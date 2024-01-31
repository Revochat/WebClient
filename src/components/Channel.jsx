'use client';
import React, { useContext, useEffect, useState } from 'react';
import Messages from './Messages';
import { RevochatContext } from '@/context/context';
import EventList from '@/context/EventList';

const Channel = () => {

    const { revochatClient, selectedChannel, revoLogin } = useContext(RevochatContext);
    const [client, setClient] = useState(null)

    useEffect(() => {
        revochatClient.on(EventList.User.Connect, () => {
            setClient(revochatClient)
        })
    }, [revoLogin])


    return (
        <div className='w-full h-full flex flex-col'>
            <div className='w-full h-16 bg-gray-500 flex items-center p-4 text-2xl font-bold'>
                <h1># {selectedChannel?.channel_name || 'Pas de channel'}</h1>
            </div>
            <div className='h-full bg-red-200 overflow-hidden'>
                <Messages />
            </div>
        </div>
    );
}

export default Channel;
