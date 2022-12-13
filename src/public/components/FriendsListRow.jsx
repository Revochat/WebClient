import React from 'react'
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Divider from '@mui/material/Divider';


export default function FriendsListRow({users, search}) {

  return (
    <div className='mt-4 ml-4'>
            
            <div>
            {users.map((user, index)=> (
                <>
                <div className='w-full my-2 flex'>
                   <span 
                   style={{
                    width: '10px', 
                    height: '10px', 
                    backgroundColor: user.status == 'online'? 'green' : 'red', 
                    position: 'absolute',
                    borderRadius: '50%',
                    marginLeft: '4px'
                    }} >
                    </span> 
                    <img style={{width: '50px', height: '50px', borderRadius: '50%', border: 'black 1px'}} src={user.image} alt="" />
                    <div className='ml-2'>
                        <span className='font-semibold text-xl'>{user.name} </span> <br/>
                        <span className='italic'>{user.status} </span>
                    </div>
                    <div className='right-0 mt-3 mx-20 absolute align-middle items-center '>
                        <span className='mx-2'> <ChatBubbleIcon fontSize='large' /></span>
                        <span className='mx-2'> <MoreVertIcon fontSize='large' /> </span>
                    </div>
                </div>
                <Divider/>
                </>
            ))}
            </div>
        </div>
  )
}
