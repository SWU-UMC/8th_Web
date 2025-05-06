import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { getLpDetail } from "../apis/lp";
import { ResponseLpDetailDto } from "../types/lp";
import LpImage from "../assets/lp.png";
import Profile from "../assets/profile.png"

const LpDetailPage = () => {
    const { lpId } = useParams<{ lpId: string }>();
    const navigate = useNavigate();
    const [lpData, setLpData] = useState<ResponseLpDetailDto["data"] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchLpData = async () => {
            if (!lpId) return;
            try {
                setLoading(true);
                const response = await getLpDetail(parseInt(lpId));
                if (response.data) {
                    setLpData(response.data);
                } else {
                    navigate("/"); 
                }
            } catch (error) {
                console.error("Error fetching LP data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchLpData();
    }, [lpId, navigate]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!lpData) {
        return <div>LP를 찾을 수 없습니다.</div>;
    }

    const handleEdit = () => {
        navigate(`/edit/${lpId}`);
    };

    const handleDelete = () => {
        if (window.confirm("정말로 이 LP를 삭제하시겠습니까?")) {
            alert("LP가 삭제되었습니다!");
        }
    };

    return (
        <div className="text-white bg-[#1c1c1c] rounded-xl p-10 max-w-[600px] mx-auto flex flex-col text-center">
            
            <div className="mt-4 flex items-center gap-2">
                <img
                    src = {lpData.author.avatar || Profile} 
                    alt={lpData.author.name}
                    className="w-8 h-8 rounded-full object-cover"
                />

                <h3 className="text-lg font-bold">{lpData.author.name}</h3>
            </div>

            <div className="flex justify-between items-center mt-8">
                <h1 className="text-2xl font-bold mr-8">{lpData.title}</h1>
                <div className="flex gap-4">
                    <button onClick={handleEdit} className="text-xl">
                        <FaEdit />
                    </button>
                    <button onClick={handleDelete} className="text-xl text-red-500">
                        <FaTrash />
                    </button>
                </div>
            </div>

            <div className="flex justify-center items-center mt-12 mb-12 translate-x-[-80px]">
                <div className="relative w-64 h-64">
                    <img
                        src={LpImage}
                        alt="Spinning LP"
                        className="absolute opacity-50 top-2 left-40 w-60 h-60 object-cover animate-[spin_5s_linear_infinite] pointer-events-none"
                    />
                    <img
                        src={lpData.thumbnail}
                        alt={lpData.title}
                        className="w-64 h-64 object-cover rounded-lg relative z-10"
                    />
                </div>
            </div>

            <div className="mb-4">
                <p>{lpData.content}</p>
            </div>

            <div className="mb-4">
                <div className="flex justify-center items-center gap-2 flex-wrap">
                    {lpData.tags.map((tag) => (
                        <span key={tag.id} className="bg-gray-700 text-white py-1 px-3 rounded-full text-sm">
                            #{tag.name}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LpDetailPage;
