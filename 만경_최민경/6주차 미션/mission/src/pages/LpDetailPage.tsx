import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


import { Lp } from "../types/lp";
import axios from "axios";
import { getLpDetail } from "../apis/lp";

const LpDetailPage = () => {
  const { lpId } = useParams<{ lpId: string }>();
  const [lp, setLp] = useState<Lp | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLpDetail = async (): Promise<void> => {
      setLoading(true);
      try {       
        const data = await getLpDetail(lpId);
        setLp(data);
        
      } catch (error) {
        console.error(error);
      } 
    };

    if (lpId) {
      fetchLpDetail();
    }
  }, [lpId]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">로딩 중...</div>;
  }

  if (error || !lp) {
    return (
      <div>
         <span className="text-black text-2xl">에러가 발생했습니다</span>
      </div>

     ) 
  }

  // LP 생성일 포맷팅
  const formattedDate = new Date(lp.createdAt).toLocaleDateString();

  return (
      <div className="w-full max-w-xl flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-xs">
            {lp.authorId}
          </div>
          <span>작성자 {lp.authorId}</span>
        </div>
        <div className="text-gray-400 text-sm">{formattedDate}</div>
      
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-700 rounded-lg shadow-2xl" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-3/4 h-3/4 rounded-full overflow-hidden shadow-lg">
            {lp.thumbnail ? (
              <img src={lp.thumbnail} alt={lp.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full"/>
            )}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/6 h-1/6 bg-white rounded-full" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="transform rotate-45 text-white font-bold text-2xl opacity-80">
                {lp.title}
              </div>
            </div>
          </div>
        </div>
       
      <div className="w-full max-w-xl mb-8">
        <h1 className="text-xl font-bold mb-2">{lp.title}</h1>
        <div className="text-gray-400 text-xs mb-6">{lp.content}</div>
      </div>
  
      <div className="flex items-center gap-2">
        <span>{lp.likesCount}</span>
      </div>
    </div>
  );
};

export default LpDetailPage;