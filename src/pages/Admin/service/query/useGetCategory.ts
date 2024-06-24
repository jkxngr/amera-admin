import { request } from "../../../../config/request";
import { useQuery } from "@tanstack/react-query";
export const useGetCategory = (page: number = 1, pageSize: number = 10) => {
  return useQuery({
    queryKey: ["category", page, pageSize],
    queryFn: () => request.get(`/category/?offset=${page}&limit=${pageSize}`).then((res) => res.data),
  });
};

  