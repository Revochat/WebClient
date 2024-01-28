'use client';
import React, { useContext } from 'react';
import AddFriend from '../AddFriend';
import AddChannel from '../AddChannel';
import { RevochatContext } from '@/context/context';

const MenuBar = () => {

    const { currentUser, selectedChannel, setSelectedChannel } = useContext(RevochatContext);

    return (
        <div className='h-full w-full bg-blue-200'>
            <h1>MenuBar</h1>

        <div className='mt-10 items-center w-full flex justify-center'>
            <AddFriend />
        </div>
        {/* <div className='mt-10 items-center w-full flex justify-center'>
            <AddChannel />
        </div> */}


        <div className='mt-8 p-4'>
            Channels:
            <div>
                {currentUser?.channels?.map((channel, index) => (
                <div key={channel.channel_id} onClick={() => setSelectedChannel(channel)} className={`cursor-pointer font-bold ${selectedChannel?.channel_id == channel?.channel_id? 'text-red-500': ''}`}>
                    {channel?.channel_name}
                </div>
                ))}
            </div>
        </div>

        </div>
    );
}

export default MenuBar;
