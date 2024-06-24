import { request } from "../../../../config/request";
import { useQuery } from "@tanstack/react-query";
export const useGetProduct = () => {
  return useQuery({
    queryKey: ["product"],
    queryFn: () => request.get("/product/").then((res) => res.data),
  });
};
