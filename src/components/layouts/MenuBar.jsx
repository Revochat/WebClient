import React from 'react';
import AddFriend from '../AddFriend';
import AddChannel from '../AddChannel';

const MenuBar = () => {
    return (
        <div className='h-full w-full bg-blue-200'>
            <h1>MenuBar</h1>

        <div className='mt-10 items-center w-full flex justify-center'>
            <AddFriend />
        </div>
        {/* <div className='mt-10 items-center w-full flex justify-center'>
            <AddChannel />
        </div> */}

        </div>
    );
}

export default MenuBar;
