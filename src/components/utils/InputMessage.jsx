import { RevochatContext } from '@/context/context';
import React, { useContext, useEffect, useState } from 'react';
import { FaPaperPlane, FaPlusCircle } from 'react-icons/fa';

const InputMessage = () => {
    
    const { revochatClient, revoLogin, selectedChannel } = useContext(RevochatContext);
    const [message, setMessage] = useState('');
    const [client, setClient] = useState(null)

    useEffect(() => {
        console.log('revoLogin component: ', revoLogin)
        revochatClient.on("user.connect", () => {
            console.log('user connect')
            setClient(revochatClient)
        })
    }, [revoLogin])

    const sendMessage = async () => {
        console.log('send message')
        try{
            client.message.send({channel_id: selectedChannel?.channel_id, message: message})
            console.log('message send')
            setMessage('')
        }
        catch(err){
            console.log(err)
        }
    }

    const handleChange = (e) => {
        setMessage(e.target.value)
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            sendMessage()
        }
    }

    return (
        <div className='mx-4 relative'>
            <FaPlusCircle className='absolute left-2 top-1/2 transform -translate-y-1/2 text-2xl text-gray-400 cursor-pointer hover:text-gray-600' />
            <input className='w-full pl-10 py-2 px-4 rounded-xl' type="text" placeholder='Tapez le message...' value={message}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
            />
            <FaPaperPlane 
                className='absolute right-4 top-1/2 transform -translate-y-1/2 text-2xl text-gray-400 cursor-pointer hover:text-gray-600'
                onClick={sendMessage}
             />
        </div>
    );
}

export default InputMessage;
