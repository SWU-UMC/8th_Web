import { QueryFunctionContext, useInfiniteQuery } from "@tanstack/react-query";
import { getCommentList } from "../../apis/comment";
import { ResponseCommentListDto } from "../../types/comment";
import { QUERY_KEY } from "../../constants/key";
import { PAGINATION_ORDER } from "../../enums/common";

const useGetInfiniteCommentList = (
    lpId: number,
    order: PAGINATION_ORDER = PAGINATION_ORDER.desc,
    limit = 10
) => {
    return useInfiniteQuery<ResponseCommentListDto, Error>({
        queryKey: [QUERY_KEY.comments, lpId, order],
        queryFn: ({pageParam}: QueryFunctionContext) =>
            getCommentList({
                lpId,
                cursor: typeof pageParam === "number" ? pageParam : 0,
                order,
                limit,
            }),
        initialPageParam: 0,
        getNextPageParam: (lastPage) =>
            lastPage.data.hasNext ? lastPage.data.nextCursor : undefined,
    });
};

export default useGetInfiniteCommentList;