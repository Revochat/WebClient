import { createContext, useState, useEffect, useReducer } from "react";
import { useRouter } from 'next/router'
import UserService from '../services/User.service'
import Revochat, {Client} from '@revochat/revochat-client'

export const RevochatContext = createContext();


    export const RevochatProvider = ({children}) => {
        const router = useRouter();
        const client = new Revochat.Client()
        const [currentUser, setCurrentUser] = useState({})

    
        // useEffect(() => {
        //     console.log('useEffect CONTEXT')
        //     let jwt = JSON.parse(localStorage.getItem('token'))
        //     if(jwt){
        //     }
        //   }, []);
    

    
    const logMessages = async () => {
        let token = JSON.parse(localStorage.getItem('token'));
        // const client = new Revochat.Client()
        try{
            await client.login(token)
            // client.message.send(1675013125087, "Hello world")
            const user = (await client.user.get())
            // client.on('ready', (user) => {
                console.log(`Logged in as ${user.username} ID: (${user.user_id})`)
                console.log(user) 
                setCurrentUser(user)  
                console.log('current user', currentUser)
            // })
        }
        catch(error){console.log(error)}
        
    }

    const addFriend = async (friend_id) => {
        let jwt = JSON.parse(localStorage.getItem('token'));
        console.log(friend_id)
        // const client = new Revochat.Client()
        await client.login(jwt)
        // client.on('ready', () => {
            client.friend.add(friend_id)
        // })
        logMessages()
    }

    const loadChannels = async () => {
        let jwt = JSON.parse(localStorage.getItem('token'));
        // const client = new Revochat.Client()
        await client.login(jwt)
        // client.on('ready', () => {
            const channels = await client.channels.get
            // console.log(channels)
            setChannels(channels)
        // })
    }

    const loadFriends = async () => { 
        console.log('friendddd')
        let jwt = JSON.parse(localStorage.getItem('token'));
        // const client = new Revochat.Client()
        await client.login(jwt)
        // client.on('ready', () => {
            const friends = await client.friend.list
            const friendsReceived = await client.friend.received
            setFriends(friends)
            setFriendsReceived(friendsReceived)
        // })
    }

    const loadMessages = async (channel_id) => {
        let jwt = JSON.parse(localStorage.getItem('token'));
        // const client = new Revochat.Client()
        await client.login(jwt)
        // client.on('ready', () => {
            const messages = await client.message.getMessages(channel_id)
            setMessages(messages)
        // })
    }

    return (
        <RevochatContext.Provider 
            value={{
                currentUser,
                setCurrentUser,
            }}>
            {children} 
        </RevochatContext.Provider>
    )
}

