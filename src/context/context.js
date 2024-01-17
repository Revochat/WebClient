'use client';
import { createContext, useState, useEffect } from "react";
import { Revochat } from '@revochat/revochat-client';
import EventList from "./EventList";


export const RevochatContext = createContext();


    export const RevochatProvider = ({children}) => {
        const revochatClient = new Revochat.Client({
            url: "ws://localhost:3001",
            debug: false,
        })

        const [currentUser, setCurrentUser] = useState({});
        const [revoLogin, setRevoLogin] = useState(false);
        const [selectedChannel, setSelectedChannel] = useState({})

        useEffect(() => {
            if(!currentUser.user_id) initRevochat();
        }, [currentUser])


        const initRevochat = () => {
            try {
                logUser();
            } catch (error) {
                console.log(error)
            }
        }

        const logUser = () => {
            try{
            const jwt = localStorage.getItem("token")
                console.log('jwt', jwt)
                revochatClient.login(jwt)
            
                revochatClient.on(EventList.User.Connect, (user) => {
                    if(user.error) return console.log(user.error)
                    console.log(user)
                    setCurrentUser(user)
                    localStorage.setItem('user', JSON.stringify(user))
                    !selectedChannel && setSelectedChannel(user.channels[0])
                    setRevoLogin(true)
                    console.log("Connected as " + user.username +  " (" + user.user_id + ")")  
                    console.log("You have " + user.friends.length + " friends")
                })
            }
            catch(error){
                console.log(error)
            }
        }
         
    
    return (
        <RevochatContext.Provider 
            value={{
                revochatClient,
                logUser,
                currentUser,
                setCurrentUser,
                revoLogin,
                selectedChannel,
                setSelectedChannel,

            }}>
            {children} 
        </RevochatContext.Provider>
    )
}

export default RevochatProvider;

