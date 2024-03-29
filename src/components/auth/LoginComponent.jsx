import React, { useContext, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import authApi from '@/apis/auth.api';
import { useRouter } from 'next/navigation';
import { DefaultLoader } from '../utils/Loaders';
import { RevochatContext } from '@/context/context';
import Image from 'next/image';

const LoginComponent = () => {

    const router = useRouter()
    const { logUser } = useContext(RevochatContext);
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
    const handleKeyDown = (e) => {
        console.log(e.key)
        if(e.key === 'Enter') {
            handleSubmit()
        }
    }

    const handleSubmit = () => {
        setLoader(true)
        setError(false)
        authApi.login(user)
        .then(res => {
            setLoader(false)
            localStorage.setItem('token', res.data.user.token)
            logUser()
            router.push('/chat')
        })
        .catch(err => {
            console.log(err)
            setError(true)
            setLoader(false)
        })
        
    }

    return (
        <div className='relative w-full h-full flex justify-center'>
           <img src="/logo.svg" alt="logo" className='absolute top-20 left-20 w-28 h-28 cursor-pointer' onClick={() => router.push('/')} />
           <div className='w-[520px] flex flex-col gap-2 self-center'>
            <div className='text-center flex flex-col gap-3'>
                <h2 className='font-bold text-white text-2xl'>Log In to Revochat</h2>
                <p className='font-normal text-sm text-orange-400'>Welcome back ! Sign in using your <br/> social account or email to continue us</p>
            </div>
            <div className='mt-10 flex justify-center gap-6'>
                <Image width={20} height={20} className='rounded-full bg-white w-[52px] border-black p-[10px] border cursor-pointer' src="/facebook.svg" alt="facebook" />
                <Image width={20} height={20} className='rounded-full bg-white w-[52px] border-black p-[10px] border cursor-pointer' src="/google.svg" alt="google" />
                <Image width={20} height={20} className='rounded-full bg-white w-[52px] border-black p-[10px] border cursor-pointer' src="/X.svg" alt="X" />
            </div>
            <div className='flex justify-center mt-4 gap-3 items-center'>
                <hr className="w-[40%] h-[1px] bg-black mx-0 my-[10px]" /> <span className='text-gray-400'>OR</span> <hr className="w-[40%] h-[1px] bg-black mx-0 my-[10px]" />
            </div>

            <div className='flex flex-col gap-5 mt-10 w-full'>
                <div className='w-full px-8'>
                    <label htmlFor="username" className='text-white font-semibold'>Username</label>
                    <input
                        value={user.username}
                        name="username" 
                        type="text" 
                        className='w-full px-3 py-2 border-b border-gray-400 outline-none font-semibold bg-transparent text-zinc-200'
                        onChange={handleChange}
                    />
                </div>
                <div className='w-full px-8 relative'>
                    <label htmlFor="password" className='text-white font-semibold'>Password</label>
                    <input
                        value={user.password}
                        name="password" 
                        type={showPassword ? 'text' : 'password'} 
                        className='w-full px-3 py-2 border-b border-gray-400 outline-none font-semibold bg-transparent text-zinc-200'
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                    />
                    <span className='absolute right-8 top-8 cursor-pointer text-white' onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <FaEyeSlash size={22}/> : <FaEye size={22} />}
                    </span>
                </div>
            </div>
            <div className='flex justify-center mt-20 flex-col gap-2 items-center'>
                <button className='w-4/6 rounded-xl text-white bg-primary py-2 hover:opacity-80' onClick={handleSubmit}>Log In</button>
                <span className='text-center text-orange-400 font-semibold cursor-pointer hover:opacity-80'>Forgot password ?</span>
                <span className='text-white'>Don't have an account ? <span className='text-orange-400 font-semibold cursor-pointer hover:opacity-80' onClick={() => router.push('/auth/register')}>Sign Up</span></span>
            </div>
           
           <div className='flex flex-col justify-center text-center items-center'>
                {loader && <DefaultLoader/> }
                {error && <p className='text-red-500 font-semibold'> Email or Password is invalid </p>}
           </div>

           </div>
        </div>
    );
}

export default LoginComponent;
