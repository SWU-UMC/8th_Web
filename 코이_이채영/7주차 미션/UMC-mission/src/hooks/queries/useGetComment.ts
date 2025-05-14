import { useQuery } from "@tanstack/react-query";
import { getComments } from "../../apis/comment";
import { QUERY_KEY } from "../../constants/key";
import { PaginationDto } from "../../types/common";

interface UseGetCommentsProps {
  lpId: number;
  paginationDto: PaginationDto;
}

function useGetComments({ lpId, paginationDto }: UseGetCommentsProps) {
  return useQuery({
    queryKey: [QUERY_KEY.comments, lpId, paginationDto],
    queryFn: () => getComments({
      lpId,
      paginationDto,
    }),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    select: data => data.data.data, // data -> { data: [...], nextCursor, hasNext }
    enabled: !!lpId,
  });
}

export default useGetComments;