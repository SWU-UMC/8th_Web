import { Link } from "react-router-dom";
import { Lp } from "../../types/lp";
import { formatDistanceToNow } from "date-fns";

interface LpCardProps {
  lp: Lp;
}

const LpCard = ({ lp }: LpCardProps) => {
  const likeCount = lp.likes?.length ?? 0;
  const createdAt = new Date(lp.createdAt);
  return (
    <Link to={`/lp/${lp.id}`}>
      <div className="relative rounded-lg overflow-hidden shadow-lg transition-transform duration-300 transform hover:scale-105">
        <img
          src={lp.thumbnail}
          alt={lp.title}
          className="object-cover w-full h-48"
        />
        {/* <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 p-2">
        <h3 className="text-white text-sm font-semibold">{lp.title}</h3>
      </div> */}
        <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
          <h3 className="text-white text-sm font-semibold mb-1">{lp.title}</h3>
          <p className="text-gray-300 text-xs mb-1">
            {formatDistanceToNow(createdAt, { addSuffix: true })}
          </p>
          <p className="text-white text-xs">❤️ {likeCount}</p>
        </div>
      </div>
    </Link>
  );
};

export default LpCard;
