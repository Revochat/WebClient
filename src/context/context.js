'use client';
import { createContext, useState, useEffect, useReducer } from "react";
import {Revochat} from '@revochat/revochat-client';

export const RevochatContext = createContext();


    export const RevochatProvider = ({children}) => {
        const revochatClient = new Revochat.Client({
            url: "ws://localhost:4001",
            debug: true,
        })
        const [currentUser, setCurrentUser] = useState({});


        useEffect(() => {
            console.log('useEffect CONTEXT')
            console.log(revochatClient)

            let jwt = localStorage.getItem('token')
            if(jwt){
                console.log('jwt', jwt)
                revochatClient.login(jwt)
                
                revochatClient.on("user.connect", (user) => {
                    console.log('login', user)
                    setCurrentUser(user)
                })
                
            }
          }, []);
    
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

