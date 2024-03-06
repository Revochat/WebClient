'use client';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { messagesData } from '@/data/messages.data';
import InputMessage from './utils/InputMessage';
import { RevochatContext } from '@/context/context';
import EventList from '@/context/EventList';

const Messages = () => {

    const { revochatClient, currentUser, selectedChannel, revoLogin } = useContext(RevochatContext);
    const ref = useRef(null);
    const [messages, setMessages] = useState([]);
    const [load, setLoad] = useState(true);
    const [client, setClient] = useState(null)

    useEffect(() => {
        revochatClient.on(EventList.User.Connect, () => {
            setClient(revochatClient)
        })
    }, [revoLogin])
    
    useEffect(() => {
        if(!selectedChannel?.channel_id || !revoLogin || !client) return;
        console.log('channel.get')

            client.channel.get({channel_id: selectedChannel?.channel_id, limit: 25})
            
            client.on(EventList.Channel.Get, (channel) => {
                console.log('channel Messages: ', channel.messages)
                setMessages(channel.messages)
                setLoad(false)
        })

    }, [selectedChannel?.channel_id, currentUser, client])

    useEffect(() => {
        console.log('message.get')
        if(!client) return;

        client.on(EventList.Message.Send, (message) => {
            console.log('message: ', message)
            setMessages(prevMessages => [...prevMessages, message.message])
            
        })
    }, [client]); 

    useEffect(() => {
        // Scroll to the last message when messages change
        if (ref?.current) {
            ref.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
    }, [messages]);



    return (
        <div className='w-full h-full relative'>
            <div className='flex flex-col py-6 gap-6 overflow-y-auto max-h-[90%] p-6'>
                {messages?.map((message) => (
                    <Message key={`${message.message_id}`} message={message} />
                ))}
                <div ref={ref} />
            </div>

            <div className='w-full mt-4 items-center absolute bottom-4'>
                <InputMessage />
            </div>
        </div>
    );
}

const Message = ({ message }) => {

    const { currentUser } = useContext(RevochatContext);

    return (
        <div className={`w-full flex ${message?.user?.user_id == currentUser?.user_id ? 'justify-start': 'justify-end'}`}  >
            {message.user?.user_id == currentUser?.user_id ? 
                <div className='flex w-3/4 bg-violet-800 py-1 px-2 rounded-md'>
                    <img 
                        className='w-12 h-12 rounded-full object-cover' 
                        src="https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png" alt="" 
                    />
                    <div className='flex flex-col gap-1 mt-2 ml-2'>
                        <div className='text-lg font-bold flex gap-4 items-end'> {message?.user?.username} <span className='text-sm italic font-light '>{message.created_at} </span> </div>
                        <p className='text-lg'>{message.message} </p>
                    </div>
                </div>
                :
                <div className='flex justify-end w-3/4 bg-pink-800 py-1 px-2 rounded-md'>
                    <div className='flex flex-col gap-1 mt-2 mr-2'>
                        <div className='text-lg font-bold flex gap-4 items-end'> <span className='text-sm italic font-light'>{message.created_at} </span> {message?.user?.username}  </div>
                        <p className='text-lg text-end'>{message.message} </p>
                    </div>
                    <img 
                        className='w-12 h-12 rounded-full object-cover' 
                        src="https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png" alt="" 
                    />
                </div>
            }
        </div>
    )
}

export default Messages;
