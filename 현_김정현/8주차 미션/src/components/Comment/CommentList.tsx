import { useEffect } from "react";
import CommentItem from "./CommentItem";
import { useInView } from "react-intersection-observer";
import CommentSkeletonList from "./CommentSkeletonList";
import { PAGINATION_ORDER } from "../../enums/common";
import useGetInfiniteCommentList from "../../hooks/queries/useGetInfiniteCommentList";


interface CommentListProps {
    lpId: number;
    order: PAGINATION_ORDER;
}

const CommentList = ({ lpId, order }: CommentListProps) => {
    const {
        data: comments,
        fetchNextPage,
        hasNextPage,
        isFetching,
    } = useGetInfiniteCommentList(lpId, order);

    const { ref, inView } = useInView({ threshold: 0 });

    useEffect(() => {
        if (inView && hasNextPage && !isFetching) {
        fetchNextPage();
        }
    }, [inView, hasNextPage, isFetching]);

    return (
        <div className="space-y-4">
        {isFetching && !comments?.pages.length && <CommentSkeletonList count={5} />}
        {comments?.pages.flatMap((page) => page.data.data).map((comment) => (
            <CommentItem key={comment.id} comment={comment} lpId={lpId} />
        ))}
        {hasNextPage && <div ref={ref} className="h-6 mt-4" />}
        </div>
    );
};

export default CommentList;