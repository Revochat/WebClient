import React from 'react';

import Messages from '@/components/Messages';
import ServerList from '@/components/layouts/ServerList';
import MenuBar from '@/components/layouts/MenuBar';
import Channel from '@/components/Channel';

const Page = () => {
    return (
        <div className='h-screen w-screen flex'>
            <div className='w-1/4 flex'>
                <ServerList />
                <MenuBar />
            </div>
            <div className='w-full h-full'>
                <Channel />
            </div>
                
        </div>
    );
}

export default Page;
