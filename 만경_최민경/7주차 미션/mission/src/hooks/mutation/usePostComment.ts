import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postComment } from "../../apis/comment";

const usePostComment = (lpId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (content: string) => postComment(lpId, content),
    onSuccess: () => {
      // 댓글 작성 성공 시, 댓글 리스트 다시 불러오기
      queryClient.invalidateQueries({ queryKey: ["comments", lpId] });
    },
  });
};

export default usePostComment;