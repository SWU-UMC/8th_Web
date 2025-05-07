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
      <div className="flex flex-col justify-center">
        <div className="flex items-center space-x-2">
          {/* 작성자 이름 */}
          <span className="font-semibold">{comment.author.name}</span>
        </div>
        {/* 댓글 내용 */}
        <div>
          <p className="text-sm text-left">{comment.content}</p>
        </div>
      </div>

      {/* 점 세개 (더보기 버튼) */}
      <button onClick={handleMoreClick} className="text-xl ml-auto">
        <span>...</span>
      </button>
    </div>
  );
};

export default CommentCard;
