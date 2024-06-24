import { request } from "../../../../config/request";
import { useQuery } from "@tanstack/react-query";
export const useGetBrand = () => {
  return useQuery({
    queryKey: ["brand"],
    queryFn: () => request.get("/brand/").then((res) => res.data),
  });
};
