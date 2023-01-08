import React, { createContext, useContext, useState } from 'react'
import AuthService from '../../../public/services/Auth.service'
// import UserService from '../../../public/services/User.service'
import { useRouter } from 'next/router';
// import { useAuth } from '../../pages/Context'
import AlertMessage from '../../../public/components/utilities/AlertMessage';
import { RevochatContext } from '../../../public/context/context';


export default function LoginForm() {
    
  const {currentUser, setCurrentUser}  = useContext(RevochatContext)

    // const {login} = useAuth()
    const router = useRouter();

    const [username, setUsername] = useState('')
    const [password, setPasssword] = useState('')
    const [message, setMessage] = useState('')

    const [alert, setAlert] = useState('')


    const handleForm = () => {

        // let form = {
        //     email: email,
        //     password: password
        // }
        if(username && password){
            AuthService.login(username, password)
            .then((res) => {
                if(res){
                  setAlert('success')
                  setUsername('')
                  setPasssword('')
                   localStorage.setItem('token', JSON.stringify(res.data.data.token))
                  setCurrentUser(res.data.data)
                  //  login();
                   router.push('/chat');
            }
            else{
                setMessage('Email or password incorrect !')
                setAlert('error')
            }

            })
            .catch((err) => {
                setAlert('error')
    })
        }
        else {
            setMessage('Fill empty fields !')
            setAlert('error')
        }

   
    }
  return (
    <div className='mx-auto  '>
        <h2 className='title font-bold mt-32 text-center text-2xl'>LoginForm</h2>
        <div className='bg-green-100 mx-auto border rounded-2xl mt-4 card shadow-md elevation-2' style={{width: '40%', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)'}}>
         <div className='mx-8 mt-4 flex-col '>
            <label className='block text-gray-700 text-sm font-bold mt-2' htmlFor="username">USERNAME :</label><br/>
            <input className='shadow appearance-none border rounded w-full p-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' value={username} type="text" onChange={(e) => setUsername(e.target.value)} /><br/>
            
            <label className='block text-gray-700 text-sm font-bold mt-2' htmlFor="password">PASSWORD :</label><br/>
            <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' value={password} type="password" onKeyDown={(e) => e.key==='Enter' && handleForm()}  onChange={(e) => setPasssword(e.target.value)} /><br/>

            <div className='flex justify-center'>
                <button className='mt-4 text-center mx-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' onClick={() => handleForm()}> Login </button>
            </div>

            <div className='flex justify-between'>
                    <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 pb-2" href="/auth/register">
                        Register
                    </a>
                
                <a className="inline-block align-baseline font-bold text-sm text-blue-500  hover:text-blue-800 pb-2">
                    Forgot Password?
                </a>
            </div>
            {currentUser && <span> {currentUser.username}</span> }
         </div>

        {alert=='success' &&
            <div className='flex justify-center pt-6'>
            <AlertMessage type='success'>
                <div className='flex justify-between'>
                   Login success ! <span onClick={()=> setAlert('')} className='cursor-pointer '>X</span>
                </div>
                
            </AlertMessage>
            </div>
        }

        {alert=='error' &&
            <div className='flex justify-center pt-6'>
            <AlertMessage type='error'>
                <div className='flex justify-between'>
                    {message} <span  onClick={()=> setAlert('')} className=' cursor-pointer'>X</span>
                </div>
                
            </AlertMessage>
            </div>
        }
        </div> 

    </div>
  )
}
