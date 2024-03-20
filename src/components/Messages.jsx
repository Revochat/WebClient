'use client';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { messagesData } from '@/data/messages.data';
import InputMessage from './utils/InputMessage';
import { RevochatContext } from '@/context/context';
import EventList from '@/context/EventList';
import Avatar from './shared/Avatar';
import { receiveMessages } from '@/apis/sockets/messages';


const Messages = ({ channelMessages }) => {

    const { revochatClient, selectedChannel } = useContext(RevochatContext);
    const ref = useRef(null);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if(!channelMessages) return;
        setMessages(channelMessages);
    }, [channelMessages]);

    useEffect(() => {
        // Call receiveMessages function when the component mounts
        const token = localStorage.getItem("token");
            receiveMessages(token, (message) => {
                // Update the messages state with the new message
                setMessages(prevMessages => [...prevMessages, message.message]);
            });
    }, []);

    useEffect(() => {
        // Scroll to the last message when messages change
        if (ref?.current) {
            ref.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
    }, [messages]);

    return (
        <div className='w-full h-full relative'>
            <div className='flex flex-col overflow-y-auto max-h-[90%] scrollbar-hidden p-6'>
                {messages?.map((message) => (
                    <Message key={`${message.message_id}`} message={message} />
                ))}
                <div ref={ref} />
            </div>

            <div className='w-full mt-4 items-center absolute bottom-8'>
                <InputMessage />
            </div>
        </div>
    );
}

const Message = ({ message }) => {

    const { currentUser } = useContext(RevochatContext);

    return (
        <>
            {message.user?.user_id == currentUser?.user_id 
            ?
            <div className='flex w-full justify-end'>
                <div className='flex flex-col'>
                    <div className='flex items-center justify-end gap-3'>
                        <p className='text-white -mt-1 capitalize'> {message.user.username} </p>
                        <Avatar user={message.user} className="w-10 h-10" />
                    </div>
                    <div className='mr-14 bg-primary rounded-md rounded-tr-none w-fit'>
                        <div className='w-fit py-1 px-2 text-sm'>
                            <p> {message.message} </p>
                        </div>
                    </div>
                    <span className='text-end mr-14 mt-1 italic text-xs text-zinc-400'> {message.createdAt.slice(11,19)} </span>
                </div>
            </div>

            :
            <div className='flex w-full justify-start'>
                <div className='flex flex-col'>
                    <div className='flex items-center gap-3'>
                        <Avatar user={message.user} className="w-10 h-10" />
                        <p className='text-white -mt-1 capitalize'> {message.user.username} </p>
                    </div>
                    <div className='ml-14 bg-[#F2F7FB] rounded-md rounded-tl-none w-fit'>
                        <div className='w-fit py-1 px-2 text-sm'>
                            <p> {message.message} </p>
                        </div>
                    </div>
                    <span className='ml-14 mt-1 italic text-xs text-zinc-400'> {message.createdAt.slice(11,19)} </span>
                </div>
            </div>
        }
        </>
    )
}

export default Messages;
