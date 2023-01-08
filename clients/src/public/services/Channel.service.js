import axios from 'axios'

// const APP_URL = process.env.APP_URL

export default{
    
    createChannel(token, channel_name){
       return axios.get(`http://localhost:3000/api/v1/channel/create/${token}/${channel_name}`)
        .then(res=>res.json())
        .catch(err=>console.log(err))
    },
    getChannel(token, channel_id){
       return axios.get(`http://localhost:3000/api/v1/channel/get/${token}/${channel_id}`)
        .then(res=>res.json())
        .catch(err=>console.log(err))
    },
    getChannels(token, server){
       return axios.get(`http://localhost:3000/api/v1/server/getChannels/${token}/${server}`)
        .then(res=>res.json())
        .catch(err=>console.log(err))
    },
    joinChannel(token, channel_id){
       return axios.get(`http://localhost:3000/api/v1/channel/join/${token}/${channel_id}`)
        .then(res=>res.json())
        .catch(err=>console.log(err))
    },

   
}