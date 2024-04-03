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

        console.log(token)
        console.log("image", image)

    
        client.on(EventList.User.Connect, async (user) => {
            if (user.error) return console.log(user.error)
            console.log("Connected as " + user.username + " (" + user.user_id + ")")
            console.log("You have " + user.friends.length + " friends")
    
            // create a file
            const formData = new FormData();
    
            formData.append('file', image);
            console.log(formData)

           
            const link = await client.user.setAvatar("http://localhost:4000", TOKEN, user.user_id, formData)
            console.log(link)

            callback(link)
            
        })

        
    } catch (error) {
        console.log(error)
        return error;
    }
}
