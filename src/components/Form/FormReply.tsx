/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useFetchFest,
  useFetchFestbyId,
  useNewFest,
} from "@/app/(main)/api/useFest";
import { FestProps } from "@/types/FormProps";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { IoMdSend } from "react-icons/io";
import Image from "next/image";
import { ENV } from "@/configs/environment";

export default function FormReply({
  handleClose,
  parentId,
  parentUsername,
  parentName,
  parentPictureUrl,
  parentContent,
}: {
  handleClose: () => void;
  parentId: number;
  parentUsername: string;
  parentName: string;
  parentPictureUrl?: string;
  parentContent: string;
}) {
  const { postId } = useParams();
  const divRef = useRef<HTMLDivElement>(null);
  const { refetch } = useFetchFest(10, 1);
  const { refetch: refetchByPostId } = useFetchFestbyId(postId as string, 50, 1);
  const methods = useForm<FestProps>();
  const { register } = methods;
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (divRef.current && !divRef.current.contains(e.target as Node)) {
        handleClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClose]);

  const mutation = useNewFest({
    onSuccess: () => {
      toast.success("Fest created successfully!");
      refetch();
      refetchByPostId();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit: SubmitHandler<FestProps> = async (data: any) => {
    handleClose();
    console.log(data);
    data.parent_id = parentId;
    await mutation.mutateAsync(data);
  };

  return (
    <div className="bg-black/30 fixed inset-0 flex justify-center items-center z-50">
      <div
        className="bg-gray-50 w-full max-w-[40rem] p-4 shadow-lg rounded-2xl"
        ref={divRef}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center">
          <div
            className="flex align-center cursor-pointer gap-2"
            onClick={() => router.push("/" + parentUsername)}
          >
            {parentPictureUrl ? (
              <Image
                src={ENV.URI.BASE_IMAGE_URL + parentPictureUrl}
                alt={parentPictureUrl}
                width={100}
                height={100}
                draggable={false}
                className="w-[2.5rem] h-[2.5rem] rounded-full md:m-2 pointer-events-none select-none"
              />
            ) : (
              <Image
                src={"/user.svg"}
                alt={"avatar"}
                width={100}
                height={100}
                draggable={false}
                className="w-[2.5rem] h-[2.5rem] rounded-full md:m-2 pointer-events-none select-none"
              />
            )}
            <div className="flex justify-center flex-col">
              <p className="font-semibold text-sm">{parentName}</p>
              <p className="text-xs opacity-50">{"@" + parentUsername}</p>
            </div>
          </div>
        </div>

        {/* Parent Content */}
        <p className="m-2 text-left">
          {parentContent && parentContent.length > 30
            ? parentContent.slice(0, 200) + "..."
            : parentContent}
        </p>

        <h3 className="m-2 mt-4 border-b-[1px] border-slate-300 text-black/40 pb-2 text-sm">
          Replying to @{parentUsername}
        </h3>
        <div className="w-full h-fit">
          <FormProvider {...methods}>
            <form action="" onSubmit={methods.handleSubmit(handleSubmit)}>
              <textarea
                className="resize-none w-full h-[5rem] p-2 bg-white border border-gray-300 rounded-md outline-none my-2"
                id="text"
                placeholder="Write your reply..."
                {...register("text", {
                  required: "This field is required",
                  minLength: {
                    value: 1,
                    message: "Minimum length is 10 characters",
                  },
                  maxLength: {
                    value: 1000,
                    message: "Maximum length is 1000 characters",
                  },
                })}
              ></textarea>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  padding: "10px 0",
                }}
              >
                <button
                  type="submit"
                  className="flex justify-center items-center gap-2 mt-2 bg-blue-500 text-white p-2 px-4 rounded-md hover:bg-blue-600 duration-200 transition-all ease-in-out cursor-pointer"
                >
                  <IoMdSend /> Send
                </button>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}
