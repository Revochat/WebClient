import { Button } from '@mui/material'
import React, { useContext } from 'react'
import { RevochatContext } from '../context/context'

const currentAccount = '0x87905ddf554545487e88fds7878f8ffg'

export default function Wallet() {
  const { currentAccount, connectWallet, currentUser } = useContext(RevochatContext)
  return (
    <Button className='overflow-x-hidden text-ellipsis text-white'  onClick={() => connectWallet()} >
        {currentAccount && currentAccount.slice(0,8) }...{currentAccount.slice(38)}
    </Button>
  )
}
