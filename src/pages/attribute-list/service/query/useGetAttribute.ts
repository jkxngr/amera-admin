import { request } from "../../../../config/request";
import { useQuery } from "@tanstack/react-query";
export const useGetAttribute = () => {
  return useQuery({
    queryKey: ["attribute"],
    queryFn: () => request.get("/attribute/").then((res) => res.data),
  });
};
