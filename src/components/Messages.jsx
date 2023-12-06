'use client';
import React, { useContext, useEffect, useState } from 'react';
import { messagesData } from '@/data/messages.data';
import InputMessage from './utils/InputMessage';
import { RevochatContext } from '@/context/context';

const Messages = () => {

    const { revochatClient } = useContext(RevochatContext);
    const [messages, setMessages] = useState([]);
    
    const userID = 1;

    useEffect(() => {
        revochatClient.channel.get({channel_id: "DM_lux_thomas", limit: 50})
        revochatClient.on('channel.get', (channel) => {
            console.log('channel: ', channel)
            setMessages(channel.messages)
        })
    }, [])

    useEffect(() => {
        revochatClient.on('message.send', (message) => {
            setMessages([...messages, message])
        })
        console.log(messages)
    }, [messages])

    const getChannels = async () => {
        revochatClient.channel.get({channel_id: "DM_lux_thomas", limit: 50})
        revochatClient.on('channel.get', (channel) => {
            console.log('channel: ', channel)
            setMessages(channel.messages)
        })
    }
   



    return (
        <div className='w-3/4 h-full bg-blue-600'>
            <div className='flex flex-col py-6 gap-6 overflow-y-auto max-h-[90%] p-6'>
                {messages?.map((message, index) => (
                    <div key={message.message_id} className={`w-full flex ${message.user_id == userID ? 'justify-start': 'justify-end'} `}>
                        {message.user_id == userID ? 
                            <div className='flex w-3/4 bg-violet-800 py-1 px-2 rounded-md'>
                                <img 
                                    className='w-12 h-12 rounded-full object-cover' 
                                    src="https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png" alt="" 
                                />
                                <div className='flex flex-col gap-1 mt-2 ml-2'>
                                    <div className='text-lg font-bold flex gap-4 items-end'> Username <span className='text-sm italic font-light '>{message.created_at} </span> </div>
                                    <p className='text-lg'>{message.message} </p>
                                </div>
                            </div>
                            :
                            <div className='flex justify-end w-3/4 bg-pink-800 py-1 px-2 rounded-md'>
                                <div className='flex flex-col gap-1 mt-2 mr-2'>
                                    <div className='text-lg font-bold flex gap-4 items-end'> <span className='text-sm italic font-light'>{message.created_at} </span> Username  </div>
                                    <p className='text-lg text-end'>{message.message} </p>
                                </div>
                                <img 
                                    className='w-12 h-12 rounded-full object-cover' 
                                    src="https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png" alt="" 
                                />
                            </div>
                        }
                    </div>
                ))}
            </div>

            <div className='w-full mt-4 relative items-center'>
                <InputMessage />
            </div>
        </div>
    );
}

export default Messages;
