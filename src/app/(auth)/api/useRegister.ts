/* eslint-disable @typescript-eslint/no-explicit-any */
import { post } from "@/services/api/main/call";
import { MAIN_ENDPOINT } from "@/services/api/main/endpoint";
import { useMutation } from "@tanstack/react-query";

export const useRegister = ({
  onSuccess,
  onError,
}: {
  onSuccess: (data: any) => void;
  onError: (error: any) => void;
}) => {
  return useMutation({
    mutationFn: async (body: FormData) => {
      const response = await post(MAIN_ENDPOINT.Auth.Register, body);

      if (!response || typeof response !== "object") {
        throw new Error("Invalid response from the server.");
      }

      const { Kind, OK } = response;

      if (!OK) {
        throw new Error(
          (Kind as { message: string })?.message ||
          (Kind as { Message: string })?.Message ||
          "An unknown error occurred."
        );
      }

      return Kind;
    },
    mutationKey: ["register"],
    onSuccess,
    onError,
  });
};