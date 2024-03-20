// "use server";
import EventList from "@/context/EventList";
import { Revochat } from "@revochat/revochat-client";

export const addFriend = async (token, username, callback) => {
    console.log("Socket - addFriend()")
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
            console.log("Adding friend...")
            client.user.addFriend({username: username})
            .catch((error) => {
                console.log(error)
                callback({error: error})
            })
        })
    
        client.on(EventList.User.AddFriend, (user) => {
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
