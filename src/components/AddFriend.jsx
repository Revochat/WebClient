'use client';
import { addFriend } from '@/apis/sockets/addFriend';
import EventList from '@/context/EventList';
import { RevochatContext } from '@/context/context';
import React, { useContext, useEffect, useState } from 'react';
import { BsFillSendPlusFill } from "react-icons/bs";
import { toast } from './ui/use-toast';
import { cn } from '@/lib/utils';


const AddFriend = ({ setOpenAddFriend }) => {

    const { revochatClient, revoLogin } = useContext(RevochatContext);
   
    const [username, setUsername] = useState("");
    const [client, setClient] = useState(null)

       

    useEffect(() => {
        console.log('addFriend()')
        if(!client) return;

        client.on(EventList.User.AddFriend, (result) => {
            console.log('add.friend: ', result)
            if (result.error) {
                console.error("Error:", result.error)
                alert(result.error)
                return;
            };
            setFriendID("")
            setOpenAddFriend(false)
        })
    }, [client]); 


    const handleChange = (e) => {
        setUsername(e.target.value);
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            Add()
        }
    }

    const Add = async () => {
        console.log('add friend ...')
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
        <div className='flex gap-2 items-center '>
            <input onKeyDown={handleKeyDown} type="text" className='rounded-md outline-none px-2 py-1 h-fit text-black' value={username} placeholder="Username" onChange={handleChange} />
            <button onClick={Add} > <BsFillSendPlusFill className='hover:text-primary hover:scale-110 transition-all' size={26} /> </button>
        </div>
    );
}

export default AddFriend;
