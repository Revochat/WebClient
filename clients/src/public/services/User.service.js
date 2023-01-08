import axios from 'axios'

// const APP_URL = process.env.APP_URL

export default{
    
    getUSer(token){
       return axios.get(`http://localhost:3000/api/v1/client/get/user/${wallet}`)
        .then(res=>res.json())
        .catch(err=>console.log(err))
    },

   
}