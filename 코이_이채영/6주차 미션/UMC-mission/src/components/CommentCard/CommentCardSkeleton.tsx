const CommentCardSkeleton = () => {
    return (
        <div className="flex p-4 border-b border-gray-200 animate-pulse">
            {/* 프로필 사진 (왼쪽) */}
            <div className="flex-shrink-0 mr-4">
                <div className="bg-gray-400 w-10 h-10 rounded-full" />
            </div>

            {/* 작성자 이름과 댓글 내용 (오른쪽) */}
            <div className="flex flex-col justify-center w-full">
                <div className="flex items-center space-x-2">
                    {/* 작성자 이름 */}
                    <div className="bg-gray-400 w-24 h-4 rounded-md" />
                </div>
                {/* 댓글 내용 */}
                <div className="mt-2">
                    <div className="bg-gray-400 w-full h-4 rounded-md mb-2" />
                    <div className="bg-gray-400 w-3/4 h-4 rounded-md" />
                </div>
            </div>

            {/* 점 세개 (더보기 버튼) */}
            <div className="bg-gray-400 w-6 h-6 rounded-full ml-auto" />
        </div>
    );
};

export default CommentCardSkeleton;
