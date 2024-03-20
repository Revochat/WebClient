
const Avatar = ({ user, className }) => {


    const colorStatus = () => {
        switch (user?.status) {
            case 'online':
                return 'bg-green-500'
            case 'offline':
                return 'bg-red-500'
            case 'busy':
                return 'bg-yellow-500'
            default:
                return 'bg-red-500'
        }
    }
    
    return (
        <div className={`relative w-10 h-10 ${className}`}>
            <img className='w-full h-full rounded-full object-cover' src={user.avatar || 'https://png.pngtree.com/png-vector/20220807/ourmid/pngtree-man-avatar-wearing-gray-suit-png-image_6102786.png'} alt="avatar" />
            <div className={`absolute bottom-[2px] right-[2px] rounded-full w-2 h-2 ${colorStatus()}`}></div>
        </div>
    )

}

export default Avatar;