import React, { useContext } from 'react'
import { Context } from '../../pages/Context'

export default function Wallet() {
    const [wallet, setWallet] = useContext(Context)
  return (
    <div className='overflow-x-hidden text-ellipsis' >
        {wallet}
    </div>
    // style={{maxWidth: '200px'}}
  )
}
