import { useMutation } from "@tanstack/react-query";
import { deleteLp } from "../../apis/lp";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";

function useLpDelete() {
    return useMutation({
        mutationFn: deleteLp,
        onSuccess: (_, lpId) => {
            // 목록 및 상세 페이지 캐시 무효화
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.lps] });
            queryClient.removeQueries({ queryKey: [QUERY_KEY.lps, lpId] });
        },
        onError: (error) => {
            console.error("LP 삭제 중 오류 발생:", error);
        },
    });
}

export default useLpDelete;
