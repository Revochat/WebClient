'use client';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { messagesData } from '@/data/messages.data';
import InputMessage from './utils/InputMessage';
import { RevochatContext } from '@/context/context';
import EventList from '@/context/EventList';
import Avatar from './shared/Avatar';
import { receiveMessages } from '@/apis/sockets/messages';


const Messages = ({ channelMessages }) => {

    const ref = useRef(null);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (!channelMessages) return;
    
        let formattedMessages = channelMessages.map((message) => {
            const formattedMessage = formattedData(message);
    
            return { ...message, message: formattedMessage };
        });
        setMessages(formattedMessages);
    }, [channelMessages]);
    

    useEffect(() => {
        // Call receiveMessages function when the component mounts
        const token = localStorage.getItem("token");
        receiveMessages(token, (data) => {
            const formattedMessage = formattedData(data.message);
            setMessages((prevMessages) => [...prevMessages, { ...data.message, message: formattedMessage }]);
        });
    }, []);

    const formattedData = (data) => {
        let formattedMessage = data.message;

        // Check if the message contains a URL ending with image extension
        const isImage = /\b(?:https?|ftp):\/\/[^\s/$.?#].[^\s]*\.(?:png|jpg|jpeg|gif|svg)\b/gi.test(data.message);
        // Check if the message contains a URL ending with file extension (pdf, txt, etc.)
        const isFile = /\b(?:https?|ftp):\/\/[^\s/$.?#].[^\s]*\.(?:pdf|txt|docx?|xlsx?|pptx?|zip|rar)\b/gi.test(data.message);

        if (isImage) {
            console.log("Is Image", isImage);
            // If it's an image link, replace it with an <img> tag
            formattedMessage = formattedMessage.replace(/\b((?:https?|ftp):\/\/[^\s/$.?#].[^\s]*\.(?:png|jpg|jpeg|gif|svg))\b/gi, '<img src="$1" alt="image" style="width: 200px;" />');
        } else if (isFile) {
            console.log("Is File", isFile);
            // If it's a file link, replace it with an <a> tag
            formattedMessage = formattedMessage.replace(/\b((?:https?|ftp):\/\/[^\s/$.?#].[^\s]*\.(?:pdf|txt|docx?|xlsx?|pptx?|zip|rar))\b/gi, '<a href="$1" style="color: orange" target="_blank" rel="noopener noreferrer">Download File</a>');
        }

        return formattedMessage;
    }


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
                        <div dangerouslySetInnerHTML={{ __html: message.message }}></div>
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
