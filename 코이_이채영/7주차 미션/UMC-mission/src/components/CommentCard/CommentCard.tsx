import { useEffect, useState } from 'react';
import { Comment } from '../../types/comment'; // Comment 타입을 import
import { getMyInfo } from '../../apis/auth';
import { EllipsisVertical } from 'lucide-react';
import DropdownMenu from '../DropdownMenu';
import useCommentPatch from '../../hooks/mutations/useCommentPatch';
import useCommentDelete from '../../hooks/mutations/useCommentDelete';

interface CommentCardProps {
    comment: Comment; 
}

const CommentCard = ({ comment }: CommentCardProps) => {
    const [myId, setMyId] = useState<number | null>(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const [editContent, setEditContent] = useState<string>(''); // 댓글 수정 내용 상태
    const [isEditing, setIsEditing] = useState(false); // 수정 모드 상태
    
    const { mutate: patchComment } = useCommentPatch();
    const { mutate: deleteComment } = useCommentDelete();

    useEffect(() => {
        const fetchMyInfo = async () => {
            try {
                const data = await getMyInfo();
                setMyId(data.data.id);
            } catch (error) {
                console.error('내 정보 불러오기 실패:', error);
            }
        };

        fetchMyInfo();
    }, []);

    const isAuthor = myId === comment.authorId;

    const handleEdit = () => {
        setEditContent(comment.content);
        setIsEditing(true);
        setMenuOpen(false); // 메뉴 닫기

    };

    // 댓글 수정 제출
    const handleSubmitEdit = () => {
        patchComment({
            lpId: comment.lpId,
            commentId: comment.id,
            content: editContent,
        });
        setIsEditing(false); // 수정 종료
        window.location.reload();
    };

    const handleDelete = () => {
        const confirmed = window.confirm("댓글을 삭제하시겠습니까?");
        if (confirmed) {
            deleteComment({
                lpId: comment.lpId,
                commentId: comment.id,
            });
        }
        setMenuOpen(false);
        window.location.reload();
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
                {isEditing ? (
                    <div className="flex items-start gap-2 mt-2">
                        <textarea
                            value={editContent}
                            onChange={(e) => setEditContent(e.target.value)}
                            className="w-full h-24 p-2 border rounded"
                        />
                        <button
                            onClick={handleSubmitEdit}
                            className="h-10 px-4 bg-[#ff1490] text-white rounded hover:bg-pink-700"
                            style={{ whiteSpace: 'nowrap' }}
                        >
                            확인
                        </button>
                    </div>
                ) : (
                    <p className="text-sm text-left mt-1">{comment.content}</p>
                )}
            </div>

            {isAuthor && (
                <div className="relative">
                    <button onClick={() => setMenuOpen((prev) => !prev)}>
                        <EllipsisVertical className="w-5 h-5 text-gray-500" />
                    </button>
                    {menuOpen && (
                        <DropdownMenu
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export default CommentCard;
