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
import { usePathname, useRouter } from "next/navigation";

const USER_KEY = ["user"];

const AUTH_PAGES = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/verify-email",
];

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
      queryClient.removeQueries({ queryKey: USER_KEY });
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

export function useGetMe(options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: USER_KEY,
    queryFn: getMe,
    retry: false,
    refetchOnWindowFocus: false,
    ...options,
  });
}

export function useAuth() {
  const pathname = usePathname();
  const isAuthPage = AUTH_PAGES.some((p) => pathname.startsWith(p));

  const { data, isLoading } = useGetMe({ enabled: !isAuthPage });

  const user = data?.data ?? null;

  return {
    user,
    isLoading: isAuthPage ? false : isLoading,
    isAuthenticated: !!user,
  };
}
