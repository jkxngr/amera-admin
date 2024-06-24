import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";

export const useDeleteAttribute = () => {
  return useMutation({
    mutationFn: (id: number) =>
      request.delete(`/attribute-value/${id}/`).then((res) => res.data),
  });
};
