import { RevochatContext } from '@/context/context';
import React, { useContext, useState } from 'react';
import { FaChevronDown, FaChevronRight  } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import AddFriend from './AddFriend';

const DirectMessagesList = ({ channels }) => {
    
    const { currentUser, selectedChannel, setSelectedChannel } = useContext(RevochatContext);
    const [show, setShow] = useState(true)
    const [openAddFriend, setOpenAddFriend] = useState(false)

    return (
        <div className='rounded-xl bg-[#033255] text-white'>
            <div className='flex gap-2 items-center p-4 cursor-pointer' onClick={() => setShow(!show)}>
                {!show ? <FaChevronRight size={18} /> : <FaChevronDown size={18} />}
                <h1 className='font-semibold '>Direct Messages</h1>
            </div>
            <div className='mt-2'>
                <div className='flex items-center gap-2 cursor-pointer px-4 hover:bg-[#1E78D0]' onClick={() => setOpenAddFriend(!openAddFriend)}>
                    <GoPlus size={30} className='cursor-pointer' />
                    <span className='' >Add a friend</span>
                </div>
               <div className='px-4'>{openAddFriend && <AddFriend setOpenAddFriend={setOpenAddFriend} />}</div> 
                <div className='mt-2 py-2'>
                    {show && channels?.length === 0 && <div className='text-left ml-8 text-zinc-400'>No direct messages yet.</div>}
                    {show && channels?.map((channel) => (
                       <DirectMessageItem key={channel.channel_id} channel={channel} setSelectedChannel={setSelectedChannel} currentUser={currentUser} />
                    ))}
                </div>
                </div>
        </div>
    );
}


const DirectMessageItem = ({ channel, setSelectedChannel, currentUser }) => {

    const lastMessage = 'this is the last message .'
    const randomNumber = Math.floor(Math.random() * 10)
    
    return (
        <div>
        {channel?.members?.filter(member => member.user_id != currentUser.user_id).map((member) => (
            <div key={member.user_id} className='flex justify-between items-center cursor-pointer hover:bg-[#1E78D0] rounded-md px-6 py-2' onClick={() => setSelectedChannel(channel)}>
                <div className='flex items-center gap-3'>
                    <div className='relative w-10 h-10'>
                        <img src='https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector.png' alt={member.username} className='w-full h-full rounded-full object-cover' />
                        <div className='absolute right-[2px] bottom-[2px] bg-green-500 w-[10px] h-[10px] rounded-full'></div>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <div>{member.username}</div>
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
