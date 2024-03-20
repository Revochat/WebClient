// "use server";
import EventList from "@/context/EventList";
import { Revochat } from "@revochat/revochat-client";

export const sendMessage = async (token, channel_id, message) => {
    console.log("Socket - sendMessage()")
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
            console.log("Sending message...")
            client.message.send({channel_id: channel_id, message: message})
        })
        
        // client.on(EventList.Message.Send, (message) => {
        //     if(message.error) return console.log(message.error)
        //     console.log(message)
        // })
        
    } catch (error) {
        console.log(error)
        return error;
    }
}

export const receiveMessages = (token, callback) => {
    console.log("Socket - receiveMessages()");
    try {
        const TOKEN = token;
        if (!TOKEN) throw new Error("USER1_TOKEN is not defined in .env file");

        const URL = "ws://localhost:3001";
        if (!URL) throw new Error("URL is not defined in .env file");

        const client = new Revochat.Client({
            url: URL,
            debug: true,
        });

        client.login(TOKEN); // login with token

        client.on(EventList.User.Connect, (user) => {
            if (user.error) {
                console.error(user.error);
                return;
            }
            console.log("Connected as " + user.username + " (" + user.user_id + ")");
            console.log("You have " + user.friends.length + " friends");
        });

        client.on(EventList.Message.Send, (message) => {
            if (message.error) {
                console.error(message.error);
                return;
            }
            console.log("Received message:", message);
            // If you want to do something with the received message,
            // you can pass it to the callback function
            if (typeof callback === 'function') {
                callback(message);
            }
        });


    } catch (error) {
        console.error(error);
        return error;
    }
};

