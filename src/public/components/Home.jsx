import React, { useContext } from 'react'
import Link from 'next/link';
import { Context } from '../../pages/Context';
import Button from '@mui/material/Button';
import logo from '../assets/img/logo.png'
import WalletCard from '../../pages/hooks/MetaConnect';
import MetaConnect from '../../pages/hooks/MetaConnect';


export default function home() {
  
  const [Auth, setAuth] = useContext(Context);

  const WalletLogin = () => {
    console.log('log to wallet')
    // setAuth(true)
    
  }
  return (
    <div className={'mainPage mt-40 flex justify-evenly'}>
    <article>
        <h1> <span className='titleApp '>Revochat</span> - A revolusionary Chat App </h1>
        <p> Based on WEB3 | first chat app using decentralized data </p>
        {/* <Button variant="text" onClick={WalletLogin}>Connect to Wallet</Button> */}
       {/* <button type="button" onClick={WalletLogin}> Connect to Wallet </button> */}
       
       <MetaConnect/>
    </article>
   
        <img className='bg-cover' src={logo.src} alt="logo" width='500px'/>
    
    </div>

  )
}
