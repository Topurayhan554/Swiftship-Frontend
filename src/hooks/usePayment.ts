import { useMutation } from "@tanstack/react-query";
import { initiatePayment, type PaymentMethod } from "@/api";

type PayVars = { parcelId: string; method: PaymentMethod };

export function usePayParcel() {
  return useMutation<string, Error, PayVars>({
    mutationFn: ({ parcelId, method }) => initiatePayment(parcelId, method),
    onSuccess: (url) => {
      window.location.assign(url);
    },
  });
}
