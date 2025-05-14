const NotFoundPage = () => {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-4">404</h1>
          <p className="text-xl mb-4">페이지를 찾을 수 없습니다.</p>
          <a
            href="/"
            className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors duration-200"
          >
            홈으로 돌아가기
          </a>
        </div>
      </div>
    );
  };
  
  export default NotFoundPage;
  