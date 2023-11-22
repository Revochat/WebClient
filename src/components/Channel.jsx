import React from 'react';
import Messages from './Messages';

const Channel = () => {
    return (
        <div className='w-full h-full flex flex-col'>
            <div className='w-full h-16 bg-gray-500 flex items-center p-4 text-2xl font-bold'>
                <h1># Channel Name</h1>
            </div>
            <div className='h-full bg-red-200 overflow-hidden'>
                <Messages />
            </div>
        </div>
    );
}

export default Channel;
