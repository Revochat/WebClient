'use client';
import React, { useContext, useRef } from 'react';
import Messages from './Messages';
import { RevochatContext } from '@/context/context';
import { VideoPlayer } from './VideoPlayer';

const Channel = () => {

    const { selectedChannel } = useContext(RevochatContext);

    return (
        <div className='w-full h-full flex flex-col'>
            <div className='w-full h-16 bg-gray-500 flex items-center p-4 text-2xl font-bold'>
                <h1># {selectedChannel?.channel_name}</h1>
            </div>
            <div className='h-full bg-red-200 overflow-hidden'>
                {/* <Messages /> */}
                <VideoPlayer />

            </div>
        </div>
    );
}

export default Channel;
