"use client";

import ProfileHeader from "@/containers/ProfileHeader";
import { useFetchFestbyUsername } from "../api/useFest";
import { typecastFestResponse } from "@/types/response";
import PostCard from "@/components/Card/PostCard";
import { useParams } from "next/navigation";
import LoadingComp from "@/components/Loading";

export default function Profile() {
  const username = useParams().username;
  const { data, isLoading } = useFetchFestbyUsername(username as string, 50, 1);
  const fests = typecastFestResponse(data?.data);

  return (
    <div className="flex flex-col gap-5 w-full items-center flex-1">
      <div className="w-full">
        <ProfileHeader />
      </div>

      <div className="w-full max-w-[600px] px-4">
        {/* Loading */}
        {isLoading && <LoadingComp />}

        {/* No Post */}
        {!isLoading && fests?.filter((fest) => !fest.is_deleted).length === 0 && (
          <div className="flex flex-col gap-2 items-center justify-center w-full h-full">
            <p className="text-xl opacity-20 font-semibold">No Post</p>
          </div>
        )}

        {/* Post Card */}
        <div className="flex flex-col gap-4 w-full">
          {fests?.map(
            (fest) =>
              !fest.is_deleted && (
                <PostCard
                  key={fest.id}
                  content={fest.text}
                  like={fest.total_likes}
                  id={fest.id}
                  name={fest.user.name}
                  username={fest.user.username}
                  picture_url={fest.user.image_url || ""}
                />
              )
          )}
        </div>
      </div>
    </div>
  );
}
