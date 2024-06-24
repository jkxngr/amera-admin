import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";
export interface AttrType {
  items: any;
  attributes: {
    attribute_id: null | number;
    title: string[];
    value: {
      value: string;
      value_id: null;
    }[];
  }[];
  category_id: number | null;
}
export const usePostAttribute = () => {
  return useMutation({
    mutationFn: (data) =>
      request
        .patch("/api/category_edit/", data)
        .then((res) => res.data),
  });
};
