'use client';
import React, { useEffect, useState } from 'react';

import Messages from '@/components/Messages';
import ServerList from '@/components/layouts/ServerList';
import MenuBar from '@/components/layouts/MenuBar';
import Channel from '@/components/Channel';

const Page = () => {

    const [load, setLoad] = useState(true)

    useEffect(() => {
        if(typeof window !== 'undefined'){
            setLoad(false)
        }
    }, [])
    if(load) return <div>Loading...</div>

    return (
        <div className='h-screen w-screen flex'>
            <div className='flex round'>
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
