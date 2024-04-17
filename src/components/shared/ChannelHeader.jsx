import { RevochatContext } from "@/context/context";
import { BsArrowLeft, BsTelephone, BsCameraVideo  } from "react-icons/bs";
import { useContext, useEffect, useState } from "react";
import Avatar from "./Avatar";
import { VideoPlayer } from "../VideoPlayer";

const ChannelHeader = () => {

    const { selectedChannel, currentUser } = useContext(RevochatContext);
    const [loading, setLoading] = useState(true);
    const [callModal, setCallModal] = useState(false);

    useEffect(() => {
        if(!selectedChannel.members) return;
        setLoading(false)
    }, [selectedChannel])

    if(loading) return null;

    const member = selectedChannel.members.filter(member => member.user_id !== currentUser.user_id)[0]

    const call = (member) => {
        console.log("Calling", member)
        setCallModal(!callModal)
    }
    
    return (
        <div className='w-full h-24 flex items-center justify-between'>
            <div className="flex items-center gap-6">
                <BsArrowLeft size={26} className="text-white" />
                <Avatar user={member} className="h-14 w-14" />
                <div className="flex flex-col">
                    <span className="font-semibold text-[#F8871F] capitalize"> {member?.username || "Jhon Abraham"} </span>
                    <p className="text-xs text-white italic capitalize"> {member?.status || "offline"} </p>
                </div>
            </div>
            <div className="flex items-center gap-6">
                <BsTelephone size={30} className="text-white cursor-pointer" />
                <BsCameraVideo size={30} className="text-white cursor-pointer"  onClick={()=>call(member)} />
            </div>
            {callModal && (
            <div className="absolute left-1/2 top-20 h-fit w-fit z-40">
                <div className="bg-gray-200">
                 <VideoPlayer />
                </div>
            </div>
            )}
        </div>
    );
}

export default ChannelHeader;