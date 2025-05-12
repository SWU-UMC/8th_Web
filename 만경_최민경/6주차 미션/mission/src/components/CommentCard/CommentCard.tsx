import React, { useEffect, useState } from "react";
import { getComments } from "../../apis/comment";
import { Comment, CommentListResponse, CommentSortType } from "../../types/comment";
import CommentCardSkeletonList from "./CommentCardSkeletonList";
import useGetInfiniteCommentList from "../../hooks/queries/useGetInfiniteCommentList";
import { PAGINATION_ORDER } from "../../enums/common";
import CommentItem from "./CommentItem";


interface CommentCardProps {
  lpId: number;
}

const CommentCard: React.FC<CommentCardProps> = ({ lpId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [sortType, setSortType] = useState<CommentSortType>("latest"); 
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
 
const order = sortType === "latest" ? PAGINATION_ORDER.desc : PAGINATION_ORDER.asc;
const {
    isLoading,
    isFetching,
   
  } = useGetInfiniteCommentList(lpId, 10, "", order);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const data: CommentListResponse = await getComments(lpId, sortType, 10); 
      setComments(data.data.data);
    } catch (err) {
      console.error("Failed to fetch comments:", err);
      setError("댓글을 불러오는 데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [lpId, sortType]); 



  
  if (error) return <div className="text-center text-red-500 py-4">{error}</div>;

  return (
    <div className="bg-white shadow animate-blink mt-3 rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">댓글</h3>
        <div className="flex space-x-2">
            <button
            className={`text-sm px-3 py-1 cursor-pointer rounded ${
                sortType === "oldest"
                ? "bg-blue-100 text-blue-700"
                : "text-gray-500 hover:text-blue-500"
            }`}
            onClick={() => setSortType("oldest")}
            >
            오래된순
            </button>
            <button
            className={`text-sm px-3 py-1 cursor-pointer rounded ${
                sortType === "latest"
                ? "bg-blue-100 text-blue-700"
                : "text-gray-500 hover:text-blue-500"
            }`}
            onClick={() => setSortType("latest")}
            >
            최신순
            </button>
          </div>
        </div>
        {/* 댓글 작성 폼 */}
        <div className="mb-6">
          <div className="flex items-center space-x-3">
            <input
              type="text"
              placeholder="댓글을 입력해주세요"
              className="flex-1 px-5 py-2.5 bg-gray-600 border border-gray-300 rounded-lg 
                      text-white placeholder-gray-500 focus:outline-none focus:border-gray-600
                      focus:ring-1 focus:ring-gray-600 transition-all"
            />
            <button
              className="px-5 py-2.5 bg-gray-700 text-white rounded-lg font-medium
                      hover:bg-gray-600 transition-all"
            >
              작성
            </button>
          </div>
        </div>

      <div className="space-y-4">
        {isLoading ? (
          <CommentCardSkeletonList count={5} />
        ) : comments.length === 0 ? (
          <p className="text-gray-500">댓글이 없습니다.</p>
        ) : (
          <ul className="space-y-4">
            {comments.map((comment) => (
              <CommentItem key={comment.id} comment={comment} />
            ))}
          </ul>
        )}
        {isFetching && isLoading && <CommentCardSkeletonList count={3} />}
      </div>
    </div>
  );
};

export default CommentCard;






