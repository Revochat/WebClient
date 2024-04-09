import { addFriend, getFriends, getFriendsRequestsReceived, listenGetFriendsRequestReceived, removeFriend } from '@/apis/sockets/friends';
import EventList from '@/context/EventList';
import { RevochatContext } from '@/context/context';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from './ui/use-toast';
import { cn } from '@/lib/utils';
import { FcCheckmark, FcCancel } from "react-icons/fc";
import Avatar from './shared/Avatar';
import { GoChevronDown, GoChevronRight } from 'react-icons/go';

const FriendsRequest = () => {

    const { currentUser } = useContext(RevochatContext);
    const [friendsRequest, setFriendsRequest] = useState([]);
    const [menu, setMenu] = useState(true);

    useEffect(() => {
        if(!currentUser) return;
        getFriendsRequests();
        onFriendsRequestReceived();
    }, [currentUser])

    const getFriendsRequests = async () => {
        try {
            const token = localStorage.getItem("token")
            await getFriendsRequestsReceived(token, (friendsRequest) => {
                console.log('friendsRequest: ', friendsRequest)
                setFriendsRequest(friendsRequest)
            })
        } catch (error) {
            console.log(error)
        }
    }

    const onFriendsRequestReceived = async () => {
        const token = localStorage.getItem("token")
        await listenGetFriendsRequestReceived(token, (request) => {
            console.log('friendsRequest: ', request)
            getFriendsRequests();
        })
    }
        

    const numberOfPending = friendsRequest.length;
    

    return (
        <div className='mt-4 text-zinc-200'>
           <div className='font-bold flex items-center justify-between px-3 cursor-pointer' onClick={() => setMenu(!menu)}>
           <div className='flex items-center gap-1'>
                {menu ? <GoChevronDown size={20} /> : <GoChevronRight size={20} />}
                <span>Pending</span>  
            </div>
                <div className='rounded-full h-5 min-w-[20px] w-fit items-center flex justify-center bg-red-500 text-sm px-1 text-center'> {numberOfPending} </div> 
           </div>
           {menu && (
                <div className='mt-2 py-2 px-4 max-h-40 overflow-auto scroll-thin flex flex-col gap-3'>
                    {friendsRequest?.length === 0 && <div className='text-zinc-400'>No friends request received</div>}
                    {friendsRequest?.slice(0, 5).map((friend) => (
                        <Item key={friend.user_id} friend={friend} setFriendsRequest={setFriendsRequest}  />
                    ))}
                </div>
            )}
        </div>
    );
}

const Item = ({friend, setFriendsRequest}) => {

    const { setFriends } = useContext(RevochatContext);
    
    const handleAddFriend = async (username) => {
        try{
            const token = localStorage.getItem('token')
            await addFriend(token, username, (user) => {
                console.log('user', user)
                if(user.error) {
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
                setFriendsRequest((prev) => prev.filter((friend) => friend.username !== username))
                //add Friend to list
                setFriends((prev) => [...prev, user.user])

            });
            
       }
       catch(err){
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

    const rejectFriend = async (username) => {
        try{
            const token = localStorage.getItem('token')
            await removeFriend(token, username, (user) => {
                if(user.error) {
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
                    title: "You have rejected the friend request from " + username,
                    type: 'success',
                })
                //remove Friend from list
                setFriendsRequest((prev) => prev.filter((friend) => friend.username !== username))
            });
            
       }
       catch(err){
           toast({
            className: cn(
                'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4'
            ),
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: err.message,
          })
       }
    };

    return (
        <div className='flex w-full justify-between items-center'>
            <div className='flex gap-2 items-center'>
                <Avatar user={friend} className='w-8 h-8' />
                <div className='flex flex-col'>
                    <div className='capitalize font-semibold'>{friend.username}</div>
                </div>
            </div>

            <div className='flex items-center gap-1'>
                <FcCheckmark size={22} className='cursor-pointer' onClick={() => handleAddFriend(friend.username)} />
                <FcCancel size={22} className='cursor-pointer' onClick={() => rejectFriend(friend.username)} />
            </div>
        </div>
    )
}

export default FriendsRequest;
