import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants/key";
import { deleteComment } from "../../apis/comment";

export const useDeleteComment = (lpId: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (commentId: number) => deleteComment(lpId, commentId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.comments, lpId] });
        },
    });
};