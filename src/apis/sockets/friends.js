// "use server";
import EventList from "@/context/EventList";
import { Revochat } from "@revochat/revochat-client";

export const addFriend = async (token, username, callback) => {
    console.log("Socket - addFriend()")
    try {
        const TOKEN = token;
        if(!TOKEN) throw new Error("TOKEN is not defined in .env file")

        const URL = process.env.REVO_CLIENT_URL;
        if(!URL) throw new Error("URL is not defined in .env file")

        const client = new Revochat.Client({
            url: URL,
            debug: true,
        })

        client.login(TOKEN) // login with token
    
        client.on(EventList.User.Connect, (user) => {
            if(user.error) return console.log(user.error)
            console.log("Adding friend...")
            client.user.addFriend({username: username})
            .catch((error) => {
                console.log(error)
                callback({error: error})
            })
        })
    
        client.on(EventList.User.GetFriendRequestsSent, (user) => {
            console.log("GetFriendRequestsSent: ", user)
            if (typeof callback === 'function') {
                if(user.error) return callback({error: user.error})
                callback(user)
            }
        })
        
    } catch (error) {
        console.log(error)
        return error;
    }
}

export const getFriends = async (token, callback) => {
    console.log("Socket - getFriends()")
    try {
        const TOKEN = token;
        if(!TOKEN) throw new Error("TOKEN is not defined in .env file")

        const URL = process.env.REVO_CLIENT_URL;
        if(!URL) throw new Error("URL is not defined in .env file")

        const client = new Revochat.Client({
            url: URL,
            debug: true,
        })

        client.login(TOKEN) // login with token
    
        client.on(EventList.User.Connect, (user) => {
            if(user.error) return console.log(user.error)
            console.log("Getting friends...")
            client.user.getFriendsList()
            .catch((error) => {
                callback({error: error})
            })
        })
    
        client.on(EventList.User.GetFriendsList, (user) => {
            if (typeof callback === 'function') {
                if(user.error) return callback({error: user.error})
                callback(user)
            }
        })
        
    } catch (error) {
        console.log(error)
        return error;
    }
}

export const getFriendsRequestsReceived = async (token, callback) => {
    console.log("Socket - getFriendsRequestsReceived()")
    try {
        const TOKEN = token;
        if(!TOKEN) throw new Error("TOKEN is not defined in .env file")

        const URL="ws://localhost:3001"
        if(!URL) throw new Error("URL is not defined in .env file")

        const client = new Revochat.Client({
            url: URL,
            debug: true,
        })

        client.login(TOKEN) // login with token
    
        client.on(EventList.User.Connect, (user) => {
            if(user.error) return console.log(user.error)
            console.log("Getting friends request...")
            client.user.getFriendsReceivedList()
            .catch((error) => {
                console.log(error)
                callback({error: error})
            })
        })
    
        client.on(EventList.User.GetFriendsReceivedList, (user) => {
            if (typeof callback === 'function') {
                if(user.error) return callback({error: user.error})
                callback(user)
            }
        })
        
    } catch (error) {
        console.log(error)
        return error;
    }
}

export const removeFriend = async (token, username, callback) => {
    console.log("Socket - removeFriend()")
    try {
        const TOKEN = token;
        if(!TOKEN) throw new Error("USER1_TOKEN is not defined in .env file")

        const URL="ws://localhost:3001"
        if(!URL) throw new Error("URL is not defined in .env file")

        const client = new Revochat.Client({
            url: URL,
            debug: true,
        })

        client.login(TOKEN) // login with token
    
        client.on(EventList.User.Connect, (user) => {
            if(user.error) return console.log(user.error)
            console.log("Removing friend...")
            client.user.removeFriend({username: username})
            .catch((error) => {
                console.log(error)
                callback({error: error})
            })
        })
    
        client.on(EventList.User.RemoveFriend, (user) => {
            if (typeof callback === 'function') {
                if(user.error) return callback({error: user.error})
                callback(user)
            }
        })
        
    } catch (error) {
        console.log(error)
        return error;
    }
}