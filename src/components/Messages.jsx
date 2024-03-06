'use client';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { messagesData } from '@/data/messages.data';
import InputMessage from './utils/InputMessage';
import { RevochatContext } from '@/context/context';
import EventList from '@/context/EventList';
import Avatar from './shared/Avatar';

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
            <div className='flex flex-col overflow-y-auto max-h-[90%] p-6'>
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
        <>
            {message.user?.user_id == currentUser?.user_id 
            ?
            <div className='flex w-full justify-end'>
                <div className='flex flex-col'>
                    <div className='flex items-center justify-end gap-3'>
                        <p className='text-white -mt-1 capitalize'> {message.user.username} </p>
                        <Avatar className="w-10 h-10" />
                    </div>
                    <div className='mr-14 bg-primary rounded-md rounded-tr-none w-fit'>
                        <div className='w-fit py-1 px-2 text-sm'>
                            <p> {message.message} </p>
                        </div>
                    </div>
                    <span className='mr-14 mt-1 italic text-xs text-white'> {message.createdAt.slice(11,19)} </span>
                </div>
            </div>

            :
            <div className='flex w-full justify-start'>
                <div className='flex flex-col'>
                    <div className='flex items-center gap-3'>
                        <Avatar className="w-10 h-10" />
                        <p className='text-white -mt-1 capitalize'> {message.user.username} </p>
                    </div>
                    <div className='ml-14 bg-[#F2F7FB] rounded-md rounded-tl-none w-fit'>
                        <div className='w-fit py-1 px-2 text-sm'>
                            <p> {message.message} </p>
                        </div>
                    </div>
                    <span className='ml-14 mt-1 italic text-xs text-white'> {message.createdAt.slice(11,19)} </span>
                </div>
            </div>
        }
        </>
        // <div className={`w-full flex ${message?.user?.user_id == currentUser?.user_id ? 'justify-end': 'justify-start'}`}  >
        //     {message.user?.user_id == currentUser?.user_id ? 
        //         <div className='flex w-3/4 bg-primary py-1 px-2 rounded-md'>
        //             <img 
        //                 className='w-12 h-12 rounded-full object-cover' 
        //                 src="https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png" alt="" 
        //             />
        //             <div className='flex flex-col gap-1 mt-2 ml-2'>
        //                 <div className='text-lg font-bold flex gap-4 items-end'> {message?.user?.username} <span className='text-sm italic font-light '>{message.created_at} </span> </div>
        //                 <p className='text-lg'>{message.message} </p>
        //             </div>
        //         </div>
        //         :
        //         <div className='flex justify-end w-3/4 bg-[#F2F7FB] py-1 px-2 rounded-md'>
        //             <div className='flex flex-col gap-1 mt-2 mr-2'>
        //                 <div className='text-lg font-bold flex gap-4 items-end'> <span className='text-sm italic font-light'>{message.created_at} </span> {message?.user?.username}  </div>
        //                 <p className='text-lg text-end'>{message.message} </p>
        //             </div>
        //             <img 
        //                 className='w-12 h-12 rounded-full object-cover' 
        //                 src="https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png" alt="" 
        //             />
        //         </div>
        //     }
        // </div>
    )
}

export default Messages;
