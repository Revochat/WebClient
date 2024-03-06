import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import authApi from '@/apis/auth.api';
import { useRouter } from 'next/navigation';
import { DefaultLoader } from '../utils/Loaders';

const RegisterComponent = () => {

    const router = useRouter()
    const [user, setUser] = useState({
        username: "",
        password: ""
    })
    const [confirm_password, setConfirmPassword] = useState("")

    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState(false)
    const [message, setMessage] = useState('')
    const [loader, setLoader] = useState(false)


    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = () => {
        setMessage('')
        setError(false)
        setLoader(true)
        if(user.password !== confirm_password) {
            setError(true)
            setLoader(false)
            setMessage('Vos mots de passe ne correspondent pas')
            return
        }
        authApi.register(user)
        .then(res => {
            console.log(res)
            setLoader(false)
            router.push('/')
        })
        .catch(err => {
            console.log(err)
            setError(true)
            setLoader(false)
            setMessage('Une erreur est survenue')
        })
        
    }

    return (
        <div className='relative w-full h-full flex justify-center'>
           <img src="/logo.svg" alt="logo" className='absolute top-20 left-20 w-28 h-28 cursor-pointer' onClick={() => router.push('/')} />
           <div className='w-[520px] self-center flex flex-col gap-2'>
            <div className='text-center flex flex-col gap-3'>
                <h2 className='font-bold text-black text-2xl'>Sign Up for Revochat</h2>
                <p className='font-normal text-sm text-gray-400'>Get chatting with friends and family <br/> today by signing up for our chat app!</p>
            </div>
          
            <div className='flex flex-col gap-5 mt-10 w-full'>
                <div className='w-full px-8'>
                    <label htmlFor="username" className='text-primary font-semibold'>Your email</label>
                    <input
                        value={user.username}
                        name="username" 
                        type="text" 
                        className='w-full px-3 py-2 border-b border-gray-400 outline-none font-semibold bg-transparent'
                        onChange={handleChange}
                    />
                </div>
                <div className='w-full px-8 relative'>
                    <label htmlFor="password" className='text-primary font-semibold'>Password</label>
                    <input
                        value={user.password}
                        name="password" 
                        type={showPassword ? 'text' : 'password'} 
                        className='w-full px-3 py-2 border-b border-gray-400 outline-none font-semibold bg-transparent'
                        onChange={handleChange}
                    />
                    <span className='absolute right-8 top-8 cursor-pointer' onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <FaEyeSlash size={22}/> : <FaEye size={22} />}
                    </span>
                </div>
                <div className='w-full px-8'>
                    <label htmlFor="confirm_password" className='text-primary font-semibold'>Confirm Password</label>
                    <input
                        value={confirm_password}
                        name="confirm_password" 
                        type="text" 
                        className='w-full px-3 py-2 border-b border-gray-400 outline-none font-semibold bg-transparent'
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
            </div>
            <div className='flex justify-center mt-20 flex-col gap-2 items-center'>
                <button className='w-4/6 rounded-xl text-white bg-primary py-2 hover:opacity-80' onClick={handleSubmit}>Create an account</button>
                <span>Already have an account ? <span className='text-[#24786D] font-semibold cursor-pointer hover:opacity-80' onClick={() => router.push('/auth/login')}>Log In</span></span>
            </div>
           
           <div className='flex flex-col justify-center text-center items-center'>
                {loader && <DefaultLoader/> }
                {error && <p className='text-red-500 font-semibold'> {message} </p>}
           </div>

           </div>
        </div>
    );
}

export default RegisterComponent;
