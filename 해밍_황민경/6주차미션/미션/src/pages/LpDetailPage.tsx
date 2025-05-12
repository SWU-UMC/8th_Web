import { useParams } from "react-router-dom";
import useGetLpDetail from "../hooks/queries/useGetLpDetail";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import CommentList from "../components/Comment/CommentList";
import CommentInput from "../components/Comment/CommentInput";

const LpDetailPage = () => {
  const { lpid } = useParams();
  const lpId = Number(lpid);
  const { data: lp, isLoading, isError } = useGetLpDetail(lpId);
  const [commentOrder, setCommentOrder] = useState<"ASC" | "DESC">("DESC");
  const [showComments, setShowComments] = useState(false); // 댓글 표시 여부

  const toggleComments = () => setShowComments((prev) => !prev);

  if (isLoading) return <div className="text-white p-6">Loading...</div>;
  if (isError || !lp)
    return <div className="text-white p-6">LP 정보를 불러올 수 없습니다.</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-10 px-4">
      <div className="bg-gray-800 rounded-xl shadow-md w-full max-w-2xl p-6">
        {/* 작성자 & 시간 */}
        <div className="text-sm text-gray-400 mb-4 flex justify-between items-center">
          <span className="font-semibold">{lp.author.name}</span>
          <span>
            {formatDistanceToNow(new Date(lp.createdAt), { addSuffix: true })}
          </span>
        </div>

        {/* CD 썸네일 */}
        <div className="flex justify-center mb-6">
          <div className="w-64 h-64 bg-black rounded-full overflow-hidden shadow-lg border-4 border-gray-700">
            <img
              src={lp.thumbnail}
              alt={lp.title}
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        {/* 제목 */}
        <h1 className="text-2xl font-bold mb-3 text-center">{lp.title}</h1>

        {/* 내용 */}
        <p className="text-gray-200 text-center mb-6">{lp.content}</p>

        {/* 태그 */}
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {lp.tags.map((tag) => (
            <span
              key={tag.id}
              className="bg-gray-700 px-3 py-1 rounded-full text-sm"
            >
              #{tag.name}
            </span>
          ))}
        </div>

        {/* 댓글 보기/닫기 토글 버튼 */}
        <div className="text-center my-6">
          <button
            onClick={toggleComments}
            className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition"
          >
            💬 {showComments ? "댓글 닫기" : "댓글 보기"}
          </button>
        </div>

        {/* 댓글 영역 (토글 시 보임) */}
        {showComments && (
          <div className="w-full max-w-2xl">
            {/* 정렬 버튼 */}
            <div className="flex justify-end space-x-2 mb-4">
              <button
                onClick={() => setCommentOrder("DESC")}
                className={`px-3 py-1 rounded ${
                  commentOrder === "DESC"
                    ? "bg-white text-black"
                    : "bg-gray-700 text-white"
                }`}
              >
                최신순
              </button>
              <button
                onClick={() => setCommentOrder("ASC")}
                className={`px-3 py-1 rounded ${
                  commentOrder === "ASC"
                    ? "bg-white text-black"
                    : "bg-gray-700 text-white"
                }`}
              >
                오래된순
              </button>
            </div>

            {/* 댓글 목록 */}
            <CommentList lpId={lp.id} order={commentOrder} />

            {/* 댓글 입력창 */}
            <CommentInput />
          </div>
        )}
      </div>
    </div>
  );
};

export default LpDetailPage;
