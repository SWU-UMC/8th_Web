import { Comment } from '../../types/comment'; // Comment 타입을 import

interface CommentCardProps {
    comment: Comment; // comment 객체를 prop으로 받음
}

const CommentCard = ({ comment }: CommentCardProps) => {

    const handleMoreClick = () => {
        console.log('More options for comment id:', comment.id);
    };

    return (
        <div className="flex p-4 border-b border-gray-200">
            {/* 프로필 사진 (왼쪽) */}
            <div className="flex-shrink-0 mr-4">
                <img
                    src={comment.author.avatar || 'default-avatar.png'} // 프로필 사진 경로
                    alt={comment.author.name}
                    className="w-10 h-10 rounded-full"
                />
            </div>

            {/* 작성자 이름과 댓글 내용 (오른쪽) */}
            <div className="flex flex-col flex-grow">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <span className="font-semibold text-white">{comment.author.name}</span>
                    <span className="text-xs text-gray-400">
                        {new Date(comment.createdAt).toLocaleDateString('ko-KR', {
                            year: '2-digit',
                            month: '2-digit',
                            day: '2-digit',
                        })}{' '}
                        {new Date(comment.createdAt).toLocaleTimeString('ko-KR', {
                            hour: 'numeric',
                            minute: '2-digit',
                            hour12: true,
                        })}
                    </span>
                </div>
                <p className="text-sm text-left mt-1">{comment.content}</p>
            </div>

            {/* 점 세개 (더보기 버튼) */}
            <button onClick={handleMoreClick} className="text-xl flex justify-top ml-auto">
                <span>&#8942;</span>
            </button>
        </div>
    );
};

export default CommentCard;
