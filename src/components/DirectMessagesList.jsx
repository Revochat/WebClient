import { RevochatContext } from '@/context/context';
import React, { useContext, useState } from 'react';
import { FaChevronDown, FaChevronRight  } from "react-icons/fa";
import { cn } from '@/lib/utils';
import Avatar from './shared/Avatar';

const DirectMessagesList = ({ channels }) => {
    
    const { currentUser, selectedChannel, setSelectedChannel } = useContext(RevochatContext);
    const [show, setShow] = useState(true)

    return (
        <div className='rounded-xl bg-[#033255] text-white'>
            <div className='flex gap-2 items-center p-4 cursor-pointer' onClick={() => setShow(!show)}>
                {!show ? <FaChevronRight size={18} /> : <FaChevronDown size={18} />}
                <h1 className='font-semibold '>Direct Messages</h1>
            </div>
                <div className='pb-2'>
                    {show && channels?.length === 0 && <div className='text-left ml-8 text-zinc-400'>No direct messages yet.</div>}
                    {show && channels?.map((channel) => (
                       <DirectMessageItem key={channel.channel_id} channel={channel} setSelectedChannel={setSelectedChannel} selectedChannel={selectedChannel} currentUser={currentUser} />
                    ))}
                </div>
        </div>
        
    );
}


const DirectMessageItem = ({ channel, setSelectedChannel, selectedChannel, currentUser }) => {

    const randomNumber = Math.floor(Math.random() * 10)

    const handleSelectChannel = () => {
        setSelectedChannel(channel)
        localStorage.setItem('selectedChannel', JSON.stringify(channel))
    }
    
    return (
        <div>
        {channel?.members?.filter(member => member.user_id != currentUser.user_id).map((member) => (
            <div key={member.user_id} className={cn('flex justify-between items-center cursor-pointer hover:bg-[#89b3dd] hover:bg-opacity-50 rounded-md px-6 py-2', 
            selectedChannel?.channel_id === channel.channel_id && 'bg-[#1E78D0]')} 
            onClick={handleSelectChannel}>
                <div className='flex items-center gap-3'>
                   <Avatar user={member} className='w-8 h-8'/> 
                    <div className='flex flex-col gap-1'>
                        <div className='capitalize'>{member.username}</div>
                        {channel.lastMessage && <div className='text-xs italic text-gray-200'> {channel.lastMessage.message.length <= 26? channel.lastMessage.message : channel.lastMessage.message.slice(0, 26) + '...'  } </div>}
                        
                    </div>
                </div>
                <div className='rounded-full bg-orange-500 items-center flex justify-center w-[22px] h-[22px]'>
                   <span className='font-semibold'> {randomNumber} </span> 
                </div>
            </div>
        ))}
    </div>
    );
}

export default DirectMessagesList;
