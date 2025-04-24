"use client";

import React from "react";
import { useFetchProfileInfo } from "@/app/(main)/api/useProfile";
import MenuSidebar from "@/components/MenuSidebar";
import { ENV } from "@/configs/environment";
import { useSetPicture, useSetUsername } from "@/lib/utils";
import { typecastProfileResponse } from "@/types/response";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import { FaUserFriends } from "react-icons/fa";
import { AiOutlineHome } from "react-icons/ai";
import { removeCookies } from "@/modules/cookies";

export default function Sidebar() {
  const { data } = useFetchProfileInfo();
  const profile = typecastProfileResponse(data?.data);
  const setUsername = useSetUsername();
  const setPicture = useSetPicture();
  const router = useRouter();

  useEffect(() => {
    if (profile) {
      setUsername(profile.username);
      setPicture(profile.image_url || "");
    }
  }, [profile, setUsername, setPicture, data]);

  const menuItems = [
    { menu: "Home", icon: AiOutlineHome, redirect: "/" },
    { menu: "Friends", icon: FaUserFriends, redirect: "/i/friends" },
    { menu: "Profile", icon: CgProfile, redirect: `/${profile?.username}` },
  ];

  return (
    <div className="hidden md:flex flex-col w-[20%] h-[calc(100vh-3.5rem)] mt-[3.5rem] bg-white border-r border-gray-100 fixed">
      {/* Profile */}
      <div
        className="flex items-center p-4 hover:bg-blue-50/50 transition-all duration-300 cursor-pointer group"
        onClick={() => router.push(`/${profile?.username}`)}
      >
        {profile?.image_url ? (
          <Image
            src={ENV.URI.BASE_IMAGE_URL + profile?.image_url}
            alt={profile?.image_url}
            width={48}
            height={48}
            className="rounded-xl object-cover shadow-sm group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-300">
            <Image
              src="/user.svg"
              alt="avatar"
              width={28}
              height={28}
              className="text-blue-400"
            />
          </div>
        )}
        <div className="flex-1 ml-3">
          <p className="font-semibold text-[15px] text-gray-800 group-hover:text-blue-600 transition-colors">
            {profile?.name && profile.name.length > 20
              ? `${profile.name.slice(0, 20)}...`
              : profile?.name}
          </p>
          <p className="text-[13px] text-gray-500 group-hover:text-blue-400 transition-colors">{"@" + profile?.username}</p>
        </div>
      </div>

      {/* Menu Items */}
      <div className="flex flex-col space-y-1 p-3">
        {menuItems.map((item, index) => (
          <button
            key={index}
            className="flex items-center space-x-4 p-4 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent transition-all duration-300 w-full text-left group"
            onClick={() => router.push(item.redirect)}
          >
            <div className="bg-blue-50 p-2 rounded-lg group-hover:bg-blue-100 transition-colors duration-300">
              <item.icon className="text-[1.4rem] text-blue-600" />
            </div>
            <span className="font-medium text-[15px] text-gray-700 group-hover:text-blue-600 transition-colors duration-300">{item.menu}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
