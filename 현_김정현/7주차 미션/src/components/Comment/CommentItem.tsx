import { Pencil, Trash2, MoreVertical, UserRound} from "lucide-react";
import { useUpdateComment } from "../../hooks/mutations/useUpdateComment";
import { useDeleteComment } from "../../hooks/mutations/useDeleteComment";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Comment } from "../../types/comment";

interface CommentItemProps {
    comment: Comment;
    lpId: number;
}

const CommentItem = ({ comment, lpId }: CommentItemProps) => {
    const { user } = useAuth();
    const isAuthor = user?.id === comment.author.id;

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editContent, setEditContent] = useState(comment.content);

    const { mutate: updateComment } = useUpdateComment(lpId);
    const { mutate: deleteComment } = useDeleteComment(lpId);

    const handleUpdate = () => {
    updateComment({ commentId: comment.id, content: editContent });
    setIsEditing(false);
    };

    const handleDelete = () => {
    if (confirm("댓글을 삭제하시겠습니까?")) {
        deleteComment(comment.id);
    }
    };

    return (
    <div className="flex items-start gap-3 border-b border-gray-600 pb-3 relative">
        {comment.author.avatar ? (
        <img
            src={comment.author.avatar}
            alt={comment.author.name}
            className="w-7 h-7 rounded-full object-cover"
        />
        ) : (
        <div className="w-7 h-7 bg-gray-600 rounded-full flex items-center justify-center">
            <UserRound className="text-white w-4 h-4" />
        </div>
        )}

        <div className="flex-1">
        <p className="text-sm font-semibold text-white">{comment.author.name}</p>
        {isEditing ? (
            <div className="flex flex-col gap-2">
            <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="w-full bg-[#1c1c1c] text-white p-2 border border-gray-500 rounded mt-4"
            />
            <div className="flex gap-2">
                <button onClick={handleUpdate} className="text-sm text-gray-400 hover:text-green-400 cursor-pointer">저장</button>
                <button onClick={() => setIsEditing(false)} className="text-sm text-gray-400 hover:text-red-500 cursor-pointer">취소</button>
            </div>
            </div>
        ) : (
            <p className="text-sm text-gray-300">{comment.content}</p>
        )}
        </div>

        {isAuthor && !isEditing && (
        <div className="relative">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white cursor-pointer">
            <MoreVertical size={16} />
            </button>
            {isMenuOpen && (
            <div className="absolute right-0 bg-gray-800 rounded shadow-md z-10 flex p-1">
                <button
                onClick={() => {
                    setIsEditing(true);
                    setIsMenuOpen(false);
                }}
                className="block px-2 py-1 text-sm text-white hover:text-green-400 cursor-pointer w-full text-left"
                >
                <Pencil size={14} className="inline" />
                </button>
                <button
                onClick={handleDelete}
                className="block px-2 py-1 text-sm text-white hover:text-red-500 cursor-pointer w-full text-left"
                >
                <Trash2 size={14} className="inline" />
                </button>
            </div>
            )}
        </div>
        )}
    </div>
    );
};

export default CommentItem;