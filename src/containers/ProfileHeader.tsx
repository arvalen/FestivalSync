"use client";

import { useFetchProfileByUsername } from "@/app/(main)/api/useProfile";
import { typecastProfileResponse } from "@/types/response";
import { useParams } from "next/navigation";
import Image from "next/image";
import { ENV } from "@/configs/environment";
import { MdOutlineSettings } from "react-icons/md";
import { useGetUsername } from "@/lib/utils";
import { useState } from "react";
import FormUpdateProfile from "@/components/Form/FormUpdateProfile";

export default function ProfileHeader() {
  const { username } = useParams();
  const savedUsername = useGetUsername();
  const { data } = useFetchProfileByUsername(username as string);
  const profile = typecastProfileResponse(data?.data);
  const [isSettingOpen, setIsSettingOpen] = useState(false);

  return (
    <div className="bg-white shadow-sm w-full">
      {/* Cover Photo */}
      <div className="relative h-[350px] bg-gradient-to-b from-gray-100 to-gray-200 w-full">
        <div className="absolute -bottom-8 left-8 md:left-[max(2rem,calc((100%-600px)/2))] flex items-end">
          <div className="relative">
            {profile?.image_url ? (
              <Image
                src={ENV.URI.BASE_IMAGE_URL + profile.image_url}
                alt={profile?.image_url}
                width={168}
                height={168}
                className="rounded-full border-4 border-white shadow-md object-cover"
              />
            ) : (
              <div className="w-[168px] h-[168px] rounded-full border-4 border-white shadow-md bg-gray-200 flex items-center justify-center">
                <Image
                  src="/user.svg"
                  alt="Default Profile"
                  width={64}
                  height={64}
                  className="text-gray-400"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Profile Info */}
      <div className="pt-12 px-8 md:px-[max(2rem,calc((100%-600px)/2))] pb-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h1 className="text-[32px] font-bold text-gray-900 leading-8">
              {profile?.name}
            </h1>
            <p className="text-[15px] text-gray-500 mt-1">@{profile?.username}</p>
            {profile?.bio && (
              <p className="text-[15px] text-gray-700 mt-4 max-w-[680px]">
                {profile.bio}
              </p>
            )}
          </div>

          {savedUsername === username && (
            <button
              onClick={() => setIsSettingOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
            >
              <MdOutlineSettings className="text-xl text-gray-600" />
              <span className="font-medium text-[15px] text-gray-700">
                Edit Profile
              </span>
            </button>
          )}
        </div>

        {/* Profile Navigation */}
        <div className="flex items-center gap-2 mt-6 border-t">
          <button className="px-4 py-4 font-medium text-[15px] text-blue-500 border-b-2 border-blue-500">
            Posts
          </button>
          <button className="px-4 py-4 font-medium text-[15px] text-gray-600 hover:bg-gray-50">
            About
          </button>
          <button className="px-4 py-4 font-medium text-[15px] text-gray-600 hover:bg-gray-50">
            Friends
          </button>
          <button className="px-4 py-4 font-medium text-[15px] text-gray-600 hover:bg-gray-50">
            Photos
          </button>
        </div>
      </div>

      {isSettingOpen && (
        <FormUpdateProfile
          handleClose={() => setIsSettingOpen(false)}
          name={profile?.name || ""}
          bio={profile?.bio || ""}
        />
      )}
    </div>
  );
}
