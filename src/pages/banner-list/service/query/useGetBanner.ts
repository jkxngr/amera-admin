import { request } from "../../../../config/request";
import { useQuery } from "@tanstack/react-query";
export const useGetBanner = () => {
  return useQuery({
    queryKey: ["banner"],
    queryFn: () => request.get("/banner/").then((res) => res.data),
  });
};
