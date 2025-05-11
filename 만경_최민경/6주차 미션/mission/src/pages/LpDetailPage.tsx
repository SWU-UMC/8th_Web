import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getLpDetail } from "../apis/lp";
import { ResponseLpDetailDto } from "../types/lp";
import CommentCard from "../components/CommentCard/CommentCard";


const LpDetailPage = () => {
  const { lpId } = useParams<{ lpId: string }>();
  const [lp, setLp] = useState<ResponseLpDetailDto['data'] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLpDetail = async (): Promise<void> => {
      setLoading(true);
      try {
        // lpId를 숫자로 변환
        if (!lpId) {
          throw new Error("LP ID가 없습니다");
        }
        
        const numericLpId = parseInt(lpId, 10);
        const response = await getLpDetail(numericLpId);
        
        // API 응답 구조에 맞게 data 필드 사용
        setLp(response.data);
        setError(null);
      } catch (err) {
        
        setError("LP 정보를 불러오는 데 실패했습니다");
        setLp(null);
      } finally {
        // 로딩 상태 종료
        setLoading(false);
      }
    };

    fetchLpDetail();
  }, [lpId]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">로딩 중...</div>;
  }

  if (error || !lp) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="text-black text-2xl">에러가 발생했습니다: {error}</span>
      </div>
    );
  }

  // LP 생성일 포맷팅
  const formattedDate = new Date(lp.createdAt).toLocaleDateString();

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="w-full max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
        {/* 작성자 정보 및 날짜 */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-xs">
              {lp.author?.name?.charAt(0) || lp.authorId}
            </div>
            <span>작성자 {lp.author?.name || lp.authorId}</span>
          </div>
          <div className="text-gray-400 text-sm">{formattedDate}</div>
        </div>
        
        {/* LP 제목 및 편집 버튼 */}
        <div className="w-full mb-4 flex justify-between items-center">
          <h1 className="text-2m font-bold">{lp.title}</h1>
          <div className="flex">
            <button 
              className="px-3 py-1 text-black rounded-md text-sm cursor-pointer "
              onClick={() => {/* 수정 로직 */}}
            >
              수정
            </button>
            <button 
              className="px-3 py-1 text-black rounded-md text-sm cursor-pointer "
              onClick={() => {/* 삭제 로직 */}}
            >
              삭제
            </button>
          </div>
        </div>
        
        {/* LP 이미지 */}
        <div className="relative aspect-square mb-6 bg-gray-900 rounded-lg">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-700 rounded-lg shadow-2xl" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-3/4 h-3/4 rounded-full overflow-hidden shadow-lg">
              {lp.thumbnail ? (
                <img src={lp.thumbnail} alt={lp.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gray-600" />
              )}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/6 h-1/6 bg-white rounded-full" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="transform rotate-45 text-white font-bold text-2xl opacity-80">
                  {lp.title}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        
        {/* 태그 목록 */}
        {lp.tags && lp.tags.length > 0 && (
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">태그</h3>
            <div className="flex flex-wrap gap-2">
              {lp.tags.map(tag => (
                <span key={tag.id} className="bg-gray-200 px-2 py-1 rounded-full text-xs">
                  {tag.name}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {/* 좋아요 정보 */}
        <div className="flex items-center gap-2">
          <span>좋아요 {lp.likes?.length || 0}개</span>
        </div>
        {lpId && <CommentCard lpId={parseInt(lpId, 7)} />}
      </div>
    </div>
  );
};

export default LpDetailPage;