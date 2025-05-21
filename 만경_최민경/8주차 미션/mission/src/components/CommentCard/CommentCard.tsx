import React, { useEffect, useState } from "react";
import { getComments } from "../../apis/comment";
import { Comment, CommentListResponse, CommentSortType } from "../../types/comment";
import CommentCardSkeletonList from "./CommentCardSkeletonList";
import useGetInfiniteCommentList from "../../hooks/queries/useGetInfiniteCommentList";
import { PAGINATION_ORDER } from "../../enums/common";
import CommentItem from "./CommentItem";
import usePostComment from "../../hooks/mutation/usePostComment";
import useDeleteComment from "../../hooks/mutation/useDeleteComment";
import useUpdateComment from "../../hooks/mutation/useUpdateComment";





interface CommentCardProps {
  lpId: number;
}

const CommentCard: React.FC<CommentCardProps> = ({ lpId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [sortType, setSortType] = useState<CommentSortType>("latest"); 
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [newComment, setNewComment] = useState<string>("");
  

 
  const order = sortType === "latest" ? PAGINATION_ORDER.desc : PAGINATION_ORDER.asc;
  const {
      isLoading,
      isFetching,
    } = useGetInfiniteCommentList(lpId, 10, "", order);

  const commentMutation = usePostComment(lpId);

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

  // 댓글 제출 핸들러
  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim() === "") return;
    
    commentMutation.mutate(newComment, {
      onSuccess: () => {
        setNewComment(""); // 입력창 초기화
        fetchComments(); // 댓글 목록을 다시 가져옵니다 (필요한 경우)
      },
      onError: (error) => {
        console.error("댓글 작성 실패:", error);
        setError("댓글 작성에 실패했습니다.");
      }
    });
  };

  const deleteMutation = useDeleteComment();
  const updateMutation = useUpdateComment();

  const handleDelete = (commentId: number) => {
  if (window.confirm("댓글을 삭제하시겠습니까?")) {
    deleteMutation.mutate(
      { lpId, commentId },  // ← 이렇게 구조를 맞춰야 해
      {
        onSuccess: () => {
          fetchComments();
        },
        onError: (error) => {
          console.error("댓글 삭제 실패:", error);
          setError("댓글 삭제에 실패했습니다.");
        },
      }
    );
  }
};

  const handleEdit = (commentId: number, newText: string) => {
  updateMutation.mutate(
    { lpId, commentId, content: newText }, // ← lpId 포함!
    {
      onSuccess: () => {
        fetchComments();
      },
      onError: (error: unknown) => {
      const message = error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.";
      console.error("댓글 삭제 실패:", message);
      setError(message);
    }
    },
  );
};




  
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
        <form onSubmit={handleSubmitComment} className="mb-6">
          <div className="flex items-center space-x-3">
            <input
              type="text"
              placeholder="댓글을 입력해주세요"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-1 px-5 py-2.5 bg-gray-600 border border-gray-300 rounded-lg 
                      text-white placeholder-gray-500 focus:outline-none focus:border-gray-600
                      focus:ring-1 focus:ring-gray-600 transition-all"
            />
            <button
              type="submit"
              disabled={commentMutation.isPending}
              className={`px-5 py-2.5 bg-gray-700 text-white rounded-lg font-medium
                      hover:bg-gray-600 transition-all 
                      ${commentMutation.isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {commentMutation.isPending ? '작성 중...' : '작성'}
            </button>
          </div>
        </form>

      <div className="space-y-4">
        {isLoading ? (
          <CommentCardSkeletonList count={5} />
        ) : comments.length === 0 ? (
          <p className="text-gray-500">댓글이 없습니다.</p>
        ) : (
          <ul className="space-y-4">
            {comments.map((comment) => (
                <CommentItem
                key={comment.id}
                comment={comment}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </ul>
        )}
        {isFetching && isLoading && <CommentCardSkeletonList count={3} />}
      </div>
    </div>
  );
};

export default CommentCard;






