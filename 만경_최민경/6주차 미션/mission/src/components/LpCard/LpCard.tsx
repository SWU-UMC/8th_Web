import { useNavigate } from "react-router-dom";
import { Lp } from "../../types/lp";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

interface LpCardProps{
    lp:Lp
}

const LpCard = ({ lp }: LpCardProps) => {
  const navigate = useNavigate();
  const { accessToken } = useAuth();
  const [showAlert, setShowAlert] = useState(false);
  
  // LP 카드 클릭 이벤트 핸들러
  const handleLpClick = () => {
    if (accessToken) {
      // 로그인한 경우 LP 상세 페이지로 바로 이동
      navigate(`/lp/${lp.id}`);
    } else {
      // 로그인하지 않은 경우 경고 모달 표시
      alert("로그인이 필요한 서비스입니다. 로그인을 해주세요!");
      navigate('/login'); 
    }
  };
  

  return (
    
    <div className="relative rounded-lg overflow-hidden shadow-lg 
      hover:shadow-2xl hover:scale-105 transform transition-all duration-300 cursor-pointer group"
      onClick={handleLpClick} >
      <img 
        src={lp.thumbnail} 
        alt={lp.title} 
        className="object-cover w-full h-48"
      />

      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
         
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 p-2 transform transition-transform duration-300 group-hover:translate-y-0">
        <h3 className="text-white text-sm font-semibold">{lp.title}</h3>
      </div>
      
      <div className="absolute inset-0 flex flex-col justify-center items-center opacity-0 group-hover:opacity-300 transition-opacity duration-300 p-4">
        <h3 className="text-white text-lg font-bold mb-2">{lp.title}</h3>
        <p className="text-gray-300 text-sm mb-1">Upload: {new Date(lp.createdAt).toLocaleDateString()}</p>
        <p className="text-gray-300 text-sm">Likes: {lp.likesCount || 0}</p>
      </div>
    </div>
        
  );
};

export default LpCard;