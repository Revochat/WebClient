import React, { useState } from 'react'
import AuthService from '../../../public/services/Auth.service'
// import Alert from '../Utilities/Alert'

export default function RegisterForm() {

    
    const [username, setUsername] = useState('')
    const [password, setPasssword] = useState('')
    
    const [alert, setAlert] = useState('')


    const Register = () => {

        // let form = {
        //     username: username,
        //     password: password
        // }
        if(username && password){
            AuthService.register(username, password)
            .then((res) => {
                console.log(res)
                setAlert('success')
                setUsername('')
                setPasssword('')
            })
        }
        else {
            console.log("Empty Fields")
            setAlert('error')
        }

    // localStorage.setItem('Auth', true)
    // setIslogged(JSON.parse(localStorage.getItem('Auth')))
    }
  return (
    <div className='mx-auto'>
        <h1 className=' font-bold mt-24 text-center text-2xl'>RegisterForm</h1>

        <div className=' mx-auto mt-4 border rounded-2xl card shadow-md elevation-2' style={{width: '40%', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)'}}>

         <div className='mx-8 mt-4 flex-col '>
            
            <label className='block text-gray-700 text-sm font-bold mt-2' htmlFor="lastName">USERNAME :</label><br/>
            <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type="text" onChange={(e) => setUsername(e.target.value)} /><br/>

            <label className='block text-gray-700 text-sm font-bold mt-2' htmlFor="password">PASSWORD :</label><br/>
            <input className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type="password"  onChange={(e) => setPasssword(e.target.value)} /><br/>

            <div className='flex justify-center'>
                <button className='mt-4 text-center mx-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' onClick={() => Register()}> Register </button>
            </div>

            <div className='flex justify-between'>
                    <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 pb-2" href="/auth/login">
                        Login
                    </a>
                
                <a className="inline-block align-baseline font-bold text-sm text-blue-500  hover:text-blue-800 pb-2">
                    Forgot Password?
                </a>
            </div>
         </div>

        {/* {alert=='success' &&
            <div className='flex justify-center pt-6'>
            <Alert type='success'>
                <div className=''>
                    Your account have been created successfully ! <span onClick={()=> setAlert('')} className='ml-4 cursor-pointer absolute'>X</span>
                </div>
                
            </Alert>
            </div>
        }

        {alert=='error' &&
            <div className='flex justify-center pt-6'>
            <Alert type='error'>
                <div className=''>
                    Error: Please fill all fields ! <span onClick={()=> setAlert('')} className='ml-36 cursor-pointer absolute  '>X</span>
                </div>
                
            </Alert>
            </div>
        } */}
        </div> 

    </div>
  )
}
