import { useMutation } from "@tanstack/react-query";
import { deleteLp } from "../../apis/lp";

function useDeleteLp(lpId: number) {
  return useMutation({
    mutationFn: () => deleteLp(lpId),
  });
}

export default useDeleteLp;
