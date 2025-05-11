import { useInfiniteQuery } from "@tanstack/react-query";
import { getComments } from "../../apis/comment";
import { QUERY_KEY } from "../../constants/key";
import { PAGINATION_ORDER } from "../../enums/common";
import { CommentSortType } from "../../types/comment";

function useGetInfiniteCommentList(
  lpId: number,
  limit: number,
  search: string,
  order: PAGINATION_ORDER
) {
  
  const sortType: CommentSortType = order === PAGINATION_ORDER.desc ? "latest" : "oldest";
  
  return useInfiniteQuery({
    queryKey: [QUERY_KEY.comments, lpId, search, order],
    queryFn: ({ pageParam = 0 }) =>
      getComments(lpId, sortType, limit, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.data.hasNext ? lastPage.data.nextCursor : undefined,
    staleTime: 1000 * 60 * 5, 
    gcTime: 1000 * 60 * 30, 
  });
}

export default useGetInfiniteCommentList