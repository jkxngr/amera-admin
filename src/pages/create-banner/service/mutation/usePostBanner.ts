import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";
import { BannerType } from "../../../../components/bannerForm";
export const usePostBanner = () => {
  return useMutation({
    mutationFn: (data: FormData) =>
      request
        .post<BannerType>("/banner/", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => res.data),
  });
};
