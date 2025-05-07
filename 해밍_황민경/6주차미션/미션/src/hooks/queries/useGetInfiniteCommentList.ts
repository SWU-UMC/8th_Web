import { useInfiniteQuery } from "@tanstack/react-query";
import { getCommentList } from "../../apis/comment";
import { QUERY_KEY } from "../../constants/key";

function useGetInfiniteCommentList(lpId: number, order: "ASC" | "DESC") {
  return useInfiniteQuery({
    queryKey: [QUERY_KEY.comments, lpId, order],
    queryFn: ({ pageParam = 0 }) => getCommentList(lpId, pageParam, order),
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.nextCursor : undefined,
  });
}

export default useGetInfiniteCommentList;
