import { Heart } from "lucide-react";
import { Lp } from "../../types/lp";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";


interface LpCardProps {
    lp: Lp
}


const LpCard = ({lp}:LpCardProps) => {
    const formattedDate = lp.updatedAt ? new Date(lp.updatedAt).toLocaleDateString("ko-KR") : "";
    const navigate = useNavigate();
    const { accessToken } = useAuth();


    const handleClick = () => {
        if (!accessToken) {
            alert("로그인이 필요한 서비스입니다. 로그인을 해주세요!");
            navigate("/login");
            return;
            }
            navigate(`/lps/${lp.id}`); 
        };
        
    return (
        <div onClick={handleClick} className="relative rounded-sm overflow-hidden shadow-lg hover:shadow-2xl transition-shadow transition-transform hover:scale-110 duration-300 cursor-pointer group aspect-square">
            <img src={lp.thumbnail} alt={lp.title} className="object-cover w-full h-full" />
            <div className="absolute inset-0 bg-transparent group-hover:bg-black/60 p-2 flex flex-col justify-end transition duration-300">
                    <h3 className="text-white text-xs font-semibold opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition duration-300">
                        {lp.title}
                    </h3>
                    <div className="flex justify-between items-center text-white text-xs mt-1 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition duration-300">
                        <span>{formattedDate}</span>
                        <div className="flex items-center space-x-1">
                            <Heart size={12} className="text-white" />
                            <span>{lp.likes.length}</span>
                        </div>
                    </div>
                </div>
        </div>
        
    );
    
}

export default LpCard;