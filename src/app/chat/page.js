'use client';
import React, { useEffect, useState } from 'react';

import Messages from '@/components/Messages';
import ServerList from '@/components/layouts/ServerList';
import MenuBar from '@/components/layouts/MenuBar';
import Channel from '@/components/Channel';
import { PageLoader } from '@/components/utils/Loaders';

const Page = () => {

    const [load, setLoad] = useState(true)

    useEffect(() => {
        if(typeof window !== 'undefined'){
            setLoad(false)
        }
    }, [])
    if(load) return <PageLoader />

    return (
        <div className='h-screen w-screen flex'>
            <div className='flex'>
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
