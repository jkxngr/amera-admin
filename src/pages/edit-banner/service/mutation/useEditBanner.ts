import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";
import { BannerType } from "../../../../components/bannerForm";
export const useEditBanner = (bannerId: string | undefined) => {
  return useMutation({
    mutationFn: (data: FormData) =>
      request
        .put<BannerType>(`/banner/${bannerId}/`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => res.data),
  });
};
