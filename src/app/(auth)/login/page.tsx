"use client";

import Input from "@/components/Input";
import { LoginProps } from "@/types/FormProps";
import Image from "next/image";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useLogin } from "../api/useLogin";
import { useRouter } from "next/navigation";
import { parseFormData } from "@/lib/utils";
import Link from "next/link";

export default function Home() {
  const methods = useForm<LoginProps>();
  const router = useRouter();

  const mutation = useLogin({
    onSuccess: () => {
      toast.success("Login Success");
      router.push("/");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit: SubmitHandler<LoginProps> = async (data) => {
    const formData = parseFormData(data);
    await mutation.mutateAsync(formData);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-900">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="hidden md:block absolute inset-0 bg-[url('/bg.png')] bg-cover bg-center bg-no-repeat opacity-70"></div>
      </div>
      
      {/* Form Container*/}
      <div className="relative z-20 w-full max-w-md px-8 py-10 bg-gray-800/90 backdrop-blur-sm rounded-lg shadow-xl mx-4 md:mx-0 border border-gray-700">
        <div className="text-center mb-8">
          {/* Logo */}
          <div className="flex justify-center mb-4">
            <Image 
              src="/logo.svg" 
              alt="Company Logo"
              width={80} 
              height={80}
              className="w-auto h-16"
              priority
            />
          </div>
          <h1 className="text-3xl font-bold text-white">Welcome Back!</h1>
          <p className="mt-2 text-gray-300">
            Sign in to your account to continue
          </p>
        </div>

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Input
              className="mt-4 [&>label]:text-white [&>input]:text-white"
              id={"username"}
              label={"Username"}
              validation={{
                required: "Username is required",
                minLength: {
                  value: 3,
                  message: "Username must be at least 3 characters long",
                },
              }}
            />
            <Input
              className="mt-4 [&>label]:text-white [&>input]:text-white"
              id={"password"}
              label={"Password"}
              type={"password"}
              validation={{
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              }}
            />

            <button
              type="submit"
              className="w-full px-4 py-3 mt-6 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="font-medium text-blue-400 hover:text-blue-300 transition duration-200"
              >
                Register
              </Link>
            </p>
          </div>
        </FormProvider>
      </div>
    </div>
  );
}