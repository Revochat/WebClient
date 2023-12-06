import axios from 'axios'

const REVO_API_URL = process.env.REVO_API_URL + '/channels'

export default{

    getChannles(token){
        config.headers = { Authorization: `Bearer ${token}` }
        
        return axios.post(`${REVO_API_URL}/getChannels`)
         .then(res=>res)
         .catch(err=>console.log(err))
    },
    
    createChannel(form){
         return axios.post(`${REVO_API_URL}/create`, form)
          .then(res=>res)
          .catch(err=>console.log(err))
    },

}