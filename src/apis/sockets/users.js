// "use server";
import EventList from "@/context/EventList";
import { Revochat } from "@revochat/revochat-client";

export const getUser = async (token, callback) => {
    console.log("Socket - getUser()")
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
            if (typeof callback === 'function') {
                callback(user);
            }
        })

        client.on(EventList.User.Update, (user) => {
            console.log("User updated: " + user)
            if (typeof callback === 'function') {
                callback(message);
            }
        })
        
    } catch (error) {
        console.log(error)
        return error;
    }
}