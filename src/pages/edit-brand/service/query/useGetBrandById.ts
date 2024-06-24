import { request } from "../../../../config/request";
import { useQuery } from "@tanstack/react-query";
export const useGetBrandById = (brandId: string) => {
  return useQuery({
    queryKey: ["brand", brandId],
    queryFn: () =>
      request
        .get<{title:string,image:string,id:number}>(`/brand/${brandId}/`)
        .then((res) => res.data),
  });
};
