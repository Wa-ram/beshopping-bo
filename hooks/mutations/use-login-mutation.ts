import { useMutation } from "@tanstack/react-query";
import { login } from "@/lib/api/auth";
import { LoginFormValues } from "@/lib/types/auth";

export function useLoginMutation() {
  return useMutation({
    mutationFn: (values: LoginFormValues) => login(values),
  });
}