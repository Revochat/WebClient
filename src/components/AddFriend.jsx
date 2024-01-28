'use client';
import { RevochatContext } from '@/context/context';
import React, { useContext, useEffect, useState } from 'react';
import { BsFillSendPlusFill } from "react-icons/bs";


const AddFriend = () => {

    const { revochatClient, revoLogin } = useContext(RevochatContext);
   
    const [friendID, setFriendID] = useState("");
    const [client, setClient] = useState(null)

    useEffect(() => {
        console.log('revoLogin component: ', revoLogin)
        revochatClient.on("user.connect", () => {
            console.log('user connect')
            setClient(revochatClient)
        })
    }, [revoLogin])


    const handleChange = (e) => {
        setFriendID(e.target.value);
    }

    const addFriend = () => {
        console.log('add friend ...')
        client.user.addFriend({friend_id: friendID});
        console.log('friend request send')
    }

    return (
        <div className='flex gap-2 items-center'>
            <input type="text" className='rounded-md outline-none px-2 py-1 h-fit' value={friendID} placeholder="Friend ID" onChange={handleChange} />
            <button onClick={addFriend}> <BsFillSendPlusFill className='hover:text-primary hover:scale-110 transition-all' size={26} /> </button>
        </div>
    );
}

export default AddFriend;
