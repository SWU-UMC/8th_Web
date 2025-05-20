import { useMutation } from "@tanstack/react-query";
import { deleteLp } from "../../apis/lp";
import { useNavigate } from "react-router-dom";
import { QUERY_KEY } from "../../constants/key";
import { queryClient } from "../../App";

function useDeleteLp(lpId: number) {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => deleteLp(lpId),
    onSuccess: () => {
      alert("LP가 삭제되었습니다.");
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.lps] });
      navigate("/");
    },
    onError: () => {
      alert("LP 삭제 중 오류가 발생했어요.");
    },
  });
}

export default useDeleteLp;
