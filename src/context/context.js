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
        const [loading, setLoading] = useState(false);

        useEffect(() => {
            try {
                if (!currentUser.user_id && !loading) {
                    setLoading(true);
                    logUser();
                }
                const jwt = localStorage.getItem("token")
                if(window.location.pathname != "/" && !jwt) window.location.href = "/"
            } catch (error) {
                console.log(error)
            }
        }, [currentUser])

        const logUser = () => {
            try{
                const jwt = localStorage.getItem("token")
                console.log('jwt', jwt)
                console.log('revochatClient')
                revochatClient.login(jwt)
                const autoReload = setTimeout(() => {
                    window.location.reload(true);
                }, 2000)
                revochatClient.on(EventList.User.Connect, (user) => {
                    if(autoReload) clearTimeout(autoReload)
                    console.log('user', user)
                    if(user.error) return console.log(user.error)
                    setCurrentUser(user)
                    localStorage.setItem('user', JSON.stringify(user))
                    if(selectedChannel && user.channels.length === 0) setSelectedChannel({})
                    !selectedChannel && setSelectedChannel(user.channels[0])
                    setRevoLogin(true)
                    setLoading(false); // set loading to false when user is connected
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

