import { RevochatContext } from '@/context/context';
import React, { useContext, useState } from 'react';

import { IoMicSharp, IoMicOffSharp } from "react-icons/io5";
import { HiOutlineSpeakerWave, HiOutlineSpeakerXMark } from "react-icons/hi2";
import { IoIosSettings } from "react-icons/io";

const ProfilHeader = () => {

    const { currentUser } = useContext(RevochatContext);

    const [isMuted, setIsMuted] = useState(false)
    const [isDeafened, setIsDeafened] = useState(false)

    const colorStatus = () => {
        switch (currentUser?.status) {
            case 'online':
                return 'bg-green-500'
            case 'offline':
                return 'bg-red-500'
            case 'busy':
                return 'bg-yellow-500'
            default:
                return 'bg-red-500'
        }
    }

    return (
        <div className='w-[90%] h-14 flex justify-between'>
            <div className='flex items-center gap-3'>
                <div className='relative w-10 h-10'>
                    <img className='w-full h-full rounded-full object-cover' src='https://png.pngtree.com/png-vector/20220807/ourmid/pngtree-man-avatar-wearing-gray-suit-png-image_6102786.png' alt="avatar" />
                    <div className={`absolute bottom-[2px] right-[2px] rounded-full w-2 h-2 ${colorStatus()}`}></div>
                </div>
                <div className='flex flex-col text-left gap-1 text-white'>
                    <h2 className='font-bold first-letter:uppercase'> {currentUser?.username || 'Digital Nomad'} </h2>
                    <span className='text-xs'> {currentUser?.status || 'Offline'} </span>
                </div>
            </div>
            <div className='flex gap-3 text-white items-start mt-2'>
                {isMuted ? <IoMicOffSharp className='cursor-pointer' size={22} onClick={() => setIsMuted(false)} /> : <IoMicSharp className='cursor-pointer' size={22} onClick={() => setIsMuted(true)} />}
                {isDeafened ? <HiOutlineSpeakerXMark className='cursor-pointer' size={22} onClick={() => setIsDeafened(false)} /> : <HiOutlineSpeakerWave className='cursor-pointer' size={22} onClick={() => setIsDeafened(true)} />}
                <IoIosSettings className='cursor-pointer' size={22} />
            </div>
        </div>
    );
}

export default ProfilHeader;
