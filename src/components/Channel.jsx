'use client';
import React, { useContext, useEffect, useState } from 'react';
import Messages from './Messages';
import { RevochatContext } from '@/context/context';
import EventList from '@/context/EventList';
import ChannelHeader from '@/components/shared/ChannelHeader';
// import { VideoPlayer } from './VideoPlayer';

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
            <ChannelHeader />
            <div className='h-full bg-[#1E1E1E] overflow-hidden'>
                <Messages />
                {/* <VideoPlayer /> */}
            </div>
        </div>
    );
}

export default Channel;
