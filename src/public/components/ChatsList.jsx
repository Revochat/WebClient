import { Divider } from '@mui/material'
import React, { useState } from 'react'
import { useEffect } from 'react'
import {USERS} from '../data/Users'

export default function ChatsList() {
    const [DM, setDM] = useState([])

    useEffect(() => {
        setDM(USERS)
    }, []);
  return (
    <div>
        <h4 className='py-2'>
        Direct Messages
        </h4>
        <Divider/>

        <div className='pt-2'>
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
                        <img src={dm.image} alt="picture" width='50px' />
                    <h3 className='mx-2 my-3 font-bold'>{dm.name}</h3>  
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
