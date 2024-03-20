'use client';
import { addFriend } from '@/apis/sockets/friends';
import EventList from '@/context/EventList';
import { RevochatContext } from '@/context/context';
import React, { useContext, useEffect, useState } from 'react';
import { BsFillSendPlusFill } from "react-icons/bs";
import { toast } from './ui/use-toast';
import { cn } from '@/lib/utils';


const AddFriend = () => {

    const [username, setUsername] = useState("");

    const handleChange = (e) => {
        setUsername(e.target.value);
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            Add()
        }
    }

    const Add = async () => {
        console.log('Add friend')
       try{
            const token = localStorage.getItem('token')
            await addFriend(token, username, (user) => {
                console.log('user: ', user)
                if(user.error) {
                    console.log('error: ', user.error)
                    toast({
                        className: cn(
                            'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4'
                        ),
                        variant: "destructive",
                        title: "Uh oh! Something went wrong.",
                        description: user.error,
                    })
                    return;
                }
                toast({
                    className: cn(
                        'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4'
                    ),
                    duration: 4000,
                    variant: "success",
                    title: "You have send a friend request to " + username,
                    type: 'success',
                })
                setUsername("")
            });
            
       }
       catch(err){
           console.log('error: ', err)
           toast({
            className: cn(
                'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4'
            ),
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: err.message,
          })
       }
    }

    
    return (

        <div className='flex relative justify-between p-2 rounded-md w-fit bg-[#1e1f22] mt-2 self-center'>
            <input 
                onKeyDown={handleKeyDown} 
                type="text" 
                className='border-none outline-none bg-transparent placeholder:text-zinc-500 pl-1' 
                value={username} 
                placeholder="Username" 
                onChange={handleChange} 
            />
            <div>
                <button 
                    disabled={username.length === 0} 
                    onClick={Add} 
                    className={cn('px-2 py-1 rounded-md bg-blue-600', username.length === 0 ? 'cursor-not-allowed opacity-40': 'cursor-pointer hover:bg-opacity-60')} 
                    > Send 
                </button>
            </div>
        </div>
    );
}

export default AddFriend;
