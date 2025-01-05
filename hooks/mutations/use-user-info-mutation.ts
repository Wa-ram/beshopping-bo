import { useMutation } from "@tanstack/react-query";
import { getUserInfo } from "@/lib/api/users";

export function useUserInfoMutation() {
  return useMutation({
    mutationFn: getUserInfo,
  });
}