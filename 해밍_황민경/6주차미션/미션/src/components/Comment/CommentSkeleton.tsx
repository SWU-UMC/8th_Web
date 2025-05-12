const CommentSkeleton = () => {
  return (
    <div className="animate-pulse space-y-2 p-3 border-b border-gray-700">
      <div className="h-3 bg-gray-600 rounded w-1/3"></div>
      <div className="h-4 bg-gray-500 rounded w-full"></div>
    </div>
  );
};

export default CommentSkeleton;
