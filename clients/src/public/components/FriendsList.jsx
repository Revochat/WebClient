import React, { useContext, useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import {USERS} from '../data/Users'
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import FriendsListRow from './FriendsListRow';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));



export default function FriendsList() {

    const [search, setSearch] = useState('');
    const [nav, setNav] = useState('All');
    const [users, setUsers] = useState(USERS)
    // const [wallet, setWallet] = useContext(Context)


    useEffect(() => {
        switch (nav) {
          case 'Online':
            return setUsers(USERS.filter(x => x.status == "online"))
          case 'Offline':
            return setUsers(USERS.filter(x => x.status == "offline"))
          case 'Pending':
            return setUsers(USERS.filter(x => x.status == "pending"))
          case 'Blocked':
            return setUsers(USERS.filter(x => x.status == "blocked"))
          default:
            return setUsers(USERS)
        }

    }, [nav]);

    const searchUser = (e) => {
      setSearch(e.target.value)
      const results = users.filter(user => {
        if (search == "") return users
        return user.name.toLowerCase().includes(search.toLowerCase())
      })
      // setUsers(results)
      // console.log(users)
  }

  return (
    <div className='mt-4  h-full ml-2 border-l'>
      {/* <h1> {wallet} </h1>  */}
        <header className='flex justify-self-start text-xl font-semibold cursor-pointer'>
            <span className='mx-4'> <Diversity1Icon/> Friends</span>
            <span onClick={()=> setNav('All')} className='mx-4'> All </span>
            <span onClick={()=> setNav('Online')} className='mx-4'> Online </span>
            <span onClick={()=> setNav('Offline')} className='mx-4'> Offline </span>
            <span onClick={()=> setNav('Pending')} className='mx-4'> Pending </span>
            <span onClick={()=> setNav('Blocked')} className='mx-4'> Blocked </span>
            <span onClick={()=> setNav('AddFriend')} className='mx-4'> Add Friend </span>
        </header>
        
        <div className='mt-4 mx-4'>


        <Search className='mb-2'>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              
              onChange={(e) => {
                searchUser(e);
              }}
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          {search}
        </div>

        <div className='ml-2'>
          {nav} - {users.length}
            
              
              <Divider className='mt-2' />
        <FriendsListRow users={users} search={search}/>
       </div>
    </div>
  )
}
