import { useNavigate } from "react-router-dom";
import { Lp } from "../../types//lp";
import { formatDistanceToNow } from "date-fns";

interface LpCardProps {
  lp: Lp;
}

const LpCard = ({ lp }: LpCardProps) => {
  const navigate = useNavigate();
  const createdAt = new Date(lp.createdAt);
  return (
    <div
      onClick={() => navigate(`/lps/${lp.id}`)}
      className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-transform transition-shadow duration-300 transform hover:scale-105 cursor-pointer"
    >
      <img
        src={lp.thumbnail}
        alt={lp.title}
        className="object-cover w-full h-48"
      />
      <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
        <h3 className="text-white text-sm font-semibold">{lp.title}</h3>
        <p className="text-gray-300 text-xs mb-1">
          {formatDistanceToNow(createdAt, { addSuffix: true })}
        </p>
        {/* 좋아요 수 세기*/}
        {/* <p className="text-white text-xs">❤️ {lp.likeCount}</p> */}
      </div>
    </div>
  );
};

export default LpCard;
