import EventList from '@/context/EventList';
import { RevochatContext } from '@/context/context';
import React, { useContext, useEffect, useState } from 'react';

const FriendsList = () => {

    const { revochatClient, currentUser, revoLogin } = useContext(RevochatContext);
    const [client, setClient] = useState(null)
    const [removeFriend, setRemoveFriend] = useState(null)

    useEffect(() => {
        revochatClient.on(EventList.User.Connect, () => {
            setClient(revochatClient)
        })
    }, [revoLogin])

    useEffect(() => {
        console.log('removeFriend()')
        if(!client) return;

        client.on(EventList.User.RemoveFriend, (result) => {
            console.log('remove.friend: ', result)
            if (result.error) {
                console.error("Error:", result.error) 
                currentUser.friends.push(removeFriend)
                return;
            };
            console.log("Friend removed:", result);
        })
      
    }, [client]); 

    const handleRemoveFriend = (friend) => {
        setRemoveFriend(friend)
        client.emit(EventList.User.RemoveFriend, { username: friend.username })
        currentUser.friends = currentUser.friends.filter(f => f.username !== friend.username)
        console.log("try to remove friend with ID:", friend);
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
