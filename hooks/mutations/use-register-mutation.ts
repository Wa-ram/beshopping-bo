import { useMutation } from "@tanstack/react-query";
import { register } from "@/lib/api/auth";
import { RegisterFormValues } from "@/lib/types/auth";

export function useRegisterMutation() {
  return useMutation({
    mutationFn: (values: RegisterFormValues) => register(values),
  });
}