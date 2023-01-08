import axios from 'axios'

// const APP_URL = process.env.APP_URL

export default{
    
    sendMessage(token, channel_id, message){
       return axios.get(`http://localhost:3000/api/v1/channel/sendmessage/${token}/${channel_id}/${message}`)
        .then(res=>res.json())
        .catch(err=>console.log(err))
    },

   
}