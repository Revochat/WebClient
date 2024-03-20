'use client';
import React, { useContext, useEffect, useState } from 'react';
import Messages from './Messages';
import { RevochatContext } from '@/context/context';
import ChannelHeader from '@/components/shared/ChannelHeader';
import { getChannel } from '@/apis/sockets/getChannel';
import { toast } from './ui/use-toast';
// import { VideoPlayer } from './VideoPlayer';

const Channel = () => {

    const { selectedChannel } = useContext(RevochatContext);
    const [channelMessages, setChannelMessages] = useState([])

    useEffect(() => {
        if(!selectedChannel) return;
        getMessages()
    }, [selectedChannel])


    const getMessages = async () => {
        try {
            const token = localStorage.getItem("token");
            const messages = await getChannel(token, selectedChannel.channel_id);
            setChannelMessages(messages)
        } catch (error) {
            toast({
                title: 'Error',
                message: error.message,
                type: 'error'
            })
        }

    }
   
    return (
        <div className='w-full h-full bg-[#1E1E1E]'>
            <div className='px-10 flex flex-col w-full h-full'>
                <ChannelHeader />
                <div className='h-full overflow-hidden'>
                    <Messages channelMessages={channelMessages}  />
                    {/* <VideoPlayer /> */}
                </div>
            </div>
        </div>
    );
}

export default Channel;
