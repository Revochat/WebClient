import { RevochatContext } from '@/context/context';
import React, { useContext, useState } from 'react';

import { IoMicSharp, IoMicOffSharp } from "react-icons/io5";
import { HiOutlineSpeakerWave, HiOutlineSpeakerXMark } from "react-icons/hi2";
import { IoIosSettings } from "react-icons/io";
import Avatar from './shared/Avatar';

const ProfilHeader = () => {

    const { currentUser } = useContext(RevochatContext);

    const [isMuted, setIsMuted] = useState(false)
    const [isDeafened, setIsDeafened] = useState(false)


    return (
        <div className='w-full h-14'>
            <div className='w-[92%] p-2 flex justify-between rounded-md hover:shadow-lg transition'>
                <div className='flex items-center gap-3'>
                    <Avatar user={currentUser} className='w-10 h-10' />
                    <div className='flex flex-col text-left gap-1 text-white'>
                        <h2 className='font-bold first-letter:uppercase'> {currentUser?.username || 'Digital Nomad'} </h2>
                        <span className='text-xs first-letter:uppercase'> {currentUser?.status || 'Offline'} </span>
                    </div>
                </div>
                <div className='flex gap-3 text-white items-start mt-2'>
                    {isMuted ? <IoMicOffSharp className='cursor-pointer' size={22} onClick={() => setIsMuted(false)} /> : <IoMicSharp className='cursor-pointer' size={22} onClick={() => setIsMuted(true)} />}
                    {isDeafened ? <HiOutlineSpeakerXMark className='cursor-pointer' size={22} onClick={() => setIsDeafened(false)} /> : <HiOutlineSpeakerWave className='cursor-pointer' size={22} onClick={() => setIsDeafened(true)} />}
                    <IoIosSettings className='cursor-pointer' size={22} />
                </div>
            </div>
        </div>
    );
}

export default ProfilHeader;
