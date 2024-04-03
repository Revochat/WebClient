import EventList from '@/context/EventList';
import { RevochatContext } from '@/context/context';
import React, { useContext, useEffect, useState } from 'react';
import { PiPaperPlaneRightFill } from "react-icons/pi";
import Image from 'next/image';
import { sendMessage } from '@/apis/sockets/messages';
import { IoClose } from 'react-icons/io5';

const InputMessage = () => {
    
    const { revochatClient, revoLogin, selectedChannel } = useContext(RevochatContext);
    const [message, setMessage] = useState('');
    const [client, setClient] = useState(null)
    const [menuAttachment, setMenuAttachment] = useState(false)

    useEffect(() => {
        revochatClient.on(EventList.User.Connect, () => {
            setClient(revochatClient)
        })
    }, [revoLogin])

    useEffect(() => {
        setMenuAttachment(false)
    }, [selectedChannel])

    

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

    return (
        
        
        <div className='px-4 flex items-center gap-3 w-full relative'>
            {menuAttachment && <div className='absolute bottom-14 w-40 bg-primary rounded-sm p-2 text-white transition-all'>
                <div className='relative w-full h-full ml-1 pb-1'>
                    <span className='absolute top-0 right-0 cursor-pointer' onClick={()=> setMenuAttachment(false)}> <IoClose size={20} /> </span>
                    <div className='pt-4 flex flex-col gap-2'>
                        <div className='flex gap-3 items-center'>
                            <div className='bg-white rounded-full h6 w-6 flex justify-center items-center p-1'>
                                <Image
                                    src="/camera.svg"
                                    alt="camera"
                                    width={26}
                                    height={26}
                                    className='cursor-pointer hover:scale-105 transition'
                                />
                            </div>
                            <span>Camera</span>
                        </div>
                        <div className='flex gap-3 items-center'>
                            <div className='bg-white rounded-full h6 w-6 flex justify-center items-center p-1'>
                                <Image
                                    src="/doc.svg"
                                    alt="document"
                                    width={26}
                                    height={26}
                                    className='cursor-pointer hover:scale-105 transition'
                                />
                            </div>
                            <span>Documents</span>
                        </div>
                        <div className='flex gap-3 items-center'>
                            <div className='bg-white rounded-full h6 w-6 flex justify-center items-center p-1'>
                                <Image
                                    src="/media.svg"
                                    alt="media"
                                    width={26}
                                    height={26}
                                    className='cursor-pointer hover:scale-105 transition'
                                />
                            </div>
                            <span>Media</span>
                        </div>
                    </div>
                </div>
            </div>}
            <Image 
                src="/attachment.svg"
                alt="attachment"
                width={26}
                height={26}
                className='cursor-pointer hover:scale-105 transition'
                onClick={() => setMenuAttachment(!menuAttachment)}
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
                    onClick={() => setMenuAttachment(!menuAttachment)}
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
