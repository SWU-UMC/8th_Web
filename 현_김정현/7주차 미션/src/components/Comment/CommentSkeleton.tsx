const CommentSkeleton = () => {
    return (
        <div className="flex flex-col gap-1 border-b border-gray-700 pb-2 animate-pulse">
            <div className="h-4 w-24 bg-gray-600 rounded" /> {/* 작성자 이름 */}
            <div className="h-3 w-full bg-gray-700 rounded" /> {/* 댓글 내용 */}
            <div className="h-3 w-3/4 bg-gray-700 rounded" /> {/* 댓글 내용 추가 줄 */}
        </div>
        );
    };
    
export default CommentSkeleton;