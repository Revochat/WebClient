import EventList from '@/context/EventList';
import { RevochatContext } from '@/context/context';
import React, { useContext, useEffect, useState } from 'react';
import { PiPaperPlaneRightFill } from "react-icons/pi";
import Image from 'next/image';
import { sendMessage } from '@/apis/sockets/sendMessage';

const InputMessage = () => {
    
    const { revochatClient, revoLogin, selectedChannel } = useContext(RevochatContext);
    const [message, setMessage] = useState('');
    const [client, setClient] = useState(null)

    useEffect(() => {
        revochatClient.on(EventList.User.Connect, () => {
            setClient(revochatClient)
        })
    }, [revoLogin])

    

    const Send = async () => {
        if(!message) return;
        if(!selectedChannel?.channel_id) return alert('Pas de channel selectionné')

        try{
            const token = localStorage.getItem("token");
            const channel_id = selectedChannel.channel_id;
            await sendMessage(token, channel_id, message)
            setMessage('')
        }
        catch(err){
            console.log(err)
        }
    }

    const handleChange = (e) => {
        setMessage(e.target.value)
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            Send()
        }
    }

    const openAttachments = () => {}

    return (
        <div className='px-4 flex items-center gap-3 w-full'>
            <Image 
                src="/attachment.svg"
                alt="attachment"
                width={26}
                height={26}
                className='cursor-pointer hover:scale-105 transition'
                onClick={openAttachments}
            />
            <div className='relative items-center h-10 flex w-full'>
                <input className='w-full pl-6 py-2 px-2 rounded-xl outline-none' type="text" placeholder='Tapez le message...' value={message}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                />
                <Image 
                    src="/copy.svg"
                    alt="copy"
                    width={20}
                    height={20}
                    className='absolute right-3 cursor-pointer hover:scale-105 transition'
                    onClick={openAttachments}
                />
            </div>
            <PiPaperPlaneRightFill
                size={34}
                className='bg-primary rounded-full p-2 text-white hover:scale-105 transition cursor-pointer'
                onClick={Send}
             />
        </div>
    );
}

export default InputMessage;
