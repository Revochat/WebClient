import { RevochatContext } from "@/context/context";
import { BsArrowLeft, BsTelephone, BsCameraVideo  } from "react-icons/bs";
import { useContext, useEffect, useState } from "react";
import Avatar from "./Avatar";

const ChannelHeader = () => {

    const { selectedChannel } = useContext(RevochatContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if(!selectedChannel.members) return;
        setLoading(false)
    }, [selectedChannel])

    if(loading) return null;
    
    return (
        <div className='w-full h-24 flex items-center justify-between'>
            <div className="flex items-center gap-6">
                <BsArrowLeft size={26} className="text-white" />
                <Avatar className="h-14 w-14" />
                <div className="flex flex-col">
                    <span className="font-semibold text-[#F8871F] capitalize"> {selectedChannel?.members[1]?.username || "Jhon Abraham"} </span>
                    <p className="text-xs text-white italic capitalize"> {selectedChannel?.members[1]?.status || "offline"} </p>
                </div>
            </div>
            <div className="flex items-center gap-6">
                <BsTelephone size={30} className="text-white" />
                <BsCameraVideo size={30} className="text-white" />
            </div>
        </div>
    );
}

export default ChannelHeader;