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

const USER_KEY = ["user"];

function useAfterLogin() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return async () => {
    await queryClient.fetchQuery({
      queryKey: USER_KEY,
      queryFn: getMe,
      staleTime: 0,
    });

    router.push("/");
    router.refresh();
  };
}

export function useLogin() {
  const afterLogin = useAfterLogin();

  return useMutation({
    mutationFn: userLogin,
    onSuccess: afterLogin,
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
    onSettled: () => {
      queryClient.clear();
      router.push("/login");
      router.refresh();
    },
  });
}

export function useGoogleOAuth() {
  const afterLogin = useAfterLogin();

  return useMutation({
    mutationFn: googleOAuth,
    onSuccess: afterLogin,
  });
}

export function useGetMe() {
  return useQuery({
    queryKey: USER_KEY,
    queryFn: getMe,
    retry: false,
  });
}
