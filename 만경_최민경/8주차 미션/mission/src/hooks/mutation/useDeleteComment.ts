import { useMutation } from "@tanstack/react-query";
import { deleteComment } from "../../apis/comment";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";



function useDeleteComment() {
    return useMutation({
        mutationFn: deleteComment,
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.lps, variables.lpId],
                exact: true,
            });
        },
    });
}

export default useDeleteComment;