import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";
import { LoginType } from "../../types";

export const useLogin = () => {
  return useMutation({
    mutationFn: (data: LoginType) =>
      request.post("api/admin-login/", data).then((res) => res.data),
  });
};
