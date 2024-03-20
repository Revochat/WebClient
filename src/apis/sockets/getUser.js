// "use server";
import EventList from "@/context/EventList";
import { Revochat } from "@revochat/revochat-client";

export const getUser = async () => {
    console.log("Socket - getUser()")
    try {
        const TOKEN = "E7533F6FC442505BA33CF9475D96A0041706692368471"
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
            console.log(user)
            console.log("Connected as " + user.username +  " (" + user.user_id + ")")  
            console.log("You have " + user.friends.length + " friends")
        })

        client.on(EventList.User.Update, (user) => {
            console.log("User updated: " + user)
        })
        
    } catch (error) {
        console.log(error)
        return error;
    }
}