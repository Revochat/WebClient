import EventList from '@/context/EventList';
import { RevochatContext } from '@/context/context';
import React, { useContext, useEffect, useState } from 'react';

const FriendsRequest = () => {

    const { revochatClient, revoLogin } = useContext(RevochatContext);
    const [client, setClient] = useState(null);
    const [friendsRequest, setFriendsRequest] = useState([]);

    useEffect(() => {
        revochatClient.on(EventList.User.Connect, () => {
            setClient(revochatClient)
        })
    }, [revoLogin])

    // useEffect(() => {
    //     if(!client) return;
    //     console.log("rentre")
    //     client.user.getFriendsReceived()
    // }, [client])

    // useEffect(() => {
    //     //get Friends request
    //     if(!client) return;
    //     //get friends request received
    //     client.user.getFriendsReceived()
    //     client.on(EventList.User.GetFriendsReceived , (result) => {
    //         console.log('getFriendsReceived', result)
    //         if (result.error) {
    //             console.error("Error:", result.error)
    //             alert(result.error)
    //             return;
    //         };
    //         setFriendsRequest(result.friends_requests_received)
    //     })

    //     //get friends request send
    //     client.on(EventList.User.AddFriend, (result) => {
    //         if (result.error) {
    //             console.error("Error:", result.error)
    //             alert(result.error)
    //             return;
    //         };
    //     })

    // }, [client]);

    const handleAddFriend = (username) => {
        client?.user?.addFriend({ username: username })
        .then((result) => {
            console.log(result)
            //remove friend from friendsRequest
            setFriendsRequest(friendsRequest.filter((friend) => friend.username !== username))
        })
        .catch((error) => {
            console.log(error)
        })
    }

    return (
        <div className='mt-4'>
           <span className='font-bold'>FriendsRequest received:</span>
            <div>
                {friendsRequest.map((friend) => {
                    return (
                        <div key={friend._id}>
                            <span className='pr-2'>{friend.username}</span>
                            <button className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded' onClick={()=> handleAddFriend(friend.username)}>Accept</button>
                            <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'>Decline</button>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default FriendsRequest;
