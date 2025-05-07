import React, { useEffect, useState } from 'react';
import useGetComment from '../../hooks/queries/useGetComment'; // 댓글을 불러오는 훅
import { Comment } from '../../types/comment';
import CommentCard from './CommentCard'; // 위에서 만든 CommentCard 컴포넌트
import { PAGINATION_ORDER } from '../../enums/common';

interface CommentListProps {
    lpId: number;
}

const CommentList: React.FC<CommentListProps> = ({ lpId }) => {
    // useGetComments 훅을 사용하여 댓글 리스트 불러오기
    const savedSortOrder = localStorage.getItem("sortOrder") as PAGINATION_ORDER || "desc";
    const [sortOrder, setSortOrder] = useState<PAGINATION_ORDER>(savedSortOrder);
    
    const { data, isLoading, isError } = useGetComment({
        lpId,
        paginationDto: {
            cursor: 0,
            limit: 10,
            order: sortOrder,
        },
    });

    

    useEffect(() => {
        localStorage.setItem("sortOrder", sortOrder);
    }, [sortOrder]);

    if (isLoading) {
        return <p className="text-center text-gray-500">Loading comments...</p>;
    }

    if (isError) {
        return <p className="text-center text-red-500">Failed to load comments.</p>;
    }

    return (
        <div>
            <div className="flex justify-between items-center my-4">
                <h1 className="text-xl font-bold">댓글</h1>
                <div className="flex border rounded-sm overflow-hidden w-40">
                    <button
                        onClick={() => setSortOrder(PAGINATION_ORDER.asc)}
                        className={`flex-1 p-2 text-center text-xs ${sortOrder === PAGINATION_ORDER.asc ? "bg-white text-black font-bold" : "bg-black text-white"}`}
                    >
                        오래된 순
                    </button>
                    <button
                        onClick={() => setSortOrder(PAGINATION_ORDER.desc)}
                        className={`flex-1 p-2 text-center text-xs ${sortOrder === PAGINATION_ORDER.desc ? "bg-white text-black font-bold" : "bg-black text-white"}`}
                    >
                        최신 순
                    </button>
                </div>
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

                {data?.map((comment: Comment) => (
                    <CommentCard key={comment.id} comment={comment} />
                ))}
            </div>
        </div>

    );
};

export default CommentList;
