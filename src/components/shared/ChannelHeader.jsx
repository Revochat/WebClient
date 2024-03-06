import { RevochatContext } from "@/context/context";
import { useContext } from "react";

const ChannelHeader = () => {

    const { revochatClient, selectedChannel, revoLogin } = useContext(RevochatContext);

    return (
        <div className='w-full h-16 bg-gray-500 flex items-center p-4 text-2xl font-bold'>
            <h1># {selectedChannel?.channel_name || 'Pas de channel'}</h1>
        </div>
    );
}

export default ChannelHeader;