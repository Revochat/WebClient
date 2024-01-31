'use client';
import EventList from '@/context/EventList';
import { RevochatContext } from '@/context/context';
import React, { useContext, useEffect, useState } from 'react';
import { BsFillSendPlusFill } from "react-icons/bs";


const AddFriend = () => {

    const { revochatClient, revoLogin } = useContext(RevochatContext);
   
    const [friendID, setFriendID] = useState("");
    const [client, setClient] = useState(null)

        useEffect(() => {
            revochatClient.on(EventList.User.Connect, () => {
                setClient(revochatClient)
            })
        }, [revoLogin])

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
        })
    }, [client]); 


    const handleChange = (e) => {
        setFriendID(e.target.value);
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            addFriend()
        }
    }

    const addFriend = () => {
        console.log('add friend ...')
       try{
            client.user.addFriend({ username: friendID })
       }
       catch(err){
           console.log('error: ', err)
       }
        console.log('friend request send')
    }

    return (
        <div className='flex gap-2 items-center'>
            <input onKeyDown={handleKeyDown} type="text" className='rounded-md outline-none px-2 py-1 h-fit' value={friendID} placeholder="Friend ID" onChange={handleChange} />
            <button onClick={addFriend} > <BsFillSendPlusFill className='hover:text-primary hover:scale-110 transition-all' size={26} /> </button>
        </div>
    );
}

export default AddFriend;
