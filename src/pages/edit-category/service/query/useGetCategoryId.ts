import { request } from "../../../../config/request";
import { useQuery } from "@tanstack/react-query";
export const useGetCategoryId = (categoryId: string) => {
  return useQuery({
    queryKey: ["category", categoryId],
    queryFn: () =>
      request
        .get<{  title: string;
          image: string;
          parent: {
            title: string;
          }; }>(
          `/category/${categoryId}/`
        )
        .then((res) => res.data),
  });
};
