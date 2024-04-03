import EventList from "@/context/EventList";
import { Revochat } from "@revochat/revochat-client";

export const setAvatar = async (token, image, callback) => {
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
    
            formData.append('file', image);

           
            const link = await client.user.setAvatar(process.env.REVO_CDN_URL, TOKEN, user.user_id, formData)

            callback(link)
            
        })

        
    } catch (error) {
        console.log(error)
        return error;
    }
}
