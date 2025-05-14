import { useMutation } from "@tanstack/react-query";
import { postLogout } from "../../apis/auth";

function useLogout() {
  return useMutation({
    mutationFn: postLogout,
  });
}

export default useLogout;
