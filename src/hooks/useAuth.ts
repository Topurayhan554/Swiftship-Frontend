import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { userLogin } from "@/api";

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
