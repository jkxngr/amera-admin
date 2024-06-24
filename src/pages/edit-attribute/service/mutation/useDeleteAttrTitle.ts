import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";

export const useDeleteAttrTitle = () => {
  return useMutation({
    mutationFn: (id: number) =>
      request.delete(`/attribute/${id}/`).then((res) => res.data),
  });
};
