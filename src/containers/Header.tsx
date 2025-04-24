'use client';

import Image from "next/image";
import { MdOutlineSettings } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import { useRouter } from "next/navigation";
import { ENV } from "@/configs/environment";
import { removeCookies } from "@/modules/cookies";

export default function Header() {
  const router = useRouter();

  const handleLogout = () => {
    removeCookies(ENV.TOKEN_KEY);
    router.push("/login");
  };

  return (
    <header className="flex items-center justify-between h-[3.5rem] border-b-[1px] border-slate-200 bg-white px-4 fixed w-full top-0 z-50 shadow-sm">
      <div className="flex items-center gap-2">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => window.location.replace("/")}
        >
          <Image
            src={"/logo.svg"}
            alt={"logo"}
            width={100}
            height={100}
            className="w-[2.5rem] h-[2.5rem] rounded-full pointer-events-none select-none"
          />
        </div>
        <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2">
          <svg className="w-4 h-4 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search FestivaSync"
            className="bg-transparent outline-none w-[200px] text-sm"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button className="p-2.5 hover:bg-gray-100 rounded-full transition-all">
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </button>
        <button className="p-2.5 hover:bg-gray-100 rounded-full transition-all">
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </button>
        <button 
          onClick={() => router.push("/i/settings")}
          className="p-2.5 hover:bg-gray-100 rounded-full transition-all"
        >
          <MdOutlineSettings className="w-6 h-6 text-gray-600" />
        </button>
        <button 
          onClick={handleLogout}
          className="p-2.5 hover:bg-red-50 rounded-full transition-all group"
        >
          <IoIosLogOut className="w-6 h-6 text-gray-600 group-hover:text-red-600" />
        </button>
      </div>
    </header>
  );
}
