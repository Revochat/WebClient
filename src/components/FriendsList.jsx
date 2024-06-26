import { getFriends, getNewFriend, removeFriend } from '@/apis/sockets/friends';
import EventList from '@/context/EventList';
import { RevochatContext } from '@/context/context';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from './ui/use-toast';
import { cn } from '@/lib/utils';
import Avatar from './shared/Avatar';
import { FcFullTrash } from "react-icons/fc";
import AddFriend from './AddFriend';
import { GoChevronRight, GoChevronDown } from "react-icons/go";

const FriendsList = () => {

    const { currentUser, friends, setFriends } = useContext(RevochatContext);
    const [loading, setLoading] = useState(true);
    // const [friends, setFriends] = useState([]);
    const [menu, setMenu] = useState(true);

    useEffect(() => {
        if(!currentUser) return;
        getFriendsList();
        getFriends(currentUser.token, (friends) => {
            setFriends(friends)
            setLoading(false)
        })
        getNewFriends();
    }, [currentUser])

    const getFriendsList = async () => {
        try {
            const token = localStorage.getItem("token")
            await getFriends(token, (friends) => {
                setFriends(friends)
            })
        } catch (error) {
            console.log(error)
        }
    }

    const getNewFriends = async () => {
        const token = localStorage.getItem("token")
        await getNewFriend(token, (request) => {
            setFriends([...friends, request.user])
            console.log('getNewFriends: ', friends)
        })
    }

    const numberOfFriends = friends.length;

    return (
        <div className='mt-2 text-zinc-200 w-full'>
            <div className='flex justify-center'>
                <AddFriend />
            </div>
            <div className='mt-4'>
                <div className='font-bold flex items-center justify-between px-3 cursor-pointer' onClick={() => setMenu(!menu)}>
                    <div className='flex items-center gap-1'>
                        {menu ? <GoChevronDown size={20} /> : <GoChevronRight size={20} />}
                        <span>Friends</span>  
                    </div>
                    <div className='rounded-full h-5 items-center min-w-[20px] w-fit flex justify-center bg-red-500 px-1 text-sm text-center'> {numberOfFriends} </div> 
                </div>
                {menu && (
                <div className='px-2 max-h-40 overflow-auto scroll-thin'>
                    {friends.length === 0 && <div className='text-zinc-400'>No friends yet</div>}
                    <div className='flex flex-col gap-3 mt-2 py-2 px-4'>
                        {friends?.map((friend) => (
                            <Item key={friend.user_id} friend={friend} setFriends={setFriends} />
                        ))}
                    </div>
                </div>
                )}
            </div>
        </div>
    );
}

const Item = ({ friend, setFriends }) => {

    const handleRemoveFriend = async (friend) => {
        try{
            const token = localStorage.getItem("token")
            await removeFriend(token, friend.username, (result) => {
                toast({
                    className: cn(
                        'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4'
                    ),
                    variant: "success",
                    title: "Friend removed successfully!",
                    description: `Friend ${friend.username} has been removed from your friends list.`,
                  })
                setFriends((prev) => prev.filter((f) => f.user_id !== friend.user_id))
            })
        }
        catch(error){
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
        <div className='flex w-full justify-between items-center cursor-pointer'>
            <div className='flex gap-2 items-center'>
                <Avatar user={friend} className='w-8 h-8' />
                <div className='flex flex-col'>
                    <div className='capitalize font-semibold'>{friend.username}</div>
                    <div className='text-xs italic text-zinc-400'>{friend.status}</div>
                </div>
            </div>

            <div>
                <FcFullTrash size={22} className='cursor-pointer' onClick={() => handleRemoveFriend(friend)} />
            </div>
        </div>
    );
};

export default FriendsList;
