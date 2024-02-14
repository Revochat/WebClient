'use client';
import { RevochatContext } from '@/context/context';
import React, { useContext } from 'react';
import { IoIosLogOut } from "react-icons/io";
//liste de noms de servers
const servers = [
  {
    id: 1,
    name: 'Server 1',
    avatar: 'https://picsum.photos/200/300',
  },
  {
    id: 2,
    name: 'Server 2',
    avatar: 'https://picsum.photos/200/300',
  },
  {
    id: 3,
    name: 'Server 3',
    avatar: 'https://picsum.photos/200/300',
  },
  {
    id: 4,
    name: 'Server 4',
    avatar: 'https://picsum.photos/200/300',
  },
];

const ServerList = () => {

  const { setCurrentUser } = useContext(RevochatContext);

  const handleLogOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setCurrentUser(null);
    window.location.reload();
  }

  return (
    <div className="h-full w-28 bg-red-300 relative">
      {/* <h1>ServerList</h1>
      <ul>
        {servers.map(server => (
          <li key={server.id} className="group  transition-all duration-500 ">
            <div className="relative flex items-center mb-5 ml-5">
              <img
                className="rounded-full overflow-hidden w-12 h-12  hover:animate-pulse transform hover:scale-125 focus:scale-125 active:scale-125 transition-transform"
                src={server.avatar}
                alt={server.name}
              />
              <div className="absolute left-12 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-black text-white px-4 py-2 rounded-md whitespace-no-wrap w-32">
                {server.name}
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className='absolute flex justify-center items-center bottom-4 left-0 w-full'>
          <IoIosLogOut onClick={handleLogOut} className='cursor-pointer hover:scale-110 transition-all' size={26} />
      </div> */}
    </div>
  );
};

export default ServerList;
