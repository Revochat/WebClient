import { LogOut, PlusSquare } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';


const revochatServer = {
  id: 0,
  name: 'Revochat',
  avatar: '/logo.svg',
};


// Liste de noms de serveurs
const servers = [
  {
    id: 1,
    name: 'Server 1',
    avatar: '/X.svg',
  },
  {
    id: 2,
    name: 'Server 2',
    avatar: 'https://picsum.photos/200/300',
  },
  {
    id: 3,
    name: 'Server 3',
    avatar: 'facebook.svg',
  },
  {
    id: 4,
    name: 'Server 4',
    avatar: '/google.svg',
  },
  {
    id: 5,
    name: 'Server 5',
    avatar: '/attachment.svg',
  },
  {
    id: 6,
    name: 'Server 6',
    avatar: 'https://picsum.photos/200/300',
  },
  {
    id: 7,
    name: 'Server 7',
    avatar: 'https://picsum.photos/200/300',
  },
  {
    id: 8,
    name: 'Server 8',
    avatar: 'https://picsum.photos/200/300',
  },
  {
    id: 9,
    name: 'Server 9',
    avatar: 'https://picsum.photos/200/300',
  },
  {
    id: 10,
    name: 'Server 10',
    avatar: 'https://picsum.photos/200/300',
  },
  {
    id: 11,
    name: 'Server 11',
    avatar: 'https://picsum.photos/200/300',
  },
  {
    id: 12,
    name: 'Server 12',
    avatar: 'https://picsum.photos/200/300',
  },
  {
    id: 13,
    name: 'Server 13',
    avatar: 'https://picsum.photos/200/300',
  },
  {
    id: 14,
    name: 'Server 14',
    avatar: 'https://picsum.photos/200/300',
  },
  {
    id: 15,
    name: 'Server 15',
    avatar: 'https://picsum.photos/200/300',
  },
  {
    id: 16,
    name: 'Server 16',
    avatar: 'https://picsum.photos/200/300',
  },
  {
    id: 17,
    name: 'Server 17',
    avatar: 'https://picsum.photos/200/300',
  },
  {
    id: 18,
    name: 'Server 18',
    avatar: 'https://picsum.photos/200/300',
  },
  {
    id: 19,
    name: 'Server 19',
    avatar: 'https://picsum.photos/200/300',
  },
 
];

const ServerList = () => {
  const [activeServer, setActiveServer] = useState(null);
  const router = useRouter();

  useEffect(() => {
    setActiveServer(0);
  }, []);

  const handleServerClick = (serverId) => {
    console.log('serverId', serverId);
    setActiveServer(serverId);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/auth/login')
  };

  return (
    <div className="h-screen overflow-hidden w-20 bg-[#0E0E15] items-center">
      <div className='w-full h-full flex flex-col justify-between items-center'>
        <div className='mt-4 max-h-[90%] w-full flex flex-col items-center'>
          <ServerItem server={revochatServer} handleServerClick={handleServerClick} activeServer={activeServer} />
          <div className='mt-14 pt-2 max-h-[72%] overflow-auto scrollbar-hidden w-full flex flex-col gap-3 items-center'>
            {servers.map((server) => (
              <ServerItem server={server} handleServerClick={handleServerClick} activeServer={activeServer} />
            ))}
          </div>
            <PlusSquare size={54} className='text-white cursor-pointer mt-2 hover:scale-105 transition-all' />
        </div>
        <div className='text-white mb-8'>
            <LogOut size={30} className='text-white cursor-pointer' onClick={handleLogout} />
        </div>
      </div>
    </div>
  );
};


const ServerItem = ({ server, handleServerClick, activeServer }) => {

  const [ isHovered, setIsHovered ] = useState(false)

  return (
    <li key={server.id} className="transition-all duration-500 list-none">
      <div className="relative flex items-center">
        <div
          className={`absolute right-0 bottom-0 flex items-center justify-center bg-red-500 text-white rounded-full p-1 z-10 text-xs h-4 w-4 `}
          onClick={() => handleServerClick(server.id)}
        >
          2
        </div>
        <div className='relative flex w-12 h-12'>
        <div className={`w-[5px] rounded-md my-auto bg-orange-400 ${activeServer === server.id ? 'orange-bar' : 'no-transition'}`}></div>
          <img
            className={`rounded-lg overflow-hidden object-cover ml-1 w-[80%] h-[80%] my-auto transform hover:scale-105 transition-transform  border border-transparent cursor-pointer`}
            src={server.avatar}
            alt={server.name}
            onClick={() => handleServerClick(server.id)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          />
          {isHovered && <div className={`absolute items-center left-14 z-10 transition-all bg-black text-white px-4 py-2 rounded-md w-fit`}>
           <span className='flex whitespace-nowrap'>{server.name}</span> 
          </div>}
        </div>
        
      </div>
    </li>
)};

export default ServerList;