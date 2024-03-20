import { removeFriend } from '@/apis/sockets/friends';
import EventList from '@/context/EventList';
import { RevochatContext } from '@/context/context';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from './ui/use-toast';
import { cn } from '@/lib/utils';

const FriendsList = () => {

    const { currentUser } = useContext(RevochatContext);
    const [client, setClient] = useState(null)

    const handleRemoveFriend = async (friend) => {
        try{
            const token = localStorage.getItem("token")
            console.log("try to remove friend: ", friend);
            await removeFriend(token, friend.username, (result) => {

                toast({
                    className: cn(
                        'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4'
                    ),
                    variant: "success",
                    title: "Friend removed successfully!",
                    description: `Friend ${friend.username} has been removed from your friends list.`,
                  })

                  window.location.reload()
            })
        }
        catch(error){
            console.log('error: ', error)
            toast({
                className: cn(
                    'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4'
                ),
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: JSON.stringify(error),
              })
        }
    };

    return (
        <div>
            <h1 className='font-bold'>FriendsList:</h1>
            <div>
                {currentUser?.friends?.map((friend, index) => (
                <div key={`${friend}-${index}`}>
                  <div className='flex gap-3'> 
                  <span className='font-bold'>- {friend.username}</span>
                  <span className='text-red-500 cursor-pointer' onClick={()=> handleRemoveFriend(friend)}>remove</span>
                  </div> 
                </div>
                ))}
            </div>
        </div>
    );
}

export default FriendsList;
