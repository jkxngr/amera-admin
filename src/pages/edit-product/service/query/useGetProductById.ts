import { request } from "../../../../config/request";
import { useQuery } from "@tanstack/react-query";
export const useGetProductById = (productId: string | undefined) => {
  return useQuery({
    queryKey: ["product"],
    queryFn: () =>
      request.get(`/product/${productId}/`).then((res) => res.data),
  });
};
