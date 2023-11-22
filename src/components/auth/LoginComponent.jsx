import React, { useState } from 'react';
import revochat_QR from '../../assets/images/revochat_QR.png';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import authApi from '@/apis/auth.api';
import { useRouter } from 'next/navigation';
import { DefaultLoader } from '../utils/Loaders';

const LoginComponent = () => {

    const router = useRouter()
    const [user, setUser] = useState({
        username: "",
        password: ""
    })

    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState(false)
    const [loader, setLoader] = useState(false)


    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = () => {
        setError(false)
        setLoader(true)
        authApi.login(user)
        .then(res => {
            console.log(res)
            setLoader(false)
            localStorage.setItem('token', res.data.user.token)
            localStorage.setItem('user', JSON.stringify(res.data.user))
            router.push('/')
        })
        .catch(err => {
            console.log(err)
            setError(true)
            setLoader(false)
        })
        
    }

    return (
        <div className='flex flex-col gap-8 justify-center items-center mt-40 text-white'>
            <h1 className='text-5xl font-bold uppercase'>Login</h1>
            <div className='bg-violet-400 w-3/4 xl:w-1/2 flex gap-6 p-8 items-center rounded-md shadow-xl'>
                <div className='flex flex-col gap-6 w-full text-2xl'>
                    <input 
                        name="username" 
                        type="text" 
                        placeholder='Username' 
                        className='w-full px-3 py-2 bg-gray-700 rounded-sm'
                        onChange={handleChange}
                    />
                    <div className='relative items-center'>
                        <input 
                            name="password" 
                            type={showPassword? 'password': 'text'} 
                            placeholder='Password' 
                            className='w-full px-3 py-2 bg-gray-700 rounded-sm' 
                            onChange={handleChange}
                        />
                        <div className='absolute top-0 h-full right-2 items-center flex justify-center'>
                            {showPassword? 
                                <FaEyeSlash size={28} className='cursor-pointer' onClick={() => setShowPassword(!showPassword)} />:
                                <FaEye size={28} className='cursor-pointer' onClick={() => setShowPassword(!showPassword)} />
                            }
                        </div>
                        
                    </div>
                    <div className='flex justify-center items-center pt-2'>
                        <button className='bg-blue-500 text-2xl font-bold px-4 py-2 rounded-md shadow-md' onClick={handleSubmit}>Login</button>
                    </div>
                </div>

                <div className='flex justify-center'>
                    <img src={revochat_QR.src} alt='revochat_QR' className='w-[60%]' />
                </div>
            </div>
            {loader && <DefaultLoader/> }
            {error && <p className='text-red-500 text-xl font-semibold'>Username or password is incorrect</p>}

        </div>
    );
}

export default LoginComponent;
