import { useMutation, UseMutationOptions, UseMutationResult } from "@tanstack/react-query";
import { createComment } from "../../apis/comment";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";
import { ResponseCommentDto, RequestCommentDto } from "../../types/comment"; // 이건 필요에 따라 정의해주세요

type CreateCommentParams = RequestCommentDto;

function useCommentCreate(
): UseMutationResult<ResponseCommentDto, Error, CreateCommentParams> {
  return useMutation<ResponseCommentDto, Error, CreateCommentParams>({
    mutationFn: createComment,
    onSuccess: (data, variables, context) => {
      // 댓글 목록 refetch
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.comments, variables.lpId],
      });
    },
  });
}

export default useCommentCreate;
