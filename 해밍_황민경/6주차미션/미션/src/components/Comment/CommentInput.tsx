const CommentInput = () => {
  return (
    <div className="mt-6 border-t border-gray-600 pt-4">
      <textarea
        placeholder="댓글을 입력하세요..."
        className="w-full p-3 rounded bg-gray-800 text-white resize-none"
        rows={3}
      />
      <div className="flex justify-end mt-2">
        <button className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded">
          등록
        </button>
      </div>
    </div>
  );
};

export default CommentInput;
