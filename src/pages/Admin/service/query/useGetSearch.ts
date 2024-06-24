  import { useQuery } from "@tanstack/react-query";
  import { request } from "../../../../config/request";
  export const useGetSearch = (search = "") => {
    return useQuery({
      queryKey: ["search", search],
      queryFn: () =>
        request.get(`/category/?search=${search}`).then((res) => res.data),
    });
  };
