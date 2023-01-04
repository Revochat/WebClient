import { Divider } from '@mui/material'
import React, { useState } from 'react'
import { useEffect } from 'react'
import {USERS} from '../data/Users'

const lastMessage = 'this is the last message '

export default function ChatsList() {
    const [DM, setDM] = useState([])

    useEffect(() => {
        setDM(USERS)
    }, []);
  return (
    <div className='pt-4'>
        <h4 className='ml-2 py-2'>
        Last Messages
        </h4>
        <Divider/>

        <div className='pt-2 pl-2 '>
            {DM ? DM.map(dm =>(
                <div>
                    <div className='flex justify-start my-2'>
                        <span 
                    style={{
                        width: '10px', 
                        height: '10px', 
                        backgroundColor: dm.status == 'online'? 'green' : 'red', 
                        position: 'absolute',
                        borderRadius: '50%',
                        marginLeft: '4px'
                        }} >
                        </span> 
                        
                        {/* <div className='flex justify-between'> */}
                        <div className='flex'>
                        <img src={dm.image} alt="picture" width={50} height={50} />
                            <h3 className='mx-2 my-3 font-bold'>{dm.name}</h3> <br />
                            
                        </div>

                            <span className='italic absolute mt-3 right-2'>2m</span>
                            <span className='italic absolute mt-8 ml-14 '>{lastMessage.length >=20? lastMessage.slice(0,20)+'...' : lastMessage} </span>
                        {/* </div> */}
                    </div>
                    <Divider/>
                </div>
            ))
            :
            <>
            </>
        }
        </div>
        
    </div>
  )
}
