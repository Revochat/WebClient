'use client';
import { createContext, useState, useEffect } from "react";
import {Revochat} from '@revochat/revochat-client';

export const RevochatContext = createContext();


    export const RevochatProvider = ({children}) => {
        const revochatClient = new Revochat.Client({
            url: "ws://localhost:3001",
            debug: true,
        })
        const [currentUser, setCurrentUser] = useState({});
        const [revoLogin, setRevoLogin] = useState(false);


        useEffect(() => {
            console.log('useEffect CONTEXT');
            let jwt = localStorage.getItem('token');
          
            const initializeRevochat = async () => {
              if (jwt) {
                await revochatClient.login(jwt);
                setRevoLogin(true);
                revochatClient.on('user.connect', (user) => {
                  console.log('user', user);
                  setCurrentUser(user);
                });
              }
            };
            initializeRevochat();
          }, [revochatClient]);

         
    
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

