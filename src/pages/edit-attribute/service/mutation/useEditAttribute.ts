import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";
import { AttrType } from "../../../attribute/service/mutation/usePostAttribute";
export const useEditAttribute = () => {
  return useMutation({
    mutationFn: (data) =>
      request
        .patch<AttrType>("/api/category_edit/", data)
        .then((res) => res.data),
  });
};
