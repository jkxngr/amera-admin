import { request } from "../../../../config/request";
import { useQuery } from "@tanstack/react-query";
export const useGetSelectedAttribute = (id: string | undefined) => {
  return useQuery({
    queryKey: ["attribute"],
    queryFn: () => request.get(`/category/${id}/`).then((res) => res.data),
  });
};
