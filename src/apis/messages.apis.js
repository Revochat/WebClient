import axios from 'axios'

const REVO_API_URL = process.env.REVO_API_URL + '/messages'

export default{
    
    getMessages(form){
        return axios.post(`${REVO_API_URL}/getMessages`, form)
        .then(res=>res)
        .catch(err=>console.log(err))
    },
    
}