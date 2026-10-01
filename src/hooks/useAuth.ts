import {
  getMe,
  googleOAuth,
  resendOtp,
  userLogin,
  userLogout,
  userRegistration,
  verifyAccount,
} from "@/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export function useLogin() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userLogin,
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data.data.user);
      router.push("/user");
    },
  });
}

export function useVerifyAccount() {
  return useMutation({
    mutationFn: verifyAccount,
  });
}

export function useResendOtp() {
  return useMutation({
    mutationFn: resendOtp,
  });
}

export function useRegistration() {
  return useMutation({
    mutationFn: userRegistration,
  });
}

export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userLogout,
    onSuccess: () => {
      queryClient.setQueryData(["user"], null);
      queryClient.clear();
      router.push("/login");
    },
  });
}

export function useGoogleOAuth() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: googleOAuth,
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data.data.user);
      router.push("/user");
    },
  });
}

export function useGetMe() {
  return useQuery({
    queryKey: ["user"],
    queryFn: getMe,
    retry: false,
  });
}
