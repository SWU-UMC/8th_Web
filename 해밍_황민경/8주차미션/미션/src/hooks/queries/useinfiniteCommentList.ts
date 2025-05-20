import { useInfiniteQuery } from "@tanstack/react-query";
import { getComments } from "../../apis/comment";
import { CommentListResponse } from "../../types/comment";

function useInfiniteCommentList(lpId: number) {
  return useInfiniteQuery<CommentListResponse>({
    queryKey: ["comments", lpId],
    queryFn: ({ pageParam = 0 }) => getComments(lpId, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.data.hasNext ? lastPage.data.nextCursor : undefined,
  });
}

export default useInfiniteCommentList;
