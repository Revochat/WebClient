import { RevochatContext } from '@/context/context';
import React, { useContext, useEffect, useState } from 'react';

import { IoMicSharp, IoMicOffSharp } from "react-icons/io5";
import { HiOutlineSpeakerWave, HiOutlineSpeakerXMark } from "react-icons/hi2";
import { IoIosSettings } from "react-icons/io";
import Avatar from './shared/Avatar';

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
  } from "@/components/ui/dialog"
import { setAvatar } from '@/apis/sockets/avatar';

const ProfilHeader = () => {

    const { currentUser, setCurrentUser } = useContext(RevochatContext);

    const [isMuted, setIsMuted] = useState(false)
    const [isDeafened, setIsDeafened] = useState(false)

    const [newAvatar, setNewAvatar] = useState(null)


    const saveAvatar = async () => {
        console.log("Save Avatar")
        const token = localStorage.getItem("token");

         await setAvatar(token, newAvatar, (link) => {

            //set currentUSer avatar
            setCurrentUser({...currentUser, avatar: link})

        });
        
        
    }


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
                    <Dialog>
                        <DialogTrigger asChild>
                            <IoIosSettings className='cursor-pointer' size={22} />
                        </DialogTrigger>
                        <DialogContent className="text-white bg-primary">
                            <DialogHeader>
                                <DialogTitle>Avatar</DialogTitle>
                            </DialogHeader>
                            <DialogDescription>
                               <div className='flex flex-col items-center justify-center gap-4'>
                                    <Input id="picture" type="file" onChange={(e) => setNewAvatar(e.target.files[0])} />
                                    <img 
                                        src={newAvatar ? URL.createObjectURL(newAvatar) : currentUser.avatar}
                                        alt="avatar"
                                        className="rounded-full object-cover h-40 w-40"
                                        width={200}
                                        height={200}
                                    />
                               </div>
                            </DialogDescription>
                            <DialogFooter className="sm:justify-start">
                                <DialogClose asChild>
                                    <div className='flex items-center w-full justify-between'>
                                        <Button type="button" variant="secondary" onClick={() => setNewAvatar(null)}>
                                            Cancel
                                        </Button>
                                        <Button type="button" variant="success" onClick={saveAvatar}>
                                            Save
                                        </Button>
                                    </div>
                                </DialogClose>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </div>
    );
}

export default ProfilHeader;
