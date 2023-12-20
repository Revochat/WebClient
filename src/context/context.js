'use client';
import { createContext, useState, useEffect } from "react";
import { Revochat } from '@revochat/revochat-client';


export const RevochatContext = createContext();


    export const RevochatProvider = ({children}) => {
        const revochatClient = new Revochat.Client({
            url: "ws://localhost:3001",
            debug: false,
        })

        const [currentUser, setCurrentUser] = useState({});
        const [revoLogin, setRevoLogin] = useState(false);

        useEffect(() => {
            initRevochat();
        }, [])

        const initRevochat = () => {
            try {
                const jwt = localStorage.getItem("token")
                console.log('jwt', jwt)
                revochatClient.login(jwt)
            
                revochatClient.on("user.connect", (user) => {
                    if(user.error) return console.log(user.error)
                    console.log(user)
                    setCurrentUser(user)
                    setRevoLogin(true)
                    console.log("Connected as " + user.username +  " (" + user.user_id + ")")  
                    console.log("You have " + user.friends.length + " friends")
            
                    // revochatClient.channel.get({ channel_id: "1702227951051", limit: 50 }).catch((error) => {
                    //     console.log(error)
                    // })
                    // sendMessage("1702227951051", "Hello World3!")
                })

                
                // revochatClient.on("channel.get", (message) => {
                //     console.log(message)
                // })
            
                
            } catch (error) {
                console.log(error)
            }
        }

         
    
    return (
        <RevochatContext.Provider 
            value={{
                revochatClient,
                currentUser,
                setCurrentUser,
                revoLogin,

            }}>
            {children} 
        </RevochatContext.Provider>
    )
}

