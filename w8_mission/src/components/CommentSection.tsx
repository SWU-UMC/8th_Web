import { useState } from "react";
import { useInView } from "react-intersection-observer";
import CommentItem from "./CommentItem";
import CommentSkeleton from "./CommentSkeleton";
import useInfiniteCommentList from "../hooks/queries/useinfiniteCommentList";
import usePostComment from "../hooks/mutations/usePostComment";
import { useAuth } from "../context/AuthContext";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";

interface Props {
  lpId: number;
}

const CommentSection = ({ lpId }: Props) => {
  const { accessToken } = useAuth(); // 유저 정보에서 id 확인
  const { data: me } = useGetMyInfo(accessToken);
  const [comment, setComment] = useState("");
  const [sort, setSort] = useState<"asc" | "desc">("desc");
  const { ref, inView } = useInView();

  const { data, fetchNextPage, hasNextPage, isFetching, isPending } =
    useInfiniteCommentList(lpId); // 정렬 미적용 (추후 추가)

  const postComment = usePostComment(lpId);

  const handleSubmit = () => {
    if (!comment.trim()) return;
    postComment.mutate({ content: comment });
    setComment("");
  };

  if (inView && hasNextPage && !isFetching) {
    fetchNextPage();
  }

  return (
    <div className="bg-zinc-900 p-4 rounded text-white mt-8">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">댓글</h3>
        <div className="space-x-2">
          <button
            className={`px-3 py-1 rounded ${
              sort === "asc" ? "bg-white text-black" : "bg-zinc-700"
            }`}
            onClick={() => setSort("asc")}
          >
            오래된순
          </button>
          <button
            className={`px-3 py-1 rounded ${
              sort === "desc" ? "bg-white text-black" : "bg-zinc-700"
            }`}
            onClick={() => setSort("desc")}
          >
            최신순
          </button>
        </div>
      </div>

      {/* 댓글 입력창 */}
      <div className="flex items-center gap-2 mb-4">
        <input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="댓글을 입력해주세요"
          className="flex-1 p-2 rounded bg-zinc-800 text-white"
        />
        <button
          onClick={handleSubmit}
          className="bg-zinc-600 px-4 py-2 rounded"
        >
          작성
        </button>
      </div>

      {/* 댓글 리스트 */}
      {isPending && <CommentSkeleton />}
      {data?.pages
        .flatMap((page) => page.data.data)
        .sort((a, b) =>
          sort === "asc"
            ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        .map((c) => (
          <CommentItem
            key={c.id}
            comment={c}
            lpId={lpId}
            isMine={c.authorId === me?.data.id}
          />
        ))}

      {isFetching && <CommentSkeleton />}
      <div ref={ref} className="h-2" />
    </div>
  );
};

export default CommentSection;
