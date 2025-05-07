import { useInfiniteQuery } from "@tanstack/react-query";
import { getLpList } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";
import { PaginationDto } from "../../types/common";

function useGetInfiniteLpList(
  paginationDto: PaginationDto // paginationDto를 받도록 수정
) {
  return useInfiniteQuery({
    queryFn: ({ pageParam }) => getLpList({ ...paginationDto, cursor: pageParam }), // cursor 값을 paginationDto에 덧붙여서 사용
    queryKey: [QUERY_KEY.lps, paginationDto.search, paginationDto.order], // paginationDto를 키에 포함
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      console.log(lastPage);
      return lastPage.data.hasNext ? lastPage.data.nextCursor : undefined;
    },
  });
}

export default useGetInfiniteLpList;
