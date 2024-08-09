'use client';
import { useRouter } from "next/navigation";
const HomeNavBar = () => {
    const router=useRouter();
    return (
        <nav className="bg-white shadow-md p-4 flex justify-between items-center w-full fixed top-0 z-50">
            <div onClick={()=>router.push('/')} className=" cursor-pointer text-black font-bold text-xl">REDMATH</div>
            <div className="flex items-center space-x-6">
                <div className="text-black text-lg cursor-pointer" onClick={() => router.push('/signup')}>Register Now</div>
                <div className="text-black text-lg cursor-pointer" onClick={() => router.push('/login')}>Login</div>
            </div>
        </nav>
    );
};

export default HomeNavBar;
