/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import PostCard from "@/components/Card/PostCard";
import { useFetchFest, useNewFest } from "@/app/(main)/api/useFest";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { FestProps } from "@/types/FormProps";
import toast from "react-hot-toast";
import LoadingComp from "@/components/Loading";
import { useGetPicture } from "@/lib/utils";
import { ENV } from "@/configs/environment";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export default function MainSection() {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const {
    data,
    refetch,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useFetchFest(limit, page);
  const fests = data?.pages || [];
  const methods = useForm<FestProps>();
  const { register, reset } = methods;
  const picture = useGetPicture();

  const { ref, inView } = useInView({
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage && !isLoading) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, isLoading, fetchNextPage]);

  const mutation = useNewFest({
    onSuccess: () => {
      toast.success("Post created successfully!");
      setPage(1);
      refetch();
      reset();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit: SubmitHandler<FestProps> = async (post: any) => {
    await mutation.mutateAsync(post);
  };

  return (
    <div className="flex-1 h-[calc(100vh-3.5rem)] overflow-y-auto mt-[3.5rem] bg-gray-100">
      <div className="max-w-[680px] mx-auto py-4 px-4 flex flex-col gap-4">
        {/* Create Post Card */}
        <div className="bg-white rounded-xl shadow-sm p-4">
          <h4 className="font-medium text-gray-500 mb-4">Create Post</h4>
          <FormProvider {...methods}>
            <form
              className="flex flex-col gap-3"
              onSubmit={methods.handleSubmit(handleSubmit)}
            >
              <div className="flex gap-3 items-start">
                {picture ? (
                  <Image
                    src={ENV.URI.BASE_IMAGE_URL + picture}
                    alt={picture}
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <Image
                      src="/user.svg"
                      alt="avatar"
                      width={24}
                      height={24}
                      className="text-gray-400"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <textarea
                    id="text"
                    placeholder="What's on your mind?"
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-[15px]"
                    {...register("text", {
                      required: "This field is required",
                      minLength: {
                        value: 1,
                        message: "Minimum length is 1 character",
                      },
                      maxLength: {
                        value: 1000,
                        message: "Maximum length is 1000 characters",
                      },
                    })}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg py-2 px-4 transition-colors w-full"
              >
                Post
              </button>
            </form>
          </FormProvider>
        </div>

        {/* Posts List */}
        {isLoading && fests.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <LoadingComp />
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {fests.map((page: { Kind: { data: any[] } }) =>
              page.Kind.data.map(
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
              )
            )}
          </div>
        )}

        {/* Load More */}
        <div ref={ref} className="py-4 flex justify-center">
          {isFetchingNextPage && hasNextPage ? (
            <div className="flex items-center gap-2 text-gray-500">
              <div className="w-5 h-5 border-2 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
              <span className="text-sm">Loading more posts...</span>
            </div>
          ) : !hasNextPage && fests.length > 0 ? (
            <div className="text-gray-400 text-sm">You've reached the end</div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
