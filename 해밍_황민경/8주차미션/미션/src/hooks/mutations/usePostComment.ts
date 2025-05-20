import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postComment } from "../../apis/comment";
import { CreateCommentDto } from "../../types/comment";

function usePostComment(lpId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateCommentDto) => postComment(lpId, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", lpId] });
    },
  });
}

export default usePostComment;
