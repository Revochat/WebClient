'use client';
import { RevochatContext } from '@/context/context';
import React, { useContext, useState } from 'react';
import { BsFillSendPlusFill } from "react-icons/bs";

const AddChannel = () => {

    const { revochatClient } = useContext(RevochatContext);
    const [friendID, setFriendID] = useState("");

    const handleChange = (e) => {
        setFriendID(e.target.value);
    }

    const addChannel = () => {
        revochatClient.channel.create({ category: "DM", friend_id: friendID })

    }

    return (
        <div className='flex gap-2 items-center'>
            <input type="text" className='rounded-md outline-none px-2 py-1 h-fit' value={friendID} placeholder="Channel Friend ID" onChange={handleChange} />
            <button onClick={addChannel}> <BsFillSendPlusFill className='hover:text-primary hover:scale-110 transition-all' size={26} /> </button>
        </div>
    );
}

export default AddChannel;
