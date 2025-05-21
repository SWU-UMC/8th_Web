// hooks/mutation/useUpdateComment.ts
import { useMutation } from "@tanstack/react-query";
import { updateComment } from "../../apis/comment";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";



function useUpdateComment() {
  return useMutation({
    mutationFn: updateComment,  // 댓글 수정 API 함수
    onSuccess: (data) => {
      // 댓글 수정 성공 후, 관련된 댓글 데이터를 invalidate하여 새로고침
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.comments, data.data.lpId], // lpId에 해당하는 댓글 목록을 invalidate
        exact: true,
      });
    },
    onError: (error) => {
      console.error("댓글 수정 실패:", error); // 실패 시 에러 로깅
    },
  });
}
export default useUpdateComment;
