import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config/request";
export const useGetPagination = (offset: number) => {
  return useQuery({
    queryKey: ["pagination"],
    queryFn: () =>
      request
        .get(
          `/category/?limit=10&offset=${offset}
    `
        )
        .then((res) => res.data),
  });
};
