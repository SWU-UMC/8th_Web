import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchComment } from "../../apis/comment";
import { UpdateCommentDto } from "../../types/comment";

function usePatchComment(lpId: number, commentId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: UpdateCommentDto) => patchComment(lpId, commentId, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", lpId] });
    },
  });
}

export default usePatchComment;
