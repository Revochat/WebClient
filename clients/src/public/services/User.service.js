import axios from 'axios'

// const APP_URL = process.env.APP_URL

export default{
    
    register(username, password){
       return axios.get(`http://localhost:3000/api/client/register/${username}/${password}`)
        .then(res=>res.json())
        .catch(err=>console.log(err))
    },

    login(wallet){
       return axios.post(`http://localhost:3000/api/client/connect/${wallet}`)
        
    }
}