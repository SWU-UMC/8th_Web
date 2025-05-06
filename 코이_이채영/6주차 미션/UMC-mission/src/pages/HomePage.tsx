import { useEffect, useState } from "react";
import useGetLpList from "../hooks/queries/useGetLpList";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { PAGINATION_ORDER } from "../enums/common" // PAGINATION_ORDER import 추가

const HomePage = () => {
    const navigate = useNavigate();
    const savedSortOrder = localStorage.getItem("sortOrder") as PAGINATION_ORDER || "desc";
    const [sortOrder, setSortOrder] = useState<PAGINATION_ORDER>(savedSortOrder);

    useEffect(() => {
        localStorage.setItem("sortOrder", sortOrder);
    }, [sortOrder]);

    const { data, isPending, isError } = useGetLpList({
        order: sortOrder, // PAGINATION_ORDER 형식의 값 전달
        limit: 20,
        search: "", // 검색은 비워둠
    });

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

    if (isPending) {
        return <div className="text-white">Loading...</div>;
    }

    if (isError) {
        return <div className="text-white">Error</div>;
    }

    return (
        <div className="text-white p-10 max-w-[1240px] mx-auto">
            <div className="flex justify-end mb-4">
                <div className="flex border rounded-sm overflow-hidden w-40">
                    <button
                        onClick={() => setSortOrder(PAGINATION_ORDER.asc)}
                        className={`flex-1 p-2 text-center text-sm ${sortOrder === PAGINATION_ORDER.asc ? "bg-white text-black font-bold" : "bg-black text-white"}`}
                    >
                        오래된 순
                    </button>
                    <button
                        onClick={() => setSortOrder(PAGINATION_ORDER.desc)}
                        className={`flex-1 p-2 text-center text-sm ${sortOrder === PAGINATION_ORDER.desc ? "bg-white text-black font-bold" : "bg-black text-white"}`}
                    >
                        최신 순
                    </button>
                </div>
            </div>



            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                {data?.map((lp) => (
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
                ))}
            </div>
        </div>
    );
};

export default HomePage;
