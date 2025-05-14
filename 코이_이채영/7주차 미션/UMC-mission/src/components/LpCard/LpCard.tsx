import { useNavigate } from "react-router-dom";
import { Lp } from "../../types/lp";
import { FaHeart } from "react-icons/fa";

interface LpCardProps {
    lp: Lp;
}

const LpCard = ({ lp }: LpCardProps) => {
    const navigate = useNavigate();

    const handleLpClick = (lpId: number) => {
        const accessToken = localStorage.getItem("accessToken");

        if (accessToken) {
            navigate(`/lps/${lpId}`);
        } else {
            const confirmLogin = window.confirm("로그인이 필요한 서비스입니다. 로그인을 해주세요!");
            if (confirmLogin) {
                navigate("/login");
            }
        }
    };

    return (
        <div
            key={lp.id}
            className="relative aspect-square w-full overflow-hidden transform transition-transform duration-600 hover:scale-130 hover:z-10 cursor-pointer"
            onClick={() => handleLpClick(lp.id)}
        >
            <img
                src={lp.thumbnail}
                alt={lp.title}
                className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/100 to-black/30 opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end text-white p-4">
                <p className="text-sm font-bold text-left w-full">{lp.title}</p>
                <div className="flex justify-between text-xs w-full mt-1">
                    <p className="text-left">{new Date(lp.createdAt).toLocaleDateString("ko-KR")}</p>
                    <p className="flex items-center gap-1 justify-end">
                        <FaHeart /> {lp.likes.length}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LpCard;