const CommentSkeleton = () => {
  return (
    <div className="animate-pulse flex items-start space-x-4 py-2">
      <div className="w-8 h-8 rounded-full bg-gray-700" />
      <div className="flex-1 space-y-2">
        <div className="h-4 w-32 bg-gray-700 rounded" />
        <div className="h-3 w-60 bg-gray-700 rounded" />
      </div>
    </div>
  );
};

export default CommentSkeleton;
