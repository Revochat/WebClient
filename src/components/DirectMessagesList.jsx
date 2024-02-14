import { RevochatContext } from '@/context/context';
import React, { useContext, useState } from 'react';
import { FaChevronDown, FaChevronRight  } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import AddFriend from './AddFriend';

const DirectMessagesList = ({ messages }) => {
    
    const { currentUser, selectedChannel, setSelectedChannel } = useContext(RevochatContext);
    const [show, setShow] = useState(true)
    const [openAddFriend, setOpenAddFriend] = useState(false)

    const lastMessage = 'this is the last message: bzae'
    const randomNumber = Math.floor(Math.random() * 10)

    return (
        <div className='rounded-xl bg-primary text-white'>
            <div className='flex gap-2 items-center p-4'>
                {!show ? <FaChevronRight onClick={() => setShow(true)} className='cursor-pointer' /> : <FaChevronDown onClick={() => setShow(false)} className='cursor-pointer' />}
                <h1>Direct Messages</h1>
            </div>
            <div className='mt-2'>
                <div className='flex items-center cursor-pointer px-4 hover:bg-[#1E78D0]' onClick={() => setOpenAddFriend(true)}>
                    <GoPlus size={30} className='cursor-pointer' />
                    <span className='ml-2' >Add a friend</span>
                </div>
               <div className='px-4'>{openAddFriend && <AddFriend setOpenAddFriend={setOpenAddFriend} />}</div> 
                <div className='mt-2'>
                    {show && messages?.map((message) => (
                        <div key={message.channel_id}>
                            {message?.members?.filter(member => member.user_id != currentUser.user_id).map((member) => (
                                <div key={member.user_id} className='flex justify-between items-center cursor-pointer hover:bg-[#1E78D0] rounded-md px-6 py-2'>
                                    <div className='flex items-center gap-3'>
                                        <div className='relative w-10 h-10'>
                                            <img src='https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector.png' alt={member.username} className='w-full h-full rounded-full object-cover' />
                                            <div className='absolute right-[2px] bottom-[2px] bg-green-500 w-[10px] h-[10px] rounded-full'></div>
                                        </div>
                                        <div className='flex flex-col gap-1'>
                                            <div>{member.username}</div>
                                            <div className='text-xs italic text-gray-200'> {lastMessage.length <= 26? lastMessage : lastMessage.slice(0, 26) + '...'} </div>
                                        </div>
                                    </div>
                                    <div className='rounded-full bg-orange-500 items-center flex justify-center w-[22px] h-[22px]'>
                                       <span className='font-semibold'> {randomNumber} </span> 
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                </div>
        </div>
    );
}

export default DirectMessagesList;