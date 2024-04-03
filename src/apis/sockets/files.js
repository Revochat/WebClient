import EventList from "@/context/EventList";
import { Revochat } from "@revochat/revochat-client";

export const sendFile = async (token, channel_id, file, callback) => {
    console.log("Socket - setAvatar()")
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

    
        client.on(EventList.User.Connect, async (user) => {
            if (user.error) return console.log(user.error)
    
            // create a file
            const formData = new FormData();
    
            formData.append('file', file);
           
            const link = await client.message.sendFile(process.env.REVO_CDN_URL, TOKEN, channel_id, formData)
            callback(link)
            
        })

        
    } catch (error) {
        console.log(error)
        return error;
    }
}
