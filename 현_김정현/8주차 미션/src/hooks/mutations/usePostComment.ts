import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants/key";
import { postComment } from "../../apis/comment";

export const usePostComment = (lpId: number): UseMutationResult<any, unknown, string> => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (content: string) => postComment(lpId, content),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.comments, lpId] });
        },
    });
};