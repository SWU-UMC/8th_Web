import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import useGetInfiniteCommentList from "../../hooks/queries/useGetInfiniteCommentList";
import CommentSkeleton from "./CommentSkeleton";

const CommentList = ({
  lpId,
  order,
}: {
  lpId: number;
  order: "ASC" | "DESC";
}) => {
  const { ref, inView } = useInView();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useGetInfiniteCommentList(lpId, order);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage]);

  if (isLoading)
    return (
      <>
        {[...Array(3)].map((_, i) => (
          <CommentSkeleton key={i} />
        ))}
      </>
    );

  return (
    <div className="space-y-4 mt-4">
      {data?.pages.flatMap((page) =>
        page.data.map((comment) => (
          <div key={comment.id} className="p-3 border-b border-gray-700">
            <p className="text-sm text-gray-400">{comment.author.name}</p>
            <p className="text-white">{comment.content}</p>
          </div>
        ))
      )}
      <div ref={ref}></div>
      {isFetchingNextPage &&
        [...Array(2)].map((_, i) => <CommentSkeleton key={`load-${i}`} />)}
    </div>
  );
};

export default CommentList;
