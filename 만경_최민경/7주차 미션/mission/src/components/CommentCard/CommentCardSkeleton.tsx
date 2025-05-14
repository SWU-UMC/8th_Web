const CommentCardSkeleton = () => {
    return (
      <div className="bg-white p-4 rounded-lg shadow animate-pulse space-y-3">
        <div className="flex justify-between items-center">
          <div className="h-4 bg-gray-300 rounded w-1/4" />
          <div className="h-3 bg-gray-300 rounded w-1/6" />
        </div>
        <div className="h-4 bg-gray-300 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-5/6" />
      </div>
    );
  };
  
  export default CommentCardSkeleton;
  