import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateComment } from "../../apis/comment";
import { QUERY_KEY } from "../../constants/key";

export const useUpdateComment = (lpId: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ commentId, content }: { commentId: number; content: string }) =>
            updateComment(lpId, commentId, content),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.comments, lpId] });
        },
    });
};