'use client';
import React, { useContext, useEffect, useState } from 'react';
import Messages from './Messages';
import { RevochatContext } from '@/context/context';
import ChannelHeader from '@/components/shared/ChannelHeader';
import { getChannel } from '@/apis/sockets/getChannel';
import { toast } from './ui/use-toast';
import { cn } from '@/lib/utils';
// import { VideoPlayer } from './VideoPlayer';

const Channel = () => {

    const { selectedChannel } = useContext(RevochatContext);
    const [channelMessages, setChannelMessages] = useState([])

    useEffect(() => {
        if(!selectedChannel.channel_id) return;
        getMessages()
    }, [selectedChannel])


    const getMessages = async () => {
        try {
            const token = localStorage.getItem("token");
            const messages = await getChannel(token, selectedChannel.channel_id);
            setChannelMessages(messages)
        } catch (error) {
            console.log(error)
            toast({
                className: cn(
                    'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4'
                ),
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: JSON.stringify(error),
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
