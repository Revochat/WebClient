import React, { useState } from 'react';
import { FaPlus } from "react-icons/fa";

// Bouton ajouter un serveur
const addButton = [
  {
    name: 'add server',
    avatar: '',
  },
];

// Liste de noms de serveurs
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
  const [activeServer, setActiveServer] = useState(null);

  const handleServerClick = (serverId) => {
    console.log('serverId', serverId);
    setActiveServer(serverId);
  };

  return (
    <div className="h-full w-20 bg-[#0E0E15] rounded-sm">
      {/* <h1>ServerList</h1> */}
      <ul className='mt-4'>
        {servers?.map((server) => (
          <ServerItem key={server.id} server={server} handleServerClick={handleServerClick} activeServer={activeServer} />
        ))}

        <div className='mt-8'>
        {addButton.map((button, index) => (
          <li key={index} className="group transition-all duration-500">
            <div className="relative flex items-center mb-5 ml-5">
              <div
                className={`relative flex items-center justify-center bg-[#1E1F25] text-white rounded-lg p-1 z-10 text-xs h-12 w-12 border-4 border-transparent cursor-pointer transition-all duration-300 hover:border-white active:ring active:ring-white active:ring-opacity-50 ${
                  activeServer === 'addButton' ? 'border-4 border-white' : ''
                }`}
                onClick={() => handleServerClick('addButton')}
              >
                <FaPlus size={22} />
              </div>
              <div className="absolute left-12 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-black text-white px-4 py-2 rounded-md whitespace-no-wrap w-32">
                {button.name}
              </div>
            </div>
          </li>
        ))}
        </div>
      </ul>
    </div>
  );
};


const ServerItem = ({ server, handleServerClick, activeServer }) => (
    <li key={server.id} className="transition-all duration-500">
      <div className="relative flex items-center mb-5 ml-5">
        <div
          className={`absolute right-2 bottom-0 flex items-center justify-center bg-red-500 text-white rounded-full p-1 z-10 text-xs h-4 w-4 ${
            activeServer === server.id ? 'border-2 border-white' : ''
          }`}
          onClick={() => handleServerClick(server.id)}
        >
          2
        </div>
        <div className='relative flex w-12 h-12'>
          <img
            className={`rounded-lg overflow-hidden object-cover w-full h-full hover:animate-pulse transform hover:scale-125 focus:scale-125 active:scale-125 transition-transform hover:border-white border border-transparent cursor-pointer ${
              activeServer === server.id ? 'border-2 border-white' : ''
            }`}
            src={server.avatar}
            alt={server.name}
            onClick={() => handleServerClick(server.id)}
          />
          <div className="absolute left-12 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-black text-white px-4 py-2 rounded-md whitespace-no-wrap w-32">
            {server.name}
          </div>
        </div>
        
      </div>
    </li>
);

export default ServerList;