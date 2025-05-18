import React, { useState } from "react";
import { Comment } from "../../types/comment";

interface CommentItemProps {
  comment: Comment;
  onEdit: (id: number, newText: string) => void;
  onDelete: (id: number) => void;
}


const CommentItem: React.FC<CommentItemProps> = ({ comment, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(comment.content);
  


  return (
    <li className="border-b last:border-none pb-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">
          {comment.author.name}
        </span>
        <span className="text-xs text-gray-500">
          {new Date(comment.createdAt).toLocaleDateString()}
        </span>
      </div>

      {isEditing ? (
        <div className="mt-2">
          <input
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            className="w-full px-2 py-1 border border-gray-300 rounded"
          />
          <div className="flex gap-2 mt-1">
            <button
              className="text-sm text-green-600 hover:underline"
              onClick={() => {
                onEdit(comment.id, editedText);
                setIsEditing(false);
              }}
            >
              저장
            </button>
            <button
              className="text-sm text-gray-500 hover:underline"
              onClick={() => setIsEditing(false)}
            >
              취소
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-2 text-gray-800">{comment.content}</div>
      )}

      
      {!isEditing && (
        <div className="mt-1 flex justify-end gap-3 text-sm text-gray-500">
          <button onClick={() => setIsEditing(true)} className="hover:text-blue-600">
            수정
          </button>
          <button onClick={() => onDelete(comment.id)} className="hover:text-red-600">
            삭제
          </button>
        </div>
      )}
    </li>
  );
};

export default CommentItem;
