
import EventList from "@/context/EventList";
import { Revochat } from "@revochat/revochat-client";
import { resolve } from "styled-jsx/css";

export const getChannel = (token, channel_id) => {
    console.log("Socket - getChannel()");
    return new Promise((resolve, reject) => {
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
                    reject(user.error);
                } else {
                    console.log(user);
                    console.log("Connected as " + user.username + " (" + user.user_id + ")");
                    console.log("You have " + user.friends.length + " friends");

                    client.channel.get({ channel_id: channel_id, limit: 25 })
                        .then((message) => {
                            console.log(message);
                            resolve(message); // Resolve with the received message
                        })
                        .catch((error) => {
                            console.log(error);
                            reject(error); // Reject in case of error
                        });
                }
            });

            client.on(EventList.Channel.Get, (message) => {
                console.log(message);
                // Do not return here, as this return is scoped to the callback function
            });
        } catch (error) {
            console.log(error);
            reject(error); // Reject in case of error
        }
    });
}