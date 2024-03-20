import { RevochatContext } from "@/context/context";
import { BsArrowLeft, BsTelephone, BsCameraVideo  } from "react-icons/bs";
import { useContext, useEffect, useState } from "react";
import Avatar from "./Avatar";

const ChannelHeader = () => {

    const { selectedChannel, currentUser } = useContext(RevochatContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if(!selectedChannel.members) return;
        setLoading(false)
    }, [selectedChannel])

    if(loading) return null;

    const member = selectedChannel.members.filter(member => member.user_id !== currentUser.user_id)[0]
    
    return (
        <div className='w-full h-24 flex items-center justify-between'>
            <div className="flex items-center gap-6">
                <BsArrowLeft size={26} className="text-white" />
                <Avatar user={member} className="h-14 w-14" />
                <div className="flex flex-col">
                    <span className="font-semibold text-[#F8871F] capitalize"> {member?.username || "Jhon Abraham"} </span>
                    <p className="text-xs text-white italic capitalize"> {member?.status || "offline"} </p> {member?.status}
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