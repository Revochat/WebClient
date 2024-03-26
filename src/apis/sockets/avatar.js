import EventList from "@/context/EventList";
import { Revochat } from "@revochat/revochat-client";

export const setAvatar = async (token, image) => {
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
    
        client.on(EventList.User.Connect, (user) => {
            if(user.error) return console.log(user.error)
            console.log("Adding friend...")
            client.user.addFriend({username: username})
            .catch((error) => {
                console.log(error)
                callback({error: error})
            })
        })
    
        const link = await client.user.setAvatar("http://localhost:4000", TOKEN, "65a7e0c367c3fa98fedd37b6", formData)
        console.log("Avatar link: ", link)

        client.on(EventList.User.SetAvatar, (result) => {
            if (result.error) return console.error("Error:", result.error);
            console.log("Avatar set:", result);
        })
        
    } catch (error) {
        console.log(error)
        return error;
    }
}