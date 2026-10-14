import { useMutation } from "@tanstack/react-query";
import { initiatePayment } from "@/api";

export function usePayParcel() {
  return useMutation<string, Error, string>({
    mutationFn: initiatePayment,
    onSuccess: (url) => {
      window.location.assign(url);
    },
  });
}
