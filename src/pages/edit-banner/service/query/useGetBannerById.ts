import { request } from "../../../../config/request";
import { useQuery } from "@tanstack/react-query";
export const useGetBannerById = (bannerId: string | undefined) => {
  return useQuery({
    queryKey: ["banner"],
    queryFn: () => request.get(`/banner/${bannerId}/`).then((res) => res.data),
  });
};
