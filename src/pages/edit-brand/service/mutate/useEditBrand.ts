import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";

export const useEditBrand = (brandId: string) => {
  return useMutation({
    mutationFn: (data: FormData) =>
      request
        .put(`/brand/${brandId}/`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => res.data),
  });
};
