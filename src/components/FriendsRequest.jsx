import EventList from '@/context/EventList';
import { RevochatContext } from '@/context/context';
import React, { useContext, useEffect, useState } from 'react';

const FriendsRequest = () => {

    const { revochatClient, revoLogin } = useContext(RevochatContext);
    const [client, setClient] = useState(null)

    useEffect(() => {
        revochatClient.on(EventList.User.Connect, () => {
            setClient(revochatClient)
        })
    }, [revoLogin])

    useEffect(() => {
        //get Friends request
            if(!client) return;
        client.on(EventList.User.GetFriends , (result) => {
            console.log('get friends: ', result)
            if (result.error) {
                console.error("Error:", result.error)
                alert(result.error)
                return;
            };
        })
    }, [client]);

    return (
        <div className='mt-4'>
           <span className='font-bold'>FriendsRequest received:</span>
            <div>
                
            </div>
        </div>
    );
}

export default FriendsRequest;
