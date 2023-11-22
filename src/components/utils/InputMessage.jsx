import React, { useState } from 'react';
import { FaPaperPlane, FaPlusCircle } from 'react-icons/fa';

const InputMessage = () => {

    const [message, setMessage] = useState('');

    const sendMessage = () => {
        console.log('send message')
        console.log(message)
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
            <input className='w-full pl-10 py-2 px-4 rounded-xl' type="text" placeholder='Tapez le message...' 
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
