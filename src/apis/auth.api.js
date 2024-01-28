import axios from 'axios'

const REVO_API_URL = process.env.REVO_API_URL + '/user'

export default{
    
    register(form){
       return axios.post(`${REVO_API_URL}/auth/register`, form)
        .then(res=>res)
        .catch(err=>console.log(err))
    },

    login(form){
       return axios.post(`${REVO_API_URL}/auth/login`, form)
        
    }
}