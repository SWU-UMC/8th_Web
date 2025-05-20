import { useInfiniteQuery } from "@tanstack/react-query";
import { getComments } from "../../apis/comment";
import { QUERY_KEY } from "../../constants/key";
import { PaginationDto } from "../../types/common";

function useGetInfiniteCommentList(
  lpId: number,
  paginationDto: PaginationDto // paginationDto를 받도록 수정
) {
  return useInfiniteQuery({
    queryKey: [QUERY_KEY.comments, lpId, paginationDto.order], // 정렬 기준도 키에 포함
    queryFn: async ({ pageParam = 0 }) => {

      const response = await getComments({lpId, paginationDto: { ...paginationDto, cursor: pageParam }});

      
      return response.data;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.hasNext ? lastPage.nextCursor : undefined;
    },
  });
}

export default useGetInfiniteCommentList;
