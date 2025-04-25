/* eslint-disable @typescript-eslint/no-explicit-any */
import { IoMdSend } from "react-icons/io";
import { useEffect, useRef } from "react";
import { useUpdateFest } from "@/app/(main)/api/useFest";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { FestProps } from "@/types/FormProps";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

interface FormUpdatePostProps {
  handleClose: () => void;
  data: string;
  id: number;
}

export default function FormUpdatePost({
  handleClose,
  data,
  id,
}: FormUpdatePostProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const refetch = useQueryClient()

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

  const methods = useForm<FestProps>({
    defaultValues: {
      text: data,
    },
  });

  const { register } = methods;

  const mutation = useUpdateFest({
    id: id,
    onSuccess: () => {
      toast.success("Fest updated successfully!");
      refetch.invalidateQueries({ queryKey: ["fetch.fests"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit: SubmitHandler<FestProps> = async (formData: any) => {
    handleClose();
    await mutation.mutateAsync(formData);
  };

  return (
    <div className="bg-black/30 fixed inset-0 flex justify-center items-center z-50">
      <div
        className="bg-white w-full max-w-[40rem] p-4 shadow-lg rounded-2xl"
        ref={divRef}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="border-b-[1px] border-slate-300 pb-2 text-lg font-bold">
          Edit Your Post
        </h3>
        <div className="w-full h-fit">
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(handleSubmit)}>
              <textarea
                className="resize-none w-full h-[10rem] p-2 bg-transparent outline-none my-2"
                id="text"
                placeholder="What do you think?"
                {...register("text", {
                  required: "This field is required",
                  minLength: {
                    value: 1,
                    message: "Minimum length is 1 characters",
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
                  borderTop: "1px solid #ccc",
                  padding: "10px 0",
                }}
              >
                <button
                  type="submit"
                  className="flex justify-center items-center gap-2 mt-2 bg-blue-600 text-white p-2 px-4 rounded-lg hover:bg-blue-500 duration-200 transition-all ease-in-out cursor-pointer"
                >
                  <IoMdSend /> Update
                </button>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}
