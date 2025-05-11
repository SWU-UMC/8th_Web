import React, { useEffect, useState } from 'react';
import CommentCard from './CommentCard';
import { PAGINATION_ORDER } from '../../enums/common';
import CommentCardSkeleton from './CommentCardSkeleton';
import useGetInfiniteCommentList from '../../hooks/queries/useGetInfiniteCommentList';
import { useInView } from 'react-intersection-observer';
import SortOrderButton from '../SortOrderButton';

interface CommentListProps {
    lpId: number;
}

const CommentList: React.FC<CommentListProps> = ({ lpId }) => {
    const [sortOrder, setSortOrder] = useState<PAGINATION_ORDER>(PAGINATION_ORDER.desc);
    const { ref, inView } = useInView();

    const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetInfiniteCommentList(lpId, { cursor: 0, limit: 3, order: sortOrder });

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            console.log("Fetching next page...");
            fetchNextPage();
        }
    }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

    if (isLoading)
        return (
            <>
                {[...Array(3)].map((_, i) => (
                    <CommentCardSkeleton key={i} />
                ))}
            </>
        );

    if (isError) {
        return <p className="text-center text-red-500">Failed to load comments.</p>;
    }

    return (
        <div>
            <div className="flex justify-between items-center my-4">
                <h1 className="text-xl font-bold">댓글</h1>
                <SortOrderButton sortOrder={sortOrder} setSortOrder={setSortOrder} />
            </div>
            <div className="mb-6">
                <textarea
                    className="w-full border rounded-md p-3 resize-none focus:outline-none focus:ring-2 focus:ring-[#ff1490]"
                    rows={3}
                    placeholder="댓글을 입력하세요..."
                />
                <div className="text-right mt-2">
                    <button
                        className="px-4 py-2 bg-[#ff1490] text-white rounded-md hover:bg-blue-600"
                    >
                        작성
                    </button>
                </div>
            </div>
            <div className="space-y-4">
                {data?.pages.flatMap((page, pageIndex) => {
                    if (Array.isArray(page.data)) {
                        return page.data.map((comment) => (
                            <CommentCard key={`${comment.id}-${pageIndex}`} comment={comment} />
                        ));
                    }
                    return [];
                })}

                {isFetchingNextPage && (
                    <div className="text-center my-4">
                        {[...Array(3)].map((_, i) => (
                            <CommentCardSkeleton key={i} />
                        ))}
                    </div>
                )}

                {hasNextPage && !isFetchingNextPage && (
                    <div ref={ref} className="h-1" />
                )}
            </div>

        </div>

    );
};

export default CommentList;
