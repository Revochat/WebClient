import axios from 'axios'

// const APP_URL = process.env.APP_URL

export default{
    
    register(username, password){
       return axios.get(`http://localhost:3000/api/v1/client/register/${username}/${password}`)
        .then(res=>res)
        .catch(err=>console.log(err))
    },

    login(username, password){
       return axios.get(`http://localhost:3000/api/v1/client/connect/${username}/${password}`)
        
    }
}