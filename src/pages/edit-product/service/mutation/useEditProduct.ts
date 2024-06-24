import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";

export const useEditProduct = (productId: string) => {
  return useMutation({
    mutationFn: (data: FormData) =>
      request
        .put(`/product/${productId}/`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => res.data),
  });
};
