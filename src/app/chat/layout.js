"use client";
import MenuBar from "@/components/layouts/MenuBar";
import ServerList from "@/components/layouts/ServerList";

const Layout = ({ children }) => {
    return (
        <div className='h-screen w-screen flex'>
            <div className='flex'>
                <ServerList />
                <MenuBar />
            </div>
            <div className='w-full h-full bg-[#1E1E1E]'>
                {children}
            </div>
        </div>
    );
}

export default Layout;