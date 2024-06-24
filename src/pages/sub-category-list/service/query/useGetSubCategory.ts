import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config/request";
export const useSubCatGet = () => {
  return useQuery({
    queryKey: ["sub-category"],
    queryFn: () => request.get("/api/subcategory/").then((res) => res.data),
  });
};
