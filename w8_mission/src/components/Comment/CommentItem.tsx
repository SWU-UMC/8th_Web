import { useState } from "react";
import { Comment } from "../../types/comment";
import usePatchComment from "../../hooks/mutations/usePatchComment";
import useDeleteComment from "../../hooks/mutations/useDeleteComment";
import { Pencil, Trash } from "lucide-react"; // 아이콘 추가

interface Props {
  comment: Comment;
  lpId: number;
  isMine: boolean;
}

const CommentItem = ({ comment, lpId, isMine }: Props) => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(comment.content);

  const patchComment = usePatchComment(lpId, comment.id);
  const deleteComment = useDeleteComment(lpId, comment.id);

  const handleEdit = () => {
    patchComment.mutate({ content: value });
    setEditing(false);
  };

  const handleDelete = () => {
    if (confirm("댓글을 삭제할까요?")) {
      deleteComment.mutate();
    }
  };

  return (
    <div className="flex items-start justify-between py-2">
      <div className="flex items-start space-x-2">
        <img
          src={comment.author.avatar ?? "/default_avatar.png"}
          alt="avatar"
          className="w-8 h-8 rounded-full object-cover"
        />
        <div>
          <p className="text-sm font-semibold">{comment.author.name}</p>
          {editing ? (
            <div className="flex items-center gap-2 mt-1">
              <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="bg-zinc-800 text-white p-1 rounded text-sm"
              />
              <button onClick={handleEdit} className="text-green-400 text-lg">
                ✔️
              </button>
            </div>
          ) : (
            <p className="text-sm text-white mt-1">{comment.content}</p>
          )}
        </div>
      </div>

      {isMine && !editing && (
        <div className="relative group">
          <button className="text-white cursor-pointer">⋮</button>
          <div className="hidden group-hover:flex absolute right-0 top-6 bg-zinc-700 px-2 py-1 rounded shadow-lg z-20 gap-2">
            <button
              onClick={() => setEditing(true)}
              className="text-white hover:text-blue-300 cursor-pointer"
              title="수정"
            >
              <Pencil className="w-4 h-4" />
            </button>
            <button
              onClick={handleDelete}
              className="text-white hover:text-red-300 cursor-pointer"
              title="삭제"
            >
              <Trash className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentItem;
