import { useMutation } from "@tanstack/react-query";
import { RequestPostLpDto, ResponsePostLpDto } from "../../types/lp";
import { postLp } from "../../apis/lp";
import { queryClient } from "../../App";

function usePostLp() {
    return useMutation<ResponsePostLpDto, Error, RequestPostLpDto>({
        mutationFn: postLp,
        onSuccess: () => {
            // 게시글 목록 다시 불러오도록 캐시 무효화
            queryClient.invalidateQueries({ queryKey: ["lps"] });
        },
        onError: (error) => {
            console.error("LP 생성 오류:", error);
        }
        });
    }
    
    export default usePostLp;