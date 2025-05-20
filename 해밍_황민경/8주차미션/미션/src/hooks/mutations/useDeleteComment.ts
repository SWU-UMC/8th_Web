import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteComment } from "../../apis/comment";

function useDeleteComment(lpId: number, commentId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => deleteComment(lpId, commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", lpId] });
    },
  });
}

export default useDeleteComment;
