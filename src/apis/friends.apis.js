import axios from 'axios'
import { config } from 'next/dist/build/templates/pages'

const REVO_API_URL = process.env.REVO_API_URL + '/friends'

export default{

    getFriends(token){
        config.headers = { Authorization: `Bearer ${token}` }
        
        return axios.post(`${REVO_API_URL}/getFriends`)
         .then(res=>res)
         .catch(err=>console.log(err))
    },
    
    addFriend(form){
         return axios.post(`${REVO_API_URL}/addFriend`, form)
          .then(res=>res)
          .catch(err=>console.log(err))
    },
}