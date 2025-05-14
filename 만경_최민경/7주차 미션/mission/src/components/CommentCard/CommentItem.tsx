import React from "react";
import { Comment } from "../../types/comment";

interface CommentItemProps {
  comment: Comment;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
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
      <div className="mt-2 text-gray-800">{comment.content}</div>
    </li>
  );
};

export default CommentItem;
