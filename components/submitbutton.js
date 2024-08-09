"use client";
import arrowimage from '../public/icons/Arrow 1.svg';
import Image from 'next/image';
export default function Submitbutton(props) {
    return (
        <button onClick={props.handleSignIn}
            className={`${props.message==='Share'?'':'mt-6'} flex flex-row items-center justify-between w-full bg-yellow-500 rounded-md cursor-pointer`}>
            <div
                className="text-white text-center py-2 flex-grow text-lg font-semibold">
                {props.message}
            </div>
            <div className="px-4">
                <Image src={arrowimage} width={20} height={0} alt='-->'></Image>
            </div>
        </button>
    )
}
