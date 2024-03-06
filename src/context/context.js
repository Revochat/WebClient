'use client';
import { createContext, useState, useEffect } from "react";
import { Revochat } from '@revochat/revochat-client';
import EventList from "./EventList";


export const RevochatContext = createContext();


    export const RevochatProvider = ({children}) => {
        const revochatClient = new Revochat.Client({
            url: process.env.REVO_CLIENT_URL,
            debug: false,
        })

        const [currentUser, setCurrentUser] = useState({});
        const [revoLogin, setRevoLogin] = useState(false);
        const [selectedChannel, setSelectedChannel] = useState({})
        const [openCreateServerModal, setOpenCreateServerModal] = useState(false);
        console.log('context opencreateserver', openCreateServerModal)

        useEffect(() => {
            if(!currentUser.user_id) initRevochat();
            const jwt = localStorage.getItem("token")
            if(window.location.pathname != "/" && !jwt) window.location.href = "/"
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
                    if(selectedChannel && user.channels.length === 0) setSelectedChannel({})
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
                openCreateServerModal,
                setOpenCreateServerModal,

            }}>
            {children} 
        </RevochatContext.Provider>
    )
}

export default RevochatProvider;

