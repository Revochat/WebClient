import { createContext, useState, useEffect, useReducer } from "react";
import { useRouter } from 'next/router'
// import UserService from "../services/User.service";

export const RevochatContext = createContext();

const initialState = {messages: []}

    const reducer = (state, action) => {
        try{
            if(action.type == 'clear') return {messages: []}
            if(action.type == 'add') return {messages: [...state.messages, action.data]}
        }
        catch(error){console.log(error)}

    }


    export const RevochatProvider = ({children}) => {
        const router = useRouter();
        const [state, dispatch] = useReducer(reducer, initialState)
        const [currentAccount, setCurrentAccount] = useState('')
        const [currentUser, setUser] = useState()
        const [roomName, setRoomName] = useState()
        const [messagetext, setMessageText] = useState()
        const [placeholder, setPlaceholder] = useState()
    
    useEffect(() => {
        checkIfWalletIsConnected();
    }, []);
    
        

    const createUserAccount = async () => {};

    const checkIfWalletIsConnected = async () => {
        if(!window.ethereum) return
        try{
            const adressArray = await window.ethereum.request({
                method: 'eth_accounts'
            })
            if(adressArray.length > 0){
                setCurrentAccount(adressArray[0])
                setCurrentUser(adressArray[0])
                
            }
            else{}
        }
        catch(error){
            console.log(error)
        }
    }

    const connectWallet = async() => {
        if(!window.ethereum) return
        try{
            const adressArray =  await window.ethereum.request({
                method: 'eth_requestAccounts'
            })
            if(adressArray.length > 0) {
                setCurrentAccount(adressArray[0])
                setCurrentUser(adressArray[0])

            }
            else{}
        }
        catch(error){
            console.log(error)
        }
    }

    return (
        <RevochatContext.Provider 
            value={{
                currentAccount,
                roomName,
                currentUser,
                currentAccount,
                connectWallet 
                
            }}>
            {children} 
        </RevochatContext.Provider>
    )
}

