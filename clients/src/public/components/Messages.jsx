import React, { useContext, useState } from 'react'
import { RevochatContext } from '../context/context'
import Image from 'next/image'
// import UserService from '../services/User.service'

export default function Messages() {

    const [messageText, setMessageText] = useState()
    const {currentAccount, placeholder} = useContext(RevochatContext)

    const sendMessage = event => {
        event.preventDefault()
        if (messageText.trim() === '') return
    
        
        const newMessage = {
          user_id: currentUser.id,
        //   avatar: currentUser.avatar
        //     ? currentUser.avatar
        //     : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3OCSMFIW5fZ3vSN6yGpD-w-6SsL2_ZPA_sw&usqp=CAU',
          message: messageText.trim(),
          created_at: Date().substring(4, 11),
          updated_at: Date().substring(4, 11),
        }
    
        // MessageService.send(newMessage)
        setMessageText('')
      }
    
  return (
    <div className=''>
      <h1>Messages</h1>  
      <div></div>
      
    <form
      onSubmit={event => sendMessage(event)}
    >
      <div >
        <div className='ml-4'>
          <img className='absolute bottom-10 ml-2' width={30} height={30} src="https://www.comassel.com/wp-content/uploads/2021/05/1416404_alert222_script-alert-1-script-1-1.png" alt="" />
        <input className='absolute bottom-10 border-cyan-200 px-2 py-1 rounded ml-10'
        style={{width: '90%'}}
          type='text'
          value={messageText}
          disabled={currentAccount.name}
          onChange={e => setMessageText(e.target.value)}
          placeholder={placeholder}
        />
        </div>

        {/* <div className={styles.svgContainer}>
          <Image height={25} width={25} src={gift} className={styles.svg} />
        </div>
        <div className={styles.svgContainer}>
          <Image height={25} width={25} src={gif} className={styles.svg} />
        </div>
        <div className={styles.svgContainer}>
          <Image height={25} width={25} src={sticker} className={styles.svg} />
        </div>
        <div className={styles.svgContainer}>
          <Image height={25} width={25} src={smiley} className={styles.svg} />
        </div> */}
      </div>
    </form>
    </div>
  )
}
